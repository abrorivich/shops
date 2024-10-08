import { ErrorHandler } from "@error";
import { PrismaClient, branchEmploye, employe } from '@prisma/client';
import { NextFunction, Request, Response } from "express";

let client = new PrismaClient()

export class branchEmployeController {
    static async AddEmployeToBranches(req: Request, res: Response, next: NextFunction) {
        try {
            let { branchId, employeId }: Omit<branchEmploye, "id"> = req.body
            let branchEmploye: branchEmploye = await client.branchEmploye.create({ data: { branchId, employeId } })
            res.status(200).send({
                succes: true,
                message: "👌🏻",
                data: branchEmploye
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
    static async GetAllEmployeToBranches(req: Request, res: Response, next: NextFunction) {
        try {
            let branchEmploye: branchEmploye[] = await client.branchEmploye.findMany()
            res.status(200).send({
                succes: true,
                data: branchEmploye
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}