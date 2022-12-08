import React from 'react'
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../auth';
import GlobalStoreContext from '../store';

import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import CommentCard from './CommentCard';
import { style } from '@mui/system';


const Comment = (props) => {
  useEffect(() => {
    store.getUserPlaylists();
  }, []);

  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const [text, setText] = useState("");  
  
  function handleKeyPress(event){
    if (event.code === "Enter") {
      console.log(text);
      store.addComment(auth.user.username, text, store.selectedList._id);
    }
  }

  let commentCard = "";
    if (store) {
        commentCard = 
            <List sx={{ width: '90%', left: '5%', borderRadius: '20px', height: '60%'}}>
            {
                store.selectedList.comments &&
                store.selectedList.comments.map((pair) => (
                    <CommentCard
                        username = {pair.username}
                        comment = {pair.comment}
                    />
                ))
            }
            </List>;
    }

  return (
    <>
    <Box sx={{backgroundColor: 'cornflowerblue', width: '91%', height: '75%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', overflowY: 'auto'}}>
        {commentCard}
    </Box>
    <Box sx={{bgcolor: 'cornflowerblue', width: '91%', height: '13%', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}}>
        <TextField sx = {{px: '6%', py: '1%', width: '88%'}} label = "Add A Comment" InputLabelProps={{
            style: {
            width: '100%',
            paddingLeft: '6%',
            paddingTop: '1%'}}} onKeyPress={handleKeyPress} onChange={(newValue) => {
              setText(newValue.target.value);
            }}
            >
        </TextField>
    </Box>
    </>
  )
}

export default Comment

//InputLabelProps = {{style: {mx: 'auto'}}}