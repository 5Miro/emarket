import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import dotenv from "dotenv";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB = process.env.MONGODB_URL;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    console.log("DB connection succesful.");
}).catch(err => {
    console.log("DB connection failed.")
});

app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || "sb")
})

app.use("/api/users", userRouter);

app.use("/api/products", productRouter);

app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message }); // show error for async api requests
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
})