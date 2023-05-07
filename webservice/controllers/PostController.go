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
		api.GET("both", services.ReadOrgansiationAndPost)
		api.GET("allIdAndImage", services.ReadIdAndImageData)
		api.GET(":id", services.ReadSinglePost)
		api.GET("title/:title", services.ReadSinglePostByPostTitle)
		api.GET("organisation", services.ReadAllPostsByOrganisation)
		api.GET("organisations", services.ReadOrganisation)
		api.GET("spotlight", services.ReadSpotlight)
		api.POST(":id/edit", services.UpdatePost)
		api.POST(":id/delete", services.DeletePost)
	}
}
