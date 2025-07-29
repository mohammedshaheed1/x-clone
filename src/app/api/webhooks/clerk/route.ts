
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/prisma";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error("Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local");
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", { status: 400 });
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
    console.error("Error verifying webhook:", err);
    return new Response("Error: Verification error", { status: 400 });
  }

  const eventType = evt.type;

  console.log(`🔔 Webhook Event: ${eventType}`);
  console.log("📦 Payload:", JSON.stringify(evt.data, null, 2));

  if (eventType === "user.created") {
    try {
      const user = evt.data;

      const email =
        user.email_addresses?.[0]?.email_address ||
        user.primary_email_address_id ||
        `no-email-${user.id}@example.com`;

      const username = user.username || `user_${user.id.slice(-6)}`;
      const image = user.image_url || user.profile_image_url || "";

      await prisma.user.create({
        data: {
          id: user.id,
          email,
          username,
          img: image,
          displayName: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
        },
      });

      return new Response("✅ User created", { status: 200 });
    } catch (err) {
      console.error("❌ Error creating user:", err);
      return new Response("Error: Failed to create a user", { status: 500 });
    }
  }

 if (eventType === "user.deleted") {
  try {
    await prisma.user.deleteMany({ where: { id: evt.data.id } });
    return new Response("✅ User deleted", { status: 200 });
  } catch (err) {
    console.error("❌ Error deleting user:", err);
    return new Response("Error: Failed to delete user", { status: 500 });
  }
}

  return new Response("ℹ️ Webhook received", { status: 200 });
}
