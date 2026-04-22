"use client";
import { Profile } from "@/types/types";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Pencil } from "lucide-react";

interface Props {
  profile: Profile;
  onEdit: () => void;
}

function ProfileCard({ profile, onEdit }: Props) {
  return (
    <button
      onClick={onEdit}
      className="group flex flex-col items-center gap-3 cursor-pointer"
    >
      <div className="relative w-32 h-32 rounded-sm overflow-hidden">
        <Image
          src={profile.avatar ?? "/images/netflix--avatar.png"}
          alt={profile.name}
          fill
          className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-40"
        />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
            <Pencil size={20} className="text-white" />
          </div>
        </div>
      </div>

      <span className="text-white/70 text-sm group-hover:text-white transition-colors">
        {profile.name}
      </span>
      {profile.isKids && (
        <span className="text-[10px] font-bold text-blue-400 tracking-wide -mt-1.5">
          KIDS
        </span>
      )}
    </button>
  );
}

export default ProfileCard;
