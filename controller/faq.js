const { validationResult } = require("express-validator");
const asyncHandler = require("../helpers/asyncHandler");
const FAQ = require("../model/faq");
const translateTo = require("../helpers/translate");
const languageEnum = [ 'hi', 'bn']
const TranslateTo = asyncHandler(async (req, res) => { //translate particular faq for admin
  const { lang, id } = req.params;
  if (!lang || !id) {
    return res
      .status(400)
      .json({ success: false,type:"Language", msg: "Language Code or FAQ id are absent" });
  }
  const faq = await FAQ.findById(id);
  if (faq) {
    const content = faq.getTranslatedContent(lang);
    return res.status(201).json({ success: true, data: { content, lang } });
  }
  return res.status(400).json({ success: false,type:"FAQ_absent", msg: "FAQ is absent" });
});
const getFAQs = asyncHandler(async (req, res) => { //for end to end user to get all faqs in lang
  console.log('hey')
  let { lang } = req.query;
  if (!lang) {
    lang = "en";
  }
  const faq = await FAQ.find({});
  if (faq) {
    const content = faq.map((faq) => {
      if (faq.translations.has(lang)) {
        return {
          id: faq._id,
          question: faq.translations.get(lang).question,
          answer: faq.translations.get(lang).answer,
        };
      } else {
        return {
          id: faq._id,
          question: faq.question,
          answer: faq.answer,
        };
      }
    });
    return res.status(201).json({ success: true, data: { content, lang } });
  }
  return res.status(400).json({ success: false,type:"FAQ_Absent", msg: "FAQ is absent" });
});

const addFaqs=asyncHandler((req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ success: false,type:"Client_Error" ,errors:errors.mapped() });
    }
    //getTranslations
    //default is english
    //get for hindi and bengali means rest
    const {question,answer}=req.body;
    let content=question+"<!-- QUESTION_ANSWER_DELIM -->"+answer
    
    let from="en"
    const generateTranslation=new Promise((resolve,reject)=>{
        const map=new Map()
        for(const lang in languageEnum){
            translateTo(from,lang,content).then(val=>{
                const {success}=val;
                if(success){
                    const trans=val.result.trans;
                    const splitTransArr=trans.split("<!-- QUESTION_ANSWER_DELIM -->")
                    map.set(lang,{question:splitTransArr[0],answer:splitTransArr[1]});
    
                }
            })
        }
        resolve(map)
    })
    generateTranslation().then((map)=>{
        let faq={
            question,answer,translations:map
        }
        FAQ.create(faq).then((obj)=>{
            console.log(obj,"Created")
            return res.status(200).json({success:true})
        },(err)=>{
            console.log(err)
            return res.status(500).json({success:false,msg:"Server Error"})

        })
    })
})
const editFaqs=asyncHandler((req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ success: false,type:"Client_Error" ,errors:errors.mapped() });
    }
    //getTranslations
    //default is english
    //get for hindi and bengali means rest
    const {question,answer,id}=req.body;
    let content=question+"<!-- QUESTION_ANSWER_DELIM -->"+answer
    
    let from="en"
    const generateTranslation=new Promise((resolve,reject)=>{
        const map=new Map()
        for(const lang in languageEnum){
            translateTo(from,lang,content).then(val=>{
                const {success}=val;
                if(success){
                    const trans=val.result.trans;
                    const splitTransArr=trans.split("<!-- QUESTION_ANSWER_DELIM -->")
                    map.set(lang,{question:splitTransArr[0],answer:splitTransArr[1]});
    
                }
            })
        }
        resolve(map)
    })
    generateTranslation().then((map)=>{
        let faq={
            question,answer,translations:map
        }
        FAQ.findByIdAndUpdate(id,faq,{new:true}).then((obj)=>{
            console.log(obj,"Created")
            return res.status(200).json({success:true})
        },(err)=>{
            console.log(err)
            return res.status(500).json({success:false,msg:"Server Error"})

        })
    })
})

module.exports={TranslateTo,addFaqs,editFaqs,getFAQs}