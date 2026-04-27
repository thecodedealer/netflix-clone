import { useEffect } from "react";

const useDetectOutsideClick = (
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref.current || !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // delay attaching the even lsitener to avoid immediate trigger when the component mounts
    const temeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener(
        "touchstart",
        handleClickOutside as EventListener,
      );
    }, 100);

    return () => {
      clearTimeout(temeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener(
        "touchstart",
        handleClickOutside as EventListener,
      );
    };
  }, [ref, callback]);
};

export default useDetectOutsideClick;
