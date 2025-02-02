const express=require("express")
const cors=require("cors")
require("dotenv").config()
const app=express()
const port=process.env.PORT||8000
app.use(express.json())
app.use(cors({
    origin:process.env.frontend
}))
const connectDb = require("./ConnectToDb")

app.use("/api",require("./api/faq.js"))

app.listen(port,()=>{
    console.log("Server is started at ",port)
    connectDb()
})