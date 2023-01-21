package models

import (
	"errors"

	"github.com/callummclu/callummclu.co.uk/configs"
)

type Post struct {
	ID          int64  `json:"-"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Body        string `json:"body"`
	Image       string `json:"image"`
}

type AllPostsViewModel struct {
	ID          int64  `json:"-"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Image       string `json:"image"`
}

func NewPost() *Post {
	return new(Post)
}

func (p *Post) SavePost() error {
	db, err := configs.GetDB()
	if err != nil {
		err = errors.New("DB connection error")
		return err
	}
	defer db.Close()

	insert_stmt, err := db.Prepare("INSERT INTO posts (title,description,body,image) VALUES ($1,$2,$3,$4)")

	if err != nil {
		return err
	}

	defer insert_stmt.Close()
	_, err = insert_stmt.Exec(p.Title, p.Description, p.Body, p.Image)

	return err
}

func (p *Post) GetPostById(query string) error {
	db, err := configs.GetDB()
	if err != nil {
		err = errors.New("DB connection error")
		return err
	}
	defer db.Close()

	err = db.QueryRow("SELECT id, title, description, body, image FROM posts WHERE id = $1", query).Scan(&p.ID, &p.Title, &p.Description, &p.Description, &p.Image)

	return err
}
