import mongoose, { Schema } from "mongoose";

const RolesSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: [true, "Client id is required"],
    },
    role: {
      type: String,
      enum: ["super-admin", "admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Roles", RolesSchema);
