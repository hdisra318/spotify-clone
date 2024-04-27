import './Login.css';
import { loginUrl } from './spotify';

export default function Login() {

    return (
        <div className='login'>
            {/* Spotify logo */}
            <img
                src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
                alt="logo"
                className='login__logo'
            />

            {/* Login button*/}
            <a href={loginUrl}>Login With Spotify</a>

        </div>
    )
}
