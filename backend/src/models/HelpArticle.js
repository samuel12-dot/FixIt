import mongoose from 'mongoose';

const helpArticleSchema = new mongoose.Schema({
  cat: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  popular: { type: Boolean, default: false },
});

export default mongoose.model('HelpArticle', helpArticleSchema);
