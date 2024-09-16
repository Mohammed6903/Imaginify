import { model, models, Schema, Document } from "mongoose";

interface IUser extends Document {
    clerkId: string;             // Unique identifier from Clerk
    email: string;              // User's email address
    username: string;           // User's username
    photo?: string;             // Optional URL to the user's photo
    firstname: string;          // User's first name
    lastname: string;           // User's last name
    planId: string;             // ID of the user's subscription plan
    creditBalance: number;     // User's credit balance
    createdAt?: Date;          // Optional creation date
    updatedAt?: Date;          // Optional last update date
}

const UserSchema = new Schema({
    clerkId: { type: String, required: true, unique: true }, // Clerk ID must be unique
    email: { type: String, required: true, unique: true },   // Email must be unique
    username: { type: String, required: true, unique: true }, // Username must be unique
    photo: { type: String }, // Optional field for user's photo URL
    firstname: { type: String, required: true, default: "Default FN" },
    lastname: { type: String, required: true, default: "Default LN" },
    planId: { type: String, required: true, default: "Free" }, // ID of the user's subscription plan
    creditBalance: { type: Number, required: true, default: 500 }, // User's credit balance
    createdAt: { type: Date, default: Date.now }, // Default to the current date
    updatedAt: { type: Date, default: Date.now } // Default to the current date
});

// Ensure that `updatedAt` is updated on save
UserSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const User = models?.User || model<IUser>('User', UserSchema);

export default User;
