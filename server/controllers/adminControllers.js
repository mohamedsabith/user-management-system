import adminModel from "../models/adminModel.js";
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import mongoose from "mongoose";
import Jwt  from "jsonwebtoken";

const adminLogin = (data) =>{
    return new Promise(async(resolve,reject)=>{

      const admin = await adminModel.findOne({email:data.email})

      if(!admin){
       return reject({status:false,error:"You entered email is incorrect. Please check your email."})
      }
      
      await bcrypt.compare(data.password,admin.password).then(async(status)=>{
        if(!status){
          return reject({status:false,error:"Your password was incorrect. Please check your password."})
        }

        const token = await Jwt.sign({id:admin.id,username:admin.email,date:Date.now()},process.env.JWT_ADMIN_TOKEN,{expiresIn:"1d"})

        return resolve({status:true,msge:"Login Successfully",token})
      })
      
    })
}

const allUsers = () =>{

 return new Promise(async(resolve,reject)=>{
   const users = await userModel.find({})
   resolve(users)
 })

}

const editUser = (data) =>{

  return new Promise(async(resolve,reject)=>{
    await userModel.findByIdAndUpdate({_id:data.id},{$set:{email:data.data.email}})
    resolve({status:true,msge:"Successfully updated."})
  })

}

const deleteUser = (id) =>{

  return new Promise(async(resolve,reject)=>{
  const newId = new mongoose.Types.ObjectId(id.obj);
   await userModel.findByIdAndDelete({_id:newId})
   resolve({status:true,msge:"Successfully deleted."})
  })
  
}  
export {adminLogin,allUsers,editUser,deleteUser}