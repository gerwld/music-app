import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import LastAdded from "../LastAdded/LastAdded";
import PlayBar from "../PlayBar/PlayBar";

const audioApi = new Audio();

const Main = () => {
 const [isPlaying, setPlay] = useState(false);
 const [currentSrc, setSrc] = useState(null);
 const {tracks} = useSelector(({global}) => ({
  tracks: global.tracks
}));

 useEffect(() => {
  const setPlaying = (bool) => {
   if (isPlaying !== bool) {
    setPlay(bool);
   }
  };
  audioApi.addEventListener("play", () => setPlaying(true));
  audioApi.addEventListener("pause", () => setPlaying(false));

  return () => {
   audioApi.removeEventListener("play", setPlaying);
   audioApi.removeEventListener("pause", setPlaying);
  };
 }, [isPlaying]);

const onTrackClick = (source) => {
  audioApi.src = source;
  audioApi.play();
}

useEffect(() => {
 setSrc(audioApi.currentSrc || null);
}, [audioApi.currentSrc])

 return (
  <div>
   <Header />
   <LastAdded onTrackClick={onTrackClick} tracks={tracks} currentSrc={currentSrc} />
   <PlayBar audioApi={audioApi} isPlaying={isPlaying} />
  </div>
 );
};

export default Main;
