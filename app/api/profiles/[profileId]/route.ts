import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const getAuthUser = async () => {
  const supabase = await createClient();
  const {
    data: { user: authUser },
    error,
  } = await supabase.auth.getUser();

  if (error || !authUser) return null;
  return prisma.user.findUnique({ where: { supabaseUserId: authUser.id } });
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ profileId: string }> },
) {
  try {
    const { profileId } = await params;
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const fields: { name?: string; avatar?: string; isKids?: boolean } =
      await req.json();

    const existing = await prisma.profile.findFirst({
      where: { id: profileId, userId: user.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const profile = await prisma.profile.update({
      where: { id: profileId },
      data: fields,
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}

// delete profile
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ profileId: string }> },
) {
  try {
    const { profileId } = await params;
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.profile.findFirst({
      where: { id: profileId, userId: user.id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    await prisma.profile.delete({
      where: { id: profileId },
    });

    return NextResponse.json({ message: "Profile deleted" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    return NextResponse.json(
      { error: "Failed to delete profile" },
      { status: 500 },
    );
  }
}
