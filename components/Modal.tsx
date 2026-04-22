import { useGlobalContext } from "@/context/globalContext";
import useDetectOutsideClick from "@/hooks/useDetectOutsideClick";
import React, { useRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  children: React.ReactNode;
  className?: string;
  overlay?: boolean;
}

function Modal({ children, className, overlay = true }: Props) {
  const { closeModal } = useGlobalContext();

  const ref = useRef<HTMLDivElement>(null);
  useDetectOutsideClick(ref, closeModal);

  return (
    <div className="fixed w-full h-full top-0  flex items-center justify-center z-100">
      <div
        className={twMerge(
          "max-w-xl w-full bg-brand-background/70 rounded-lg p-4 z-50",
          className,
        )}
        ref={ref}
      >
        {children}
      </div>
      {overlay && (
        <div className=" absolute w-full h-full bg-black/20 z-40 backdrop-blur-xs"></div>
      )}
    </div>
  );
}

export default Modal;
