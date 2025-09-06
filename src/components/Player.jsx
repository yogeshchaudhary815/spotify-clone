import React, { useContext } from 'react'
import { assets, songsData } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

function Player() {

    const { 
        seekBar,
        seekBg, 
        playStatus,play,pause,
        track,time, 
        previous, next , seekSong,
        volume,
        toggleMute,
        isMuted,
        seekVolume,
        volumeBg,volumeBar
    } = useContext(PlayerContext)
    // console.log(seekbar);
    

  return (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
    <div className='hidden lg:flex items-center gap-4'>
        <img  className='w-12' src={track.image} alt="" />
        <div>
            <p>{track.name}</p>
            <p>{track.desc.slice(0,12)}</p>
        </div>
    </div>
    <div className='flex flex-col items-center gap-1 m-auto'>
        <div className='flex gap-4'>
            <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="" />
            <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt="" />
            {/* <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="" />
            <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt="" /> */}

            {playStatus ? <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt="" /> : <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="" />}
            <img onClick={ next } className='w-4 cursor-pointer' src={assets.next_icon} alt="" />
            <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="" />
        </div>
        <div className='flex items-center gap-5'>
            <p>{time.currentTime.minute}:{time.currentTime.second}</p>
            <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                <hr ref={seekBar}  className='h-1 w-0 border-none bg-red-800 rounded-full' />
            </div>
            <p>{time.totalTime.minute}:{time.totalTime.second}</p>
        </div>
    </div>
    <div className='hidden lg:flex items-center gap-2 opacity-75'>
        <img className='w-4' src={assets.play_icon} alt="" />
        <img className='w-4' src={assets.mic_icon} alt="" />
        <img className='w-4' src={assets.queue_icon} alt="" />
        <img className='w-4' src={assets.speaker_icon} alt="" />
        <img className='w-4' src={assets.volume_icon} alt="" />
         {/* Volume Slider */}
                    <div className=''>
                        {/* Volume Bar Background */}
                        <div 
                            ref={volumeBg}
                            onClick={seekVolume}
                            className='w-20 h-1 bg-gray-400 rounded-full cursor-pointer hover:h-[6px] transition-all duration-200'
                        >
                            {/* Volume Progress Bar */}
                            <div 
                                ref={volumeBar}
                                className='h-full bg-red-600 rounded-full transition-all duration-200 hover:bg-green-400'
                                style={{width: `${volume * 100}%`}}
                            ></div>
                        </div>
                        
                        {/* Volume Tooltip - hover पर show होता है */}
                        <div className='absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                            {Math.round(volume * 100)}%
                        </div>
                    </div>
        <img className='w-4' src={assets.mini_player_icon} alt="" />
        <img className='w-4' src={assets.zoom_icon} alt="" />
    </div>
    </div>
  )
}

export default Player