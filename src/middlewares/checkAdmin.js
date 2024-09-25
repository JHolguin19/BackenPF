import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

export const checkAdmin = async (req, res, next)=>{
    try {
        const {role} = req.user;
        if(role !== "admin" && role!=="PREMIUM") return httpResponse.Unauthorized(res, "Este Apartado es solo para usuarios administradores")
            else next();
    } catch (error) {
        next(error)
    }
}