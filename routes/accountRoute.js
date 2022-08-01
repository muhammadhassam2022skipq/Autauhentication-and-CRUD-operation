const express = require ("express");
const accountsController = require("../controller/accountsController");
const { check } = require('express-validator');
const router = express.Router();


router.get ("/signup", accountsController.getSignUP);
router.post ("/signup",
// check(req.body.firstName)
// .isAlphanumeric()
// .withMessage('Name cannot have a number'),
// check(req.body.lastName)
// .isAlphanumeric()
// .withMessage('Name cannot have a number'),
check('email')
.isEmail()
.withMessage('Not an email'),
check('password')
.isLength({ min: 5 })
.withMessage('must be at least 5 chars long')
.matches(/\d/)
.withMessage('must contain a number'),
accountsController.postSignUP);
router.get ("/signin", accountsController.getSignIn);
router.post ("/signin", accountsController.postSignIn);

module.exports= router;