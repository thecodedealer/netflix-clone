import { Movie } from "@/types/types";
import { createContext, useContext, useState } from "react";

interface GlobalContextType {
  modalKey: string | null;
  isModalOpen: boolean;
  openModal: (key: string, movie?: Movie) => void;
  closeModal: () => void;
  activeMovie: Movie | null;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modalKey, setModalKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);

  const openModal = (key: string, movie?: Movie) => {
    setModalKey(key);
    setIsModalOpen(true);
    if (movie) {
      setActiveMovie(movie);
    }
  };

  const closeModal = () => {
    setModalKey(null);
    setIsModalOpen(false);
    setActiveMovie(null);
  };

  return (
    <GlobalContext.Provider
      value={{
        modalKey,
        isModalOpen,
        openModal,
        closeModal,
        activeMovie,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider",
    );
  }
  return context;
};
