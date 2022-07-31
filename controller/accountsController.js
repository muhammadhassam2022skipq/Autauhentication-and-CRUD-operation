const express = require ("express");
const mongoose = require ("mongoose");
const signUPModel = require("../model/signUPModel");
const bcrypt = require("bcrypt");
// sign up

exports.getSignUP = ((req,res)=> {
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    res.render("signup", {
        pageTitle: "Sign Up",
        isAuthenticated: isAuthenticated
    })
})

exports.postSignUP = ((req,res)=> {
    bcrypt.hash(req.body.password, 10).then ((hash)=>{
        const signUP = new signUPModel ({
            _id: mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
             password: hash
    
        })
        signUP.save().then((signedUPUer)=>{
            console.log ("successfuly saved"+signedUPUer)
            res.redirect("/signin")

        });
    }).catch((err)=> {
        console.log ("The hash error is: "+ err);
    });
    
})




//sign in
exports.getSignIn= ((req,res)=> {
    const isAuthenticated = req.session.isLoggedIn ? req.session.isLoggedIn : false;
    res.render("signin", {
        pageTitle: "Sign In",
        isAuthenticated: isAuthenticated
    })
})


exports.postSignIn = ((req,res)=> {
    signUPModel.findOne ({email: req.body.email}, (err, foundUser)=>{

if (err) {
   console.log("The err "+err)
} else if (foundUser) {
    req.session.isLoggedIn = true,
bcrypt.compare(req.body.password, foundUser.password, ((err, result)=> {
    if (result ===true) {
        res.redirect("/");
    }
    else {
        res.redirect("/signin");
    }

}))
} else {
    res.redirect("/signin");
}
  
    })
})