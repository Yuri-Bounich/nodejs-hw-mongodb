import { model, Schema } from 'mongoose';
import { userCollections } from './user.js';

const sessionSchema = new Schema(
  {
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
    userId: {
      type: Schema.ObjectId,
      required: true,
      ref: userCollections,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const sessionCollections = model('session', sessionSchema);
