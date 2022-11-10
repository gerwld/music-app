import React from "react";
import s from "./ListElement.module.css";

const ListElement = ({ author, title, ind, album, duration }) => {
 return (
  <div class={s.elem}>
   <div class={s.main}>
    <span>{ind}</span>
    <span>
     {author} - {title}
    </span>
   </div>
   <span class={s.album}>{album}</span>
   <span class={s.dur}>{duration}</span>
   <button class={s.cnt_btn}>more</button>
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
