"use client";
import React, { useState } from "react";
import useFetchProfiles from "@/hooks/profile/useFetchProfiles";
import { Profile } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import AddProfileCard from "@/components/profile/AddProfileCard";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileForm from "@/components/profile/ProfileForm";

const MAX_PROFILES = 5;

type EditingState =
  | { mode: "grid" }
  | { mode: "edit"; profile: Profile }
  | { mode: "new" };

function Page() {
  const { data: profiles = [] } = useFetchProfiles();
  const [state, setState] = useState<EditingState>({ mode: "grid" });

  const isFormVisible = state.mode !== "grid";
  const isEditingProfile = state.mode === "edit" ? state.profile : null;

  return (
    <div className="min-h-screen flex flex-col bg-brand-background">
      <header className="px-14 py-6">
        <Link href={"/"}>
          <Image
            src={"/logo--netflix.svg"}
            alt="Netflix Logo"
            width={100}
            height={64}
            className="object-contain"
          />
        </Link>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {isFormVisible ? (
          <ProfileForm
            profile={isEditingProfile}
            onDone={() => setState({ mode: "grid" })}
          />
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {profiles.map((profile) => {
              return (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onEdit={() => setState({ mode: "edit", profile })}
                />
              );
            })}

            {profiles.length < MAX_PROFILES && (
              <AddProfileCard onClick={() => setState({ mode: "new" })} />
            )}
          </div>
        )}

        <Link
          href={"/"}
          className="mt-4 px-10 py-2 border border-white/40 text-white/70 text-sm font-semibold rounded-sm hover:border-white hover:text-white transition-colors tracking-widest uppercase"
        >
          Done
        </Link>
      </div>
    </div>
  );
}

export default Page;
