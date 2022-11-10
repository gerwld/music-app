import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import ListElement from "../ListElement/ListElement";
import PlayBar from "../PlayBar/PlayBar";

const Main = () => {
 const [trackUrl, setTrack] = useState(null);
 const audioApi = new Audio(trackUrl);

 useEffect(() => {
  setTrack("/Trentemøller - Moan.mp3");
 }, []);
 return (
  <div>
   <Header />
   <ListElement />
   <PlayBar audioApi={audioApi} />
  </div>
 );
};

export default Main;
