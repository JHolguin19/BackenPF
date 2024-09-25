import Services from "./class.services.js";
import UserDaoMongo from "../persistence/daos/mongodb/user.dao.js";
import jwt from "jsonwebtoken";
import { createHash, isValidPassword, quitarInactivos } from "../utils/utils.js";
import CartDaoMongo from "../persistence/daos/mongodb/cart.dao.js";
import UserRepository from "../persistence/repository/user.repository.js";
import { sendMail } from "./mailing.services.js";
import config from "../config/config.js";
import { UserModel } from "../persistence/daos/mongodb/models/user.model.js";


const userRepository = new UserRepository()
const userDao = new UserDaoMongo();
const cartDao = new CartDaoMongo();

export default class UserService extends Services {
  constructor() {
    super(userDao);
  }

  generateToken(user, time = "5m") {
    const payload = {
      userId: user._id,
    };
    return jwt.sign(payload, config.SECRET_KEY_JWT, { expiresIn: time });
  }


  async register(user) {
    try {
      const { email, password } = user;
      console.log(user)
      const existUser = await this.dao.getByEmail(email);
      if (!existUser) {
        const cartUser = await cartDao.create();
        if (email === config.EMAIL_ADMIN && password === config.PASS_ADMIN) {
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
            role: "admin",
            cart: cartUser._id,
          });
          await sendMail(user, "register");
          return newUser;
        } else if(email === config.EMAIL_PREMIUM && password === config.PASSP){
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
            role: "PREMIUM",
            cart: cartUser._id,
          });
          await sendMail(user, "register");
          return newUser;
        }
          else {
          const newUser = await this.dao.create({
            ...user,
            password: createHash(password),
            cart: cartUser._id,
          });
          console.log(newUser + "error")
          await sendMail(user, "register");
          return newUser;
        }
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.dao.getByEmail(email);
      if (!userExist) return null;
      const passValid = isValidPassword(password, userExist);
      if (!passValid) return null;
      if (userExist && passValid){
        await this.updateLastConnection(userExist._id)     
        return this.generateToken(userExist);
      }
        
    } catch (error) {
      throw new Error(error);
    }
  }

 
  getUserById = async (id) => {
    try {
      return await userRepository.getUserById(id);
    } catch (error) {
      throw new Error(error);
    }
  };

  async tokenResetPass(user){
    try {
      return this.generateToken(user, '1h');
    } catch (error) {
      throw new Error(error)
    }
  }


  async updatePass(user, pass){
    try {
      const Equal = isValidPassword(pass, user);
      if(Equal) return null
      const newPass = createHash(pass);
      return await userDao.update(user._id, {password : newPass})
    } catch (error) {
      throw new Error(error)
    }
  }

  async getUsers(){
    try {
      const users = await UserModel.find({}, 'email role')
      if(!users) return null
      return users
    } catch (error) {
      throw new Error(error)
    }
  }

  async updateLastConnection(userId){
    return await this.dao.update(userId, {
      last_Connection: new Date()
    })
  }

  async checkUserLastConnection(){
    try {
      const userInactive = []
      const users = await this.dao.getAll()
      if(users.length>0){
        for(const user of users){
          if(user.last_Connection &&
            quitarInactivos(user.last_Connection)
          ){
            console.log(`Usuario ${user._id} ha pasado mas de 48hrs inactivo`)
            await this.dao.update(user._id,{active:false})
            userInactive.push(user.email)
            await sendMail(user, 'inactivo')
          }
        }
      }
      return userInactive;
    } catch (error) {
      throw new Error(error)
    }
  }
}