const express = require('express');
const User = require('../models/User')
const router = express.Router();
var jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

// JWT WEB TOKEN SECRET
const JWT_SECRET = 'Sohailisagooybo$'

//ROUTE 1: Creating a new user using:POST /api/auth/createuser Doesn't require auth
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
], async (req, res) => {
    // If there is errors return bad request
    let sucess=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({sucess, errors: errors.array() })
    }
    //   Check wheather the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({sucess, error: "Sorry a user with this email exists already" })
        }
        const salt = bcrypt.genSaltSync(10);
        const secpass = await bcrypt.hash(req.body.password, salt);

        // create a new user
        user = await User.create({
            name: req.body.name,
            password: secpass,
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        sucess=true;

        // res.json(user)
        res.json({sucess, authtoken })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})


//ROUTE 2: Authenticate a user using:POST /api/auth/login Doesn't require auth
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "password cannoy be blank").exists()
], async (req, res) => {
    let sucess=false;
    // If there is errors return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "plz try to login with correct credettials" });
        }
        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            sucess=false;
            return res.status(400).json({sucess, error: "plz try to login with correct credettials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        sucess=true;
        res.json({sucess, authtoken })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }

})
//ROUTE 3: Get Loggedin   User Deatails using:POST /api/auth/getuser Login require
//1. '/getuser' is ke bazook main ne ek middleware likha jiska naam fetchuser hai jo middleware folder main se ara
router.post('/getuser',fetchuser, async (req, res) => {
    try {
        userid = req.user.id
        const user = await User.findById(userid).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
    }
})
module.exports = router