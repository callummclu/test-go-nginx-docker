package services

import (
	"errors"
	"fmt"
	"math"
	"strconv"
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
	post.GithubLink = strings.TrimSpace(post.GithubLink)
	post.SiteLink = strings.TrimSpace(post.SiteLink)

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

	page := c.Query("page")
	itemPerPage := c.Query("itemPerPage")

	limit, err := strconv.Atoi(itemPerPage)

	if err != nil {
		limit = 10
	}

	page_num, err := strconv.Atoi(page)

	if err != nil {
		page_num = 1
	}

	offset := limit * (page_num - 1)

	rows, err := db.Query("select id, title, description, image, technologies, github, site, isorganisation, organisation_dependencies,isspotlight from posts WHERE isorganisation IS NOT TRUE LIMIT $1 OFFSET $2", limit, offset)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
	}

	defer rows.Close()

	for rows.Next() {
		var (
			ID                       int64
			Title                    string
			Description              string
			Image                    string
			Technologies             []string
			GithubLink               string
			SiteLink                 string
			IsOrganisation           bool
			OrganisationDependencies []string
			IsSpotlight              bool
		)

		if err := rows.Scan(&ID, &Title, &Description, &Image, pq.Array(&Technologies), &GithubLink, &SiteLink, &IsOrganisation, pq.Array(&OrganisationDependencies), &IsSpotlight); err != nil {
			fmt.Print(err)
		}

		posts = append(posts, models.AllPostsViewModel{
			ID:                       ID,
			Title:                    Title,
			Description:              Description,
			Image:                    Image,
			Technologies:             Technologies,
			GithubLink:               GithubLink,
			SiteLink:                 SiteLink,
			IsOrganisation:           IsOrganisation,
			OrganisationDependencies: OrganisationDependencies,
			IsSpotlight:              IsSpotlight,
		})
	}

	if err != nil {
		c.JSON(400, gin.H{"error": "Cannot get posts"})
		return
	}

	var count int

	err = db.QueryRow("SELECT COUNT(*) FROM posts WHERE isorganisation IS NOT TRUE").Scan(&count)

	if err != nil {
		c.JSON(400, gin.H{"error": "Cannot get length of posts"})
	}

	totalPages := (float64(count) / float64(limit))

	c.JSON(200, gin.H{"data": posts, "page": page_num, "totalPages": math.Ceil(totalPages)})
}

func ReadSpotlight(c *gin.Context) {
	var posts []models.AllPostsViewModel
	db, err := configs.GetDB()
	if err != nil {
		err = errors.New("DB connection error")
		c.JSON(400, gin.H{"error": err})
	}

	defer db.Close()

	rows, err := db.Query("select id, title, description, image, technologies, github, site, isorganisation, organisation_dependencies,isspotlight from posts WHERE isspotlight IS TRUE")

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
	}

	defer rows.Close()

	for rows.Next() {
		var (
			ID                       int64
			Title                    string
			Description              string
			Image                    string
			Technologies             []string
			GithubLink               string
			SiteLink                 string
			IsOrganisation           bool
			OrganisationDependencies []string
			IsSpotlight              bool
		)

		if err := rows.Scan(&ID, &Title, &Description, &Image, pq.Array(&Technologies), &GithubLink, &SiteLink, &IsOrganisation, pq.Array(&OrganisationDependencies), &IsSpotlight); err != nil {
			fmt.Print(err)
		}

		posts = append(posts, models.AllPostsViewModel{
			ID:                       ID,
			Title:                    Title,
			Description:              Description,
			Image:                    Image,
			Technologies:             Technologies,
			GithubLink:               GithubLink,
			SiteLink:                 SiteLink,
			IsOrganisation:           IsOrganisation,
			OrganisationDependencies: OrganisationDependencies,
			IsSpotlight:              IsSpotlight,
		})
	}

	if err != nil {
		c.JSON(400, gin.H{"error": "Cannot get posts"})
		return
	}

	var count int

	err = db.QueryRow("SELECT COUNT(*) FROM posts WHERE isspotlight IS TRUE").Scan(&count)

	if err != nil {
		c.JSON(400, gin.H{"error": "Cannot get length of posts"})
	}

	c.JSON(200, gin.H{"data": posts})
}

