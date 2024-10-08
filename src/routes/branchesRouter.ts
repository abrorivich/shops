import { BranchesController } from "@controller";
import { Router } from "express";

const branchesRouter: Router = Router()

branchesRouter
    .get("/getAll", BranchesController.getAllBranches)
    .post("/create", BranchesController.createBranches)
    .patch("/update/:id", BranchesController.updateBranches)
    .delete("/delete/:id", BranchesController.deleteBranches)

export { branchesRouter }