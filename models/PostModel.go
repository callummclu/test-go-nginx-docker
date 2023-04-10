package models

import (
	"errors"
	"fmt"

	"github.com/callummclu/callummclu.co.uk/configs"
	"github.com/lib/pq"
)

type Post struct {
	ID            int64    `json:"-"`
	Title         string   `json:"title"`
	Description   string   `json:"description"`
	Body          string   `json:"body"`
	Image         string   `json:"image"`
	GithubLink    string   `json:"github"`
	SiteLink      string   `json:"site"`
	Technologies  []string `json:"technologies"`
	StaticContent []string `json:"static_content"`
}

type AllPostsViewModel struct {
	ID           int64    `json:"id"`
	Title        string   `json:"title"`
	Description  string   `json:"description"`
	Image        string   `json:"image"`
	GithubLink   string   `json:"github"`
	SiteLink     string   `json:"site"`
	Technologies []string `json:"technologies"`
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

	insert_stmt, err := db.Prepare("INSERT INTO posts (title,description,body,image,technologes,github,site,static_content) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)")

	if err != nil {
		return err
	}

	defer insert_stmt.Close()
	_, err = insert_stmt.Exec(p.Title, p.Description, p.Body, p.Image, p.Technologies, p.StaticContent)

	return err
}

func (p *Post) GetPostById(query string) error {
	fmt.Println(query)
	db, err := configs.GetDB()
	if err != nil {
		err = errors.New("DB connection error")
		return err
	}
	defer db.Close()

	err = db.QueryRow("SELECT id, title, description, body, image, technologies, github, site, static_content  FROM posts WHERE id = $1", query).Scan(&p.ID, &p.Title, &p.Description, &p.Body, &p.Image, pq.Array(&p.Technologies), &p.GithubLink, &p.SiteLink, pq.Array(&p.StaticContent))

	return err
}
