import { Keypair } from "@solana/web3.js";
import { User } from "../schema";

export const userSignup = async(req:any,res:any)=>{
    try{
        const {username,password} = req.body;
        const userExist = await User.find({
            username
        });
        if(userExist){
            return res.status(400).json({msg:"User with this name already exist"});
        }
        const keypair = Keypair.generate();
        const response = await User.create({
            username,
            password,
            publickey:keypair.publicKey.toString(),
            privatekey : keypair.secretKey
        });
        return res.status(201).json({response});

    }catch(e:any){
        return res.status(201).json({error:e});
    }
}