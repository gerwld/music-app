import React from "react";
import s from "./ListElement.module.css";

const ListElement = ({ author, title, ind, album, duration }) => {
 return (
  <div className={s.elem}>
   <div className={s.main}>
    <span>{ind}</span>
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
 album: "Not set",
 duration: "-",
};

export default ListElement;