func ReadOrganisation(c *gin.Context) {
	var posts []models.AllPostsViewModel
	db, err := configs.GetDB()
	if err != nil {
		err = errors.New("DB connection error")
		c.JSON(400, gin.H{"error": err})
	}

	defer db.Close()

	page := c.Query("page")
	itemPerPage := c.Query("itemPerPage")

	limit, err := strconv.Atoi(itemPerPage)

	if err != nil {
		limit = 10
	}

	page_num, err := strconv.Atoi(page)

	if err != nil {
		page_num = 1
	}

	offset := limit * (page_num - 1)

	rows, err := db.Query("select id, title, description, image, technologies, github, site, isorganisation, organisation_dependencies,isspotlight from posts WHERE isorganisation IS TRUE LIMIT $1 OFFSET $2", limit, offset)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
	}

	defer rows.Close()

	for rows.Next() {
		var (
			ID                       int64
			Title                    string
			Description              string
			Image                    string
			Technologies             []string
			GithubLink               string
			SiteLink                 string
			IsOrganisation           bool
			OrganisationDependencies []string
			IsSpotlight              bool
		)

		if err := rows.Scan(&ID, &Title, &Description, &Image, pq.Array(&Technologies), &GithubLink, &SiteLink, &IsOrganisation, pq.Array(&OrganisationDependencies), &IsSpotlight); err != nil {
			fmt.Print(err)
		}

		posts = append(posts, models.AllPostsViewModel{
			ID:                       ID,
			Title:                    Title,
			Description:              Description,
			Image:                    Image,
			Technologies:             Technologies,
			GithubLink:               GithubLink,
			SiteLink:                 SiteLink,
			IsOrganisation:           IsOrganisation,
			OrganisationDependencies: OrganisationDependencies,
			IsSpotlight:              IsSpotlight,
		})
	}

	if err != nil {
		c.JSON(400, gin.H{"error": "Cannot get posts"})
		return
	}

	var count int

	err = db.QueryRow("SELECT COUNT(*) FROM posts WHERE isorganisation IS TRUE").Scan(&count)

	if err != nil {
		c.JSON(400, gin.H{"error": "Cannot get length of posts"})
	}

	totalPages := (float64(count) / float64(limit))

	c.JSON(200, gin.H{"data": posts, "page": page_num, "totalPages": math.Ceil(totalPages)})
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

func ReadSinglePostByPostTitle(c *gin.Context) {
	var post models.Post
	var title string = c.Param("title")
	err := post.GetPostByTitle(title)

	if err != nil {
		c.JSON(400, gin.H{"error": "post not found"})
		return
	}
	c.JSON(200, gin.H{"data": post})
}

func ReadAllPostsByOrganisation(c *gin.Context) {
	var posts []models.Post

	var ids string = c.Query("ids")

	page := c.Query("page")
	itemPerPage := c.Query("itemPerPage")

	limit, err := strconv.Atoi(itemPerPage)

	if err != nil {
		limit = 10
	}

	page_num, err := strconv.Atoi(page)

	if err != nil {
		page_num = 1
	}

	offset := limit * (page_num - 1)

	db, err := configs.GetDB()
	if err != nil {
		err = errors.New("DB connection error")
		c.JSON(400, gin.H{"error": err})
	}

	defer db.Close()

	rows, err := db.Query("select id, title, description, image, technologies, github, site, isorganisation, organisation_dependencies,isspotlight from posts WHERE id = ANY($1::INT[]) LIMIT $2 OFFSET $3", "{"+ids+"}", limit, offset)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
	}

	defer rows.Close()

	for rows.Next() {
		var (
			ID                       int64
			Title                    string
			Description              string
			Image                    string
			Technologies             []string
			GithubLink               string
			SiteLink                 string
			IsOrganisation           bool
			OrganisationDependencies []string
			IsSpotlight              bool
		)

		if err := rows.Scan(&ID, &Title, &Description, &Image, pq.Array(&Technologies), &GithubLink, &SiteLink, &IsOrganisation, pq.Array(&OrganisationDependencies), &IsSpotlight); err != nil {
			fmt.Print(err)
		}

		posts = append(posts, models.Post{
			ID:                       ID,
			Title:                    Title,
			Description:              Description,
			Image:                    Image,
			Technologies:             Technologies,
			GithubLink:               GithubLink,
			SiteLink:                 SiteLink,
			IsOrganisation:           IsOrganisation,
			OrganisationDependencies: OrganisationDependencies,
			IsSpotlight:              IsSpotlight,
		})
	}

	if err != nil {
		c.JSON(400, gin.H{"error": "Cannot get posts"})
		return
	}

	var count int

	err = db.QueryRow("SELECT COUNT(*) FROM posts WHERE id = ANY($1::INT[])", "{"+ids+"}").Scan(&count)

	if err != nil {
		c.JSON(400, gin.H{"error": "Cannot get length of posts"})
	}

	totalPages := (float64(count) / float64(limit))

	c.JSON(200, gin.H{"data": posts, "page": page_num, "totalPages": math.Ceil(totalPages)})
}

func UpdatePost(c *gin.Context) { /* NOT IMPLEMENTED YET*/ }
func DeletePost(c *gin.Context) { /* NOT IMPLEMENTED YET*/ }
