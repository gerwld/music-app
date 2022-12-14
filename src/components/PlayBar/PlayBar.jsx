import React, { useEffect, useState } from "react";
import withClickOutside from "hoc/withClickOutside";
import tohms from "services/tohms";
import s from "./s.module.css";

const PlayBar = ({ audioCt, isPlaying, currentObj, onNextTrack, onPrevTrack, initSet, isShuffle, setShuf }) => {
 const [volume, setVolume] = useState(60);
 const [progress, setProg] = useState(0);
 const [duration, setDur] = useState(0);
 const [isRepeat, setRep] = useState(false);

 const onSetVolume = (e) => {
  let range = e.target.value;
  if ((range && volume !== range) || range === 0) {
   setVolume(range);
   localStorage.setItem("vol", range);
  }
 };

 const onScrub = (e) => {
  let range = e.target.value;
  if ((range && progress !== range) || range === 0) {
   audioCt.currentTime = duration * range * 0.01;
  }
 };

 const toggleRepeat = () => {
  setRep(!isRepeat);
  localStorage.setItem("isRepeat", !isRepeat);
 };

 const toggleShuffle = () => {
  setShuf(!isShuffle);
  localStorage.setItem("isShuffle", !isShuffle);
 };

 const togglePlay = () => {
  if (currentObj) {
   if (audioCt.paused && audioCt.src) {
    audioCt.play();
   } else audioCt.pause();
  } else initSet();
 };

 useEffect(() => {
  audioCt.volume = volume / 100;
 }, [volume]);

 useEffect(() => {
  //set cache from lS
  let ct = JSON.parse(localStorage.getItem("last_time"));
  let vol = localStorage.getItem("vol");
  let rep = JSON.parse(localStorage.getItem("isRepeat"));
  let shuff = JSON.parse(localStorage.getItem("isShuffle"));
  if (ct) {
   audioCt.currentTime = ct.point;
   setDur(ct.duration);
  }
  vol && setVolume(vol);
  typeof rep == "boolean" && setRep(rep);
  typeof shuff == "boolean" && setShuf(shuff);

  const setTiming = () => {
   let dur = audioCt.duration;
   let timing = audioCt.currentTime / (dur * 0.01);
   if (timing && timing !== progress) {
    setProg(timing);
    localStorage.setItem("last_time", JSON.stringify({ point: audioCt.currentTime, duration: audioCt.duration }));
   }
   if (dur && dur !== duration) {
    setDur(dur);
   }
  };
  audioCt.addEventListener("timeupdate", setTiming);

  return () => {
   audioCt.removeEventListener("timeupdate", setTiming);
  };
 }, []);

 useEffect(() => {
  const onEnd = () => {
   if (isRepeat) {
    audioCt.play().catch((e) => 0);
   } else onNextTrack(isShuffle);
  };
  audioCt.addEventListener("ended", onEnd);

  return () => {
   audioCt.removeEventListener("ended", onEnd);
  };
 }, [isRepeat, isShuffle, currentObj]);

 return (
  <>
   <div className={s.playbar}>
    <div className={s.current}>
     {/* Show preview if current object exist */}
     {currentObj ? (
      <>
       <FullCover currentObj={currentObj} />
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
    <button onClick={() => setShow(!isShow)} className={s.cr_expand}>expand</button>
   </div>
   {isShow ? <div className={s.full_cover}>
    <div className={s.fc_wrapper}>
     <button onClick={() => setShow(false)}>close</button>
     <img src={currentObj.cover} alt={`${currentObj.title} - ${currentObj.author}`} />
    </div>
   </div> : ''}
  </div>
 );
});

export default PlayBar;
