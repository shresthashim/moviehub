import mongoose, { Schema, Document } from "mongoose";

export interface FavoriteMovie {
  movieId: string;
  title: string;
  description: string;
  releaseDate: Date;
  rating: number;
  imageUrl: string;
}

export interface User extends Document {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  favoriteMovies: FavoriteMovie[];
  createdAt: Date;
  updatedAt: Date;
}
