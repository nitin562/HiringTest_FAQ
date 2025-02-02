const db=require("mongoose")
const connectDb=()=>{
    db.connect(process.env.db).then((val)=>{
        console.log("Connected to DB")
    },(err)=>{
        console.error(err)
    })

}
module.exports=connectDb