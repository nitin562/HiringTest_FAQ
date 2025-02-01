const express=require("express")
const router=express.Router()
const languageEnum = ['en', 'hi', 'bn']
router.get("/",(req,res)=>{
    return res.render("layout.ejs",{title:"Home Page"})
})
router.get("/admin",(req,res)=>{
    return res.render("adminLayout.ejs")
})



module.exports=router