import { ShopsController } from "@controller";
import { Router } from "express";

const shopRouter: Router = Router()

shopRouter
    .get("/getAll", ShopsController.getAllShops)
    .post("/create", ShopsController.createShops)
    .patch("/update/:id", ShopsController.updateShops)
    .delete("/delete/:id", ShopsController.deleteShops)

export { shopRouter }