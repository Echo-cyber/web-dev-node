const model = require('./profile-model');

const findProfileById = () => model.find();

const updateProfile = (id, profile) =>
    model.updateOne({_id: id},
        {$set: profile});

module.exports = {
    findProfileById, updateProfile
};