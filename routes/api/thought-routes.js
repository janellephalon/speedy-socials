const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controller/thought-controller');

router 
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

router 
    .route('/thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

router
    .route('/:userId')
    .post(addThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction);

router
    .route('/:thoughtId/reactions/:reactionsId')
    .delete(removeReaction);

module.exports = router;