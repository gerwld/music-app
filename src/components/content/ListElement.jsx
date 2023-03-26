import React, { useEffect } from "react";
import hideImg from "services/hideImg";
import s from "./s.module.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import withLikes from "hoc/withLikes";

const ListElement = ({ author, title, id, cover, duration, album, onTrackClick, source, currentSrc, setTrackFromOrToFav, isFavorite }) => {
  const d = useDispatch();
 const { isPlaying } = useSelector(({ global }) => ({
  isPlaying: global.isPlaying,
 }));

 const onTrackClickAction = () => {
  onTrackClick(source);
 };

 const setTrackFromOrToFavCallback = () => {
  setTrackFromOrToFav(id, isFavorite)
 }


 const isSelected = () => {
  return source == currentSrc ? s.isplaying : "";
 };

 useEffect(() => {}, [currentSrc]);

return (
  <div className={`${s.elem} ${isSelected()} content_wrapper`}>

   <div className={s.main}  onClick={onTrackClickAction}>
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

   <button onClick={setTrackFromOrToFavCallback} className={s.cnt_btn}>
   {isFavorite ? <AiFillHeart/> :  <AiOutlineHeart />}
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
