import Controllers from "./class.controller.js";
import TicketService from "../services/ticket.services.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

const ticketService = new TicketService();

export default class TicketController extends Controllers{
    constructor(){
        super(ticketService);
    }


    async generateTicket(req, res, next){
        try {
            const user = req.user;
            const ticket = ticketService.generateTicket(user);
            if(!ticket) return httpResponse.NotFound(res, 'Error generate Ticket')
                else return httpResponse.Ok(res, ticket)
        } catch (error) {
            
        }
    }
}

 