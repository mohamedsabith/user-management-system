import axios from "axios";

const url = "http://localhost:5000/api";

//user api
export const SignupUserApi = (userData)=> axios.post(`${url}/signup`,userData);
export const SigninUserApi = (userData)=> axios.post(`${url}/signin`,userData);

//admin api
export const AdminLoginApi = (adminData)=> axios.post(`${url}/admin/login`,adminData)
export const AllUsersApi = () => axios.get(`${url}/admin/allUsers`)
export const EditUserApi = (data,id)=> axios.patch(`${url}/admin/editUser`,{data,id})
export const DeleteUserApi = (userId)=> axios.post(`${url}/admin/deleteUser`,userId)
