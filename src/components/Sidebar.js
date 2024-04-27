import './Sidebar.css';
import SidebarOption from './SidebarOption';

/* Icons */
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useDataLayerValue } from '../DataLayer';

export default function Sidebar() {
    
    // Pulling the playlists
    const [{playlists}, dispatch] = useDataLayerValue();
    
    return (
        <div className='sidebar'>
            <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt='logo'
                className='sidebar__logo'
            />

            {/* Options */}
            <SidebarOption title="Home" Icon={HomeIcon} />
            <SidebarOption title="Search" Icon={SearchIcon} />
            <SidebarOption title="Your Library" Icon={LibraryMusicIcon}/>
            
            <br />
            <strong className='sidebar__title'>PLAYLISTS</strong>
            <hr />

            {playlists?.items?.map(playlist => (
                <SidebarOption title={playlist.name} />
            ))}


            <br />
            <strong className='sidebar__title'>GENRES</strong>
            <hr />

            <SidebarOption title="Pop" />
            <SidebarOption title="Reggueaton" />
            <SidebarOption title="Techno" />
        </div>
    )
}
