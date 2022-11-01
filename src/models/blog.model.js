const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const BlogSchema = new Schema({
  id: ObjectId,
  title: { type: String, unique: true, required: true },
  description: { type: String },
  author: { type: String, required: true },
  body: { type: String, required: true },
  state: { type: String, enum: ['draft', 'published'], default: 'draft' },
  readCount: { type: Number, default: 0 },
  readTime: { type: Number, default: 0 },
  tags: { type: Array },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
