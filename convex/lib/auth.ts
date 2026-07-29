// convex/lib/auth.ts
import { getAuthUserId } from "@convex-dev/auth/server";
import { MutationCtx } from "../_generated/server";

export async function requireAuth(ctx: MutationCtx) {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new Error("Unauthorized");
  return userId;
}