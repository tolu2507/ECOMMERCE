import express from 'express';
import data from './data.js'

const port = 2001
const app = express();

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