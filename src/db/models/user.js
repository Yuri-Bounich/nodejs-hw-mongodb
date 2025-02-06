import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, //email,
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

// userSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj.password;
//   return obj;
// };

export const userCollections = model('user', userSchema);
