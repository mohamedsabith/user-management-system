import userModel from '../../models/userModel.js';
import {signupValidation} from '../../validations/userValidation.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';

//user signup
 const doSignup = (data) =>{
    return new Promise(async(resolve,reject)=>{
       //signup validation
       const Validations = await signupValidation(data)

       if (Validations.error) {
        return reject({ status: false, errorSignup: Validations.error.details[0].message.replace(/"/g, '') });
      }

       //checking user already exist
       const user = await userModel.findOne({email:data.email})
       if(user){
        return reject({status:false,errorSignup:"Another account is using this email."})
      }

       //password hashing
       data.password = await bcrypt.hash(data.password, 12)
       // saving to DB
       const newUser = new userModel({
        firstName: data.firstName,
        lastName:data.lastName,
        email: data.email,
        password: data.password
     })

    await newUser.save(async(err,res)=>{
        if(err){
            console.log(err)
            return reject({status:false,errorSignup:err.message})
        }
        const token=Jwt.sign({id:res.id,firstName:res.firstName,lastName:res.lastName,data:Date.now(),status:"Ok"},process.env.JWT_TOKEN,{expiresIn:"10h"})
        return resolve({ status:true, msg: 'Account created successfuly',token})
    })

    }) 
  }

//user login
const doLogin = (data) =>{
    return new Promise(async(resolve,reject)=>{
       
        // checking if user exist in DB
        const user = await userModel.findOne({email:data.email})

        if(!user){
          return reject({status:false,errorLogin:"User not found. Please check your mail."})
        }

        // Comparing plain password to hashed password
        await bcrypt.compare(data.password,user.password).then((status)=>{
           if(!status){
            return reject({status:false,errorLogin:"Your password was incorrect. Please check your password."})
           }
           const token=Jwt.sign({id:user.id,firstName:user.firstName,lastName:user.lastName,data:Math.floor(Date.now() / 1000) + (60 * 60),status:"Ok"},process.env.JWT_TOKEN,{expiresIn:"5h"})
           return resolve({status:true,msge:"Login Successfully.",token})
        })

    })
}

export {doSignup,doLogin}