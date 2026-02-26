import { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "student" | "institution";
    isEmailVerified: boolean;
    emailVerificationToken?: string;
    emailVerificationExpires?: Date;
    createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role: {
        type: String,
        enum: ["student", "institution"],
        required: [true, "Role is required"],
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Prevent model re-compilation during hot reload
const User = models.User || model<IUser>("User", UserSchema);

export default User;
