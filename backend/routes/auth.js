const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
require('dotenv').config();



const JWT_SECRET = process.env.JWT_SECRET;


// ROUTE 1 : Create a user using : POST "/api/auth/createuser". Doesn't required auth

router.post('/createuser',[
    body('name','Enter A valid Name').isLength({min : 3}),
    body('email','Enter a Valid Email').isEmail(),
    body('password','Enter atlest 5 character').isLength({min : 5}),


],async (req,res)=>{
    let success = false;

    // If there are errors, Return Bad Request and that errors

    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({success ,errors : errors.array()});
    }

    //Chack whether the user with this email already exists or not
    try{

        let user = await User.findOne({ email : req.body.email});

        if(user)
        { return res.status(400).json({success , error : "Sorry a User with this email already Exists"})}

        const salt = await bcrypt.genSalt(10);
        const secPass= await bcrypt.hash(req.body.password, salt);

        //create new user
        user = await User.create({
        name : req.body.name,
        password : secPass,
        email : req.body.email,
        });

        const data={
            user : { id : user.id}
        }
        const authtoken = jwt.sign(data,JWT_SECRET);

        success = true;
        res.json({success , authtoken})
    } 
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }

    //.then( user => res.json(user))
    //.catch(err => {console.log(err)
    //   res.json({erroe : 'Please Enter a Unique value' , message : err.message})
    //})
}) 


// ROUTE 2 : Authanticate a user using : POST "/api/auth/login". Doesn't required auth

router.post('/login',[
    
    body('email','Enter a Valid Email').isEmail(),
    body('password','Password cannot be blank').exists(),


],async (req,res)=>{

    let success = false;
    
    // If there are errors, Return Bad Request and that errors
 
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(400).json({success , errors : errors.array()});
    }

    // Chack Email and Password

    const{email , password} = req.body;
    try{
        let user = await User.findOne({ email});
        if(!user)
        {
            return res.status(400).json({success , error : "Please try to login with corrrect credentials"})
        }

        const passwordcompare = await bcrypt.compare(password, user.password);
        if(!passwordcompare)
        {
            return res.status(400).json({ success , error : "Please try to login with corrrect credentials"})    
        }

        const data={
            user : { id : user.id}
        }
        
        const authtoken = jwt.sign(data,JWT_SECRET);
        
        success = true;
        res.json({success , authtoken})
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
})

// ROUTE 3 : Get loggedin User details using : POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser ,async (req,res)=>
{
try {
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password")
    res.send(user);
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
}

})

module.exports = router