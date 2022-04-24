const { Schema, model } = require('mongoose');
const { User } = require('.');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        require: true, 
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: ['/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/', 'Please fill a valid email address'],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
});

const User = model('User', UserSchema);

// Total Count of Friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

module.exports = User;