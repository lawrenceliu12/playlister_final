import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { GlobalStoreContext } from '../store'

import List from '@mui/material/List';
import FilterAllCards from './FilterAllCards'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'

import YoutubePlayer from './YouTubePlayer';
import Comment from './Comment.js';

const FilterAll = () => {
  const { store } = useContext(GlobalStoreContext);
  const [ playerOrComment, setPlayerOrComment ] = useState(true);

  useEffect(() => {
    store.filterPublishedPlaylists();
  }, []);

  // console.log(store.publishedPlaylists);

  let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', borderRadius: '20px', height: '100%', fontSize: '50pt'}}>
            {
                store.publishedPlaylists &&
                store.publishedPlaylists.map((pair) => (
                    <FilterAllCards
                        idNamePair = {pair}
                        username = {pair.username}
                        likes = {pair.likes}
                        dislikes = {pair.dislikes}
                        name = {pair.name}
                        publish = {pair.publish}
                        publishDate = {pair.publishDate}
                        songs = {pair.songs}
                        comments = {pair.comments}
                    />
                ))
            }
            </List>;
    }
  
  return (
    <>
      <div id = 'list-selector-list-2'>
        {
          listCard
        }
      </div>
      <div id='youtube-player-2'>
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
          {playerOrComment ? <YoutubePlayer/> : <Comment/>}
      </div>
    </>
  );
}

export default FilterAll;