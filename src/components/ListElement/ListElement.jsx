import React from "react";
import hideImg from "../../services/hideImg";
import s from "./ListElement.module.css";

const ListElement = ({ author, title, id, cover, duration, album }) => {
 return (
  <div className={s.elem}>
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
