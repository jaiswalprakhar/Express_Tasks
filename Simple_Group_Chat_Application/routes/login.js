const express = require("express");
const router = express.Router();
const session = require("express-session");
const cookieParser = require("cookie-parser");

const oneDay = 1000 * 60 * 60 * 24;
router.use(session({
    secret: "This is my own secret",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}
));

router.use(cookieParser());

router.get("/login", (req, res, next) => {
    res.send(`<html>
                <head>
                    <title>Login Page</title>
                </head>
                <body>
                    <form action = "/login" method = "POST">
                        <label for="username">Username: </label>
                        <input type="text" name="username" id="username" placeholder="Enter Username" required/>
                        <button type="submit">Login</button>
                    </form>
                </body>
    </html>`)
});

router.post('/login', (req, res, next) => {
    if(req.body.username != null)
    {
        req.session.username = req.body.username;
        console.log(req.session);
        res.redirect("/chat");
        console.log(`${req.session.username} has loggedin`);
    }
    //handleFormSubmit(username);
})

/*const handleFormSubmit = (username) => {
    const myobj = {
        username: username
    }

    const myobj_serialised = JSON.stringify(myobj);
    localStorage.setItem("username", myobj_serialised);
}*/

module.exports = router;