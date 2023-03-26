import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delFavorite, setFavorite } from 'redux/reducers/glob-reducer';

const withLikes = (Component) => {
  return (props) => {
    const d = useDispatch();
    const { favorites } = useSelector(({ global }) => ({
     favorites: global.favorites
    }));

    const setTrackFromOrToFav = (id, isFavorite) => {
      isFavorite ?
        d(delFavorite(id))
      : d(setFavorite(id))
     }

     const getFavoriteStateById = (id) => {
      return (favorites.indexOf(id) !== -1);
     }

     //set fav tracks to localStorage
     React.useEffect(() => {
      if(favorites?.length > 0) {
        let current = localStorage.getItem('fav_tracks');
        if(!current || current !== JSON.stringify(favorites)) {
          localStorage.setItem('fav_tracks', JSON.stringify(favorites))
          console.log('Setted fav_tracks to localStorage');
          }
      }
     }, [favorites])
    
     return <Component {...props}
      getFavoriteStateById={getFavoriteStateById.bind(this)}
      setTrackFromOrToFav={setTrackFromOrToFav.bind(this)}
    />

  }
}

export default withLikes;