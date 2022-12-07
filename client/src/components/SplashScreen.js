import Logo from './images/logo.png'
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom'

export default function SplashScreen() {
    return (
        <div id="splash-screen">
            <img src={Logo}/>
            <div id = "splash-screen-heading2">
                Welcome to your playlist!
            </div>
            <div id = "splash-screen-heading3">
                The application to access your song from anywhere.
            </div>
            <div id = "splash-screen-credits">
                Created by: Lawrence Liu
            </div>
            <Button id = "splash-screen-button" variant="contained" size="large" sx={{fontSize: 24}} component = {Link} to="/login/">
                <Link to ="/login/">
                    Login
                </Link>
            </Button>
            <br>
            </br>
            <Button id = "splash-screen-button" variant="contained" size="large" sx={{fontSize: 24}} component = {Link} to = "/register/">
                <Link to = "/register/">
                    Register
                </Link>
            </Button>
            <br>
            </br>
            <Button id = "splash-screen-button" variant="contained" size="large" sx={{fontSize: 24}}>
                Continue As Guest
            </Button>
        </div>
    )
}