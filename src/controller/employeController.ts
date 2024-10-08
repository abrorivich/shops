import { ErrorHandler } from "@error";
import { PrismaClient, employe } from '@prisma/client';
import { NextFunction, Request, Response } from "express";

let client = new PrismaClient()

export class EmployeController {
    static async getAllEmploye(req: Request, res: Response, next: NextFunction) {
        try {
            let employe: employe[] = await client.employe.findMany({ include: { branchEmploye: { select: { branches: { select: { name: true, shop: { select: { name: true } } } } } } } })
            res.status(200).send({
                succes: true,
                data: employe
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async createEmploye(req: Request, res: Response, next: NextFunction) {
        try {
            let { fullname, age, from }: Omit<employe, "id"> = req.body
            let employe: employe = await client.employe.create({ data: { fullname, age, from } })
            res.status(200).send({
                succes: true,
                message: "created employe 👌🏻",
                data: employe
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async updateEmploye(req: Request, res: Response, next: NextFunction) {
        try {
            let { id }: Partial<employe> = req.params
            let { fullname, age, from, }: Partial<employe> = req.body
            let employe: employe = await client.employe.update({ where: { id: Number(id) }, data: { fullname, age, from } })
            res.status(200).send({
                succes: true,
                message: "updated employe 👌🏻",
                data: employe
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async deleteEmploye(req: Request, res: Response, next: NextFunction) {
        try {
            let { id }: Partial<employe> = req.params
            let employe: employe = await client.employe.delete({ where: { id: Number(id) } })
            res.status(200).send({
                succes: true,
                message: "deleted 🛒"
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}