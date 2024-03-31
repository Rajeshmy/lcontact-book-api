const express=require("express");
const {getContact,createContact,updateContact,deleteContact,getOneContact} = require("../controllers/contactController");
const validateToken = require("../middleware/validateToken");

const router= express.Router();

// router.route("/").get(getContact);

// router.route("/").post(createContact);

// router.route("/:id").put(updateContact);

// router.route("/:id").delete(deleteContact);

// router.route("/:id").get(getOneContact);

//can be written as below

router.use(validateToken);

router.route("/").get(getContact).post(createContact);

router.route("/:id").put(updateContact).delete(deleteContact).get(getOneContact);

module.exports =router;