const express = require('express');
const router = express.Router();

router.get('/add-product', (req, res, next) => {
    res.send(`<html>
            <head>
                <title>Add Product Page</title>
            </head>
            <body>
                <form action = "/admin/add-product" method = "POST">
                    <label for = "product_name">Product: </label>
                    <input type = "text" name = "title" id = "product_name" />
                    <label for = "product_size">Size: </label>
                    <input type = "text" name = "size" id = "product_size" />
                    <button type = "submit">Add Product</button>
                </form>
            </body>
        </html>`);
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;