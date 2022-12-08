import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    function handleCreateNewList() {
        store.createNewList();
    }
    return (
        <div id="playlister-statusbar">
            <div style = {{ justifyContent:'space-between'}}>
                <Fab 
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}>
                    <AddIcon />
                </Fab>
            </div>
            <Typography variant="h3">Your Lists</Typography>
        </div>
    );
}

export default Statusbar;