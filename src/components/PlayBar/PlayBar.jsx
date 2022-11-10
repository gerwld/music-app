import React, { useEffect, useState } from "react";
import s from "./s.module.css";

const PlayBar = ({ audioApi, isPlaying }) => {
 const [volume, setVolume] = useState(0.6);

 const togglePlay = () => {
  if (audioApi.paused && audioApi.src) {
   audioApi.play();
  } else {
   audioApi.pause();
  }
 };

 useEffect(() => {
  audioApi.volume = volume;
 }, [volume]);

 return (
  <>
   <div className={s.playbar}>
    <div className={s.controls}>
     <button>prev</button>
     <button onClick={togglePlay}>{isPlaying ? "pause" : "play"}</button>
     <button>next</button>
    </div>
    <div className={s.volume}>volume</div>
   </div>
   <div className={s.gap} />
  </>
 );
};

export default PlayBar;
