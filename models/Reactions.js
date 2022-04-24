const { Schema, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema({
    reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        require: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
    },
    {
        toJSON: {
            getters: true
        }
});

module.exports = ReactionSchema;