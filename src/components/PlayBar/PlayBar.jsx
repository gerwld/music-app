import React, { useEffect, useState } from "react";
import s from "./s.module.css";

const PlayBar = ({ audioApi }) => {
 const [volume, setVolume] = useState(0.6);
 const [isPlaying, setPlay] = useState(false);

 const togglePlay = () => {
  if (audioApi.paused) {
   audioApi.play();
  } else {
   audioApi.pause();
  }
 };

 useEffect(() => {
  audioApi.volume = volume;
 }, [volume]);

 useEffect(() => {
  const setPlaying = (bool) => {
   if (isPlaying !== bool) {
    setPlay(bool);
   }
  };
  let a = audioApi.addEventListener("play", () => setPlaying(true));
  let b = audioApi.addEventListener("pause", () => setPlaying(false));

  return () => {
   audioApi.removeEventListener("play", setPlaying);
   audioApi.removeEventListener("pause", setPlaying);
  };
 }, [audioApi, isPlaying]);

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
