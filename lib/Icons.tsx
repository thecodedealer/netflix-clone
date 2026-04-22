import { FaVolumeDown } from "react-icons/fa";
import { LiaVolumeOffSolid, LiaVolumeUpSolid } from "react-icons/lia";
import { RiPlayMiniFill } from "react-icons/ri";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  IoArrowBackSharp,
  IoVolumeHighOutline,
  IoVolumeLowOutline,
  IoVolumeMediumOutline,
  IoVolumeMuteOutline,
} from "react-icons/io5";
import { IoPlay, IoChevronDownSharp, IoCheckmarkSharp } from "react-icons/io5";
import { FiRotateCw, FiRotateCcw } from "react-icons/fi";
import { IoMdPause, IoMdAdd } from "react-icons/io";

interface IconProps {
  size?: number;
  className?: string;
}

export const volumeDownIcon = ({ size, className }: IconProps) => (
  <FaVolumeDown size={size} className={className} />
);

export const VolumeOffIcon = ({ size, className }: IconProps) => {
  return <LiaVolumeOffSolid size={size} className={className} />;
};

export const VolumeFullIcon = ({ size, className }: IconProps) => {
  return <LiaVolumeUpSolid size={size} className={className} />;
};

export const PlayIcon = ({ size, className }: IconProps) => {
  return <RiPlayMiniFill size={size} className={className} />;
};

export const InfoIcon = ({ size, className }: IconProps) => {
  return <AiOutlineInfoCircle size={size} className={className} />;
};

export const BackIcon = ({ size, className }: IconProps) => {
  return <IoArrowBackSharp size={size} className={className} />;
};

export const PlayButtonIcon = ({ size, className }: IconProps) => {
  return <IoPlay size={size} className={className} />;
};

export const PauseButtonIcon = ({ size, className }: IconProps) => {
  return <IoMdPause size={size} className={className} />;
};

export const RotateCwIcon = ({ size, className }: IconProps) => {
  return <FiRotateCw size={size} className={className} />;
};

export const RotateCcwIcon = ({ size, className }: IconProps) => {
  return <FiRotateCcw size={size} className={className} />;
};

export const HighVolumeIcon = ({ size, className }: IconProps) => {
  return <IoVolumeHighOutline size={size} className={className} />;
};

export const MediumVolumeIcon = ({ size, className }: IconProps) => {
  return <IoVolumeMediumOutline size={size} className={className} />;
};

export const LowVolumeIcon = ({ size, className }: IconProps) => {
  return <IoVolumeLowOutline size={size} className={className} />;
};

export const MuteVolumeIcon = ({ size, className }: IconProps) => {
  return <IoVolumeMuteOutline size={size} className={className} />;
};

export const AddIcon = ({ size, className }: IconProps) => {
  return <IoMdAdd size={size} className={className} />;
};

export const ChevronDownIcon = ({ size, className }: IconProps) => {
  return <IoChevronDownSharp size={size} className={className} />;
};

export const CheckIcon = ({ size, className }: IconProps) => {
  return <IoCheckmarkSharp size={size} className={className} />;
};
