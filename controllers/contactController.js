const asyncHandler=require("express-async-handler");
const Contact = require("../models/contactModel");
const JWT = require("jsonwebtoken");

//@desc get all contacts
//route GET /api/contacts
//@access public

const getContact=asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json({message:"contact api info all",data:contacts});
});

//@desc create new  contacts
//route POST /api/contacts
//@access private

const createContact=asyncHandler(async(req,res)=>{
    const {name,email,phoneno}=req.body;

    if(!name||!email||!phoneno){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const contact=await Contact.create({
        user_id:req.user.id,name,email,phoneno
    })
    res.status(201).json({message:"new contact created",data:contact})
});

//@desc update contacts
//route PUT /api/contacts
//@access private

const updateContact=asyncHandler(async(req,res)=>{
    const {name,email,phoneno}=req.body;

    const contact = await Contact.findById({user_id:req.params.id});
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    const updatedcontact = await Contact.findByIdAndUpdate(req.params.id,{name,email,phoneno},{new:true});

    res.status(200).json({message:`update contact for ${req.params.id}`,data:updatedcontact});
});


//@desc delete contacts
//route DELETE /api/contacts
//@access private

const deleteContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);
    console.log("--1")
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    console.log("--2")
    const result = await Contact.findByIdAndDelete(req.params.id);
    console.log("--3", result)
    res.status(200).json({message:`deleted data for ${req.params.id}`})
    console.log("--4")

});
  
const getOneContact=asyncHandler(async(req,res)=>{
    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json({message:`get individual contct for ${req.params.id}`,data:contact})
});


module.exports = {getContact,createContact,updateContact,deleteContact,getOneContact}