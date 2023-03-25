import React from "react";
import ListElement from "components/content/ListElement";
import LoaderScreen from "components/LoaderScreen/LoaderScreen";
import { MdAccessTime } from "react-icons/md";
import s from "./s.module.css";

const LastAdded = ({ onTrackClick, tracks, currentSrc }) => {
 if (tracks) {
  return (
   <div className="conent">
    <div className={`${s.elem_header} content_wrapper`}>
     <div className={s.main}>
      <span className={s.id}>#</span>
      <div className={s.cover_1}></div>
      <div className={s.author_creds}>Name</div>
     </div>
     <span className={s.album}>Album</span>
     <span className={s.dur}>
      <MdAccessTime />
     </span>
    </div>

    {tracks?.map((e) => (
     <ListElement key={e.id + e.source} {...e} onTrackClick={onTrackClick} currentSrc={currentSrc} />
    ))}
   </div>
  );
 } else return <LoaderScreen />;
};

export default LastAdded;
