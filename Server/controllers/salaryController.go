package controllers

import (
	"fmt"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"tn.com/server/database"
	"tn.com/server/models"
)

func SalAdd(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		fmt.Print(err)
	}

	sid, _ := strconv.Atoi(data["sid"])

	sal_date, _ := time.Parse("2006/01/02", data["sal_date"])

	salary := models.Salary{
		Sid:       uint(sid),
		Uid:       data["uid"],
		Sal_base:  data["sal_base"],
		Sal_total: data["sal_total"],
		Sal_date:  &sal_date,
	}
	database.DB.Create(&salary)
	return c.JSON(fiber.Map{
		"message": "Add completed",
	})
}

func SalAll(c *fiber.Ctx) error {
	var salary []models.Salary

	database.DB.Find(&salary)
	return c.JSON(salary)
}

func SalUpdate(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		fmt.Print(err)
	}

	sid, _ := strconv.Atoi(data["sid"])

	sal_date, _ := time.Parse("2006/01/02", data["sal_date"])

	salary := models.Salary{
		Sid:       uint(sid),
		Uid:       data["uid"],
		Sal_base:  data["sal_base"],
		Sal_total: data["sal_total"],
		Sal_date:  &sal_date,
	}
	database.DB.Where("uid = ?", data["uid"]).Updates(&salary)
	return c.JSON(fiber.Map{
		"message": "Update data complete",
	})
}

func SalDelete(c *fiber.Ctx) error {
	var data map[string]string
	
	if err := c.BodyParser(&data); err != nil {
		fmt.Print(err)
	}

	var salary models.Salary

	database.DB.Where("uid = ?", data["uid"]).Delete(&salary)
	return c.JSON(fiber.Map{
		"message": "Delete completed",
	})
}