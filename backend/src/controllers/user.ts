import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user"
import bcrypt from 'bcrypt';

export const getAuthenticatedUser: RequestHandler = async (req,res,next) =>{

  

    try {
        
       
        const user = await UserModel.findById(req.session.userId).select('+email').exec();
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}


interface SignUpody {
    username?:string,
    email?:string,
    password?:string

}

export const signUp : RequestHandler<unknown,unknown,SignUpody,unknown> = async (req,res,next)=>{
   const username = req.body.username;
   const email = req.body.email;
   const passwordRaw = req.body.password;

   try {

    if(!username || !email || !passwordRaw){
        throw createHttpError(400,"Parameters missing");
    }

    const existingUsername = await UserModel.findOne( {username:username}).exec();
    if(existingUsername){
        throw createHttpError(409,"Username already taken.please choose a different one or log in instead")
    }
    const existingEmail  = await UserModel.findOne({email:email}).exec();
    if(existingEmail){
        throw createHttpError(409,"A user with this email address already exists.please lohg in instead.");
    }

    const passwordHash = await bcrypt.hash(passwordRaw, 10);
   
    const newUser = await UserModel.create({
        username:username,
        email:email,
        password:passwordHash
    });

    req.session.userId = newUser._id;

    res.status(201).json(newUser);
    
   } catch (error) {

    next(error)
    
   }
}

interface Loginody {
    username?:string,
    password?:string
}

export const login:RequestHandler<unknown,unknown,Loginody,unknown> = async (req,res,next) =>{

    const username = req.body.username;
    const password = req.body.password;
    try {
        if(!username || !password){
            throw createHttpError(400, "Parametrs missing");
        }

        const user = await UserModel.findOne({username:username}).select("+password email").exec();

        if(!user){
            throw createHttpError(401,"Invalid credentials");
        }
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(!passwordMatch){
            throw createHttpError(401,"Invalid credentials");
        }

        req.session.userId = user._id;
        res.status(201).json(user)
    } catch (error) {
       next(error);
    }
}

export const logout:RequestHandler= (req,res,next)=>{

    req.session.destroy(error=>{
        if(error){
            next(error)
        }else{
            res.sendStatus(200)
        }
    });
}

