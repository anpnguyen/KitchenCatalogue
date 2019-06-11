const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
    // favourites: [
        
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'recipe'
    //     }
    // ]

    
});

User = mongoose.model('user', UserSchema);

module.exports = User