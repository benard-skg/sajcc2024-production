// app/api/protected/route.js
import { getServerAuthSession } from "../../../lib/auth";

export async function GET(request) {
  const session = await getServerAuthSession();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Your protected API logic here
  return new Response("Protected data", { status: 200 });
}