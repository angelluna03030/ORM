//ANGEL L. estuvo aqui :D
// 🐯 🐯 🐯
import express from "express";
import dotenv from 'dotenv';
import productsRoutes from "../src/routes/products.routes.js";
import categoriasRoutes from "../src/routes/categories.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api" , productsRoutes)
app.use("/api" , categoriasRoutes)
app.listen(process.env.PORT);

console.log('listening on port', process.env.PORT);
