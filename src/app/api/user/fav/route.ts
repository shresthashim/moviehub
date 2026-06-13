import User from "@/lib/db/models/user";
import { connect } from "@/lib/db/mongoose";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

type Fav = {
  movieId: string;
  title?: string;
  description?: string;
  releaseDate?: Date;
  rating?: number;
  imageUrl?: string;
};

export const PUT = async (req: Request): Promise<Response> => {
  try {
    const user = await currentUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    await connect();
    const data = await req.json();
    const mongoId = user.publicMetadata.userMongoId;

    const existingUser = await User.findById(mongoId);
    if (!existingUser) {
      return new Response("User not found", { status: 404 });
    }

    const isFav = existingUser.favoriteMovies?.some((fav: Fav) => fav.movieId === data.movieId);

    const update = isFav
      ? { $pull: { favoriteMovies: { movieId: data.movieId } } }
      : {
          $addToSet: {
            favoriteMovies: {
              movieId: data.movieId,
              title: data.title,
              description: data.overview,
              releaseDate: data.releaseDate ? new Date(data.releaseDate) : undefined,
              rating: data.rating ?? 0,
              imageUrl: data.image,
            },
          },
        };

    const updatedUser = await User.findByIdAndUpdate(mongoId, update, { new: true });
    if (!updatedUser) {
      return new Response("Failed to update user favorites", { status: 500 });
    }

    const updatedFavs: string[] = updatedUser.favoriteMovies?.map((fav: Fav) => fav.movieId) ?? [];

    // Reuse the metadata we already have from currentUser() instead of an extra getUser() call.
    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      publicMetadata: { ...user.publicMetadata, favs: updatedFavs },
    });

    return Response.json({ favs: updatedFavs }, { status: 200 });
  } catch (error) {
    console.error("Error updating user favorites:", error);
    return new Response("Error updating user favorites", { status: 500 });
  }
};
