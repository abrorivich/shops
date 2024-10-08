import { ErrorHandler } from "@error";
import { branches, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

let client = new PrismaClient()

export class BranchesController {
    static async getAllBranches(req: Request, res: Response, next: NextFunction) {
        try {
            let branches: branches[] = await client.branches.findMany({ include: { shop: { select: { name: true, branches: { select: { branchEmploye: { select: { employe: { select: { fullname: true, age: true, from: true } } } } } } } } }, })
            res.status(200).send({
                succes: true,
                data: branches
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async createBranches(req: Request, res: Response, next: NextFunction) {
        try {
            let { name, shopID }: Omit<branches, "id"> = req.body
            let branches: branches = await client.branches.create({ data: { name, shopID } })
            res.status(200).send({
                succes: true,
                message: "created branches 👌🏻",
                data: branches
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async updateBranches(req: Request, res: Response, next: NextFunction) {
        try {
            let { id }: Partial<branches> = req.params
            let { name, shopID }: Partial<branches> = req.body
            let branches: branches = await client.branches.update({ where: { id: Number(id) }, data: { name, shopID } })
            res.status(200).send({
                succes: true,
                message: "updated branches 👌🏻",
                data: branches
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async deleteBranches(req: Request, res: Response, next: NextFunction) {
        try {
            let { id }: Partial<branches> = req.params
            let branches: branches = await client.branches.delete({ where: { id: Number(id) } })
            res.status(200).send({
                succes: true,
                message: "deleted 🛒"
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}