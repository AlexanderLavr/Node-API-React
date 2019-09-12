import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BookSchema = Schema(
  {
    _id: Schema.Types.ObjectId,
    title: {
      type: String,
      trim: true
    },
    price: {
      type: String,
      trim: true
    },
    amount: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    choosePhoto:{
      type: String
    }
  },
  {
    collection: 'books'
  }
);

export default mongoose.model('books', BookSchema);
