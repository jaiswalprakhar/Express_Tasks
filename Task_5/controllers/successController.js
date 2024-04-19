const path = require('path');
const rootDir = require('../util/path');

exports.successPage = (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'success.html'));
};