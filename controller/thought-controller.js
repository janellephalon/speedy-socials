const { User, Thought } = require('../models');
const { db } = require('../models/User');

const thoughtController = {
    // Add Thought 
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate({ _id: params.userId }, { $push: { thoughts: _id } }, { new: true });
            })
            .then(dbThoughts => {
                if(!dbThoughts) {
                    res.status(404).json({ message: 'No user found with this ID'});
                    return;
                }
                res.status(dbThoughts);
            })
            .catch(err => json(err));
    },

    // Get All Thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughts => res.json(dbThoughts))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Get Thought by Id 
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({path: 'reactions',select: '-__v'})
            .select('-__v')
            .then(dbThoughts => {
                if(!dbThoughts) {
                    res.status(404).json({ message: 'No thought found with this ID'});
                    return;
                }
                res.json(dbThoughts);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Update Thought by Id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
            .then(dbThoughts => {
                if(!dbThoughts) {
                    res.status(404).json({ message: 'No thought found with this ID'});
                    return;
                }
                res.json(dbThoughts);
            })
            .catch(err => res.status(400).json(err));
    },

    // Delete Thought by Id
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deleteThought => {
                if(!deleteThought) {
                    res.status(404).json({ message: 'No thought found with this ID'});
                    return;
                }
                return User.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUser => {
                if(!dbUser) {
                    res.status(404).json({ message: 'No user found with this ID'});
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.json(err));
    },

    // Add Reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate( 
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughts => {
                if (!dbThoughts) {
                    res.status(404).json({ message: 'No thought found with this ID'});
                    return;
                }
                res.json(dbThoughts);
            })
            .catch(err => res.json(err));
    },

    // Delete Reaction by Id
    removeReaction({ params }, res) {
        console.log(params.thoughtId, params.reactionId);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true, runValidators: true }
        )
            .then(dbUser => res.json(dbUser))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;