import Controllers from "./class.controller.js";
import UserService from '../services/user.services.js';
import { HttpResponse } from "../utils/http.response.js";
import { sendMail } from "../services/mailing.services.js";
import { createResponse } from "../utils/utils.js";
const httpResponse = new HttpResponse();

const userService = new UserService();

export default class UserController extends Controllers{
  constructor(){
    super(userService)
  }

  register = async(req, res, next) =>{
    try {
      const data = await this.service.register(req.body);
      console.log(data)
      if(!data) return httpResponse.NotFound(res, 404, data)
        else return httpResponse.Ok(res, data);
    } catch (error) {
      next(error);
    }
  };



  login = async(req, res, next) =>{
    try {
     const token = await this.service.login(req.body);
      res.cookie('token', token, { httpOnly: true });
     if(!token) return httpResponse.NotFound(res, {msg: 'No existe le token'}) 
      else return httpResponse.Ok(res, token);
    } catch (error) {
      next(error);
    }
  };

  getUsers = async(req, res, next)=>{
    try {
      const users = await this.service.getUsers();
      return httpResponse.Ok(res, users)
    } catch (error) {
      next(error)
    }
  }


  profile = async(req, res, next)=>{
    try {
     if(req.user){
      const {_id} = req.user;
      const user = await this.service.getUserById(_id)
      return httpResponse.Ok(res , {
      user
      })
     } else httpResponse.Unauthorized(res, { msg: 'Unhautorized' })
    } catch (error) {
      next(error);
    }
  };

  tokenResetPass = async(req, res, next) => {
    try {
      const user = req.user;
      const token = await userService.tokenResetPass(user);
      console.log(token)
      if(token){
        await sendMail(user, 'resetPass', token);
        res.cookie('tokenpass', token)
        return httpResponse.Ok(res, {msg : 'Email reset pass send correctly'})
      } else httpResponse.NotFound(res, { msg: 'Error to send email '})
    } catch (error) {
      next(error);

    }
  }

  async updatePass(req, res, next){
    try {
      const user = req.user;
      const { pass } =req.body
      const { tokenpass } = req.cookies
      if(!tokenpass) return httpResponse.Unauthorized(res, {msg : 'Unauthoriezed'})
        const updPass = await userService.updatePass(pass, user);
      if(!updPass) return httpResponse.NotFound(res, {msg : 'cant be same'})
      res.clearCookie('tokenpass')
      return httpResponse.Ok(res, updPass)
    } catch (error) {
      next(error);
    } 
  }

  async checkUserLastConnection(req, res, next){
    try {
      const response = await userService.checkUserLastConnection()
      return createResponse(res, 200, response)
    } catch (error) {
      next(error)
    }
  }
};