
const express=require("express");
const {register,login,current} = require('../controllers/userController')
const router = express.Router();
const validateToken = require("../middleware/validateToken")


router.post("/register",register);

router.route("/login").post(login);

router.route("/current").get(validateToken,current);

module.exports=router;