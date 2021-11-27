let profile = require('../data/profile.json');
const dao = require("../db/profile/profile-dao");

module.exports = (app) => {

    const findProfileById = (req, res) =>
        dao.findProfileById()
            .then(profile => res.json(profile[0]));

    const updateProfile = (req, res) =>
        dao.updateProfile(req.params.id, req.body)
            .then(status => res.send(status));


    const getCurrentProfile = (req, res) => {
        res.json(profile);
    }



    const updateCurrentProfile = (req, res) => {

        const newProfile = req.body;
        profile = newProfile;

        res.json(profile);

    }

    app.get('/api/profile', getCurrentProfile);
    app.put('/api/profile', updateCurrentProfile);

    app.get('/rest/profile', findProfileById);
    app.put("/rest/profile/:id", updateProfile);


};