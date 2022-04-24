const { UserSchema } = require('../models');

const userController = {
    // Create User
    createUser({ body }, res) {
        UserSchema.create(body)
            .then(dbUser => res.json(dbUser))
            .catch(err => res.status(400).json(err));
    },

    // Get All Users
    getAllUsers(req, res) {
        UserSchema.find({})
            .then(dbUser => res.json(dbUser))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Get User by Id 
    getUserById({ params }, res) {
        UserSchema.findOne({ _id: params.id })
            .populate('thoughts')
            .populate('friends')
            .select('-__v')
            .then(dbUser => {
                if(!dbUser) {
                    res.status(404).json({ message: 'No user found with this ID'});
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Update User by Id
    updateUser({ params, body }, res) {
        UserSchema.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUser => {
                if(!dbUser) {
                    res.status(404).json({ message: 'No user found with this ID'});
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.status(400).json(err));
    },

    // Delete User by Id
    deleteUser({ params }, res) {
        UserSchema.findOneAndDelete({ _id: params.id })
            .then(dbUser => {
                if(!dbUser) {
                    res.status(404).json({ message: 'No user found with this ID'});
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.status(400).json(err));
    },

    // Add Friend
    addFriend({ params, body }, res) {
        console.log(body);
        UserSchema.findOneAndUpdate({ _id: params.id }, { $addToSet: { friends: params.friendId } }, { runValidators: true })
            .then(dbUser => {
                if(!dbUser) {
                    res.status(404).json({ message: 'No user found with this ID'});
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.status(400).json(err));
    },

    // Delete Friend by Id
    removeFriend({ params }, res) {
        UserSchema.findOneAndDelete({ _id: params.id }, { $pull: {friends: params.friendId} }, { runValidators: true})
            .then(dbUser => {
                if(!dbUser) {
                    res.status(404).json({ message: 'No user found with this ID'});
                    return;
                }
                res.json(dbUser);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;