import { model, Schema, Types } from 'mongoose';
import { CONTACTTYPE } from '../../constans/type.js';

const contactsSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: Object.values(CONTACTTYPE),
      required: true,
      default: 'personal',
    },
    userId: { type: Types.ObjectId, ref: 'user', required: false },
    photoUrl: { type: String, default: null, required: false },
  },
  { timestamps: true, versionKey: false },
);

export const contactsCollections = model('contacts', contactsSchema);
