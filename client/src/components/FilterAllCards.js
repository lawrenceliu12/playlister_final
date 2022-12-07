import React from 'react'
import { useContext, useState } from 'react'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { getPlaylistById } from '../store/store-request-api';

import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import List from '@mui/material/List';
import AddSongBottomCard from './AddSongBottomCard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import Button from '@mui/material/Button';


const FilterAllCards = (props) => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, username, likes, dislikes, name, publish, publishDate, songs, comments } = props;
    const [ open, setOpen ] = useState(false);
    let cardElement = "";

    function handleDuplicate(event){
        store.duplicateList(idNamePair);
    }

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0){
                _id = ("" + _id).substring("list-card-text-".length);
            }

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            console.log(id);
            store.setCurrentList(id);
        }
    }

    function handleLoadList2(event, id){
        console.log("Does it get here1");
        if (!event.target.disabled){
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0){
                _id = ("" + _id).substring("list-card-text-".length);
            }
            store.setSelectedList(id);
        }
    }

    function handleCloseList(event){
        event.stopPropagation();
        setOpen(false);
        store.closeCurrentList();
    }

    function handleOpen(event, id){
        event.stopPropagation();
        setOpen(true);
        handleLoadList(event, id);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }
    
    if (store.currentList && store.currentList._id === idNamePair._id && open){
        cardElement =
            <>
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx = {publish ? {"&:hover": {bgcolor: '#FFB6C1'}, marginTop: '15px', display: 'flex', p: 1, bgcolor: '#FFB6C1', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', borderBottomStyle: 'solid', height: '15%'} 
                :{"&:hover": {bgcolor: 'cornflowerblue'}, marginTop: '15px', display: 'flex', p: 1, bgcolor: 'cornflowerblue', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', borderBottomStyle: 'solid', height: '15%'}}
                style={{ width: '100%', fontSize: '34pt' }}
                button
                onClick={(event) => {
                    handleLoadList2(event, idNamePair._id);
                    // openSelectedList(event, idNamePair._id);
                }}
                >
                <Box sx={{ p: 1, flexGrow: 1 }}>
                    {idNamePair.name}
                    <Box sx = {{p: 0,fontSize: '10pt'}}>
                        By: {username}
                    </Box>
                    {
                        publishDate &&   
                        <Box sx = {{p: 0,fontSize: '10pt'}}>
                            Published: {publishDate}
                        </Box>
                    }
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                            handleCloseList(event);
                    }}>
                        <ExpandLessIcon style={{fontSize:'34pt'}} />
                    </IconButton>
                </Box>
            </ListItem>
            <Box id ='song-cards-container' 
                sx = {publish ? {maxHeight: 350, overflowY:'scroll', bgcolor: '#FFB6C1', borderBottomLeftRadius: '20px', borderBottomRightRadius: '50px'} : 
                {maxHeight: 350, overflowY:'scroll', bgcolor: 'cornflowerblue', borderBottomLeftRadius: '20px', borderBottomRightRadius: '50px'}}>
                <List 
                    id="playlist-cards" 
                    sx={publish ? { width: '100%', bgcolor: '#FFB6C1', height: '100%' } : { width: '100%', bgcolor: 'cornflowerblue', height: '100%' }}
                >
                    {
                        store.currentList.songs.map((song, index) => (
                            <SongCard
                                id={'playlist-song-' + (index)}
                                key={'playlist-song-' + (index)}
                                index={index}
                                song={song}
                                publish = {publish}
                            />
                        ))
                    }
                </List>
                    <Button sx = {{float: 'right'}} onClick = {handleDuplicate} variant="contained">
                        Duplicate
                    </Button>
                    <Button sx = {{float: 'right'}} disabled = {publish} onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete' variant="contained">
                        Delete
                    </Button>
            </Box>
            </>
    }
    else{
        cardElement =
        <>
        {publish ?
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ "&:hover": {bgcolor: '#FFB6C1'}, marginTop: '15px', display: 'flex', p: 1, bgcolor: '#FFB6C1', borderRadius: '20px'}}
                style={{ width: '100%', fontSize: '35pt', height: 'auto' }}
                button
                onClick={(event) => {handleLoadList2(event, idNamePair._id)}}>
                <Box sx={{ p: 1, flexGrow: 1 }}>
                    {idNamePair.name}
                    <Box sx = {{p: 1, fontSize: '12pt'}}>
                        By: {username}
                    </Box>
                    {
                        publishDate &&   
                        <Box sx = {{p: 1, fontSize: '12pt'}}>
                            Published: {publishDate}
                        </Box>
                    }
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleOpen(event, idNamePair._id)}}>
                        <ExpandMoreIcon style={{fontSize:'34pt'}} />
                    </IconButton>
            </Box>
            </ListItem>
            :
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ "&:hover": {bgcolor: 'cornflowerblue'}, marginTop: '15px', display: 'flex', p: 1, bgcolor: 'cornflowerblue', borderRadius: '20px', height: '15%'}}
                style={{ width: '100%', fontSize: '35pt', height: 'auto' }}
                button
                onClick={(event) => {handleLoadList2(event, idNamePair._id)}}>
                <Box sx={{ p: 1, flexGrow: 1 }}>
                    {idNamePair.name}
                    <Box sx = {{fontSize: '12pt'}}>
                        By: {auth.user.firstName} {auth.user.lastName}
                    </Box>
                </Box>
                <Box sx={{ p: 1 }}>
                    <IconButton onClick={(event) => {
                        handleOpen(event, idNamePair._id)}}>
                        <ExpandMoreIcon style={{fontSize:'34pt'}} />
                    </IconButton>
            </Box>
            </ListItem>
        }
        </>
    }

    return (
        cardElement
    );
}

export default FilterAllCards