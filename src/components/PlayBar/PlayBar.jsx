import React, { useEffect, useState } from "react";
import tohms from "../../services/tohms";
import s from "./s.module.css";

const PlayBar = ({ audioCt, isPlaying, currentObj, onNextTrack, onPrevTrack }) => {
 const [volume, setVolume] = useState(60);
 const [progress, setProg] = useState(0);
 const [duration, setDur] = useState(0);

 const onSetVolume = (e) => {
  let range = e.target.value;
  if ((range && volume !== range) || range === 0) {
   setVolume(range);
  }
 };

 const onScrub = (e) => {
  let range = e.target.value;
  if ((range && volume !== range) || range === 0) {
   audioCt.currentTime =  duration * range * 0.01;
  }
 };

 const togglePlay = () => {
  if (audioCt.paused && audioCt.src) {
   audioCt.play();
  } else audioCt.pause();
 };

 useEffect(() => {
  audioCt.volume = volume / 100;
 }, [volume]);

 useEffect(() => {
  const setTiming = () => {
   let dur = audioCt.duration;
   let timing = audioCt.currentTime / (dur * 0.01);
   if(timing && timing !== progress) {
    setProg(timing);
   }
   if(dur && dur !== duration) {
    setDur(dur);
   }
  };
  audioCt.addEventListener("timeupdate", setTiming);

  return () => {
   audioCt.removeEventListener("timeupdate", setTiming);
  };
 }, []);

 return (
  <>
   <div className={s.playbar}>
    <div className={s.current}>
     {currentObj ? (
      <>
       <img src={currentObj.cover} alt={`${currentObj.title} - ${currentObj.author}`} />
       <div className={s.cr_creds}>
        <span>{currentObj.title}</span>
        <span>{currentObj.author}</span>
       </div>
       <button className={s.cr_fav}>add to fav</button>
      </>
     ) : (
      ""
     )}
    </div>

    <div className={s.controls}>
     <div className={s.cs_top}>
      <button onClick={onPrevTrack}>prev</button>
      <button onClick={togglePlay}>{isPlaying ? "pause" : "play"}</button>
      <button onClick={onNextTrack}>next</button>
     </div>
     <div className={s.cs_bottom}>
      <input type="range" min="0" step="0.1" value={progress} onInput={onScrub}></input>
      <div className={s.cs_timeline}>
       <span>{progress ? tohms(progress * duration * 0.01) : ''}</span>
       <span>{duration ? tohms(duration) : '0:00'}</span>
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

export default PlayBar;
