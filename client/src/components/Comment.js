import React from 'react'

import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import CommentCard from './CommentCard';
import { style } from '@mui/system';


const Comment = () => {
  const inputStyle = {
    'input-label': {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '100%',
        color: 'red'
      },
    
      'input': {
        '&::placeholder': {
          textOverflow: 'ellipsis !important',
          color: 'blue'
        }
      }
    };

  return (
    <>
    <Box sx={{backgroundColor: 'cornflowerblue', width: '91%', height: '85%', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', overflowY: 'auto'}}>
        <CommentCard></CommentCard>
    </Box>
    <Box sx={{bgcolor: 'cornflowerblue', width: '91%', height: '13%', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}}>
        <TextField sx = {{px: '6%', py: '1%', width: '88%'}} label = "Add A Comment" InputLabelProps={{
            style: {
            width: '100%',
            paddingLeft: '6%',
            paddingTop: '1%'}}}>
        </TextField>
    </Box>
    </>
  )
}

export default Comment

//InputLabelProps = {{style: {mx: 'auto'}}}