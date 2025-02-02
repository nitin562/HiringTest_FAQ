const express = require("express");
const router = express.Router();
const languageEnum = [{term:"en",language:"English"}, {term:"hi",language:"Hindi"}, {term:"bn",language:"Bengali"}];
// router.get("/", (req, res) => {
//   return res.render("layout.ejs", { title: "Home Page" });
// });
router.get("/admin", async(req, res) => {
    let lang = req.query.lang;
  if (!lang) {
    lang = "en";
  }
  const url = process.env.base + process.env.getFaqs + `?lang=${lang}`;
  const response = await fetch(url);
  const result = await response.json();
  console.log(result,"name");
  if (result.success) {
    console.log(languageEnum)
    return res.render("layout.ejs", { title: "All Faqs", faqs:result.data,admin:true,render:"faqList",lang_enum:languageEnum });
  } else {
    return res.render("layout.ejs", { title: "SomeThing Went Wrong", msg:result.msg,render:"error" });
  }

});
router.get("/admin/newFaq",(req,res)=>{
})
router.get("/", async (req, res) => {
  let lang = req.query.lang;
  if (!lang) {
    lang = "en";
  }
  const url = process.env.base + process.env.getFaqs + `?lang=${lang}`;
  const response = await fetch(url);
  const result = await response.json();
  console.log(result,"name");
  if (result.success) {
    return res.render("layout.ejs", { title: "All Faqs", faqs:result.data,admin:false,render:"faqList",lang_enum:languageEnum });
  } else {
    return res.render("layout.ejs", { title: "SomeThing Went Wrong", msg:result.msg,render:"error" });
  }
});

module.exports = router;
