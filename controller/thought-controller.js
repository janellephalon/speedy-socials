const { UserSchema, ThoughtSchema } = require('../models');

const thoughtController = {
    // Create Thought 
    createThought({ body }, res) {
        ThoughtSchema.create(body)
            .then(dbThoughts => res.json(dbThoughts))
            .catch(err => res.status(400).json(err));
    },

    // Get All Thoughts
    getAllThoughts(req, res) {
        ThoughtSchema.find({})
            .then(dbThoughts => res.json(dbThoughts))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Get Thought by Id 
    getThoughtById({ params }, res) {
        ThoughtSchema.findOne({ _id: params.id })
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
        ThoughtSchema.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
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
    deleteThought({ params }, res) {
        ThoughtSchema.findOneAndDelete({ _id: params.thoughtId })
            .then(dbThoughts => {
                if(!dbThoughts) {
                    res.status(404).json({ message: 'No thought found with this ID'});
                    return;
                }
                res.json(dbThoughts);
            })
    },

    // Add Reaction
    addReaction({ params, body }, res) {
        console.log(body);
        ThoughtSchema.create(body)
            .then(({ _id }) => {
                return UserSchema.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $push: { comments: _id } },
                    { new: true }
                );
            })
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
        ThoughtSchema.findOneAndDelete({ _id: params.thoughtId })
            .then(deleteReaction => {
                if(!deleteReaction) {
                    return res.status(404).json({ message: 'No thought found with this ID'});
                }
                return UserSchema.findOneAndUpdate(
                    { _id: params.id },
                    { $pull: { comments: params.thoughtId} },
                    { new: true }
                ); 
            })
            .then(dbThoughts => {
                if(!dbThoughts) {
                    res.staus(404).json({ message: 'No thought found with this ID'});
                    return;
                }
                res.json(dbThoughts);
            })
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;