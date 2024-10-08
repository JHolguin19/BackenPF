import errorDictionary from '../utils/error.dictionary.js';
import { HttpResponse } from '../utils/http.response.js';

const httpResponse= new HttpResponse()
export default class Controllers {
  constructor(service) {
    this.service = service;
  }

  getAll = async(req, res, next) =>{
    try {
      const data = await this.service.getAll();
      return httpResponse.Ok(res, data)
    } catch (error) {
      next(error);
    }
  };

  getById = async(req, res, next) =>{
    try {
      const { id } = req.params;
      const data = await this.service.getById(id);
      if(!data) return httpResponse.NotFound(res, errorDictionary.NOT_FOUND_ID)
      else return httpResponse.Ok(res, data);
    } catch (error) {
      next(error);
    }
  };

  create = async(req, res, next) => {
    try {
      const data = await this.service.create(req.body);
      return httpResponse.Ok(res, data);
    } catch (error) {
      next(error);
    }
  };

  update = async(req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.service.update(id, req.body);
      if(!data) return httpResponse.NotFound(res, errorDictionary.ERROR_TO_UPDATE)
        else return httpResponse.Ok(res, data);
    } catch (error) {
      next(error);
    }
  };

  delete = async(req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.service.delete(id);
      if(!data) return httpResponse.NotFound(res, errorDictionary.ERROR_TO_DELETE)
        else return httpResponse.Ok(res, data);
    } catch (error) {
      next(error);
    }
  };
}