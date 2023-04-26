import React from "react";
import tohms from "services/tohms";
import s from "./s.module.css";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoShuffleOutline, IoRepeat } from "react-icons/io5";
import { HiPlayCircle, HiPauseCircle, HiBackward, HiForward } from "react-icons/hi2";

import { withPlaybar } from "hoc/withPlaybar";
import withLikes from "hoc/withLikes";
import { compose } from "redux";
import { ProgressRange, FullCover, VolumeIcon, Btn } from "@/components/";

const Playbar = (props) => {
 const { 
  isPlaying, 
  currentObj, 
  onNextTrack, 
  onPrevTrack, 
  isShuffle,
  onSetVolume, 
  onScrub, 
  toggleRepeat, 
  toggleShuffle, 
  togglePlay, 
  isRepeat, 
  progress, 
  duration, 
  volume, 
  getFavoriteStateById, 
  setTrackFromOrToFav 
} = props;
 const isFavorite = getFavoriteStateById(currentObj?.id);

 const setTrackFromOrToFavCallback = () => {
  setTrackFromOrToFav(currentObj?.id, isFavorite);
 };

 return (
  <>
   <div className={s.playbar}>
    <div className={s.playbar_content + " content_wrapper"}>
     <CurrentSong {...{ setTrackFromOrToFavCallback, currentObj, isFavorite }} />

     <div className={s.controls}>
      <div className={s.cs_top}>
       <Btn click={toggleShuffle} isActive={isShuffle}>
        <IoShuffleOutline />
       </Btn>

       <div className={s.group}>
       <Btn click={onPrevTrack}><HiBackward /></Btn>
       <Btn click={togglePlay} style={s.play_btn}>
        {isPlaying ? <HiPauseCircle /> : <HiPlayCircle />}
       </Btn>
       <Btn click={onNextTrack}><HiForward /></Btn>
       </div>

       <Btn click={toggleRepeat} isActive={isRepeat}>
        <IoRepeat />
       </Btn>
      </div>

      <div className={s.cs_bottom}>
       <span>{progress ? tohms(progress * duration * 0.01) : ""}</span>
       <ProgressRange value={progress} onChange={onScrub} step="1" />
       <span>{duration ? tohms(duration) : "0:00"}</span>
      </div>

     </div>
     <div className={s.volume}>
      <div className={s.volume_content}>
       <VolumeIcon volume={volume} />
       <ProgressRange value={volume} onChange={onSetVolume} step="1" />
      </div>
     </div>
    </div>
   </div>

   <div className={s.gap} />
  </>
 );
};

const CurrentSong = ({ currentObj, setTrackFromOrToFavCallback, isFavorite }) => {
  if (currentObj)
   return (
    <div className={s.current}>
     <FullCover currentObj={currentObj} />
     <div className={s.cr_creds}>
      <span>{currentObj.title}</span>
      <span>{currentObj.author}</span>
     </div>
     <Btn click={setTrackFromOrToFavCallback} style={s.cr_fav}>
       {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
     </Btn>
    </div>
   );
  else return <span className={s.current}/>;
 };
 


export default compose(withPlaybar, withLikes)(Playbar);
