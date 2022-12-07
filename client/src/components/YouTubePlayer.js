import React from 'react';
import Youtube from 'react-youtube';
import GlobalStoreContext from '../store';
import { useContext, useState } from 'react';

import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/material';

export default function YoutubePlayer(){
  // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
  // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
  // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
  // FROM ONE SONG TO THE NEXT
  const { store } = useContext(GlobalStoreContext);
  const [ songCount, setSongCount ] = useState(0);
  const [ vidPlaying, setVidPlaying ] = useState(false);

  let playlistName = "";
  let name = "";
  let artist = "";

  let names = [];
  let artists = [];
  let playlist = [];
  let length = 0;

  let player;

  if (store.selectedList && store.selectedList.songs){
    length = store.selectedList.songs.length;
    playlistName = store.selectedList.name;
    for (let i = 0; i < length; i++){
      // let name = store.currentList.songs[i].title;
      // let artist = store.currentList.songs[i].artist;
      // let id = store.currentList.songs[i].youTubeId;
  
      // names[i] = name;
      // artists[i] = artist;
      // playlist[i] = id;
      names[i] = store.selectedList.songs[i].title;
      artists[i] = store.selectedList.songs[i].artist;
      playlist[i] = store.selectedList.songs[i].youTubeId;
    }
    if (store.selectedList.songs.length !== 0){
      name = store.selectedList.songs[songCount].title;
      artist = store.selectedList.songs[songCount].artist;
    }
  }

  // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
  let currentSong = 0;

  const playerOptions = {
    height: '300',
    width: '100%',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
    },
  };

  // THIS EVENT HANDLER GETS CALLED ONCE THE PLAYER IS CREATED
  function onPlayerReady(event) {
    loadAndPlayCurrentSong(event.target);
    event.target.playVideo();
    player = event.target;
  }

  // THIS FUNCTION LOADS THE CURRENT SONG INTO
  // THE PLAYER AND PLAYS IT
  function loadAndPlayCurrentSong(player) {
    let song = "";
    if (songCount < length){
      song = playlist[songCount];
    }
    else{
      setSongCount(0);
    }

      player.loadVideoById(song);
      player.playVideo();
  }

  // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
  function incSong() {
    currentSong++;
    currentSong = currentSong % playlist.length;
    setSongCount(songCount + 1);
  }

  function decrementSong() {
    currentSong--;
    currentSong = currentSong % playlist.length;
    setSongCount(songCount - 1);
  }

  // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
  // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
  // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
  // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
  function onPlayerStateChange(event) {
    let playerStatus = event.data;
    player = event.target;
    if (playerStatus === -1) {
      // VIDEO UNSTARTED
      console.log("-1 Video unstarted");
    } 
    else if (playerStatus === 0) {
      // THE VIDEO HAS COMPLETED PLAYING
      console.log("0 Video ended");
      incSong();
      loadAndPlayCurrentSong();
    } 
    else if (playerStatus === 1) {
      // THE VIDEO IS PLAYED
      console.log("1 Video played");
    } 
    else if (playerStatus === 2) {
      // THE VIDEO IS PAUSED
      console.log("2 Video paused");
    } 
    else if (playerStatus === 3) {
      // THE VIDEO IS BUFFERING
      console.log("3 Video buffering");
    } 
    else if (playerStatus === 5) {
      // THE VIDEO HAS BEEN CUED
      console.log("5 Video cued");
    }
  }

  function handlePrevious(event){
    decrementSong();
    loadAndPlayCurrentSong(player);
  }

  function handleStop(event){
    player.stopVideo();
    setVidPlaying(false);
  }

  function handlePlay(event){
    player.playVideo();
    setVidPlaying(true);
  }

  function handleSkip(event){
    incSong();
    loadAndPlayCurrentSong(player);
  }

  // function canPlay(event){
  //   console.log(store.currentList.songs === null);
  //   return store.currentList.songs === null;
  // }

  // function canRewind(event){
  //   return songCount < 0;
  // }


  return(
    <>
    <Youtube videoId={playlist[songCount]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange}/>
    <Box sx={{width: '95%', height: '40%', backgroundColor: 'cornflowerblue', borderRadius: '10px', borderStyle: 'solid', mx: 'auto'}}>
      <Typography variant = "h4" style={{textAlign: 'center'}}>
        Now Playing
      </Typography>
      <Typography variant="h5">
        Playlist: {playlistName}
        <br/>
      </Typography>
      <Typography variant="h5">
        Song #: {songCount + 1}
        <br/>
      </Typography>
      <Typography variant="h5">
        Title: {name}
        <br/>
      </Typography>
      <Typography variant="h5">
        Artist: {artist}
      </Typography>
      <Box sx={{height: '20%', backgroundColor: '#1A5F85', borderRadius: '10px', textAlign:'center', mx: '5%', borderStyle: 'solid', borderWidth: '2px', boxShadow: '1px 3px 3px pink'}}>
        <IconButton onClick = {handlePrevious} sx = {{color: 'black'}} disabled = {songCount === 0}>
          <FastRewindIcon/>
        </IconButton>
        <IconButton onClick = {handleStop} sx = {{color: 'black'}} disabled = {vidPlaying === false}>
          <StopIcon/>
        </IconButton>
        {/* store.selectedList === null || store.selectedList.songs.length === 0 */}
        <IconButton onClick = {handlePlay} sx = {{color: 'black'}} disabled = {vidPlaying === true}>
          <PlayArrowIcon/>
        </IconButton>
        <IconButton onClick = {handleSkip} sx = {{color: 'black'}} disabled = {songCount + 1 >= length}>
          <FastForwardIcon/>
        </IconButton>
      </Box>
    </Box>
    </>);
}