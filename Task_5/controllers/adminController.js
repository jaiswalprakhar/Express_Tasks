const path = require('path');
const rootDir = require('../util/path');
const Product = require('../models/product');

exports.getProduct = (req, res) => {
    const products = Product.fetchAll()
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

exports.addProduct = (req, res) => {
    const product = new Product(req.body.product_name, req.body.product_size);
    product.save();
    console.log(req.body);
    res.redirect('/');
};