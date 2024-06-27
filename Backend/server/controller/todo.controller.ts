import { RequestHandler } from "express"
import { TODO } from "../models"

export const todoController :{
    create:RequestHandler,
    getAll:RequestHandler,
    update:RequestHandler,
    delete:RequestHandler
}={
    async create(req,res,next){
        try {
            const title = req.body.title;
            const findFirst = await TODO.findOne({title:title})
            if(findFirst){
                return res.status(500).json({
                    msg:"Todo already exists"
                })
            }
            const data = await TODO.create(req.body)
            if(!data){
                return res.status(400).json({
                    msg:"Something went wrong"
                })
            }
            res.json({
                success: true,
                msg:"Todo created"
            })
        } catch (error) {
            next(error)
        }
    },
    async getAll(req,res,next){
        try {
            const data = await TODO.find().sort({createdAt:-1})
            if(!data){
                return res.status(500).json({
                    msg:"Something went wrong"
                })
            }
            res.json({
                success: true,
                data:data
            })
        } catch (error) {
            next(error)
        }
    },
    async update(req,res,next){
        try {
            const findFirst = await TODO.findById(req.params.id)
            if(!findFirst){
                return res.status(404).json({
                    msg:"Title Not Found"
                })
            }
            const data = await TODO.findByIdAndUpdate(req.params.id,req.body)
            if(!data){
                return res.status(500).json({
                    msg:"Something went wrong"
                })
            }
            res.json({
                success: true,
                msg:"Todo updated"
            })
        } catch (error) {
            next(error)
        }
    },
    async delete(req,res,next){
        try {
            const findFirst = await TODO.findById(req.params.id)
            if(!findFirst){
                return res.status(404).json({
                    msg:"Title Not Found"
                })
            }
            const data = await TODO.findByIdAndDelete(req.params.id)
            if(!data){
                return res.status(500).json({
                    msg:"Something went wrong"
                })
            }
            res.json({
                success: true,
                msg:"Todo deleted"
            })
        } catch (error) {
            next(error)
        }
    }
}