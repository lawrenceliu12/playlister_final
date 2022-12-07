import { useContext, useEffect, useState } from 'react'
import { useHistory, useParams} from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'

import MUIWrongUserModal from './MUIWrongUserModal.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { id } = useParams();
    const [wrongUser, setWrongUser] = useState(false);
    store.history = useHistory();
    
    useEffect(() => {
        async function checkList(){
            if (store.currentList === null){
                let response = await store.loadList(id);
                if (response.data.success === false){
                    setWrongUser(true);
                }
            }
        }
        checkList();
    }, []);

    if (wrongUser){
        return <MUIWrongUserModal flag = {true} errorMessage = {"Wrong account. You cannot access this playlist!"}/>
    }

    if (!store.currentList){
        return '';
    }

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    return (
        <Box sx = {{height: '80%', overflow: 'auto', bgcolor: 'background.paper'}}>
        <List 
            id="playlist-cards" 
            sx={{ width: '100%', bgcolor: 'background.paper'}}
        >
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }
         </List>            
         { modalJSX }
         </Box>
    )
}

export default WorkspaceScreen;