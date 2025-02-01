const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  // Original content in default language (English)
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },

  // Translations of the question and answer in various languages mainly in hi, bn
  translations: {
    type: Map,
    of: {
      question: String,  // Translated question
      answer: String,    // Translated answer
    },
    default: {},  // Initialize with an empty map
  },

},{timestamps:true});

faqSchema.methods.getTranslatedContent = function (langCode) {
  // Return translated content if exists, otherwise fallback to default (English)
  const translation = this.translations.get(langCode);
  if (translation) {
    return translation;
  } else {
    return { //english content for fallback
      question: this.question,
      answer: this.answer,
    };
  }
};

const FAQ = mongoose.model('FAQ', faqSchema);

module.exports = FAQ;
