import React from "react";
import s from "./s.module.css";

const PlayBar = () => {
 return (
  <>
   <div className={s.playbar}>
    <div className={s.controls}>
     <button>prev</button>
     <button>play</button>
     <button>next</button>
    </div>
   </div>
   <div className={s.gap} />
  </>
 );
};

export default PlayBar;
