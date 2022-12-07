import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import { Link } from 'react-router-dom' 
import { useHistory, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button'; 

const Navbar = () => {
  // const { auth } = useState(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [ route, setRoute ] = useState(0);
  let location = useLocation();
  const history = useHistory();

  const [text, setText] = useState("");  
  function handleHome(event){
    if (location.pathname === "/"){
      history.go(0);
    }
    else{
      history.push("/");
    }
    setRoute(0);
  }

  function handleGroup(event){
    history.push("/published");
    setRoute(1);
  }

  function handlePerson(event){
    console.log("Person");
    setRoute(2);
  }
  function handleSort(event){
    console.log("Sort")
  }

  function handleKeyPress(event){
    if (event.code === "Enter") {
      if (route === 0){
        if (text === ""){
          store.renderNoPlaylists();
          return;
        }
        else{
          store.filterOwnPlaylists(text);
        }
      }
      if (route === 1){
        console.log("yuh");
      }
    }
  }

  function handleText(event){
    setText(event.target.value);
  }
  
  function handleSort(event){
    console.log("Sort");
  }

  return (
    <div className='navbar' style = {{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <div>
            <Button style={{backgroundColor: 'transparent', height: '100%', borderRadius: '0'}} onClick = {handleHome}>
                <HomeIcon />
                {/* <Link to = "/">
                    <HomeIcon/>
                </Link> */}
            </Button>
            <Button style={{backgroundColor: 'transparent', height: '100%', borderRadius: '0'}} onClick = {handleGroup} component = {Link} to ="/all/">
                <GroupsIcon />
            </Button>
            <Button style={{backgroundColor: 'transparent', height: '100%', borderRadius: '0'}} onClick = {handlePerson}>
                <PersonIcon />
            </Button>
        </div>
        <div style={{width: '30%'}}>
            <TextField variant="outlined" size="small" style = {{width: '100%'}} label='Search' onKeyPress={handleKeyPress} onChange={handleText} />
        </div>
        <div>
            <Button style={{backgroundColor: 'transparent', height: '100%', borderRadius: '0', float: 'right'}} onClick = {handleSort}>
                <SortIcon/>
            </Button>
            <Typography variant="h6" style = {{float: 'right'}}>Sort By</Typography>
        </div>
    </div>
  )
}

export default Navbar