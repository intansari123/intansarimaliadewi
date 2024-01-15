import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import CategoryRoute from "./routes/CategoryRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import StockRoute from "./routes/StockRoute.js";
import SupplierRoute from "./routes/SupplierRoute.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(CategoryRoute);
app.use(ProductRoute);
app.use(StockRoute);
app.use(SupplierRoute);

app.listen(process.env.APP_PORT, ()=>{
    console.log('Server running...');
});