const mongoose = require('mongoose');
const schema = require('./who-schema');
const model = mongoose.model('WhoModel', schema);
module.exports = model;