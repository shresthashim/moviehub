import type { User as ClerkUser } from "@clerk/nextjs/server";
import UserModel, { type UserDocument } from "@/lib/db/models/user";
import { connect } from "@/lib/db/mongoose";

/**
 * Resolve the MongoDB user for a signed-in Clerk user, creating it on demand.
 *
 * Favorites must not depend on the Clerk webhook having run (it never fires on
 * localhost and may have missed accounts created before it was wired up), so we
 * key off `clerkId` — always available — and upsert the record if it's missing.
 */
export const getOrCreateUserFromClerk = async (clerkUser: ClerkUser): Promise<UserDocument> => {
  await connect();

  const existing = await UserModel.findOne({ clerkId: clerkUser.id });
  if (existing) return existing;

  return UserModel.create({
    clerkId: clerkUser.id,
    firstName: clerkUser.firstName || "Movie",
    lastName: clerkUser.lastName || "Fan",
    email: clerkUser.emailAddresses[0]?.emailAddress,
    profilePicture: clerkUser.imageUrl,
  });
};

export const createOrUpdateUser = async (
  id: string,
  first_name: string,
  last_name: string,
  image_url: string,
  email_addresses: { email_address: string }[]
) => {
  try {
    await connect();
    const user = await UserModel.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses[0]?.email_address,
        },
      },
      { upsert: true, new: true }
    );
    return user;
  } catch (error) {
    console.error("Error: Could not create or update user:", error);
  }
};

export const deleteUser = async (id: string) => {
  try {
    await connect();
    await UserModel.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.error("Error: Could not delete user:", error);
  }
};
