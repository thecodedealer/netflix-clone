import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user?.email) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    const dbUser = await prisma.user.upsert({
      where: { supabaseUserId: user.id },
      update: {
        email: user.email,
      },
      create: {
        supabaseUserId: user.id,
        email: user.email,
        profiles: {
          create: {
            name: "Profile 1",
            avatar: "/images/netflix--avatar.png",
          },
        },
      },
    });

    return NextResponse.json(dbUser);
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "An error occurred while registering the user" },
      { status: 500 },
    );
  }
}
