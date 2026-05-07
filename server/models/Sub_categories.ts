import mongoose from 'mongoose';

const SubCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, { timestamps: true });

const Sub_Category = mongoose.model('Sub_Category', SubCategorySchema);
export default Sub_Category;