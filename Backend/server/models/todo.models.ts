import { model, Model, Schema } from "mongoose";
import TODO from  '../types'
const todoSchema = new Schema<TODO, Model<TODO>>(
    {
     title:{
        type:String,
        required:true,
     },
     completed:{
        type:Boolean,
        required:true,
        default:false,
     }
    },
    { timestamps: true }
)

export default   model<TODO, Model<TODO>>("TODO", todoSchema, "TODO");