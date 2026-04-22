import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { UpdateMovie } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

const getAdminUser = async () => {
  const supabase = await createClient();

  const {
    data: { user: authUser },
    error,
  } = await supabase.auth.getUser();

  if (error || !authUser) {
    console.error("Error fetching authenticated user:", error);
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { email: authUser.email || undefined },
  });

  return user?.role === "ADMIN" ? user : null;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { movieId: string } },
) {
  try {
    const { movieId } = await params;

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie details" },
      { status: 500 },
    );
  }
}

// Update movie details (Admin only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { movieId: string } },
) {
  try {
    const { movieId } = await params;
    const fileds: UpdateMovie = await req.json();

    if (Object.keys(fileds).length === 0) {
      return NextResponse.json(
        { error: "No fields provided for update" },
        { status: 400 },
      );
    }

    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    const updatedMovie = await prisma.movie.update({
      where: { id: movieId },
      data: { ...fileds },
    });

    return NextResponse.json(updatedMovie);
  } catch (error) {
    console.error("Error updating movie details:", error);
    return NextResponse.json(
      { error: "Failed to update movie details" },
      { status: 500 },
    );
  }
}

// delete movie
export async function DELETE(
  req: NextRequest,
  { params }: { params: { movieId: string } },
) {
  try {
    const { movieId } = await params;
    const admin = await getAdminUser();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    await prisma.movie.delete({
      where: { id: movieId },
    });

    return NextResponse.json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    return NextResponse.json(
      { error: "Failed to delete movie" },
      { status: 500 },
    );
  }
}
