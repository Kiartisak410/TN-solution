package controllers

import (
	"fmt"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
	"tn.com/server/database"
	"tn.com/server/models"
)

func Login(c *fiber.Ctx) error{
	var data map[string]string

	if err := c.BodyParser(&data); err != nil{
		fmt.Print(err)
	}

	var user models.User

	database.DB.Where("uname = ?", data["uname"]).First(&user)

	if user.Uname == ""{
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message":"User Not Found",
		})
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(data["password"])); err != nil{
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message":"Incorrect Password",
		})
	}
	return c.JSON(user)
}

func AddUser(c *fiber.Ctx) error{
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		fmt.Print("error")
	}
	uid, _ := strconv.Atoi(data["uname"])
	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)
	user := models.User{
		Uid: uint(uid),
		Uname:    data["uname"],
		Password: password,
		Fname:    data["fname"],
		Lname:    data["lname"],
		Email:    data["email"],
		Phone:    data["phone"],
		Address:  data["address"],
		Pict:     data["pict"],
		Role:     data["role"],
	}
	database.DB.Create(&user)
	return c.JSON(fiber.Map{
		"message":"Add data complete",
	})
}

func User(c *fiber.Ctx) error{
	var data map[string]string

	if err := c.BodyParser(&data); err != nil{
		fmt.Print(err)
	}

	var user models.User

	database.DB.Where("uname = ?", data["uname"]).First(&user)

	return c.JSON(user)
}

func AllUser(c *fiber.Ctx) error{
	var user []models.User

	database.DB.Find(&user)
	
	return c.JSON(user)
}

func Delete(c *fiber.Ctx) error{
	var data map[string]string

	if err := c.BodyParser(&data); err != nil{
		fmt.Print(err)
	}

	var user models.User

	database.DB.Where("uname = ?", data["uname"]).Delete(&user)

	return c.JSON(fiber.Map{
		"message":"Delete complete",
	})
}

func UpdateUser(c *fiber.Ctx) error{
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		fmt.Print("error")
	}
	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)
	user := models.User{
		Uname:    data["uname"],
		Password: password,
		Fname:    data["fname"],
		Lname:    data["lname"],
		Email:    data["email"],
		Phone:    data["phone"],
		Address:  data["address"],
		Pict:     data["pict"],
		Role:     data["role"],
	}
	database.DB.Where("uname = ?", data["uname"]).Updates(&user)
	return c.JSON(fiber.Map{
		"message":"Update data complete",
	})
}