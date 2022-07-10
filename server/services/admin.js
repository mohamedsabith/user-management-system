import { response } from 'express';
import {adminLogin,allUsers,editUser,deleteUser} from '../controllers/adminControllers.js';


export const AdminLogin = (req,res) => {

  adminLogin(req.body).then((response)=>{
     console.log(response);
     res.status(200).json(response)
  }).catch((error)=>{
     console.log(error);
     res.status(200).json(error)
  })

}

export const AllUsers = (req,res) =>{

   allUsers().then((response)=>{
     res.status(200).json(response)
   }).catch((error)=>{
      console.log(error);
      res.status(200).json(error)
   })

}

export const EditUser = (req,res) =>{
  
   editUser(req.body).then((response)=>{
      console.log(response);
      res.status(200).json(response)
   }).catch((error)=>{
      console.log(error);
      res.status(200).json(error)
   })

}

export const DeleteUser = (req,res) =>{
   deleteUser(req.body).then((response)=>{
      console.log(response);
      res.status(200).json(response)
   }).catch(()=>{
      console.log(error);
      res.status(200).json(error)
   })

}