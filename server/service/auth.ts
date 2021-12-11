import { IUser,  IUserLogin,  IUserRegister } from "@/interfaces/IUser";
import {Inject, Service} from "typedi";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import config from "@/config";
import APIError from "@/api/Error/APIError";


@Service()
export default class AuthService{
    constructor(
        @Inject('userModel') private userModel: Models.UserModel,
        @Inject("logger") private logger:any
    ){}
    
    public async signUp(userRegister:IUserRegister):Promise<{user:IUser,token:string}>{
        const hashedPassword = await bcrypt.hash(userRegister.password,10);
        

        const userRecord = await this.userModel.create({
            ...userRegister,
            password:hashedPassword
        })

        const token = this.generateToken(userRecord);
        if(!userRecord){
            throw new APIError("User cannot be created",400)
        }
        const user = userRecord.toObject();
        Reflect.deleteProperty(user,"password");
        return {user,token};
        
    }

    public async signIn(userLogin:IUserLogin){
        const userRecord = await this.userModel.findOne({email:userLogin.email});
        if(!userRecord){
            throw new Error("User not registered");
        }


        const validPassword = bcrypt.compare(userRecord.password,userLogin.password);
        if(!validPassword) throw new Error("Incorrect password");
        this.logger.silly("Password is valid, generating jwt");

        const token =  this.generateToken(userRecord);

        const user = userRecord.toObject();
        Reflect.deleteProperty(user,"password");

        return {user,token}

    }

    private generateToken(user:IUser){
        const current = new Date();
        const exp = new Date(current);
        exp.setDate(current.getDate() + 60);

        this.logger.silly("Sign JWT for userIDd:", user._id);

        return jwt.sign({
            _id:user._id,
            nick:user.nick,
            exp:exp.getTime() /1000
        },config.jwtSecret)
    }
}