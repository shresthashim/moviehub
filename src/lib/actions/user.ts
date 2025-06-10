import UserModel from "../models/user.model";
import { connect } from "../mongodb/mongoose";
import { User } from "@/schemas/user";

export const createOrUpdateUser = async (
  id: string,
  first_name: User["firstName"],
  last_name: User["lastName"],
  email_addresses: { email_address: string }[],
  image_url: User["profilePicture"]
) => {
  await connect();

  try {
    const user = await UserModel.findOneAndUpdate(
      {
        clerkId: id,
      },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          email: email_addresses[0]?.email_address,
          profilePicture: image_url,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
    return user;
  } catch (error) {
    console.error("Error creating or updating user:", error);
    throw new Error("Failed to create or update user");
  }
};

export const deleteUser = async (id: string) => {
  await connect();

  try {
    const user = await UserModel.findOneAndDelete({
      clerkId: id,
    });
    return user;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};
