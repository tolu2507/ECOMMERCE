import express from 'express';
import data from './data.js'

const port = 2001
const app = express();

app.get("/api/products", (req, res) => {
    res.send(data.products)
})

app.listen(port, () => {
    console.log(`Server started on port: http://localhost:${port}`);
})