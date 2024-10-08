import { EmployeController } from "@controller";
import { Router } from "express";

const employeRouter: Router = Router()

employeRouter
    .get("/getAll", EmployeController.getAllEmploye)
    .post("/create", EmployeController.createEmploye)
    .patch("/update/:id", EmployeController.updateEmploye)
    .delete("/delete/:id", EmployeController.deleteEmploye)

export { employeRouter }