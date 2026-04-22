export const RATINGS = [
  { value: "NR", label: "NR - Not Rated" },
  { value: "G", label: "G - General Audiences" },
  { value: "PG", label: "PG - Parental Guidance Suggested" },
  { value: "PG-13", label: "PG-13 - Parents Strongly Cautioned" },
  { value: "R", label: "R - Restricted" },
  { value: "NC-17", label: "NC-17 - Adults Only" },
  { value: "TV-Y", label: "TV-Y - All Children" },
  { value: "TV-Y7", label: "TV-Y7 - Directed to Older Children" },
  { value: "TV-G", label: "TV-G - General Audience" },
  { value: "TV-PG", label: "TV-PG - Parental Guidance Suggested" },
  { value: "TV-14", label: "TV-14 - Parents Strongly Cautioned" },
  { value: "TV-MA", label: "TV-MA - Mature Audience Only" },
];

export const RATING_CONFIG: Record<string, { display: string; color: string }> =
  {
    G: { display: "G", color: "#46D369" }, // green  – all ages
    PG: { display: "PG", color: "#46D369" }, // green  – mild guidance
    "PG-13": { display: "13", color: "#F5A623" }, // amber  – 13+
    R: { display: "R", color: "#E8554E" }, // red    – restricted 17+
    "NC-17": { display: "17", color: "#B81D24" }, // dark red – adults only
    "TV-Y": { display: "Y", color: "#46D369" }, // green  – all children
    "TV-Y7": { display: "7", color: "#46D369" }, // green  – 7+
    "TV-G": { display: "G", color: "#46D369" }, // green  – general audience
    "TV-PG": { display: "PG", color: "#F5C518" }, // yellow – some guidance
    "TV-14": { display: "14", color: "#F5A623" }, // amber  – 14+
    "TV-MA": { display: "MA", color: "#B81D24" }, // dark red – mature
    NR: { display: "NR", color: "#6B7280" }, // gray   – not rated
  };

export const ALL_AUDIENCES_CONFIG = { display: "All", color: "#46D369" };
