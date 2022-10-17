import express from 'express';
import path from 'path';
import data from './data.js';
import dotenv from 'dotenv'
import config from './config.js';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import userRoute from './routes/userRoutes.js'

dotenv.config();

const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true
}).catch(error => console.log(error.message));

const port = 2001
const app = express();
app.use(bodyparser.json());
app.use("/api/users", userRoute)
app.get("/api/products", (req, res) => {
    res.send(data.products)
})

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find((it) => it._id === productId);

    if (product) {
        res.send(data.products.find((it) => it._id === productId));
    } else {
        res.status(404).send({msg: "Product not Found"})
    }
    res.send()
})

app.listen(port, () => {
    console.log(`Server started on port: http://localhost:${port}`);
})