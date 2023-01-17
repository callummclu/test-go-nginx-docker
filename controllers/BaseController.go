package controllers

import (
	"github.com/callummclu/callummclu.co.uk/configs"
	"github.com/gin-gonic/gin"
)

var Router *gin.Engine = gin.Default()

func BaseController() {
	AuthController()
	UserController()
	Router.Run(configs.EnvPORT())
}
