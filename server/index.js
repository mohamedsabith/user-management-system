import express from 'express';
import cors from 'cors'
import 'dotenv/config' 
import mongoose from 'mongoose';

import api from './routes/api.js'

const app=express();

//middlewares
app.use(express.json())
app.use(cors())

//api
app.use('/api',api)

const port = process.env.PORT || 5000;

const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((_) => {
    app.listen(port, () => console.log(`Server started at http://localhost:${port}`));
  })
  .catch((error) => {
    console.log(error);
  });

