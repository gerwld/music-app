import React, { useEffect, useState } from "react";
import s from "./s.module.css";

const PlayBar = ({ audioApi, isPlaying }) => {
 const [volume, setVolume] = useState(60);

 const onSetVolume = (e) => {
  let range = e.target.value;
  if ((range && volume !== range) || range === 0) {
   setVolume(range);
  }
 };

 const togglePlay = () => {
  if (audioApi.paused && audioApi.src) {
   audioApi.play();
  } else {
   audioApi.pause();
  }
 };

 useEffect(() => {
  audioApi.volume = volume / 100;
 }, [volume]);

 return (
  <>
   <div className={s.playbar}>

    <div className={s.current}>
     <img src="" alt="Current" />
     <div className={s.cr_creds}>
      <span>Title</span>
      <span>Author</span>
     </div>
     <button className={s.cr_fav}>add to fav</button>
    </div>

    <div className={s.controls}>
     <button>prev</button>
     <button onClick={togglePlay}>{isPlaying ? "pause" : "play"}</button>
     <button>next</button>
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
