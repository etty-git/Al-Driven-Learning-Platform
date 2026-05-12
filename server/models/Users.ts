import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
 phone:{
    type: String,
    required: true

 },
 isAdmin: {
   type: Boolean,
   default: false
}
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;