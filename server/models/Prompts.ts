import mongoose from 'mongoose';

const PromptSchema = new mongoose.Schema({
 response: {
    type: String,
    required: true
 },
 sub_category_id:
 {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sub_Category',
      required: true
 },
 category_id:
{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true

 },
 user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
 }
}, { timestamps: true });

const Prompts = mongoose.model('Prompts', PromptSchema);
export default Prompts;
