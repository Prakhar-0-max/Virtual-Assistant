import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../config/token.js"

export const signup = async (req,res)=>{
    try {
        const{name,email,password}=req.body
        const existEmail=await User.findOne({email})

        if(existEmail){
            return res.status(400).json({message:"Email already exist! "})
        }

        if(password.length<8){
           return  res.status(400).json({message:"Password must be 8 contain 8 char.!"})
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const user=await User.create ({
            name,password:hashedPassword,email
        })

        const token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameStie:"strict",
            secure:false
        })
        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({message:"Signup error"})
        
    }
}

export const Login = async (req,res)=>{
    try {
        const{email,password}=req.body
        const user=await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"Email does not exist! "})
        }

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.status(400).json({message:"Incorrect password! "})
        }
        
        const token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameStie:"strict",
            secure:false
        })
        return res.status(200).json(user)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: `Login error ${error}`})
        
        
    }
}

export const Logout = async (req,res)=>{
    try {
        res.clearCookie("token")
       return res.status(200).json({message:"Logout Successfull"})
    } catch (error) {
        return res.status(400).json({message:"Logout Error!! "})
        
    }
}