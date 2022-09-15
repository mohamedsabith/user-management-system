/* eslint-disable import/extensions */
import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import api from "./routes/api.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// api
app.use("/api", api);

const PORT = process.env.PORT || 7000;

const { CONNECTION_URL } = process.env;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server started at http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
