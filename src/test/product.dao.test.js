import ProductDaoMongo from "../persistence/daos/mongodb/product.dao.js";
import mongoose from "mongoose";
import {test, describe, before} from 'node:test'
import assert from 'node:assert'
import { fakerES as faker} from '@faker-js/faker'
import { initMongoDB } from "../db/connection.js";

const createNewProd = () =>{
    return{
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price()),
        stock: parseInt(faker.commerce.price())
    }
}

describe('Test de daos', ()=>{
    const ProdDao = new ProductDaoMongo()

    before(async()=>{
        await initMongoDB()
        await mongoose.connection.collections['products'].drop()
        console.log('Se inicio limpio la base de datos')
    })

    // test('Deberia retornar todos los productos', async()=>{
    //     const products = await ProdDao.getAll()
    //     assert.equal(Array.isArray(products), true) //=
    //     assert.deepEqual(products.length, 0)    //==
    //     assert.deepStrictEqual(products, [])    //===
    // })

    test('Deberia registrar un producto', async()=>{
        const prod = createNewProd()
        const response = await ProdDao.create(prod)
        const products = await ProdDao.getAll()
        assert.ok(response, '_id')
    })



})