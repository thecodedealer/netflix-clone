import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

function AddProfileCard({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-3 cursor-pointer"
    >
      <div className="w-32 h-32 rounded-sm border-2 border-transparent bg-zinc-700/50 group-hover:bg-zinc-600/50 flex items-center justify-center transition-colors">
        <Plus
          size={40}
          className="text-white/40 group-hover:text-white transition-colors"
        />
      </div>
      <span className="text-white/50 text-sm group-hover:text-white transition-colors">
        Add Profile
      </span>
    </button>
  );
}

export default AddProfileCard;
