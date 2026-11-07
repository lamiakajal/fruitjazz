import mongoose, { Schema, Model } from "mongoose";

export interface IContactMessage {
  name: string;
  phone?: string;
  email?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, trim: true, maxlength: 30 },
    email: { type: String, trim: true, maxlength: 120 },
    subject: { type: String, required: true, maxlength: 80 },
    message: { type: String, required: true, maxlength: 2000 },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const ContactMessageModel: Model<IContactMessage> =
  mongoose.models.ContactMessage ||
  mongoose.model<IContactMessage>("ContactMessage", ContactMessageSchema);

export default ContactMessageModel;
