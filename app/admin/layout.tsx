import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { forbidden, unauthorized } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) unauthorized();

  const user = await prisma.user.findUnique({
    where: { supabaseUserId: authUser.id },
    select: { role: true },
  });

  if (user?.role !== "ADMIN") forbidden();

  return <>{children}</>;
}
