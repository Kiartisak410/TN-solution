package models

import "time"

type Leave struct {
	Lid        uint `gorm:"primaryKey;auto_increment;not_null"`
	Uid        string `gorm:"not_null"`
	Reason     string
	Start_date *time.Time
	End_date   *time.Time
	Status     string
}
