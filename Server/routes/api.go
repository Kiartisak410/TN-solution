package routes

import(
	"github.com/gofiber/fiber/v2"
	"tn.com/server/controllers"
)

func Setup(app *fiber.App){
	// User
	app.Post("/api/v1/add", controllers.AddUser)
	app.Post("/api/v1/login", controllers.Login)
	app.Get("/api/v1/user", controllers.User)
	app.Get("/api/v1/all", controllers.AllUser)
	app.Delete("/api/v1/delete", controllers.Delete)
	app.Post("/api/v1/update", controllers.UpdateUser)
	// End
	app.Post("/api/v1/leave/add", controllers.LeaveAdd)
	app.Get("/api/v1/leave/all", controllers.LeaveAll)
	app.Post("/api/v1/leave/update", controllers.LeaveUpdate)
	app.Delete("/api/v1/leave/delete", controllers.LeaveDelete)
}