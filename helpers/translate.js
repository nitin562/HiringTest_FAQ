const translateTo = async (from,to,content) => {
    if(from===to){
        return {success:false,error:"Already Translated"}
    }
  const url =process.env.translateUrl
  const options = {
    method: "POST",
    headers: {
      "x-rapidapi-key": process.env.key,
      "x-rapidapi-host": process.env.host,
      "Content-Type": "application/json",
    },
    body: {
      from,
      to,
      html: content,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    return {success:true,result}
  } catch (error) {
    console.error(error);
    return {success:false,msg:"Translator API error occured"}
  }
};
module.exports=translateTo