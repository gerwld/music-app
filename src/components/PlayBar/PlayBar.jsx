import React from "react";
import withClickOutside from "hoc/withClickOutside";
import tohms from "services/tohms";
import s from "./s.module.css";
import { withPlaybar } from "hoc/withPlayBar";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoShuffleOutline, IoRepeat, IoVolumeHighOutline, IoVolumeMediumOutline, IoVolumeLowOutline, IoVolumeOffOutline } from "react-icons/io5";
import { HiPlayCircle, HiPauseCircle, HiBackward, HiForward } from "react-icons/hi2";
import withLikes from "hoc/withLikes";
import { compose } from "redux";

const PlayBar = (props) => {
  const { 
    isPlaying, 
    currentObj, 
    onNextTrack, 
    onPrevTrack, 
    isShuffle, 
    onSetVolume, 
    onScrub, 
    toggleRepeat, 
    toggleShuffle, 
    togglePlay, 
    isRepeat, 
    progress, 
    duration, 
    volume,
    getFavoriteStateById,
    setTrackFromOrToFav
  } = props;
  const isFavorite = getFavoriteStateById(currentObj?.id)

  const setTrackFromOrToFavCallback = () => {
    setTrackFromOrToFav(currentObj?.id, isFavorite)
  }
  
 return (
  <>
   <div className={s.playbar}>
    <div className={s.playbar_content + " content_wrapper"}>
    <div className={s.current}>
     {/* Show preview if current object exist */}
     {currentObj ? 
      <>
       <FullCover currentObj={currentObj} />
       <div className={s.cr_creds}>
        <span>{currentObj.title}</span>
        <span>{currentObj.author}</span>
       </div>
       <button className={s.cr_fav} onClick={setTrackFromOrToFavCallback}> {isFavorite ? <AiFillHeart/> : <AiOutlineHeart/>}</button>
      </>
     : "" }
    </div>

    <div className={s.controls}>
     <div className={s.cs_top}>
     <button onClick={toggleShuffle} className={`${isShuffle ? 'active_btn' : ''}`}><IoShuffleOutline /></button>

      <div className={s.group}>
      <button onClick={() => onPrevTrack(isShuffle)}><HiBackward/></button>
      <button onClick={togglePlay} className={s.play_btn}>{isPlaying ? <HiPauseCircle/> : <HiPlayCircle/>}</button>
      <button onClick={() => onNextTrack(isShuffle)}><HiForward/></button>
      </div>

      <button onClick={toggleRepeat} className={`${isRepeat ? 'active_btn' : ''}`}><IoRepeat /></button>
      
     </div>
     <div className={s.cs_bottom}>
      <span>{progress ? tohms(progress * duration * 0.01) : ""}</span>
      <input type="range" min="0" step="0.1" value={progress} onInput={onScrub}></input>
      <span>{duration ? tohms(duration) : "0:00"}</span>
     </div>
    </div>
    <div className={s.volume}>
      <div className={s.volume_content}>
     <span>
      {volume === 100 ? <IoVolumeHighOutline/> : volume >= 50 ? <IoVolumeMediumOutline/> : volume > 0 ? <IoVolumeLowOutline/> : <IoVolumeOffOutline/>}
     </span>
     <input type="range" min="0" step="1" value={volume} onChange={onSetVolume}></input>
    </div>
    </div>
    </div>
   </div>
   <div className={s.gap} />
  </>
 );
};

const FullCover = withClickOutside(({ currentObj, refE, setShow, isShow }) => {
 return (
  <div ref={refE}>
   <div className={s.cr_cover}>
    <img src={currentObj.cover} alt={`${currentObj.title} - ${currentObj.author}`} />
    <button onClick={() => setShow(!isShow)} className={s.cr_expand}>
     expand
    </button>
   </div>

   {isShow ? 
    <div className={s.full_cover}>
     <div className={s.fc_wrapper}>
      <button onClick={() => setShow(false)}>close</button>
      <img src={currentObj.cover} alt={`${currentObj.title} - ${currentObj.author}`} />
     </div>
    </div>
   : "" }

  </div>
 );
});

export default compose(withPlaybar, withLikes)(PlayBar);
