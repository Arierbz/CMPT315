import Joi, {ObjectSchema} from 'joi';
import {NextFunction, Response, Request} from 'express';
import {IUser} from '../models/User';
import {Task} from '../models/Task';


export function ValidateSchema(schema: ObjectSchema){
    return async(req:Request, res:Response, next:NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            res.status(422).json({message: "Object validation failed, please include a valid object"});
        }
    }
}

export const Schemas = {
    user:{
        create: Joi.object<IUser>({
            type: Joi.string().valid('ADMIN', 'USER').required(),
            firstName: Joi.string().required(), 
            lastName: Joi.string().required(),
            email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            password: Joi.string().required()
        }),
        login: Joi.object<{email:string, password:string}>({
            email: Joi.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).required(),
            password: Joi.string().required()
        })  
    },
    task:{
        create: Joi.object<Task>({
            owner: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string(),
            date: Joi.date().required(),
        }),
        update: Joi.object<Task>({
            owner: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string(),
            date: Joi.date().required
        })
    }
}   