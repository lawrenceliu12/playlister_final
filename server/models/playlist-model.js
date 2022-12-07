const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        username: { type: String, required: true },
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },
        publish: {type: Boolean, default: false, required: true},
        publishDate: {type: String, required: false},
        likes: {type: Number, default: 0, required: true},
        dislikes: {type: Number, default: 0, required: true},
        comments: {type: [{
            username: String,
            comment: String,
        }]},
        listens: {type: Number, default: 0, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
