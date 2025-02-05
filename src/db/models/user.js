import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, //email, unique,
    password: { type: String, required: true },
    // createdAt - дата створення
    // updatedAt - дата оновленняcreatedAt: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false },
);

export const userCollections = model('user', userSchema);
