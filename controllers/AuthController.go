package controllers

import (
	"github.com/callummclu/callummclu.co.uk/middleware"
	"github.com/callummclu/callummclu.co.uk/services"
)

func AuthController() {
	api := Router.Group("auth")
	{
		api.Use(middleware.CORSMiddleware("*"))
		api.POST("login", services.LoginUser)
		api.GET(":token", services.CheckUser)
		api.POST("password", services.ChangeUserPassword)
	}

}
