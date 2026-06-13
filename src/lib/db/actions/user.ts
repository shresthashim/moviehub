import UserModel from "@/lib/db/models/user";
import { connect } from "@/lib/db/mongoose";

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
