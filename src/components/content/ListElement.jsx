import React, { useEffect } from "react";
import hideImg from "services/hideImg";
import s from "./s.module.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const ListElement = ({ author, title, id, cover, duration, album, onTrackClick, source, currentSrc }) => {
 const { isPlaying } = useSelector(({ global }) => ({
  isPlaying: global.isPlaying,
 }));

 const onTrackClickAction = () => {
  onTrackClick(source);
 };

 const isSelected = () => {
  return source == currentSrc ? s.isplaying : "";
 };

 useEffect(() => {}, [currentSrc]);

 return (
  <div className={`${s.elem} ${isSelected()} content_wrapper`} onClick={onTrackClickAction}>
   <div className={s.main}>
    <span className={s.id}>
      {source == currentSrc ? 
      <span className={s.play_btn}>{isPlaying ? <BsPauseFill /> : <BsPlayFill />}</span> 
      : <span>{id}</span>}
    </span>
    <div className={s.cover}>
     <img src={cover} alt={`${author} - ${title}`} onError={hideImg} />
    </div>
    <div className={s.author_creds}>
     <span>{author}</span>
     <span>{title}</span>
    </div>
   </div>
   <span className={s.album}>{album}</span>
   <span className={s.dur}>{duration}</span>
   <button className={s.cnt_btn}>
    <AiOutlineHeart />
   </button>
   <button className={s.cnt_btn}>
    <BiDotsHorizontalRounded />
   </button>
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
