const path = require('path');
const rootDir = require('../util/path');

exports.getContactus = (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'contactus.html'));
};

exports.postContactus = (req, res) => {
    console.log(req.body);
    res.redirect('/success');
};