const SET_CURRENT = "music-app/glob-reducer/SET_CURRENT";
const SET_SHUFFLE_IDS = "music-app/glob-reducer/SET_SHUFFLE_IDS";
const SET_PLAYING = "music-app/glob-reducer/SET_PLAYING";

export const setCurrent = (currentTrack) => ({ type: SET_CURRENT, currentTrack });
export const setShuffleIds = (ids) => ({ type: SET_SHUFFLE_IDS, ids });
export const setPlaying = (isPlaying) => ({ type: SET_PLAYING, isPlaying });

let init = {
 currentTrack: null,
 shuffleIds: null,
 isPlaying: false,
 tracks: [
  {
   id: 1,
   title: "Oh My (feat. Moby)",
   author: "Luude/Issey Cross/Moby",
   cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/1.jpeg",
   source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/1.mp3",
   duration: "4:15",
  },
  {
   id: 2,
   title: "Vanishing Point",
   author: "Synkro",
   cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/2.jpeg",
   source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/2.mp3",
   duration: "03:13",
  },
  {
   id: 3,
   title: "Dendrometry",
   author: "Klangphonics",
   cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/3.jpeg",
   source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/3.mp3",
   duration: "04:58",
  },
  {
   id: 4,
   title: "No Doubt",
   author: "SpectraSoul",
   cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/4.jpeg",
   source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/4.mp3",
   duration: "02:40",
  },
  {
   id: 5,
   title: "Eva - Original Mix",
   author: "Ishome",
   cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/5.jpeg",
   source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/5.mp3",
   duration: "06:05",
  },
  {
   id: 6,
   title: "Logic1000 & Big Ever Remix",
   author: "Moderat/Logic1000/Big Ever",
   cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/6.jpeg",
   source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/6.mp3",
   duration: "04:15",
  },
  {
   id: 7,
   title: "Lulerain",
   author: "Etherwood",
   cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/7.jpeg",
   source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/7.mp3",
   duration: "04:44",
  },
  {
   id: 8,
   title: "Ghost",
   author: "Delta Heavy",
   cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/8.jpeg",
   source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/8.mp3",
   duration: "04:05",
  },
  {
   id: 9,
   title: "Unity",
   author: "Subtension",
   cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/9.jpeg",
   source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/9.mp3",
   duration: "04:52",
  },
  {
   id: 10,
   title: "Back Once",
   author: "Stillhead",
   cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/10.jpeg",
   source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/10.mp3",
   duration: "04:52",
  },
  {
    id: 11,
    title: "2far",
    author: "boerd",
    cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/11.jpeg",
    source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/11.mp3",
    duration: "04:33",
   },
   {
    id: 12,
    title: "Cardamom Mountains",
    author: "C41",
    cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/12.jpeg",
    source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/12.mp3",
    duration: "04:06",
   },
   {
    id: 13,
    title: "Escape This",
    author: "Himalia",
    cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/13.jpeg",
    source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/13.mp3",
    duration: "06:21",
   },
   {
    id: 14,
    title: "By the Way",
    author: "Apex",
    cover: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/album_covers/14.jpeg",
    source: "https://raw.githubusercontent.com/gerwld/host-data/master/music_content/14.mp3",
    duration: "04:37",
   },
 ],
};

const globReducer = (state = init, action) => {
 switch (action.type) {
  case SET_CURRENT:
   return {
    ...state,
    currentTrack: action.currentTrack
   };
  case SET_SHUFFLE_IDS:
    return {
      ...state,
      shuffleIds: action.ids
    }
  case SET_PLAYING:
    return {
      ...state,
      isPlaying: action.isPlaying
    }
  default:
   return state;
 }
};

export default globReducer;
