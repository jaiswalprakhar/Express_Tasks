const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactusRoutes = require('./routes/contactus');
const successRoutes = require('./routes/success');

const PageNotFoundController = require('./controllers/404Controller');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(contactusRoutes);
app.use(successRoutes);

app.use(PageNotFoundController.PageNotFound);

app.listen(3000, () => {
    console.log(`Server started at PORT 3000`);
});