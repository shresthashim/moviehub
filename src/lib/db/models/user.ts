import { Schema, models, model, type Document } from "mongoose";

export interface FavoriteMovie {
  movieId: string;
  title: string;
  description: string;
  releaseDate: Date;
  rating: number;
  imageUrl: string;
}

export interface UserDocument extends Document {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  favoriteMovies: FavoriteMovie[];
  createdAt: Date;
  updatedAt: Date;
}

const FavoriteMovieSchema = new Schema<FavoriteMovie>(
  {
    movieId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    releaseDate: { type: Date },
    rating: { type: Number, default: 0 },
    imageUrl: { type: String, default: "" },
  },
  { _id: false }
);

const userSchema = new Schema<UserDocument>(
  {
    clerkId: { type: String, required: [true, "Clerk ID is required"], unique: true },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters long"],
      maxlength: [15, "First name must be at most 15 characters long"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters long"],
      maxlength: [15, "Last name must be at most 15 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please provide a valid email address"],
    },
    profilePicture: { type: String, required: true },
    favoriteMovies: { type: [FavoriteMovieSchema], default: [] },
  },
  { timestamps: true }
);

const UserModel = models.User || model<UserDocument>("User", userSchema);
export default UserModel;
