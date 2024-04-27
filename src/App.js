import Login from './Login';
import './App.css';
import { useEffect, useState } from 'react';
import { getTokenFromUrl } from './spotify';
import Player from './Player';
import { useDataLayerValue } from './DataLayer';

import SpotifyWebApi from 'spotify-web-api-js';

// To communicate with the API
const spotify = new SpotifyWebApi();

function App() {
  
  const [{user, token}, dispatch] = useDataLayerValue();

  useEffect(() => {
    
    const hash = getTokenFromUrl();
    window.location.hash = "";

    // Access token
    const _token = hash.access_token;

    if(_token) {
      
      dispatch({
        type: "SET_TOKEN",
        token: _token
      })

      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user
        })
      })

      // Gets the playlists of the user
      spotify.getUserPlaylists().then(playlists => {
        console.log(playlists.items.shift())
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists
        })
      });


      // Gets the 'discover weekly'
      spotify.getPlaylist('37i9dQZEVXcJP618SIQTWc').then(res => {

        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: res
        })
      })

      // Gets the songs to show in 'discovery_weekly'
      spotify.getPlaylist('1GZrrgQO66I8PcAdmsLc5V').then(res => {

        dispatch({
          type: 'SET_SONGS',
          songs: res
        })
      })

      // Get the top artists
      spotify.getMyTopArtists().then((response) => {

        dispatch({
          type: "SET_TOP_ARTISTS",
          top_artists: response,
        })
      });


      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

    }

  }, [token, dispatch]);

  return (

    <div className="app">

      {
        token ? (

          <Player
            spotify={spotify}
          />

        ) : (

          <>
            {/* Login page */}
            <Login />
          </>
          
        )
      }


    </div>
  );
}

export default App;
