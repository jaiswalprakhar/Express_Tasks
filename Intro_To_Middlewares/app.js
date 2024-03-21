const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req, res, next) => {
    res.send(`<html>
            <head>
                <title>Add Product Page</title>
            </head>
            <body>
                <form action = "/product" method = "POST">
                    <label for = "product_name">Product: </label>
                    <input type = "text" name = "title" id = "product_name" />
                    <label for = "product_size">Size: </label>
                    <input type = "text" name = "size" id = "product_size" />
                    <button type = "submit">Add Product</button>
                </form>
            </body>
        </html>`);
});

app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    res.send(`<h1>Welcome Page</h1>`);
});

app.listen(3000, () => {
    console.log(`Server started at PORT 3000`);
});