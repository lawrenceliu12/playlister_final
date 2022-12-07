import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';

function AddSongBottomCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { publish } = props;
    
    function handleAddSong(event) {
        store.addNewSong();
    }

    console.log(publish);

    let cardClass = "list-card unselected-list-card";
    return (
        <Box
            id='add-song-card'
            className={cardClass}
            textAlign='center'
        >
            <Button
                sx={{transform:"translate(-5%, -5%)"}}
                variant="contained"
                onClick={handleAddSong} disabled = {publish}><AddIcon /></Button>
        </Box>
    );
}

export default AddSongBottomCard;