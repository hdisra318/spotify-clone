import { useDataLayerValue } from '../DataLayer';
import './Body.css';

import Header from './Header';
import SongRow from './SongRow';

// Icons
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Body({spotify}) {
    
    // Discover weekly information
    const [{discover_weekly, songs}, dispatch] = useDataLayerValue();

    // To play songs from the playlist
    const playPlaylist = id => {
        
        spotify.play({
            context_uri: 'spotify:playlist:1GZrrgQO66I8PcAdmsLc5V'
        }).then(res => {
            spotify.getMyCurrentPlayingTrack().then(track => {
                dispatch({
                    type: 'SET_ITEM',
                    item: track.item
                });

                dispatch({
                    type: 'SET_PLAYING',
                    playing: true
                });
            });
        })
    }


    // Plays a song chosen
    const playSong = id => {
        console.log(id)
        spotify.play({
                uris: [`spotify:track:${id}`]
            }).then(res => {
                console.log(res)
                spotify.getMyCurrentPlayingTrack().then(track => {
                    console.log(track)
                    dispatch({
                        type: "SET_ITEM",
                        item: track.item,
                    });
                    dispatch({
                        type: "SET_PLAYING",
                        playing: true,
                    });
                });
        });
    };


    return (
        <div className='body'>
            <Header spotify={spotify} />

            <div className='body__info'>
                <img src={discover_weekly?.images[0].url} alt='discover weekly image' />

                <div className='body__infoText'>
                    <strong>PLAYLIST</strong>
                    <h2>Discover Weekly</h2>
                    <p>{discover_weekly?.description}</p>
                </div>
            </div>

            {/* List of songs */}
            <div className='body__songs'>
                <div className='body__icons'>
                    <PlayCircleFilledIcon className='body__shuffle' onClick={playPlaylist}/>
                    <FavoriteIcon fontSize='large' className='body__favorite' />
                    <MoreHorizIcon />
                </div>

                {/* Songs */}
                {songs?.tracks?.items.map(item => (
                    <SongRow track={item.track} playSong={playSong} key={item.id} />
                ))}
            </div>
        </div>
    )
}
