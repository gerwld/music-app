import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import shuffle from "../../services/shuffle";
import Header from "../Header/Header";
import LastAdded from "../LastAdded/LastAdded";
import PlayBar from "../PlayBar/PlayBar";

const audioCt = new Audio();

const Main = () => {
 const [isPlaying, setPlay] = useState(false);
 const [isShuffle, setShuf] = useState(false);
 const [currentSrc, setSrc] = useState(null);
 const [currentObj, setObj] = useState(null);
 const [shuffleIds, setShufIds] = useState(null);
 const { tracks } = useSelector(({ global }) => ({
  tracks: global.tracks,
 }));

 const onTrackClick = (source) => {
  setSrc(source);
  audioCt.src = source;
  audioCt.play();
 };

 const onNextTrack = (isShuffle) => {
  console.log(isShuffle);
  //If shuffle - find index of next id, if its bigger than array start from index 0 and play it.
  if (isShuffle && currentObj) {
   let currentId = currentObj.id;
   let nextIdIndex = shuffleIds.indexOf(currentId) + 1;
   let nextId;
   if (nextIdIndex < shuffleIds.length) {
    nextId = shuffleIds[nextIdIndex];
   } else {
    nextId = shuffleIds[0];
   }
   let currentTrack = tracks.find((e) => e.id === nextId);
   setObj(currentTrack);
   onTrackClick(currentTrack.source);
  } 
  else if (currentObj) {
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
  audioCt.play().catch((e) => 0);
 };

 const updateMetadata = (currentObj) => {
  navigator.mediaSession.metadata = new MediaMetadata({
   title: currentObj.title,
   artist: currentObj.author,
   artwork: [{ src: currentObj.cover, sizes: "128x128", type: "image/png" }],
  });
  navigator.mediaSession.setActionHandler('previoustrack', () => onPrevTrack(isShuffle));
  navigator.mediaSession.setActionHandler('nexttrack', () => onNextTrack(isShuffle));
 }

 useEffect(() => {
  let obj = tracks.find((e) => e.source == currentSrc);
  if (obj) {
   //localStorage, local state
   setObj(obj);
   localStorage.setItem("last_played", JSON.stringify(obj));
   //mediaSession api
   if (!audioCt.paused) {
    updateMetadata(obj);
   }
  }
 }, [currentSrc, currentObj, isShuffle, shuffleIds, isPlaying]);

 //localstorage
 useEffect(() => {
  let last_played = localStorage.getItem("last_played");
  if (last_played) {
   let source = JSON.parse(last_played).source;
   setSrc(source);
   audioCt.src = source;
  }

 }, []);

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

 useEffect(() => {
  if (isShuffle) {
   let array = Array.from({ length: tracks.length }, (_, i) => i + 1);
   let shuffleIds = shuffle(array);
   setShufIds(shuffleIds);
  }
 }, [isShuffle]);

 return (
  <div>
   <Header />
   <LastAdded onTrackClick={onTrackClick} tracks={tracks} currentSrc={currentSrc} />
   <PlayBar
    audioCt={audioCt}
    isPlaying={isPlaying}
    currentObj={currentObj}
    onNextTrack={onNextTrack}
    onPrevTrack={onPrevTrack}
    initSet={initSet}
    isShuffle={isShuffle}
    setShuf={setShuf}
   />
  </div>
 );
};

export default Main;
