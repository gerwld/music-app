import React from 'react'
import ListElement from 'components/ListElement/ListElement';
import LoaderScreen from 'components/LoaderScreen/LoaderScreen';

const LastAdded = ({onTrackClick, tracks, currentSrc}) => {

  if(tracks) {
    return <div className='conent'>
      {tracks?.map(e => <ListElement 
                        key={e.id + e.source}
                        {...e}
                        onTrackClick={onTrackClick}
                        currentSrc={currentSrc}
                        />)}
    </div>
  } else return <LoaderScreen />

}

export default LastAdded