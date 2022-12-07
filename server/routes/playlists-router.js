/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()
const auth = require('../auth')

router.post('/playlist', auth.verify, PlaylistController.createPlaylist)
router.delete('/playlist/:id', auth.verify, PlaylistController.deletePlaylist)
router.get('/playlist/:id',auth.verify, PlaylistController.getPlaylistById)
router.get('/playlistpairs', auth.verify, PlaylistController.getPlaylistPairs)
router.post('/playlists', auth.verify, PlaylistController.getPlaylists)
router.put('/playlist/:id', auth.verify, PlaylistController.updatePlaylist)
router.post('/duplicate', auth.verify, PlaylistController.duplicatePlaylist)
router.put('/comment/:id', auth.verify, PlaylistController.addComment)
router.get('/published', auth.verify, PlaylistController.getPublishedPlaylists)
router.get('/filter/:name/:user', auth.verify, PlaylistController.filterOwnPlaylists)
router.get('/filterAll/:name', auth.verify, PlaylistController.filterAllPlaylists)
router.get('/filterUser/:name', auth.verify, PlaylistController.filterUser)

module.exports = router