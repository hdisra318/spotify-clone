import './Player.css';
import Body from './components/Body';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

export default function Player({spotify}) {
  

    return (
        <div className='player'>

            <div className='player__body'>
                {/* Sidebar */}
                <Sidebar />

                {/* Body */}
                <Body spotify={spotify} />
            </div>


            {/* Footer */}
            <Footer spotify={spotify} />
        </div>
    )
}
