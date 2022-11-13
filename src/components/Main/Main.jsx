import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shuffle from "services/shuffle";

import Header from "components/Header/Header";
import LastAdded from "components/LastAdded/LastAdded";
import PlayBar from "components/PlayBar/PlayBar";
import { setCurrent, setPlaying, setShuffleIds } from "redux/reducers/glob-reducer";


const Main = () => {
 const disp = useDispatch();
 const audioCt = React.useRef(new Audio()).current;

 const [isShuffle, setShuf] = useState(false);
 const [currentSrc, setSrc] = useState(null);
 const { isPlaying, tracks, currentObj, shuffleIds } = useSelector(({ global }) => ({
  isPlaying: global.isPlaying,
  tracks: global.tracks,
  currentObj: global.currentTrack,
  shuffleIds: global.shuffleIds
 }));

 const onTrackClick = (source) => {
  setSrc(source);
  audioCt.src = source;
  audioCt.play().then(updateMetadata(currentObj)).catch(e => console.log(e));
 };

 const onNextTrack = (isShuffle) => {
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
   if(obj !== currentObj) {
    disp(setCurrent(obj));
    localStorage.setItem("last_played", JSON.stringify(obj));
   }
   if (!audioCt.paused) {
    updateMetadata(obj);
   }
  }
 }, [currentSrc, isShuffle, shuffleIds, currentObj, isPlaying]);

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
  const setPlay = () => {
   disp(setPlaying(true));
  }
  const setPause = () => {
   disp(setPlaying(false));
  }
  audioCt.addEventListener("play", setPlay);
  audioCt.addEventListener("pause", setPause);

  return () => {
   audioCt.removeEventListener("play", setPlay);
   audioCt.removeEventListener("pause", setPause);
  };
 }, []);

 useEffect(() => {
  if (isShuffle) {
   let array = Array.from({ length: tracks.length }, (_, i) => i + 1);
   let shuffleIds = shuffle(array);
   disp(setShuffleIds(shuffleIds));
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
