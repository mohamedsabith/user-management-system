import express from 'express';
import {signup,signin} from '../services/user.js'


const router=express.Router()

router.post('/signup',signup)
router.post('/signin',signin)

export default router