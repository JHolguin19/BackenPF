import Services from "./class.services.js";
import ProductDaoMongo from "../persistence/daos/mongodb/product.dao.js";
import { deleteMail, sendMail } from "./mailing.services.js";


const prodDao = new ProductDaoMongo();

export default class ProductService extends Services {
    constructor(){
        super(prodDao);
    }

    async createProduct(obj, user){
        try {
            const {role, email} = user
        if(role ==='PREMIUM'){
            const product = await prodDao.create({
                ...obj,
                owner: email,
                premium: 'PREMIUM'

            })
            return product
        }else return null
        } catch (error) {
            throw new Error
        }
        
    }


    async removeProduct(id){
        try {
            const product = await prodDao.getById(id)
            console.log(product)
            if(!product) return null
            if(product.premium === 'PREMIUM'){
                    const data = await prodDao.delete(id)
                    await deleteMail(product, 'deleteMail')
                     return data
                }
            await prodDao.delete(id)    
        } catch (error) {
            throw new Error(error)
        }
    }


};