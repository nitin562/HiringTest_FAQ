const { validationResult } = require("express-validator");
const asyncHandler = require("../helpers/asyncHandler");
const FAQ = require("../model/faq");
const translateTo = require("../helpers/translate");
const { getCache, updateCache } = require("../helpers/redisOper");
const redis = require("../helpers/redisClient");
const languageEnum = ["hi", "bn"];
const TranslateTo = asyncHandler(async (req, res) => {
  //translate particular faq for admin
  const { lang, id } = req.params;
  if (!lang || !id) {
    return res.status(400).json({
      success: false,
      type: "Language",
      msg: "Language Code or FAQ id are absent",
    });
  }
  const faq = await FAQ.findById(id);
  if (faq) {
    const content = faq.getTranslatedContent(lang);
    return res.status(201).json({ success: true, data: { content, lang } });
  }
  return res
    .status(400)
    .json({ success: false, type: "FAQ_absent", msg: "FAQ is absent" });
});
const getFAQs = asyncHandler(async (req, res) => {
  //for end to end user to get all faqs in lang
  console.log("hey");
  let { lang } = req.query;
  console.log(lang);
  if (!lang) {
    lang = "en";
  }
  const cache = await getCache(lang);
  if (cache ) {
    console.log(cache, "cache");
    return res
      .status(201)
      .json({ success: true, data: { content: JSON.parse(cache), lang } });
  }
  const faq = await FAQ.find({});
  console.log(faq)
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
    // console.log("Content",content)
    await redis.set(`faqs_${lang}`, JSON.stringify(content), "EX", 3600); // Expires in 1 hour

    return res.status(201).json({ success: true, data: { content, lang } });
  }
  return res
    .status(400)
    .json({ success: false, type: "FAQ_Absent", msg: "FAQ is absent" });
});

const addFaqs = asyncHandler((req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, type: "Client_Error", errors: errors.mapped() });
  }
  //getTranslations
  //default is english
  //get for hindi and bengali means rest
  const { question, answer } = req.body;
  let content = question + "<!-- QUESTION_ANSWER_DELIM -->" + answer;

  let from = "en";

  const map = new Map();

  let allpromise = languageEnum.map((lang) => {
    return new Promise((resolve, reject) => {
      translateTo(from, lang, content)
        .then((val) => {
          if (val.success) {
            const trans = val.result.trans;
            console.log(val);
            const splitTransArr = trans.split("<!-- QUESTION_ANSWER_DELIM -->");
            map.set(lang, {
              question: splitTransArr[0],
              answer: splitTransArr[1],
            });
            resolve(); // ✅ Resolve only after setting the value
          } else {
            reject(new Error(`Translation failed for language: ${lang}`)); // ✅ Reject if translation fails
          }
        })
        .catch((err) => {
          reject(err); // ✅ Ensure errors are caught
        });
    });
  });

  Promise.all(allpromise).then((val) => {
    let faq = {
      question,
      answer,
      translations: map,
    };
    FAQ.create(faq).then(
      async (obj) => {
        console.log(obj, "Created");
        await updateCache(obj);
        return res.status(200).json({ success: true });
      },
      (err) => {
        console.log(err);
        return res.status(500).json({ success: false, msg: "Server Error" });
      }
    );
  });
});
const editFaqs = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, type: "Client_Error", errors: errors.mapped() });
  }

  const { question, answer, id } = req.body;
  let content = question + "<!-- QUESTION_ANSWER_DELIM -->" + answer;

  let from = "en";

  const map = new Map();

  try {
    // Sequentially process language translations to avoid overloading the API
    for (let lang of languageEnum) {
      const val = await translateTo(from, lang, content);

      if (val.success) {
        const trans = val.result.trans;
        console.log(val);

        const splitTransArr = trans.split("<!-- QUESTION_ANSWER_DELIM -->");
        map.set(lang, {
          question: splitTransArr[0],
          answer: splitTransArr[1],
        });
      }
    }

    // After translations are completed, update the FAQ
    let faq = {
      question,
      answer,
      translations: map,
    };

    const obj = await FAQ.findByIdAndUpdate(id, faq, { new: true });

    console.log(obj, "updated");
    await updateCache(obj, id); // Cache update

    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, msg: "Server Error" });
  }
});

module.exports = { TranslateTo, addFaqs, editFaqs, getFAQs };
