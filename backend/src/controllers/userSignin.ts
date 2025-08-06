import { Keypair } from "@solana/web3.js";
import { User } from "../schema";
import jwt from "jsonwebtoken"

export const userSignin = async(req:any,res:any)=>{
    try{
        const {username,password} = req.body;
        const userExist = await User.find({
            username,
            password
        });
        if(!userExist){
            return res.status(400).json({msg:"User doesnt Exist"});
        }
        if(userExist){
        const token = jwt.sign(userExist,"SECRET_KEY" )
            res.cookie("authtoken",token,{
                httpOnly:true,
                secure:true,
                sameSite:"none"
            })
             return res.status(201).json({msg:"Signin done",token});
        }
       

    }catch(e:any){
        return res.status(201).json({error:e});
    }
}