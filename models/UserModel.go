package models

import (
	"database/sql"
	"errors"
	"fmt"

	"github.com/callummclu/callummclu.co.uk/auth"
	"github.com/callummclu/callummclu.co.uk/configs"
	"github.com/lib/pq"
)

type User struct {
	ID           int64  `json:"-"`
	Name         string `json:"name"`
	Surname      string `json:"surname"`
	Username     string `json:"username"`
	Email        string `json:"email"`
	DisplayImage string `json:"display_image"`
	Password     string `json:"password,omitempty"`
	CreatedAt    string `json:"created_at,omitempty"`
}

type LogInUser struct {
	User     string `json:"username"`
	Password string `json:"password"`
}

type ReturnedUser struct {
	Name         string `json:"name"`
	Surname      string `json:"surname"`
	Username     string `json:"username"`
	DisplayImage string `json:"display_image"`
}

type ReturnedUsers struct {
	Users []ReturnedUser `json:"users"`
}

func NewUser() *User {
	return new(User)
}

func NewLogInUser() *LogInUser {
	return new(LogInUser)
}

func (u *User) SaveUser() error {
	db, err := configs.GetDB()
	if err != nil {
		err = errors.New("DB connection error")
		return err
	}
	defer db.Close()
	/*
	 Check if the user already exists
	*/
	var (
		username string
		email    string
	)
	stmt, err := db.Prepare("SELECT username,email FROM users WHERE username = $1 OR email = $2")
	if err != nil {
		return err
	}
	defer stmt.Close()
	err = stmt.QueryRow(u.Username, u.Email).Scan(&username, &email)
	if err != nil {
		if err == sql.ErrNoRows {
			hashedPassword, err := auth.HashPassword(u.Password)
			if err != nil {
				return err
			}
			//Add the new user
			insert_stmt, err := db.Prepare("INSERT INTO users (name,surname,username,email,password,display_image) VALUES ($1,$2,$3,$4,$5,$6)")

			if err != nil {
				return err
			}
			defer insert_stmt.Close()
			var emptyString []string = nil
			_, err = insert_stmt.Exec(u.Name, u.Surname, u.Username, u.Email, hashedPassword, "", "", pq.Array(emptyString))

			return err
		} else {
			return err
		}
	} else {
		err = errors.New("User already exists")
		return err
	}
	return err
}

func (u *LogInUser) UserLogin() (string, error) {
	db, err := configs.GetDB()
	if err != nil {
		err = errors.New("DB connection error")
		return "", err
	}
	defer db.Close()
	stmt, err := db.Prepare("SELECT username,password FROM users WHERE username = $1 OR email = $1")
	if err != nil {
		return "", err
	}
	defer stmt.Close()
	var (
		username string
		password string
	)
	err = stmt.QueryRow(u.User).Scan(&username, &password)

	if err != nil {
		return "", err
	}
	err = auth.CheckPassword(password, u.Password)

	if err != nil {
		err = errors.New("Wrong password")
		return "", err
	}
	return username, err
}

func (u *ReturnedUser) GetUserByUsernameQuery(query string) error {
	db, err := configs.GetDB()
	if err != nil {
		err = errors.New("DB connection error")
		return err
	}
	defer db.Close()

	err = db.QueryRow("SELECT username, name, surname, display_image FROM users WHERE username = $1", query).Scan(&u.Username, &u.Name, &u.Surname, &u.DisplayImage)
	fmt.Print(err)
	return err
}
