import mongoose from 'mongoose';

const supportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  userid: { type: String, default: 'SH10001' }, // default user id
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.Support || mongoose.model('Support', supportSchema);
