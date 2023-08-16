import React, { useRef } from 'react';
import './Player.css'
import {BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsSkipEndCircleFill, BsFillSkipEndCircleFill} from 'react-icons/bs';
const Player = ({audioElem, isplaying, setisplaying, currentSong, setCurrentSong, songs})=> {

  const clickRef = useRef();

  const PlayPause = ()=>
  {
    setisplaying(!isplaying);

  }


  const checkWidth = (e)=>
  {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;

    const divprogress = offset / width * 200;
    audioElem.current.currentTime = divprogress / 200 * currentSong.length;

  }

  const skipBack = ()=>
  {
    const index = songs.findIndex(x=>x.title === currentSong.title);
    if (index === 0)
    {
      setCurrentSong(songs[songs.length - 1])
    }
    else
    {
      setCurrentSong(songs[index - 1])
    }
    audioElem.current.currentTime = 0;
    
  }


  const skiptoNext = ()=>
  {
    const index = songs.findIndex(x=>x.title === currentSong.title);

    if (index === songs.length-1)
    {
      setCurrentSong(songs[0])
    }
    else
    {
      setCurrentSong(songs[index + 1])
    }
    audioElem.current.currentTime = 0;
    
  }
 

  return (
    <div>
    {/* {data.getSongs.map(song => ( */}
    <div className='player_container'>
      <div className="title">
      <p>{currentSong.title}</p>
      <p>{currentSong.artist}</p><br/>
      <img src={currentSong.photo} className='currImg' />     
      <div className="navigation">
        <div className="navigation_wrapper" onClick={checkWidth} ref={clickRef}>
          <div className="seek_bar" style={{width: `${currentSong.progress+"%"}`}}></div>
        </div>
      </div></div>
      <div className="controls">
        <BsFillSkipStartCircleFill style={{ fontSize: '2rem'  }} onClick={skipBack}/>
        {isplaying ? <BsFillPauseCircleFill  onClick={PlayPause} style={{ fontSize: '3rem', margin:'1rem' }}/> : <BsFillPlayCircleFill style={{ fontSize: '3rem', margin:'1rem' }} onClick={PlayPause}/>}
        <BsFillSkipEndCircleFill style={{ fontSize: '2rem' }} onClick={skiptoNext}/>        
      </div>
    </div>
      {/* ))} */}
      </div>
  
  )
}

export default Player