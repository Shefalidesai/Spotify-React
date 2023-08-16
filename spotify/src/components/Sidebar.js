import './Sidebar.css';
import { getSongList } from './query';
import { useQuery } from '@apollo/client';
import { useRef, useState, useEffect  } from 'react';
import { getSongs } from './Player/audios';
import Player from './Player/Player';

function Sidebar(){

  const {data}= useQuery(getSongList,{
    variables:{
      "playlistId":1
    }
  });
  console.log(data);
  const [selectedSong, setSelectedSong] = useState(null);

  const handleSongClick = (song) => {
    setSelectedSong(song);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredSongs = data.getSongs.map(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [songs, setSongs] = useState(getSongs.url);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(getSongs[4]);

  const audioElem = useRef();

  const handleClick = () => {

    console.log('Div clicked!');
  };

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    }
    else {
      audioElem.current.pause();
    }
  }, [isplaying])

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({ ...currentSong, "progress": ct / duration * 100, "length": duration })

  }

  
  console.log(currentSong.url);
  
    return (
      <>  
      <div className='container'>
      <div>
        <header>For You</header>
        <div className="wrap">       
            <input type="text" className="searchTerm" placeholder="Search Song, Artist"  value={searchQuery} onChange={handleSearch} onClick={filteredSongs} />
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 22" fill="none"  style={{ marginLeft: '1vh' }}>
              <path d="M20.6668 20.6666L15.6668 15.6666L20.6668 20.6666ZM1.33343 9.66665C1.33343 5.06427 5.06439 1.33331 9.66676 1.33331C14.2692 1.33331 18.0001 5.06427 18.0001 9.66665C18.0001 14.269 14.2692 18 9.66676 18C5.06439 18 1.33343 14.269 1.33343 9.66665Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>  
            <ul>

      </ul>
    
        </div>
       {data.getSongs.map(song => (   
            
        <div className='list' >
        
          <li className='frame' key={song._id} onClick={() => handleSongClick(song)}> 
              <img src={song.photo}  alt='playlist-img' className='songName-img' />
             <div className='songName'><p>{ song.title }</p>
            
             <p className='artist'>{ song.artist }</p>
             <span className='duration'>{song.duration}</span> 
                     
             </div>  
            </li>
          </div>       
       ))}
     </div>
     <div className='player'> 

      <audio src={currentSong.url} ref={audioElem} onTimeUpdate={onPlaying} />
      <Player songs={songs} setSongs={setSongs} isplaying={isplaying} setisplaying={setisplaying} audioElem={audioElem} currentSong={currentSong} setCurrentSong={setCurrentSong} />
     </div></div>
        </>

    );
       }


export default Sidebar;