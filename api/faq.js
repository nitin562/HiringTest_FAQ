const express=require("express")

const { TranslateTo, getFAQs, addFaqs, editFaqs } = require("../controller/faq")
const { check } = require("express-validator")
const router=express.Router()
router.get("/faq/:id/:lang",TranslateTo) //get particular faq for specific language

router.get("/faqs",getFAQs) //get all faqs, if ?lang is given then it will show all faqs with specific language

router.post("/faq",[check("question","Question must be provided").isLength({min:1}),check("answer","Answer must be provided").isLength({min:1})],addFaqs) //add a faq

router.patch("/faq",[check("id","Faq is not present").exists(),check("question","Question must be provided").isLength({min:1}),check("answer","Answer must be provided").isLength({min:1})],editFaqs) //add a faq


module.exports=router