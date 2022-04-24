const { UserSchema, ThoughtSchema } = require('../models');
const { db } = require('../models/User');

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
        ThoughtSchema.findOneAndUpdate({ _id: params.id }, body, { new: true })
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
        ThoughtSchema.findOneAndDelete({ _id: params.id })
            .then(dbThoughts => {
                if(!dbThoughts) {
                    res.status(404).json({ message: 'No thought found with this ID'});
                    return;
                }
                res.json(dbThoughts);
            })
    }

    // Add Reaction

    // Delete Reaction by Id
};

module.exports = thoughtController;