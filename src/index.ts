import express, { Application } from "express";
import dotenv from "dotenv"
dotenv.config()
import { ErrorHandlerMiddleware } from "@middlewares";
import { branchEmployeRouter, branchesRouter, employeRouter, shopRouter } from "@routes";

const app: Application = express()
const PORT = process.env.APP_PORT || 7070

app.use(express.json())
app.use("/shops", shopRouter)
app.use("/branches", branchesRouter)
app.use("/employe", employeRouter)
app.use("/employeToBranch", branchEmployeRouter)

app.use("/*", ErrorHandlerMiddleware.errorHandlerMiddleware)

app.listen(PORT, () => console.log(`PORT: ${PORT} connect`))