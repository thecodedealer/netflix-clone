import { ALL_AUDIENCES_CONFIG, RATING_CONFIG } from "@/lib/constants";

interface Props {
  rating?: string | null;
  size?: "xs" | "sm" | "md";
}

function MaturityBadge({ rating, size }: Props) {
  const config = rating
    ? (RATING_CONFIG[rating] ?? ALL_AUDIENCES_CONFIG)
    : ALL_AUDIENCES_CONFIG;

  const sizeClass =
    size === "xs"
      ? "w-6 h-6 text-xs"
      : size === "sm"
        ? "w-8 h-8 text-sm"
        : "w-8 h-8 md:w-11 md:h-11 text-base";

  return (
    <span
      style={{
        backgroundColor: config.color,
      }}
      className={`${sizeClass} flex items-center justify-center font-bold rounded-full border border-white text-white shrink-0 `}
    >
      {config.display}
    </span>
  );
}

export default MaturityBadge;
