import User from "../../../../lib/models/user.model";
import { connect } from "../../../../lib/mongodb/mongoose";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

type Fav = {
  movieId: string;
  title?: string;
  description?: string;
  releaseDate?: Date;
  rating?: number;
  imageUrl?: string;
};

type UserType = {
  favoriteMovies: Fav[];
};

export const PUT = async (req: Request): Promise<Response> => {
  const user = await currentUser();
  const client = await clerkClient();

  try {
    await connect();
    const data = await req.json();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const existingUser = await User.findById(user.publicMetadata.userMongoId);

    if (!existingUser) {
      return new Response("User not found", { status: 404 });
    }

    if (!existingUser.favoriteMovies) {
      existingUser.favoriteMovies = [];
    }

  
    const isFav = existingUser.favoriteMovies.some((fav: Fav) => fav.movieId === data.movieId);

    let updatedUser: UserType | null = null;

    if (isFav) {
     
      updatedUser = await User.findByIdAndUpdate(
        user.publicMetadata.userMongoId,
        { $pull: { favoriteMovies: { movieId: data.movieId } } },
        { new: true }
      );
    } else {
   
      updatedUser = await User.findByIdAndUpdate(
        user.publicMetadata.userMongoId,
        {
          $addToSet: {
            favoriteMovies: {
              movieId: data.movieId,
              title: data.title,
              description: data.overview,
              releaseDate: data.releaseDate ? new Date(data.releaseDate) : undefined,
              rating: data.voteCount,
              imageUrl: data.image,
            },
          },
        },
        { new: true }
      );
    }

    if (!updatedUser) {
      return new Response("Failed to update user favorites", { status: 500 });
    }

  
    const updatedFavs: string[] = updatedUser.favoriteMovies?.map((fav: Fav) => fav.movieId) || [];

  
    const clerkUser = await client.users.getUser(user.id);
    const currentMetadata = clerkUser.publicMetadata || {};

    await client.users.updateUserMetadata(user.id, {
      publicMetadata: {
        ...currentMetadata,
        favs: updatedFavs,
      },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error adding favs to the user:", error);
    return new Response("Error adding favs to the user", { status: 500 });
  }
};
