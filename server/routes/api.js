/* eslint-disable import/extensions */
import express from "express";
import { signup, signin } from "../controllers/user/user.js";
import {
  AdminLogin,
  AllUsers,
  EditUser,
  DeleteUser,
} from "../controllers/admin/admin.js";

const router = express.Router();

// user router
router.post("/signup", signup);
router.post("/signin", signin);

// admin router
router.post("/admin/login", AdminLogin);
router.get("/admin/allUsers", AllUsers);
router.patch("/admin/editUser", EditUser);
router.post("/admin/deleteUser", DeleteUser);

export default router;
