import React from "react";
import s from "./s.module.css";

const Header = () => {
 return (
  <>
   <section className={s.header}>
    <div className={`${s.header_content} content_wrapper`}>
     <span className={s.title}>Music App</span>
    </div>
   </section>
   <div className={s.gap} />
  </>
 );
};

export default Header;
