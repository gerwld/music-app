import React, { useEffect, useState } from "react";
import { setCurrent, setPlaying, setShuffleIds } from "redux/reducers/glob-reducer";
import { useDispatch, useSelector } from "react-redux";
import shuffle from "services/shuffle";

const withAudio = (Component) => {

  return (props) => {

  const d = useDispatch();
  const audioCt = React.useRef(new Audio()).current;
 
  const [isShuffle, setShuf] = useState(false);
  const [currentSrc, setSrc] = useState(null);
  const { isPlaying, tracks, currentObj, shuffleIds } = useSelector(({ global }) => ({
   isPlaying: global.isPlaying,
   tracks: global.tracks,
   currentObj: global.currentTrack,
   shuffleIds: global.shuffleIds,
  }));
 
  const onTrackClick = (source) => {
   setSrc(source);
   audioCt.src = source;
   audioCt
    .play()
    .then(updateMetadata(currentObj))
    .catch((e) => console.log(e));
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
   } else if (currentObj) {
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
   navigator.mediaSession.setActionHandler("previoustrack", () => onPrevTrack(isShuffle));
   navigator.mediaSession.setActionHandler("nexttrack", () => onNextTrack(isShuffle));
  };
 
  useEffect(() => {
   let obj = tracks.find((e) => e.source == currentSrc);
   if (obj) {
    if (obj !== currentObj) {
     d(setCurrent(obj));
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
    d(setPlaying(true));
   };
   const setPause = () => {
    d(setPlaying(false));
   };
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
    d(setShuffleIds(shuffleIds));
   }
  }, [isShuffle]);


  
    return  <Component 
      {...{...props, 
      onTrackClick,
      tracks,
      currentSrc,
      audioCt,
      isPlaying,
      currentObj,
      onNextTrack,
      onPrevTrack,
      initSet,
      isShuffle,
      setShuf
    }}/>
  }

}

export default withAudio;