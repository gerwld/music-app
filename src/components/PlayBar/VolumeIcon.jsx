import React from "react";
import { IoVolumeHighOutline, IoVolumeMediumOutline, IoVolumeLowOutline, IoVolumeOffOutline } from "react-icons/io5";

const VolumeIcon = ({ volume }) => {
  return <span>{volume === 100 
    ? <IoVolumeHighOutline /> 
    : volume >= 50 ? <IoVolumeMediumOutline /> 
    : volume > 0 ? <IoVolumeLowOutline /> 
    : <IoVolumeOffOutline />}</span>;
};

export default VolumeIcon;
