package database

import (
	"fmt"

	"gorm.io/gorm"
	"gorm.io/driver/postgres"
	"tn.com/server/models"
)

var DB *gorm.DB

func Connection() {
	dsn := "host=192.168.1.22 user=postgres password=password dbname=tn port=5432 sslmode=disable"
	connection, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil{
		fmt.Println("Could not connect database")
		fmt.Println(err.Error())
	}else{
		fmt.Println("Database connected")
	}

	DB = connection

	connection.AutoMigrate(&models.User{})
	connection.AutoMigrate(&models.Salary{})
	connection.AutoMigrate(&models.Leave{})
}
