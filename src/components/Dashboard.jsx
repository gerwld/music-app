import React from "react";
import { Header, LastAdded, PlayBar } from "components";
import withAudio from "hoc/withAudio";

const Main = (p) => (
 <>
  <Header />
  <LastAdded onTrackClick={p.onTrackClick} tracks={p.tracks} currentSrc={p.currentSrc} />
  <PlayBar audioCt={p.audioCt} isPlaying={p.isPlaying} currentObj={p.currentObj} onNextTrack={p.onNextTrack} onPrevTrack={p.onPrevTrack} initSet={p.initSet} isShuffle={p.isShuffle} setShuf={p.setShuf} />
 </>
);

export default withAudio(Main);
