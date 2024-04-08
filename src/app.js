import express from "express";
import authRouter from "./routers/auth";
import categoryRouter from "./routers/category";
import productRouter from "./routers/product.router";
import cartRouter from "./routers/cart";
import attributeRouter from "./routers/attribute";
import orderRouter from "./routers/order";

import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db";

const app = express();
dotenv.config();
//Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
//connect db
connectDB(process.env.DB_URI);

//routers
app.use("/api", productRouter);
app.use("/api", authRouter);

app.use("/api", categoryRouter);
app.use("/api", cartRouter);
app.use("/api", attributeRouter);
app.use("/api", orderRouter);

export const viteNodeApp = app;
