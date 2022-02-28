package controllers

import (
	"fmt"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"tn.com/server/database"
	"tn.com/server/models"
)

func LeaveAdd(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		fmt.Print("error")
	}

	lid, _ := strconv.Atoi(data["lid"])
	var status = "0"
	start_date, _ := time.Parse("2006/01/02", data["start"])
	end_date, _ := time.Parse("2006/01/02", data["end"])
	leave := models.Leave{
		Lid:    uint(lid),
		Uid:    data["uid"],
		Reason: data["reason"],
		Start_date: &start_date,
		End_date: &end_date,
		Status: status,
	}
	database.DB.Create(&leave)
	return c.JSON(fiber.Map{
		"message": "Add completed",
	})
}

func LeaveAll(c *fiber.Ctx) error {
	var leave []models.Leave

	database.DB.Find(&leave)
	return c.JSON(leave)
}

func LeaveUpdate(c *fiber.Ctx) error{
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		fmt.Print(err)
	}

	lid, _ := strconv.Atoi(data["lid"])
	fmt.Println(data["lid"])
	fmt.Print(data["status"])
	leave := models.Leave{
		Uid:    data["uid"],
		Status: (data["status"]),
	}
	database.DB.Where("lid = ?", lid).Updates(&leave)
	return c.JSON(fiber.Map{
		"message":"Update data complete",
	})
}

func LeaveDelete(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		fmt.Print(err)
	}

	var leave models.Leave

	database.DB.Where("lid = ?", data["lid"]).Delete(&leave)
	return c.JSON(fiber.Map{
		"message": "Delete completed",
	})
}