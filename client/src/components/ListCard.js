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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Typography } from '@mui/material';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected, publish, publishDate, likes, dislikes } = props;
    const [ open, setOpen ] = useState(false);
    let cardElement = "";

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            console.log(id);
            store.setCurrentList(id);
        }
    }

    function handleLoadList2(event, id){
        console.log("Does it get here");
        if (!event.target.disabled){
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0){
                _id = ("" + _id).substring("list-card-text-".length);
            }
            store.setSelectedList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        console.log("here")
        setText(event.target.value);
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

    // function openSelectedList(event, id){
    //     cardElement =
    //     <>
            
    //     </>
    // }

    function handleUndo(event){
        store.undo();
    }

    function handleRedo(event){
        store.redo();
    }

    function handlePublish(event){
        store.publish(idNamePair._id);
    }

    function handleDuplicate(event){
        store.duplicateList(idNamePair);
    }

    function handleLike(event){
        event.stopPropagation();
        let userIndex = idNamePair.likes.indexOf(idNamePair.username);
        if (userIndex === -1){
            userIndex = idNamePair.dislikes.indexOf(idNamePair.username);
            if (userIndex !== -1){
                idNamePair.dislikes.splice(userIndex, 1);
            }
            idNamePair.likes.push(idNamePair.username);
        }
        else{
            idNamePair.likes.splice(userIndex, 1);
        }
        console.log(idNamePair);
        store.updateLike(idNamePair._id, idNamePair);
    }

    function handleDislike(event){
        event.stopPropagation();
        let userIndex = idNamePair.dislikes.indexOf(idNamePair.username);
        if (userIndex === -1){
            userIndex = idNamePair.likes.indexOf(idNamePair.username);
            if (userIndex !== -1){
                idNamePair.likes.splice(userIndex, 1);
            }
            idNamePair.dislikes.push(idNamePair.username);
        }
        else{
            idNamePair.dislikes.splice(userIndex, 1);
        }
        store.updateLike(idNamePair._id, idNamePair);
    }

    function handleListen(event){
        // event.stopPropagation();
        let list = idNamePair;
        list.listens++;
        store.updatePlaylist(idNamePair._id, idNamePair);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
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
                    // handleListen(event);
                    // openSelectedList(event, idNamePair._id);
                }}
                >
                <Box sx={{ p: 1, flexGrow: 1 }}>
                    {idNamePair.name}
                    <Box sx = {{p: 0,fontSize: '10pt'}}>
                        By: {auth.user.firstName} {auth.user.lastName}
                    </Box>
                    <Box sx = {{p: 0, fontSize: '10pt'}}>
                        Listens: {idNamePair.listens}
                    </Box>
                    {
                        publishDate &&   
                        <Box sx = {{p: 0,fontSize: '10pt'}}>
                            Published: {publishDate}
                        </Box>
                    }
                </Box>
                <Box sx={{ p: 1, display: 'flex', flexDirection: 'column'}}>
                    <Box sx = {{display: 'flex', flexDirection: 'row', float: 'right'}}>
                        <Typography>
                        {idNamePair.likes.length}
                        <IconButton onClick = {handleLike}>
                            <ThumbUpIcon/>
                        </IconButton>
                        </Typography>
                        <Typography>
                            {idNamePair.dislikes.length}
                            <IconButton onClick = {handleDislike}>
                                <ThumbDownIcon/>
                            </IconButton>
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton onClick={handleToggleEdit} disabled = {publish} aria-label='edit'>
                            <EditIcon style={{fontSize:'34pt'}} />
                        </IconButton>
                        <IconButton onClick={(event) => {
                            handleCloseList(event);
                        }}>
                        <ExpandLessIcon style={{fontSize:'34pt'}} />
                    </IconButton>
                    </Box>
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
                    <AddSongBottomCard publish = {publish}/>
                </List>
                { modalJSX }
                <Box sx = {{position: 'flex', justifyContent: 'space-between'}}>
                    <Button sx = {{float: 'left'}} onClick = {handleUndo} disabled = {!store.canUndo() || publish} variant="contained">
                        Undo
                    </Button>
                    <Button sx = {{float: 'left'}} onClick = {handleRedo} disabled = {!store.canRedo() || publish} variant="contained">
                        Redo
                    </Button>
                    <Button sx = {{float: 'right'}} onClick = {handleDuplicate} variant="contained">
                        Duplicate
                    </Button>
                    <Button sx = {{float: 'right'}} onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} aria-label='delete' variant="contained">
                        Delete
                    </Button>
                    <Button sx = {{float: 'right'}} disabled = {publish} onClick = {handlePublish} variant="contained">
                        Publish
                    </Button>
                </Box>
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
                onClick={(event) => {
                    handleLoadList2(event, idNamePair._id)
                    // handleListen(event);
                    }}>
                <Box sx={{ p: 1, flexGrow: 1 }}>
                    {idNamePair.name}
                    <Box sx = {{p: 1, fontSize: '12pt'}}>
                        By: {auth.user.firstName} {auth.user.lastName}
                    </Box>
                    <Box sx = {{p: 1, fontSize: '12pt'}}>
                        Listens: {idNamePair.listens}
                    </Box>
                    {
                        publishDate &&   
                        <Box sx = {{p: 1, fontSize: '12pt'}}>
                            Published: {publishDate}
                        </Box>
                    }
                </Box>
                <Box sx={{ p: 1, display: 'flex', flexDirection: 'column'}}>
                    <Box sx = {{display: 'flex', flexDirection: 'row', float: 'right'}}>
                        <Typography>
                        {idNamePair.likes.length}
                        <IconButton onClick = {handleLike}>
                            <ThumbUpIcon/>
                        </IconButton>
                        </Typography>
                        <Typography>
                            {idNamePair.dislikes.length}
                            <IconButton onClick = {handleDislike}>
                                <ThumbDownIcon/>
                            </IconButton>
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton onClick={handleToggleEdit} disabled = {publish} aria-label='edit'>
                            <EditIcon style={{fontSize:'34pt'}} />
                        </IconButton>
                        <IconButton onClick={(event) => {
                            handleOpen(event, idNamePair._id)}}>
                            <ExpandMoreIcon style={{fontSize:'34pt'}} />
                        </IconButton>
                    </Box>
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
                    <IconButton onClick={handleToggleEdit} disabled = {publish} aria-label='edit'>
                        <EditIcon style={{fontSize:'34pt'}} />
                    </IconButton>
                    <IconButton onClick={(event) => {
                        handleOpen(event, idNamePair._id)}}>
                        <ExpandMoreIcon style={{fontSize:'34pt'}} />
                    </IconButton>
            </Box>
            </ListItem>
        }
        </>
    }

    
    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;
