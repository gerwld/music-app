import React, { useEffect } from 'react'
import AudioService from '../../api/AudioService'

const LastAdded = () => {
 useEffect(() => {
  let data = AudioService.getAudio();
  data.then(e => {
   console.log(e.data);
  })
 }, [])
  return (
    <div>LastAdded</div>
  )
}

export default LastAdded