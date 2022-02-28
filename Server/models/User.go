package models

type User struct {
	Uid      uint   `gorm:"primaryKey;auto_increment;not_null"`
	Uname    string `gorm:"not_null"`
	Password []byte `gorm:"not_null"`
	Fname    string
	Lname    string
	Email    string
	Phone    string
	Address  string
	Pict     string
	Role     string
}
