import { model, models, Schema, Types } from "mongoose";

export interface ITag {}

const TagSchema = new Schema<ITag>({}, { timestamps: true });

const Tag = models?.Tag || model<ITag>("Tag", TagSchema);

export default Tag;
