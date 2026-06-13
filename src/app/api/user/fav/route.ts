import UserModel from "@/lib/db/models/user";
import { getOrCreateUserFromClerk } from "@/lib/db/actions/user";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

type Fav = { movieId: string };

export const PUT = async (req: Request): Promise<Response> => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return new Response("Unauthorized", { status: 401 });
    }

    const data = await req.json();
    if (!data?.movieId) {
      return new Response("movieId is required", { status: 400 });
    }

    // Resolve (or create) the Mongo user by clerkId — no dependency on the webhook.
    const dbUser = await getOrCreateUserFromClerk(clerkUser);
    const mongoId = String(dbUser._id);

    const isFav = dbUser.favoriteMovies?.some((fav: Fav) => fav.movieId === data.movieId);

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

    const updatedUser = await UserModel.findByIdAndUpdate(mongoId, update, { new: true });
    if (!updatedUser) {
      return new Response("Failed to update user favorites", { status: 500 });
    }

    const updatedFavs: string[] = updatedUser.favoriteMovies?.map((fav: Fav) => fav.movieId) ?? [];

    // Keep Clerk metadata in sync (and backfill userMongoId) so server pages and
    // the client button can read favorites state without another DB round-trip.
    const client = await clerkClient();
    await client.users.updateUserMetadata(clerkUser.id, {
      publicMetadata: {
        ...clerkUser.publicMetadata,
        userMongoId: mongoId,
        favs: updatedFavs,
      },
    });

    return Response.json({ favs: updatedFavs, isFavorite: !isFav }, { status: 200 });
  } catch (error) {
    console.error("Error updating user favorites:", error);
    return new Response("Error updating user favorites", { status: 500 });
  }
};
