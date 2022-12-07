import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import { Link } from 'react-router-dom' 

import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button'; 

const Navbar = () => {
  // const { auth } = useState(AuthContext);
  const { store } = useState(GlobalStoreContext);
  const [text, setText] = useState("");  
  function handleHome(event){
    // event.stopPropagation();
    // store.closeCurrentList();
  }

  function handleGroup(event){
    console.log("Group");
  }

  function handlePerson(event){
    console.log("Person")
  }
  function handleSort(event){
    console.log("Sort")
  }

  function handleKeyPress(event){
    if (event.code === "Enter") {
        console.log(text);
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
            <Button style={{backgroundColor: 'transparent', height: '100%', borderRadius: '0'}} onClick = {handleGroup}>
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