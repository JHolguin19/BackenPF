import MongoDao from "./mongo.dao.js";
import { UserModel } from './models/user.model.js';

export default class UserDaoMongo extends MongoDao {
    constructor(){
        super(UserModel)
    }

    async getByEmail(email){
        try {
            return await this.model.findOne({ email })
        } catch (error) {
            throw new Error(error)
        }
    }
    
    async getUserById(id){
        try {
            return await this.model.findById(id).populate("cart"); 
        } catch (error) {
            throw new Error(error)
        }
    }

    async getUsers(){
        try {
            return await this.model.find({}) 
        } catch (error) {
            throw new Error(error)

        }
    }

    async update(id, obj){
        try {
            return await this.model.findByIdAndUpdate(id, obj, { new: true})
        } catch (error) {
            throw new Error(error)
        }
    }


    async delete(id){
        try {
            return await this.model.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(error)
        }
    }
}