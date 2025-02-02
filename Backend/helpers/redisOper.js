const redis = require("./redisClient");
const getCache=async(lang)=>{
    const cache=await redis.get(`faqs_${lang}`)
    if(cache){
        if(JSON.parse(cache).length!=0){
            return cache
        }
    }
    return null
}
const updateCache=async(newFaq,id=null)=>{
    //newFaq is mongodb object
     // Update each language cache
     for (const lang of ["en", "hi", "bn"]) {
        let cachedFaqs = await redis.get(`faqs_${lang}`);
        if (cachedFaqs) {
          cachedFaqs = JSON.parse(cachedFaqs);
        } else {
          cachedFaqs = [];
        }
        if(!id){
            if(newFaq.translations.has(lang)){
                const {question,answer}=newFaq.translations.get(lang)
                cachedFaqs.push({id:newFaq._id,question,answer});
            }
            else{
                cachedFaqs.push({id:newFaq._id,question:newFaq.question,answer:newFaq.answer});
            }

        }
        else{
            //we have already a cache
            if(newFaq.translations.has(lang)){
                const {question,answer}=newFaq.translations.get(lang)
                cachedFaqs=cachedFaqs.map(faq=>{
                    return faq.id==id?{id,question,answer}:faq
                })
            }
            
        }
        console.log("done",cachedFaqs)
        await redis.set(`faqs_${lang}`, JSON.stringify(cachedFaqs)); // Update Redis cache
      }
}
module.exports={updateCache,getCache}