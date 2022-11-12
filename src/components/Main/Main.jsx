import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import LastAdded from "../LastAdded/LastAdded";
import PlayBar from "../PlayBar/PlayBar";

const audioCt = new Audio();

const Main = () => {
 const [isPlaying, setPlay] = useState(false);
 const [currentSrc, setSrc] = useState(null);
 const [currentObj, setObj] = useState(null);
 const { tracks } = useSelector(({ global }) => ({
  tracks: global.tracks,
 }));

 useEffect(() => {
  const setPlaying = (bool) => {
   if (isPlaying !== bool) {
    setPlay(bool);
   }
  };
  audioCt.addEventListener("play", () => setPlaying(true));
  audioCt.addEventListener("pause", () => setPlaying(false));

  return () => {
   audioCt.removeEventListener("play", setPlaying);
   audioCt.removeEventListener("pause", setPlaying);
  };
 }, [isPlaying]);

 const onTrackClick = (source) => {
  setSrc(source);
  audioCt.src = source;
  audioCt.play();
 };

 const onNextTrack = () => {
  if (currentObj) {
   let id = tracks.findIndex((e) => e.id === currentObj.id);
   if (id + 1 < tracks.length) {
    onTrackClick(tracks[id + 1].source);
   } else initSet();
  } else initSet();
 };

 const onPrevTrack = () => {
  if (currentObj) {
   let id = tracks.findIndex((e) => e.id === currentObj.id);
   if (id > 0) {
    onTrackClick(tracks[id - 1].source);
   } else initSet();
  } else initSet();
 };

 const initSet = () => {
  setSrc(tracks[0].source);
  audioCt.src = tracks[0].source;
  audioCt.play();
 };

 useEffect(() => {
  let obj = tracks.find((e) => e.source == currentSrc);
  setObj(obj);
 }, [currentSrc]);

 return (
  <div>
   <Header />
   <LastAdded onTrackClick={onTrackClick} tracks={tracks} currentSrc={currentSrc} />
   <PlayBar audioCt={audioCt} isPlaying={isPlaying} currentObj={currentObj} onNextTrack={onNextTrack} onPrevTrack={onPrevTrack} />
  </div>
 );
};

export default Main;
