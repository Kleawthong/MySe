package controller

import (
	"net/http"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team09/entity"
)

// POST /dentist_schedules
func CreateDentistSchedule(c *gin.Context) {
	var dentist_schedule entity.Dentist_schedule
	var dentist entity.Dentist
	var workingday entity.Workingday
	var responsity  entity.Responsity
	var room_number	 entity.Room_Number
	
	// ผลลัพธ์ที่ได้จะถูก bind เข้าตัวแปร patien_schedule
	if err := c.ShouldBindJSON(&dentist_schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// 9: ค้นหา responsity ด้วย id
	if tx := entity.DB().Where("id = ?", dentist_schedule.ResponsityID).First(&responsity); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Responsity not found"})
		return
	}
	// 10: ค้นหา workingday ด้วย id
	if tx := entity.DB().Where("id = ?", dentist_schedule.WorkingdayID).First(&workingday); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Workingday not found"})
		return
	}
	// 11: ค้นหา dentist ด้วย id
	if tx := entity.DB().Where("id = ?", dentist_schedule.DentistID).First(&dentist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dentist not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", dentist_schedule.Room_NumberID).First(&room_number); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room number not found"})
		return
	}
	// 12: สร้าง dentist_schedule
	wv := entity.Dentist_schedule{
		Dentist: dentist,
		Responsity: responsity,
		Workingday: workingday,
		Job_description: dentist_schedule.Job_description,
		Room_Number: room_number,
		TimeWork: dentist_schedule.TimeWork, 
		TimeEnd:  dentist_schedule.TimeEnd,  
	}

	if _, err := govalidator.ValidateStruct(wv); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
}

	// 13: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": wv})
}

// GET /dentist_schedule/:id

func GetDentistSchedule(c *gin.Context) {
	var dentist_schedule entity.Dentist_schedule
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&dentist_schedule); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dentist_schedule not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dentist_schedule})
}

// GET /dentist_schedules
func ListDentistSchedules(c *gin.Context) {
	var dentist_schedules []entity.Dentist_schedule
	if err := entity.DB().Preload("Dentist").Preload("Workingday").Preload("Room_Number").Preload("Responsity").Raw("SELECT * FROM dentist_schedules").Find(&dentist_schedules).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": dentist_schedules})
}

// DELETE /dentist_schedules/:id
func DeleteDentistSchedule(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM dentist_schedules WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dentist_schedule not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /dentist_schedules
func UpdateDentistSchedules(c *gin.Context) {
	var dentist_schedule entity.Dentist_schedule
	id := c.Param("id")
	var dentist entity.Dentist
	var workingday entity.Workingday
	var responsity  entity.Responsity
	var room_number	 entity.Room_Number
	

	if err := c.ShouldBindJSON(&dentist_schedule); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", dentist_schedule.ResponsityID).First(&responsity); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Responsity not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", dentist_schedule.WorkingdayID).First(&workingday); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Workingday not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", dentist_schedule.DentistID).First(&dentist); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dentist not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", dentist_schedule.Room_NumberID).First(&room_number); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Room number not found"})
		return
	}
	wv := entity.Dentist_schedule{
		Dentist: dentist,
		Responsity: responsity,
		Workingday: workingday,
		Job_description: dentist_schedule.Job_description,
		Room_Number: room_number,
		TimeWork: dentist_schedule.TimeWork, 
		TimeEnd:  dentist_schedule.TimeEnd,  
	}
	if _, err := govalidator.ValidateStruct(wv); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Where("id = ?", id).Updates(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": dentist_schedule})
}
