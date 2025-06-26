import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  blogname: { type: String, required: true },
  imageurl: [String],
  description: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: {
    type: [
      {
        text: { type: String, required: true },
        posted: { type: Date, default: Date.now }
      }
    ],
    default: [],
  },
  posted: { type: Date, default: Date.now },
});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
