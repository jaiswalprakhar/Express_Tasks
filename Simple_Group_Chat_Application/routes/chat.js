const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get('/chat', (req, res, next) => {
    fs.readFile("message.txt", "utf-8", (err, data) => {
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            console.log(data);
            res.send(`<html>
                <head>
                    <title>Chatting Page</title>
                </head>
                <body>
                    <p>${data}</p>
                    <form action = "/chat" method = "POST">
                        <label for="message">Enter your Message: </label>
                        <input type="text" name="message" id="message" placeholder="Enter Message" required/>
                        <button type="submit">Send</button>
                    </form>
                </body>
    </html>`)
        }
    })
});

router.post('/chat', (req, res, next) => {
    fs.appendFile("message.txt", ` ${req.session.username}: ${req.body.message}. \n`, (data, err) => {
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            console.log(`${data} added`);
            res.redirect("/chat");
        }
    })
})

module.exports = router;