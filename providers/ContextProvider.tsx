"use client";
import React from "react";
import { GlobalContextProvider } from "@/context/globalContext";
import { ProfileContextProvider } from "@/context/profileContext";
import { TooltipProvider } from "@/components/ui/tooltip";
interface Props {
  children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
  return (
    <GlobalContextProvider>
      <ProfileContextProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ProfileContextProvider>
    </GlobalContextProvider>
  );
}

export default ContextProvider;
