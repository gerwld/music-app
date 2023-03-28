import { withPlaybar } from "hoc/withPlayBar";
import React from "react";
import { HiBackward, HiForward, HiPauseCircle, HiPlayCircle } from "react-icons/hi2";
import { IoRepeat, IoShuffleOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import tohms from "services/tohms";
import s from "./s.module.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useState } from "react";
import Div100vh from "react-div-100vh";

//|*** MOBILE PLAYbar ***|
const PlaybarMobile = ({ currentObj, isPlaying, togglePlay, toggleShuffle, toggleRepeat, isShuffle, isRepeat, progress, onScrub, duration, onNextTrack, onPrevTrack }) => {
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

     <button onClick={togglePlay} className={s.play_btn__mobile}>
      {isPlaying ? <HiPauseCircle /> : <HiPlayCircle />}
     </button>
    </div>

    <Div100vh className={`${s.playbar_fullscreen} ${isFullscreen ? s.playbar__opened : ""}`}>
     <div className={s.playbar_nav}>
      <button onClick={toggleFullscreen} title="Close full screen">
       <IoIosArrowDown />
      </button>
      <button title="More actions">
       <BiDotsHorizontalRounded />
      </button>
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
       <button onClick={toggleShuffle} className={`${isShuffle ? "active_btn" : ""}`}>
        <IoShuffleOutline />
       </button>

       <div className={s.group}>
        <button onClick={() => onPrevTrack(isShuffle)}>
         <HiBackward />
        </button>
        <button onClick={togglePlay} className={s.play_btn}>
         {isPlaying ? <HiPauseCircle /> : <HiPlayCircle />}
        </button>
        <button onClick={() => onNextTrack(isShuffle)}>
         <HiForward />
        </button>
       </div>

       <button onClick={toggleRepeat} className={`${isRepeat ? "active_btn" : ""}`}>
        <IoRepeat />
       </button>
      </div>
      <div className={s.cs_btgroup}>
       <div className={s.cs_bottom}>
        <input type="range" min="0" step="0.1" value={progress} onInput={onScrub}></input>
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
