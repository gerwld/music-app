import React from 'react'

const Btn = ({children, click, style, isActive}) => {
  return <button type='button' onClick={click} className={`${style} ${isActive ? 'active_btn' : ''}`} >
    {children}
  </button>
}

export default Btn;