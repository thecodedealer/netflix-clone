import { Profile } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

interface ProfileContextType {
  activeProfile: Profile | null;
  setActiveProfileState: (profile: Profile | null) => void;
  activeProfileId: string | null;
  setActiveProfileId: (id: string | null) => void;
  setActiveProfile: (profile: Profile) => void;
}

const STORGAGE_KEY = "netflix-active-profile-id";

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeProfile, setActiveProfileState] = useState<Profile | null>(null);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORGAGE_KEY);
    if (stored) {
      setActiveProfileId(stored);
    }
  }, []);

  const setActiveProfile = (profile: Profile) => {
    setActiveProfileState(profile);
    setActiveProfileId(profile.id);
    localStorage.setItem(STORGAGE_KEY, profile.id);
  };

  return (
    <ProfileContext.Provider
      value={{
        activeProfile,
        setActiveProfileState,
        activeProfileId,
        setActiveProfileId,
        setActiveProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error(
      "useProfileContext must be used within a ProfileContextProvider",
    );
  }

  return context;
};
