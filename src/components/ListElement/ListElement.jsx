import React, { useEffect } from "react";
import hideImg from "../../services/hideImg";
import s from "./ListElement.module.css";

const ListElement = ({ author, title, id, cover, duration, album, onTrackClick, source, currentSrc }) => {

 const onTrackClickAction = () => {
  onTrackClick(source);
 }

 const isPlaying = () => {
  return source == currentSrc ? s.isplaying : "";
 }

 useEffect(() => {

 }, [currentSrc])

 return (
  <div className={`${s.elem} ${isPlaying()}`} onClick={onTrackClickAction}>
   <div className={s.main}>
    <span className={s.id}>{id}</span>
    <div className={s.cover}>
     <img src={cover} alt={`${author} - ${title}`} onError={hideImg} />
    </div>
    <span>
     {author} - {title}
    </span>
   </div>
   <span className={s.album}>{album}</span>
   <span className={s.dur}>{duration}</span>
   <button className={s.cnt_btn}>more</button>
  </div>
 );
};

ListElement.defaultProps = {
 author: "Untitled Author",
 title: "Untitled Title",
 ind: "-",
 cover: "Not set",
 duration: "-",
 album: "Not set",
};

export default ListElement;
