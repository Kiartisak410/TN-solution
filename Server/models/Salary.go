package models

import "time"

type Salary struct {
	Sid       uint `gorm:"primaryKey;auto_increment;not_null"`
	Uid       uint `gorm:"not_null"`
	Sal_base  string
	Sal_total string
	Sal_date  *time.Time
}