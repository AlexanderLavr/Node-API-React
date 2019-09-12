import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RoleAndUsersSchema = Schema(
    {
      _id: Schema.Types.ObjectId,
      users: Array,
      admins: Array
    },
    {
      collection: 'Users and Roles'
    }

  
);

export default mongoose.model('Users and Roles', RoleAndUsersSchema);

