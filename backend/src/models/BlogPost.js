import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    cat: { type: String, required: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String, required: true },
    read: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('BlogPost', blogSchema);
