import React from "react";
import s from "./s.module.css";

const Header = () => {
 return (
  <>
   <div className={s.header}>
    <span className={s.title}>Music App</span>
   </div>
   <div className={s.gap} />
  </>
 );
};

export default Header;
