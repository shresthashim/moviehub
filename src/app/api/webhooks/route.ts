import { Webhook } from "svix";
import { headers } from "next/headers";
import { createOrUpdateUser, deleteUser } from "@/lib/actions/user";
import { clerkClient } from "@clerk/nextjs/server";
import type { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request): Promise<Response> {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error("Missing SIGNING_SECRET. Please set it in your .env file from the Clerk Dashboard.");
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing Svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Verification failed", { status: 400 });
  }

  const eventType = evt.type;
  const { id } = evt.data;

  if (eventType === "user.created" || eventType === "user.updated") {
    const { first_name, last_name, image_url, email_addresses } = evt.data;

    try {
      const user = await createOrUpdateUser(id ?? "", first_name ?? "", last_name ?? "", image_url ?? "", email_addresses ?? []);

      if (user && eventType === "user.created") {
        try {
          const client = await clerkClient();
          await client.users.updateUserMetadata(id ?? "", {
            publicMetadata: {
              userMongoId: user._id,
            },
          });
        } catch (error) {
          console.error("Failed to update Clerk user metadata:", error);
        }
      }
    } catch (error) {
      console.error("Failed to create or update user:", error);
      return new Response("Failed to create or update user", { status: 400 });
    }
  }

  if (eventType === "user.deleted") {
    try {
      await deleteUser(id ?? "");
    } catch (error) {
      console.error("Failed to delete user:", error);
      return new Response("Failed to delete user", { status: 400 });
    }
  }

  return new Response("Webhook received", { status: 200 });
}
