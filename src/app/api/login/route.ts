import { signJwtAccessToken } from "@/lib/jwt";
// import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcrypt";

interface RequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  // Temporarily return unauthorized for all login attempts
  // since database access is disabled
  return new Response(JSON.stringify({ message: "Login temporarily disabled" }), { status: 503 });

  /* Original database code (commented out)
  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (user?.hashedPassword && await bcrypt.compare(body.password, user.hashedPassword)) {
    const { hashedPassword, ...userWithoutPass } = user;
    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };
    return new Response(JSON.stringify(result), { status: 200 });
  }

  return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  */
}
