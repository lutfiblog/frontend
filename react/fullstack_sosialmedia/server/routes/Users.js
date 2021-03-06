const express = require('express');
const { Users } = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken');
const {ValidateToken, validateToken} = require('../middlewares/AuthMiddleware');

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username: username,
            password: hash,
        })
        res.json("SUCCESS");
    });
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await Users.findOne({ where: { username: username }})

    if (!user) res.json({error: "User doesnt exist"});

    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({error: "error username and password combination"});

        const accessToken = sign({username: user.username, id: user.id}, "important secret" );
        res.json(accessToken);
    });
})

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
});

module.exports = router;