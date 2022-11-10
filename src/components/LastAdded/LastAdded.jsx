import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import ListElement from '../ListElement/ListElement';
import LoaderScreen from '../LoaderScreen/LoaderScreen';

const LastAdded = () => {
  const {tracks} = useSelector(({global}) => ({
    tracks: global.tracks
  }));

  if(tracks) {
    return <div className='conent'>
      {tracks?.map(e => <ListElement 
                        key={e.id + e.source}
                        {...e}
                        />)}
    </div>
  } else return <LoaderScreen />

}

export default LastAdded