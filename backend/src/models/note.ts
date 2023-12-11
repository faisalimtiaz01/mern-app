import { InferSchemaType, Schema, model } from "mongoose";

const noteScehma = new Schema(
  {
    userId: {type:Schema.Types.ObjectId,required:true},
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


type Note = InferSchemaType<typeof noteScehma>;

export default model<Note>("Note",noteScehma);