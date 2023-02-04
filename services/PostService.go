package services

import (
	"errors"
	"fmt"
	"strings"

	"github.com/callummclu/callummclu.co.uk/configs"
	"github.com/callummclu/callummclu.co.uk/models"
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

func CreatePost(c *gin.Context) {
	post := models.NewPost()
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	post.Title = strings.TrimSpace(post.Title)
	post.Description = strings.TrimSpace(post.Description)
	post.Body = strings.TrimSpace(post.Body)
	post.Image = strings.TrimSpace(post.Image)

	err := post.SavePost()

	if err != nil {
		c.JSON(500, gin.H{
			"error": "error saving post",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "Post successfully created",
	})

}

func ReadPosts(c *gin.Context) {
	var posts []models.AllPostsViewModel
	db, err := configs.GetDB()
	if err != nil {
		err = errors.New("DB connection error")
		c.JSON(400, gin.H{"error": err})
	}

	defer db.Close()

	rows, err := db.Query("select id, title, description, image, technologies from posts")

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
	}

	defer rows.Close()

	for rows.Next() {
		var (
			ID           int64
			Title        string
			Description  string
			Image        string
			Technologies []string
		)

		if err := rows.Scan(&ID, &Title, &Description, &Image, pq.Array(&Technologies)); err != nil {
			fmt.Print(err)
		}

		posts = append(posts, models.AllPostsViewModel{
			ID:           ID,
			Title:        Title,
			Description:  Description,
			Image:        Image,
			Technologies: Technologies,
		})
	}

	if err != nil {
		c.JSON(400, gin.H{"error": "Cannot get posts"})
		return
	}

	c.JSON(200, gin.H{"data": posts})
}
func ReadSinglePost(c *gin.Context) {

	var post models.Post

	var id string = c.Param("id")

	err := post.GetPostById(id)

	if err != nil {
		c.JSON(400, gin.H{"error": "post not found"})
		return
	}

	c.JSON(200, gin.H{"data": post})
}
func UpdatePost(c *gin.Context) { /* NOT IMPLEMENTED YET*/ }
func DeletePost(c *gin.Context) { /* NOT IMPLEMENTED YET*/ }
