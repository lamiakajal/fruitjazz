import mongoose, { Schema, Model } from "mongoose";

export interface ISettings {
  key: string;
  data: Record<string, unknown>;
}

/** One document (key "main") holding the owner-editable store settings. */
const SettingsSchema = new Schema<ISettings>(
  {
    key: { type: String, required: true, unique: true },
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, minimize: false },
);

const SettingsModel: Model<ISettings> =
  mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);

export default SettingsModel;
