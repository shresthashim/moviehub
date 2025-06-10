import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  if (!SIGNING_SECRET) {
    throw new Error("Missing SIGNING_SECRET in environment – copy from the Clerk Dashboard");
  }

  const wh = new Webhook(SIGNING_SECRET);

  const hdr = await headers();
  const svixId = hdr.get("svix-id");
  const svixTimestamp = hdr.get("svix-timestamp");
  const svixSignature = hdr.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing Svix headers", { status: 400 });
  }

  const bodyText = await req.text();
  let evt: WebhookEvent;

  try {
    evt = wh.verify(bodyText, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("❌ Svix verification failed:", err);
    return new Response("Verification error", { status: 400 });
  }

  const { id } = evt.data;
  console.log(`✅ Received event "${evt.type}" for user ID: ${id}`);
  console.log("Payload:", bodyText);

  return new Response("Webhook received", { status: 200 });
}
