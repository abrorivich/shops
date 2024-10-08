import { ErrorHandler } from "@error";
import { PrismaClient, shops } from '@prisma/client';
import { NextFunction, Request, Response } from "express";

let client = new PrismaClient()

export class ShopsController {
    static async getAllShops(req: Request, res: Response, next: NextFunction) {
        try {
            let shops: shops[] = await client.shops.findMany({ include: { branches: { select: { name: true, branchEmploye: { select: { employe: { select: { fullname: true, from: true, age: true } } } } } } } })
            res.status(200).send({
                succes: true,
                data: shops
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async createShops(req: Request, res: Response, next: NextFunction) {
        try {
            let { name }: Omit<shops, "id"> = req.body
            let shops: shops = await client.shops.create({ data: { name } })
            res.status(200).send({
                succes: true,
                message: "created shops 👌🏻",
                data: shops
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async updateShops(req: Request, res: Response, next: NextFunction) {
        try {
            let { id }: Partial<shops> = req.params
            let { name }: shops = req.body
            let shops: shops = await client.shops.update({ where: { id: Number(id) }, data: { name } })
            res.status(200).send({
                succes: true,
                message: "updated shops 👌🏻",
                data: shops
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }

    static async deleteShops(req: Request, res: Response, next: NextFunction) {
        try {
            let { id }: Partial<shops> = req.params
            let shops: shops = await client.shops.delete({ where: { id: Number(id) } })
            res.status(200).send({
                succes: true,
                message: "deleted 🛒"
            })
        } catch (error: any) {
            next(new ErrorHandler(error.message, error.status))
        }
    }
}