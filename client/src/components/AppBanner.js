import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import EditToolbar from './EditToolbar'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Logo from './images/logo.png'
import { lightBlue } from '@mui/material/colors';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
        store.clearAllTransactions();
    }

    const handleClearTransactions = () => {
        store.clearAllTransactions();
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {/* <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem> */}
            <MenuItem onClick = {handleMenuClose} component = {Link} to ="/login/">
                <Link to = "/login">
                    Login
                </Link>
            </MenuItem>
            {/* <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem> */}
            <MenuItem onClick = {handleMenuClose} component = {Link} to ="/register/">
                <Link to = "/register">
                    Create New Account
                </Link>
            </MenuItem>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    // let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
        // if (store.currentList) {
        //     editToolbar = <EditToolbar />;
        // }
    }
    
    function getAccountMenu(loggedIn) {
        let userInitials = auth.getUserInitials();
        console.log("userInitials: " + userInitials);
        if (loggedIn) 
            return <div>{userInitials}</div>;
        else
            return <AccountCircle />;
    }

    if (auth.loggedIn){
        return (
            <Box sx={{ flexGrow: 1}}>
                <AppBar position="static" sx = {{height: '100%'}}>
                    <Toolbar sx = {{bgcolor: 'lightcyan'}}>
                        <Typography                        
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block', zIndex: '0' } }}                        
                        >
                        <img style={{height: '100%', verticalAlign: 'middle', marginTop: '2%', width: '50%', objectFit: 'contain', textDecoration: 'none', color: 'white'}} src={Logo}/>
                        </Typography>
                        {/* <Box sx={{ flexGrow: 1 }}>{editToolbar}</Box> */}
                        <Box sx={{ display: { xs: 'none', md: 'flex', zIndex: '0' }}}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="black"
                            >
                                { getAccountMenu(auth.loggedIn) }
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {
                    menu
                }
            </Box>
        );
    }
    else{
        return <></>;
    }
}