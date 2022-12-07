import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import YoutubePlayer from './YouTubePlayer.js'
import Comment from './Comment.js';

// import Navbar from './Navbar';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [ playerOrComment, setPlayerOrComment ] = useState(true);

    useEffect(() => {
        store.getUserPlaylists();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', borderRadius: '20px', height: '100%', fontSize: '50pt'}}>
            {
                store.userPlaylist &&
                store.userPlaylist.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        publish = {pair.publish}
                        publishDate = {pair.publishDate}
                        likes = {pair.likes}
                        dislikes = {pair.dislikes}
                    />
                ))
            }
            </List>;
    }
    return (
        <>
        <div style = {{position: 'absolute', bottom: '0', left: '65%', width: '100%'}}>
            <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}>
                <AddIcon />
            </Fab>
            <Typography variant="h3">Your Lists</Typography>
        </div>
        <div id="playlist-selector">
            <div id="list-selector-heading">
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </div>
            <div id = "youtube-player">
                <Button variant="contained" sx = {{borderBottomRightRadius: '0', borderBottomLeftRadius: '0', borderStyle: 'solid', borderWidth: '1px', borderColor: 'black'}} onClick={() => {
                    setPlayerOrComment(true);
                }}>
                    PLAYER
                </Button>
                <Button variant='contained' sx = {{borderBottomRightRadius: '0', borderBottomLeftRadius: '0', borderStyle: 'solid', borderWidth: '1px', borderColor: 'black'}} onClick={() => {
                    setPlayerOrComment(false);
                }}>
                    COMMENTS
                </Button>
                <br/>
                {playerOrComment ? <YoutubePlayer/> : <Comment />}
            </div>
        </div>
        </>)
}

export default HomeScreen;