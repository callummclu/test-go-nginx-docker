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
		api.POST("", services.ReadPosts)
		api.PUT(":id", services.UpdatePost)
		api.DELETE(":id", services.DeletePost)
	}
}
