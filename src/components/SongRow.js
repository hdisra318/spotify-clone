import './SongRow.css';

export default function SongRow({track, playSong}) {

    return (
        <div className="songRow" onClick={() => playSong(track.id)}>
            <img className="songRow__album" src={track.album.images[0].url} alt="album image" />

            <div className="songRow__info">
                <h1>{track.name}</h1>
                <p>
                    {track.artist?.map(artist => artist.name).join(', ')}
                    {track.album.name}
                </p>
            </div>
        </div>
    )
}
