import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index, publish } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        if (!publish){
            event.preventDefault();
            let targetIndex = index;
            let sourceIndex = Number(event.dataTransfer.getData("song"));
            setDraggedTo(false);
            store.addMoveSongTransaction(sourceIndex, targetIndex);
        }
    }
    function handleRemoveSong(event) {
        if (!publish){
            store.showRemoveSongModal(index, song);
        }
    }
    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2 && !publish) {
            store.showEditSongModal(index, song);
        }
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handleClick}
            style = {publish ? {backgroundColor: '#FFB6C1'} : {backgroundColor: 'cornflowerblue'}}
        >
            {/* <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a> */}
            <div id={'song-' + index + '-link'}
                className="song-link">
                {index + 1}. {song.title} by {song.artist}
                <CloseIcon
                    type="button"
                    id={"remove-song-" + index}
                    className="list-card-button"
                    value={"\u2715"}
                    onClick={handleRemoveSong}
                />
            </div>
        </div>
    );
}

export default SongCard;