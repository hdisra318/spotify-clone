import './Header.css';

/* Icons */
import SearchIcon from '@mui/icons-material/Search';

import { Avatar } from '@mui/material';
import { useDataLayerValue } from '../DataLayer';

export default function Header() {
    
    const [{user}, dispatch] = useDataLayerValue();

    return (
        <header>
            <div className='header__left'>
                <SearchIcon />
                <input
                    placeholder='Search for Artist, Songs or Podcasts'
                    type='text'
                />
            </div>

            <div className='header__right'>
                <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
                <h4>{user?.display_name}</h4>
            </div>
        </header>
    )
}
