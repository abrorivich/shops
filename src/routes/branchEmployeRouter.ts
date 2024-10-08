import { branchEmployeController } from "@controller";
import { Router } from "express";

const branchEmployeRouter: Router = Router()

branchEmployeRouter
    .post("/create", branchEmployeController.AddEmployeToBranches)
    .get("/getAll", branchEmployeController.GetAllEmployeToBranches)

export { branchEmployeRouter }