import React from "react";
import s from './s.module.css';

const ProgressRange = ({ value, onChange, step }) => {
 return (
  <div className={s.progressbar_wrapper}>
   <input 
   type="range" 
   min="0" 
   step={step} 
   value={value} 
   onInput={onChange} 
   onKeyDown={(e) => e.preventDefault()}
   />

   <div className={s.progressbar_progress} style={{ width: (value / step) + "%" }}></div>
  </div>
 );
};

export default ProgressRange;
