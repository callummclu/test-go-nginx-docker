package controllers

import (
	"github.com/callummclu/callummclu.co.uk/middleware"
	"github.com/callummclu/callummclu.co.uk/services"
)

func PostController() {
	api := Router.Group("post")
	{
		api.Use(middleware.CORSMiddleware("*"))
		api.GET("", services.CreatePost)
		api.GET("", services.ReadPosts)
		api.GET(":id", services.UpdatePost)
		api.GET(":id", services.DeletePost)
	}
}
