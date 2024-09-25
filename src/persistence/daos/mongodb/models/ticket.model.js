import { Schema, model } from "mongoose";

export const ticketSchema = new Schema({
    code: { type : String, require:true},
    buy_date: {type : String, require:true},
    cantidad: { type:Number, require:true},
    nombreComprador:{type:String, require:true},
    
})

export const TicketModel = model(
    'ticket', 
    ticketSchema
);