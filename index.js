const express=require("express")
require("dotenv").config()
const app=express()
const port=process.env.PORT||8000
const connectDb = require("./ConnectToDb")
app.use(express.json())
app.use(require("cors")())
app.use("/",require("./api/ssr.js"))
app.use("/api",require("./api/faq.js"))

app.listen(port,()=>{
    console.log("Server is started at ",port)
    connectDb()
})