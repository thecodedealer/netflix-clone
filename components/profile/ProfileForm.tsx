"use client";
import React, { useState } from "react";
import useCreateProfile from "@/hooks/profile/useCreateProfile";
import useDeleteProfile from "@/hooks/profile/useDeleteProfile";
import useUpdateProfile from "@/hooks/profile/useUpdateProfile";
import { Profile } from "@/types/types";
import { useProfileContext } from "@/context/profileContext";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Props {
  profile: Profile | null;
  onDone: () => void;
}

function ProfileForm({ profile, onDone }: Props) {
  const { activeProfile, setActiveProfile } = useProfileContext();

  const { mutate: createProfile, isPending: creating } = useCreateProfile();
  const { mutate: updateProfile, isPending: updating } = useUpdateProfile();
  const { mutate: deleteProfile, isPending: deleting } = useDeleteProfile();

  const isNew = profile === null;

  const [name, setName] = useState(profile?.name ?? "");
  const [isKids, setIsKids] = useState(profile?.isKids ?? false);

  const isPending = creating || updating || deleting;

  const handleSave = () => {
    const trimmed = name.trim();
    if (isNew) {
      createProfile({ name: trimmed, isKids }, { onSuccess: onDone });
    } else {
      updateProfile(
        {
          id: profile.id,
          name: trimmed,
          isKids,
        },
        {
          onSuccess: (updated) => {
            if (activeProfile?.id === updated.id) {
              setActiveProfile(updated);
            }
            onDone();
          },
        },
      );
    }
  };

  const handleDelete = () => {
    if (!profile) return;
    deleteProfile(profile.id, { onSuccess: onDone });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm gap-8">
      <h1 className="text-white text-3xl font-medium w-full pb-5 border-b border-white/20">
        {isNew ? "Add Profile" : "Edit Profile"}
      </h1>

      <div className="w-28 h-28 rounded-sm overflow-hidden shrink-0">
        <Image
          src={profile?.avatar ?? "/images/netflix--avatar.png"}
          alt="Profile avatar"
          className="w-full h-full object-cover"
          width={112}
          height={112}
        />
      </div>

      <div className="w-full flex flex-col gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Profile Name"
          className="w-full h-10 px-3 bg-zinc-600 text-white text-sm rounded-sm placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/40"
        />
      </div>

      <div className="w-full flex items-start gap-3 bg-zinc-800 rounded-sm p-3">
        <Input
          type="checkbox"
          id="kids-toggle"
          checked={isKids}
          onChange={(e) => setIsKids(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-[#E50914] cursor-pointer shrink-0"
        />

        <div>
          <Label htmlFor="kids-toggle">Kids</Label>
          <p className="text-white/50 text-xs mt-1 leading-relaxed">
            Only see TV shows and movies rated for ages 12 and under.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <Button
          onClick={handleSave}
          disabled={isPending || !name.trim()}
          className="h-10 bg-white text-black font-semibold text-sm rounded-sm hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {creating || updating ? "Saving…" : "Save"}
        </Button>

        <Button
          onClick={onDone}
          disabled={isPending}
          className="h-10 border border-white/40 text-white/70 font-semibold text-sm rounded-sm hover:border-white hover:text-white disabled:opacity-50 transition-colors"
        >
          Cancel
        </Button>

        {!isNew && (
          <Button
            onClick={handleDelete}
            disabled={isPending}
            className="h-10 border border-white/30 text-white/50 font-semibold text-sm rounded-sm hover:border-red-500 hover:text-red-500 disabled:opacity-50 transition-colors"
          >
            {deleting ? "Deleting…" : "Delete Profile"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProfileForm;
