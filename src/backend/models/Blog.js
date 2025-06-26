import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  time: { type: Date, default: Date.now }
});

const BlogSchema = new mongoose.Schema({
  blogname: { type: String, required: true },
  imageurl: { type: [String], default: ['xyz.jpg'] },
  description: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: [commentSchema], default: [] },
  posted: { type: Date, default: Date.now },
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
