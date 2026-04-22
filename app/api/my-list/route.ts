import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

//
export const getAuthUser = async () => {
  const supabase = await createClient();
  const {
    data: { user: authUser },
    error,
  } = await supabase.auth.getUser();

  if (error || !authUser) return null;
  return prisma.user.findUnique({ where: { supabaseUserId: authUser.id } });
};

const verifyProfileOwnership = (profileId: string, userId: string) =>
  prisma.profile.findFirst({
    where: {
      id: profileId,
      userId,
    },
  });

export const GET = async (req: NextRequest) => {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profileId = new URL(req.url).searchParams.get("profileId");

    if (!profileId) {
      return NextResponse.json(
        { error: "Profile ID is required" },
        { status: 400 },
      );
    }

    const profile = await verifyProfileOwnership(profileId, user.id);
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const myList = await prisma.myList.findMany({
      where: { profileId },
      include: {
        movie: true,
      },
    });

    const movies = myList.map((item) => item.movie).filter(Boolean);

    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching my list:", error);
    return NextResponse.json(
      { error: "Failed to fetch my list" },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { movieId, profileId }: { movieId: string; profileId: string } =
      await req.json();

    if (!movieId || !profileId) {
      return NextResponse.json(
        { error: "movieId and profileId required" },
        { status: 400 },
      );
    }

    const profile = await verifyProfileOwnership(profileId, user.id);
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const item = await prisma.myList.create({
      data: { profileId, movieId },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error adding to my list:", error);
    return NextResponse.json(
      { error: "Failed to add to my list" },
      { status: 500 },
    );
  }
};

// delete from my list
export const DELETE = async (req: NextRequest) => {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { movieId, profileId }: { movieId: string; profileId: string } =
      await req.json();

    if (!movieId || !profileId) {
      return NextResponse.json(
        { error: "movieId and profileId required" },
        { status: 400 },
      );
    }

    const profile = await verifyProfileOwnership(profileId, user.id);
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    await prisma.myList.deleteMany({
      where: { profileId, movieId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from my list:", error);
    return NextResponse.json(
      { error: "Failed to remove from my list" },
      { status: 500 },
    );
  }
};
