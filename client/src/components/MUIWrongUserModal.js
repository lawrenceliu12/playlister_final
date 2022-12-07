import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import { AlertTitle, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
};

export default function MUILoginFailModal({flag, errorMessage}){
    const { store } = useContext (GlobalStoreContext);
    store.history = useHistory();

    function handleCloseModal(){
        flag = false;
        store.history.push('/');
    }
    
    return(
        <Modal open = {flag}>
            <Box sx = {style}>
                <Alert severity='warning'>
                    <AlertTitle>
                        Warning
                    </AlertTitle>
                    {errorMessage}
                    <Button variant = "contained" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Alert>
            </Box>
        </Modal>
    );
}