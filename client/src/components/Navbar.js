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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
  // const { auth } = useState(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [ route, setRoute ] = useState(0);
  let location = useLocation();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  function handleSortMenuOpen(event){
    setAnchorEl(event.currentTarget);
  }

  function handleSortMenuClose(){
    setAnchorEl(null);
  }

  function handleCreationDate(){
    handleSortMenuClose();
    let list = store.userPlaylist;
    list.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
    store.rerenderList(list);
  }

  function handleEditDate(){
    handleSortMenuClose();
    let list = store.userPlaylist;
    list.sort((a, b) => (a.updatedAt < b.updatedAt) ? 1 : -1)
    store.rerenderList(list);
  }

  function handleAlphabeticalOrder(){
    handleSortMenuClose();
    // let list = store.userPlaylist;
    let list;
    if (route === 0){
      list = store.userPlaylist;
      list.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      store.rerenderList(list);
    }
    else if (route === 1 || route === 2){
      list = store.publishedPlaylists
      list.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
      store.rerenderPublishedList(list);
    }
  }

  function handlePublishDate(){
    handleSortMenuClose();
    let list = store.publishedPlaylists;
    list.sort(function (a, b) {
      return a.publishDate.localeCompare(b.publishDate);
    });
    store.rerenderPublishedList(list);
  }

  function handleListenOrder(){
    handleSortMenuClose();
    let list = store.publishedPlaylists;
    console.log(list);
    list.sort((a, b) => (a.listens < b.listens) ? 1 : -1)
    store.rerenderPublishedList(list);
  }

  function handleLikeOrder(){
    handleSortMenuClose();
    let list = store.publishedPlaylists;
    console.log(list);
    list.sort((a, b) => (a.likes < b.likes) ? 1 : -1)
    store.rerenderPublishedList(list);
  }

  function handleDislikeOrder(){
    handleSortMenuClose();
    let list = store.publishedPlaylists;
    console.log(list);
    list.sort((a, b) => (a.dislikes < b.dislikes) ? 1 : -1)
    store.rerenderPublishedList(list);
  }


  const sortMenuOwned =
    <Menu
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleSortMenuClose}>
        <MenuItem onClick={handleCreationDate}>Creation Date (Old - New)</MenuItem>
        <MenuItem onClick={handleEditDate}>Last Edit Date (New - Old)</MenuItem>
        <MenuItem onClick={handleAlphabeticalOrder}>Name (A - Z)</MenuItem>
    </Menu>

  const sortMenu = 
    <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleSortMenuClose}>
          <MenuItem onClick={handleAlphabeticalOrder}>Name (A-Z)</MenuItem>
          <MenuItem onClick={handlePublishDate}>Publish Date (Newest)</MenuItem>
          <MenuItem onClick={handleListenOrder}>Listens (High - Low)</MenuItem>
          <MenuItem onClick={handleLikeOrder}>Likes (High - Low)</MenuItem>
          <MenuItem onClick={handleDislikeOrder}>Dislikes (High - Low)</MenuItem>
    </Menu>

  const [text, setText] = useState(""); 
  
  useEffect(() => {
    if (location.pathname === "/"){
      setRoute(0);
    }
    else if (location.pathname === "/all/"){
      setRoute(1);
    }
    else if (location.pathname === "/user/"){
      setRoute(2);
    }
}, [location]);

  function handleHome(event){
    if (location.pathname === "/"){
      history.go(0);
    }
    else{
      history.push("/");
    }
  }

  function handleGroup(event){
    if (location.pathname === "/all/"){
      history.go(0);
    }
    else{
      history.push("/all/");
    }
  }

  function handlePerson(event){
    if (location.pathname === "/user/"){
      history.go(0);
    }
    else{
      history.push("/user/");
    }
  }
  function handleSort(event){
    console.log("Sort")
  }

  function handleKeyPress(event){
    if (event.code === "Enter") {
      if (route === 0){
        console.log("hello")
        if (text === ""){
          store.renderNoPlaylists();
          return;
        }
        else{
          store.filterOwnPlaylists(text, auth.user.username);
        }
      }
      else if (route === 1){
        console.log("sdgsd")
        if (text === ""){
          store.renderNoPublishedPlaylists();
          return;
        }
        else{
          store.filterAllPlaylists(text);
        }
      }
      else if (route === 2){
        console.log("hey");
        store.filterUsers(text);
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
            <Button style={{backgroundColor: 'transparent', height: '100%', borderRadius: '0'}} onClick = {handleHome} component = {Link} to ="/">
                <HomeIcon />
            </Button>
            <Button style={{backgroundColor: 'transparent', height: '100%', borderRadius: '0'}} onClick = {handleGroup} component = {Link} to ="/all/">
                <GroupsIcon />
            </Button>
            <Button style={{backgroundColor: 'transparent', height: '100%', borderRadius: '0'}} onClick = {handlePerson} component = {Link} to ="/user/">
                <PersonIcon />
            </Button>
        </div>
        <div style={{width: '30%'}}>
            <TextField variant="outlined" size="small" style = {{width: '100%'}} label='Search' onKeyPress={handleKeyPress} onChange={handleText} />
        </div>
        <div>
            <Button style={{backgroundColor: 'transparent', height: '100%', borderRadius: '0', float: 'right'}} onClick = {handleSortMenuOpen}>
                <SortIcon/>
            </Button>
            <Typography variant="h6" style = {{float: 'right'}}>Sort By</Typography>
        </div>
        {route > 0 ? sortMenu : sortMenuOwned } 
    </div>
  )
}

export default Navbar