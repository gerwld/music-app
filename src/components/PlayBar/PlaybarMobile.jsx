import React, { useState } from "react";
import tohms from "services/tohms";
import s from "./s.module.css";

import { HiBackward, HiForward, HiPauseCircle, HiPlayCircle } from "react-icons/hi2";
import { IoRepeat, IoShuffleOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import { Btn, ProgressRange } from "components";
import { withPlaybar } from "hoc/withPlayBar";
import Div100vh from "react-div-100vh";



const PlaybarMobile = (props) => {
  const { 
    currentObj, 
    isPlaying, 
    togglePlay, 
    toggleShuffle, 
    toggleRepeat, 
    isShuffle, 
    isRepeat, 
    progress, 
    onScrub, 
    duration, 
    onNextTrack, 
    onPrevTrack 
  } = props;
  const [isFullscreen, setFullscreen] = useState(false);

 const toggleFullscreen = () => {
  setFullscreen(!isFullscreen);
 };

 if (currentObj)
  return (
   <div className={`${s.playbar_mob} ${currentObj ? s.gap_adjust : ""}`}>
    <div className={s.playbar_fixed}>
     <div onClick={toggleFullscreen} className={s.touch_group}>
      <div className={s.playbar_fixed_cover}>
       <img src={currentObj.cover} alt={`${currentObj.title} - ${currentObj.author}`} />
      </div>
      <div className={s.cr_creds}>
       <span>{currentObj.title}</span>
       <span>{currentObj.author}</span>
      </div>
     </div>

     <Btn click={togglePlay} style={s.play_btn__mobile}>
      {isPlaying ? <HiPauseCircle /> : <HiPlayCircle />}
     </Btn>
    </div>

    <Div100vh className={`${s.playbar_fullscreen} ${isFullscreen ? s.playbar__opened : ""}`}>
     <div className={s.playbar_nav}>
      <Btn click={toggleFullscreen} title="Close full screen">
       <IoIosArrowDown />
      </Btn>
      <Btn title="More">
       <BiDotsHorizontalRounded />
      </Btn>
     </div>

     <div className={s.playbar_full_cover}>
      <img src={currentObj.cover} alt={`${currentObj.title} - ${currentObj.author}`} />
     </div>
     <div className={s.cr_creds}>
      <span>{currentObj.title}</span>
      <span>{currentObj.author}</span>
     </div>

     <div className={s.controls}>
      <div className={s.cs_top}>
       <Btn click={toggleShuffle} isActive={isShuffle}>
        <IoShuffleOutline />
       </Btn>

       <div className={s.group}>
        <Btn click={onPrevTrack}>
         <HiBackward />
        </Btn>
        <Btn click={togglePlay} style={s.play_btn}>
         {isPlaying ? <HiPauseCircle /> : <HiPlayCircle />}
        </Btn>
        <Btn click={onNextTrack}>
         <HiForward />
        </Btn>
       </div>

       <Btn click={toggleRepeat} isActive={isRepeat}>
        <IoRepeat />
       </Btn>
      </div>
      <div className={s.cs_btgroup}>
       <div className={s.cs_bottom}>
       <ProgressRange value={progress} onChange={onScrub} step="1" />
       </div>
       <div className={s.cs_timeline}>
        <span>{progress ? tohms(progress * duration * 0.01) : ""}</span>
        <span>{duration ? tohms(duration) : "0:00"}</span>
       </div>
      </div>
     </div>
    </Div100vh>
   </div>
  );
 else return "";
};

export default withPlaybar(PlaybarMobile);
