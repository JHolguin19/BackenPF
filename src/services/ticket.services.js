import Services from "./class.services.js";
import CartServices from "./cart.services.js";
import ProductService from "./product.services.js";
import TicketDaoMongo from "../persistence/daos/mongodb/ticket.dao.js";

const ticketDao = new TicketDaoMongo()
const cartServices = new CartServices()
const prodServices = new ProductService()

export default class TicketService extends Services {
    constructor(){
        super(ticketDao)
    }

    async generateTicket (user){
        try {
            const cart = await cartServices.getById(user.cart);
            if(!cart) return null;
            let totalCompra = 0;
            if(cart.products.length > 0){
                for (const p of cart.products){
                    const idProd = p.product;
                    const prodDB = await prodServices.getById(idProd);
                        if(p.cantidad <= prodDB.stock){
                            const amount = p.cantidad * prodDB.price;
                            totalCompra += amount;
                        }else return "No puede seleccionar cantidad que la del stock"
                }
            }
            const ticket = await this.dao.create({
                code: `${Math.floor(Math.random()*1000)}`,
                buy_date: new Date().toLocaleDateString(),
                amount: totalCompra,
                nombreComprador:user.email
            })

            await cartServices.clearCart(user.cart);
            return ticket; 
        } catch (error) {
            
        }

    }
}