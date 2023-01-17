package controllers

import (
	"github.com/callummclu/callummclu.co.uk/configs"
	"github.com/gin-gonic/gin"
)

var Router *gin.Engine = gin.Default()

func BaseController() {
	AuthController()
	UserController()
	Router.LoadHTMLGlob("error/*")

	Router.NoRoute(func(c *gin.Context) {
		c.HTML(404, "404.html", gin.H{})
	})
	Router.Run(configs.EnvPORT())
}
