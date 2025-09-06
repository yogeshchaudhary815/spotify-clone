import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const volumeBg = useRef();
    const volumeBar = useRef();

    const [track,setTrack] = useState(songsData[0])
    const [playStatus,setPlayStatus] = useState(false);
    const [time,setTime] = useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime: {
            second:0,
            minute:0
        }
    })
    const [volume, setVolume] = useState(0.5)
    const [previousVolume, setPreviousVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true)
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false)
    }

    const playWithId = async (id) => {
        await  setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const previous = async () => {
        if(track.id > 0){
            await setTrack(songsData[track.id - 1])
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    // Volume change करने का function
    const changeVolume = (newVolume) => {
        if (audioRef.current) {
            const volumeValue = Math.max(0, Math.min(1, newVolume)); // 0-1 range में रखें
            setVolume(volumeValue);
            audioRef.current.volume = volumeValue;
            
            // Volume bar की width update करें
            if (volumeBar.current) {
                volumeBar.current.style.width = (volumeValue * 100) + "%";
            }
            
            // Muted state update करें
            setIsMuted(volumeValue === 0);
        }
    };

    // Volume bar पर click करके volume set करना
    const seekVolume = (e) => {
        if (volumeBg.current) {
            const volumeBgElement = volumeBg.current;
            const rect = volumeBgElement.getBoundingClientRect();
            const clickX = e.nativeEvent.offsetX;
            const volumeBgWidth = rect.width;
            
            const newVolume = clickX / volumeBgWidth;
            changeVolume(newVolume);
        }
    };

    // Mute/Unmute toggle करना
    const toggleMute = () => {
        if (isMuted) {
            // Unmute - previous volume restore करें
            changeVolume(previousVolume);
        } else {
            // Mute - current volume save करके 0 करें
            setPreviousVolume(volume);
            changeVolume(0);
        }
    };

    // Audio element का volume set करना जब component load हो
     useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, []);
    

    const next = async () => {
        if(track.id < songsData.length -1){
            await setTrack(songsData[track.id + 1])
            await audioRef.current.play();
            setPlayStatus(true);
        }
    }

    const seekSong = async (e) => {
    //    console.log(e);
        audioRef.current.currentTime = ( (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                //   console.log((Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100))+"%")

                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60)
                    }
                })
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100) + "%");
            }
        })
    }, [])


    const contextValue = {
        seekBar,
        seekBg,
        audioRef,
        track,setTrack,
        playStatus,setPlayStatus,
        time,setTime,
        play,pause,
        playWithId,
        previous, next,
        seekSong,
        // Volume related values और functions
        volume, setVolume,
        changeVolume,
        toggleMute,
        isMuted,
        seekVolume,
        volumeBg,
        volumeBar,
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;