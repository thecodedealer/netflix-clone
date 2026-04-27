import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { forbidden, unauthorized } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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

  return (
    <div className="min-h-screen bg-[#141414]">
      <header className="sticky top-0 z-50 w-full bg-[#141414]/95 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-6 px-4 sm:px-6 md:px-14 h-17.5">
          <Link href="/">
            <Image
              src="/logo--netflix.svg"
              alt="Netflix"
              width={100}
              height={64}
              className="w-20 md:w-25"
            />
          </Link>

          <nav className="flex items-center gap-5">
            <Link
              href="/"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/admin"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>

      {children}
    </div>
  );
}
