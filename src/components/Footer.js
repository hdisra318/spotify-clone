import './Footer.css';

import { useEffect } from 'react';

// Icons
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import { Box, Grid, Slider } from '@mui/material';
import { useDataLayerValue } from '../DataLayer';

export default function Footer({spotify}) {

  const [{token, playing, item}, dispatch] = useDataLayerValue();

  useEffect(() => {
    
    spotify.getMyCurrentPlaybackState().then(track => {
    console.log(track);
    
    dispatch({
      type: "SET_PLAYING",
      playing: track.is_playing,
    });
    
    dispatch({
      type: "SET_ITEM",
      item: track.item,
    });

    });
  }, [spotify]);

    
  // Pause event
  const handlePlayPause = () => {

    if (playing) {

      spotify.pause();
      dispatch({
        type: "SET_PLAYING",
        playing: false,
      });

    } else {

      spotify.play();
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });

    }

  };
    

  // Skips to the next song
  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then(track => {

      dispatch({
        type: "SET_ITEM",
        item: track.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };
  
  
  // Skips to the previous song
  const skipPrevious = () => {

    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then(track => {
    
      dispatch({
        type: "SET_ITEM",
        item: track.item,
      });
    
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };


  return (
        <footer className='footer'> 
            <div className='footer__left'>
                {/* <img className='footer__albumLogo' src={songs?.tracks?.items[97].track.album.images[0].url} alt='album logo' /> */}
                <img
                    className="footer__albumLogo"
                    src={item?.album.images[0].url}
                    alt={item?.name}
                    />
                
                {item ? (
                    <div className='footer__songInfo'>
                        <h4>{item.name}</h4>
                        <p>{item.artists?.map(artist => artist.name).join(', ')}</p>
                    </div>
                ) : (
                    <div className='footer__songInfo'>
                        <h4>No song is playing</h4>
                        <p>-</p>
                    </div>
                )}
            </div>
            
            <div className='footer__center'>
                <ShuffleIcon className='footer__green' />

                <SkipPreviousIcon className='footer__icon' onClick={skipPrevious} />

                {playing ? (
                    <PauseCircleOutlineIcon
                        onClick={handlePlayPause}
                        fontSize='large'
                        className='footer__icon'
                    />
                ) : (

                    <PlayCircleOutlineIcon className='footer__icon' fontSize='large' />
                )}

                <SkipNextIcon className='footer__icon' onClick={skipNext} />
                <RepeatIcon className='footer__green' />
            </div>

            <div className='footer__right'>
                <Grid container spacing={2} className='footer__rightGrid'>
                    <Grid item>
                        <PlaylistPlayIcon className='footer__rightIcon'/>
                    </Grid>
                    <Grid item>
                        <VolumeDownIcon className='footer__rightIcon'/>
                    </Grid>
                    <Grid item>
                        <Box sx={{ width: 200 }}>
                            <Slider aria-label="Volume" defaultValue={50} className='footer__rightIcon'/>
                        </Box>
                    </Grid>
                    <Grid item>
                        <VolumeUpIcon className='footer__rightIcon' />
                    </Grid>
                </Grid>
            </div>
        </footer>
  )
}
