const model = require('./who-model');

const findAllWho = () => model.find();

module.exports = {
    findAllWho
};