import React from 'react'
import {useState, useContext} from 'react';
import GlobalStoreContext from '../store';
import Box from '@mui/material/Box';

const CommentCard = (props) => {
  const { store } = useContext(GlobalStoreContext);

  const { idNamePair, selected, username, comment } = props;

  return (
    <Box sx = {{px: '2%', py: '2%', my: '1%', bgcolor: '#1A5F85', borderRadius: '10px', width: '85%', fontSize: '30px', mx:'auto', borderStyle: 'solid', borderWidth: '2px', boxShadow: '1px 3px 3px pink'}}>
        <Box sx = {{fontSize: '15px', border: 'none', borderBottom: '1px solid black'}}>
          {username}
        </Box>
        <Box>
          {comment}
        </Box>
    </Box>
  )
}

export default CommentCard