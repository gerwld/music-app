import React from "react";
import withClickOutside from "hoc/withClickOutside";
import tohms from "services/tohms";
import s from "./s.module.css";
import { withPlaybar } from "hoc/withPlayBar";

const PlayBar = (props) => {
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
    volume 
  } = props;
  
 return (
  <>
   <div className={s.playbar}>
    <div className={s.current}>
     {/* Show preview if current object exist */}
     {currentObj ? 
      <>
       <FullCover currentObj={currentObj} />
       <div className={s.cr_creds}>
        <span>{currentObj.title}</span>
        <span>{currentObj.author}</span>
       </div>
       <button className={s.cr_fav}>add to fav</button>
      </>
     : "" }
    </div>

    <div className={s.controls}>
     <div className={s.cs_top}>
      <button onClick={() => onPrevTrack(isShuffle)}>prev</button>
      <button onClick={togglePlay}>{isPlaying ? "pause" : "play"}</button>
      <button onClick={() => onNextTrack(isShuffle)}>next</button>
      ||
      <button onClick={toggleRepeat}>repeat {isRepeat ? "on" : "off"}</button>
      <button onClick={toggleShuffle}>shuffle {isShuffle ? "on" : "off"}</button>
     </div>
     <div className={s.cs_bottom}>
      <input type="range" min="0" step="0.1" value={progress} onInput={onScrub}></input>
      <div className={s.cs_timeline}>
       <span>{progress ? tohms(progress * duration * 0.01) : ""}</span>
       <span>{duration ? tohms(duration) : "0:00"}</span>
      </div>
     </div>
    </div>
    <div className={s.volume}>
     <span>volume</span>
     <input type="range" min="0" step="1" value={volume} onChange={onSetVolume}></input>
    </div>
   </div>
   <div className={s.gap} />
  </>
 );
};

const FullCover = withClickOutside(({ currentObj, refE, setShow, isShow }) => {
 return (
  <div ref={refE}>
   <div className={s.cr_cover}>
    <img src={currentObj.cover} alt={`${currentObj.title} - ${currentObj.author}`} />
    <button onClick={() => setShow(!isShow)} className={s.cr_expand}>
     expand
    </button>
   </div>

   {isShow ? 
    <div className={s.full_cover}>
     <div className={s.fc_wrapper}>
      <button onClick={() => setShow(false)}>close</button>
      <img src={currentObj.cover} alt={`${currentObj.title} - ${currentObj.author}`} />
     </div>
    </div>
   : "" }
   
  </div>
 );
});

export default withPlaybar(PlayBar);
