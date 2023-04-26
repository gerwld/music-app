import React from 'react'
import withClickOutside from "hoc/withClickOutside";
import s from './s.module.css';

const FullCover = ({ currentObj, refE, setShow, isShow }) => {
  const toggleShow = () => setShow(!isShow)
 return (
  <div ref={refE}>
   <div className={s.cr_cover}>
    <img src={currentObj.cover} alt={`${currentObj.title} - ${currentObj.author}`} />
    <button onClick={toggleShow} className={s.cr_expand}>expand</button>
   </div>

   {isShow &&
    <div className={s.full_cover}>
     <div className={s.fc_wrapper}>
      <button onClick={toggleShow}>close</button>
      <img src={currentObj.cover} alt={`${currentObj.title} - ${currentObj.author}`} />
     </div>
    </div>}
  </div>
 );
};

export default withClickOutside(FullCover);