const path = require('path');
const rootDir = require('../util/path');

exports.getProduct = (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

exports.addProduct = (req, res) => {
    console.log(req.body);
    res.redirect('/');
};