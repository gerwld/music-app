import React from "react";
import { Header, LastAdded, Playbar } from "components";
import withAudio from "hoc/withAudio";
import PlaybarMobile from "components/Playbar/PlaybarMobile";
import { useWindowWidth } from "@react-hook/window-size";

const Dashboard = ({ onTrackClick, tracks, currentSrc, audioCt, isPlaying, currentObj, onNextTrack, onPrevTrack, initSet, isShuffle, setShuf }) => {
 const onlyWidth = useWindowWidth();

 const playbarProps = {
  audioCt,
  isPlaying,
  currentObj,
  onNextTrack,
  onPrevTrack,
  initSet,
  isShuffle,
  setShuf,
 };
 return (
  <>
   <Header />
   <LastAdded {...{ onTrackClick, tracks, currentSrc }} />

   {onlyWidth > 768 ? 
   <Playbar {...playbarProps} /> 
   : <PlaybarMobile {...playbarProps} />}
  </>
 );
};

export default withAudio(Dashboard);
