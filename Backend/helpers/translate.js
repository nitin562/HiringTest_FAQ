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
    body: JSON.stringify({
      from,
      to,
      html: content,
    }),
  };
  console.log(options)
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result)
    return {success:true,result}
  } catch (error) {
    console.error(error);
    return {success:false,msg:"Translator API error occured"}
  }
};
module.exports=translateTo