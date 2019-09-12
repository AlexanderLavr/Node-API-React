import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = Schema(
    
  {
    _id: Schema.Types.ObjectId,
    firstName: {
      type: String,
      trim: true
    },
    secondName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      trim: true
    },
    imageProfile:{
      type: String
    }
  },
  {
    collection: 'users'
  }
);

export default mongoose.model('users', UserSchema);
