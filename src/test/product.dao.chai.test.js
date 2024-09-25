import ProductDaoMongo from "../persistence/daos/mongodb/product.dao.js";
import { initMongoDB } from "../db/connection.js";
import {expect} from 'chai'
import mongoose from "mongoose";

const createNewProd = () =>{
    

    return{
        name:'bananos',
        description: 'fruta que contiene mucho potasio',
        price: 23000,
        stock: 12
    }
}

describe('test unitarios de ProductDaos', ()=>{
    const ProdDao = new ProductDaoMongo()
    before(async()=>{
        initMongoDB();
        await mongoose.connection.collections['products'].drop()
        console.log('Se inicio limpio la base de datos')
    })

    after(()=>{
        console.log('Finalizaron las pruebas')
    })

    it('Deberia retornar todos los productos', async()=>{
        const products = await ProdDao.getAll()
        expect(Array.isArray(products)).to.be.equal(true)
        expect(products.length === 0).to.be.equal(true)
    })


    it('Deberia agregar un producto', async()=>{
        const prod = createNewProd()

        const response = await ProdDao.create(prod)
        const products = await ProdDao.getAll()
        expect(response).to.have.property('_id');
        expect(response.name).to.be.equal(prod.name)
        expect(products).to.have.length(1)
    })

    it('Deberia retornar un producto por Id', async()=>{
        const prod = createNewProd()
        const response = await ProdDao.create(prod)
        const productNewId = await ProdDao.getById(response._id)
        const responseId = response._id.toString()
        const productNewIdString = productNewId._id.toString()
        expect(responseId).to.have.equal(productNewIdString)




    })




  

})