package controllers

import (
	"github.com/callummclu/callummclu.co.uk/middleware"
	"github.com/callummclu/callummclu.co.uk/services"
)

func PostController() {
	api := Router.Group("post")
	{
		api.Use(middleware.CORSMiddleware("*"))
		api.POST("", services.CreatePost)
		api.GET("", services.ReadPosts)
		api.GET(":id", services.ReadSinglePost)
		api.GET("title/:title", services.ReadSinglePostByPostTitle)
		api.PUT(":id", services.UpdatePost)
		api.DELETE(":id", services.DeletePost)
	}
}
