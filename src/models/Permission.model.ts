import mongoose, { Schema, Document } from "mongoose";

type ModulePermissions = Record<string, boolean>;
type PermissionsMap = Record<string, ModulePermissions>;

export interface IPermission extends Document {
  clientId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  permissions: PermissionsMap;
  createdAt: Date;
  updatedAt: Date;
}

const PermissionSchema = new Schema<IPermission>(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: [true, "Client id is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    permissions: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

PermissionSchema.index({ clientId: 1, userId: 1 }, { unique: true });

export default mongoose.model<IPermission>("Permission", PermissionSchema);
