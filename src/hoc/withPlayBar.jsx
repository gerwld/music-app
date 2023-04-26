import React, { useEffect, useState } from "react";

export function withPlaybar(Children) {
 return (props) => {
  const { audioCt, initSet, setShuf, isShuffle, currentObj, onNextTrack } = props;
  const [volume, setVolume] = useState(60);
  const [progress, setProg] = useState(0);
  const [duration, setDur] = useState(0);
  const [isRepeat, setRep] = useState(false);

  const onSetVolume = (e) => {
    e.preventDefault();
   let range = e.target.value;
   if ((range && volume !== range) || range === 0) {
    setVolume(range);
    localStorage.setItem("vol", range);
   }
  };

  const onScrub = (e) => {
   e.preventDefault();
   let range = e.target.value;
   if ((range && progress !== range) || range == 0) {
    let res = duration * range * 0.01;
    audioCt.currentTime = res > 5 ? res : 1;
   } 
   else if (range >= 1) {
    audioCt.currentTime = 0;
   }};

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

  return <Children {...{...props,
    onSetVolume,
    onScrub,
    toggleRepeat,
    toggleShuffle,
    togglePlay,
    isRepeat,
    progress,
    duration,
    volume,
  }}
   />
 };
}
