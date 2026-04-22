"use client";
import { useProfileContext } from "@/context/profileContext";
import useFetchProfiles from "@/hooks/profile/useFetchProfiles";
import useIsAdmin from "@/hooks/useIsAdmin";
import { ChevronDown, LogOut, Settings, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { myListQueryKey } from "@/hooks/my-list/useFetchMyList";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Series", href: "/series" },
  { label: "Films", href: "/movies" },
  { label: "New & Popular", href: "/new-popular" },
  { label: "My List", href: "/my-list" },
];

function Header() {
  const pathname = usePathname();
  const { activeProfile, setActiveProfile, activeProfileId } =
    useProfileContext();
  const { data: profiles = [] } = useFetchProfiles();
  const queryClient = useQueryClient();

  const supabase = createClient();
  const router = useRouter();

  const isAdmin = useIsAdmin();

  // auto select first profile if there is only one and no active profile
  useEffect(() => {
    if (profiles.length === 0) return;
    if (activeProfile) return;

    const stored = profiles.find((p) => p.id === activeProfileId);
    setActiveProfile(stored ?? profiles[0]);
  }, [profiles, activeProfile, activeProfileId, setActiveProfile]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleProfileSwitch = (profile: (typeof profiles)[number]) => {
    setActiveProfile(profile);
    queryClient.invalidateQueries({
      queryKey: myListQueryKey(profile.id),
    });
  };

  return (
    <header className="sticky w-full min-h-17.5 px-4 sm:px-6 md:px-14 top-0 z-50 flex items-center justify-between bg-linear-to-b from-black to-transparent">
      <div className="flex items-center gap-6">
        <Link href={"/"} className="text-2xl font-bold text-red-600">
          <Image
            src={"/logo--netflix.svg"}
            alt="Netflix Logo"
            width={100}
            height={64}
            className="w-20 md:w-25"
          />
        </Link>

        <ul className="hidden md:flex space-x-4">
          {menuItems.map((li) => {
            return (
              <li key={li.label}>
                <Link
                  href={li.href}
                  className={`text-sm ${pathname === li.href ? "text-white font-semibold" : "text-white/70 hover:text-white/90 transition-colors"}`}
                >
                  {li.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            href={"/admin"}
            className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
          >
            <ShieldCheck size={16} />
            Admin
          </Link>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1.5 outline-none group">
              <Image
                src={activeProfile?.avatar ?? "/images/netflix--avatar.png"}
                alt={activeProfile?.name ?? "Profile"}
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-sm object-cover shrink-0"
              />
              <ChevronDown
                size={16}
                className="text-white/70 group-data-[state=open]:rotate-180 transition-transform duration-200"
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-56 bg-black/95 border border-white/15 text-white p-1 rounded-sm"
          >
            {profiles.map((profile) => {
              const isActive = activeProfile?.id === profile.id;
              return (
                <DropdownMenuItem
                  key={profile.id}
                  onClick={() => handleProfileSwitch(profile)}
                  className="flex items-center gap-3 px-3 py-2 rounded-sm cursor-pointer bg-transparent focus:bg-transparent hover:bg-transparent text-white focus:text-white hover:underline"
                >
                  <Image
                    src={profile.avatar ?? "/images/netflix--avatar.png"}
                    alt={profile.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-sm object-cover shrink-0"
                  />

                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-sm truncate ${isActive ? "text-white font-semibold hover:text-white" : "text-white/80"}`}
                    >
                      {profile.name}
                    </span>
                    {profile.isKids && (
                      <span className="text-[10px] font-bold text-blue-400 tracking-wide">
                        KIDS
                      </span>
                    )}
                  </div>
                </DropdownMenuItem>
              );
            })}

            <DropdownMenuSeparator className="my-1 bg-white/10" />

            <DropdownMenuItem
              asChild
              className="flex items-center gap-3 px-3 py-2 rounded-sm cursor-pointer bg-transparent focus:bg-transparent hover:bg-transparent text-white focus:text-white hover:underline"
            >
              <Link href="/manage-profiles">
                <Settings size={22} className="text-white/60 shrink-0" />
                <span className="text-sm text-white/80">Manage Profiles</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1 bg-white/10" />

            <DropdownMenuItem
              onClick={handleSignOut}
              className="flex items-center gap-3 px-3 py-2 rounded-sm cursor-pointer bg-transparent focus:bg-transparent hover:bg-transparent text-white focus:text-white hover:underline"
            >
              <LogOut size={22} className="text-white/60 shrink-0" />
              <span className="text-sm text-white/80">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Header;
