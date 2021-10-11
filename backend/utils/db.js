const config = require('./config.json');
const mongoose = require('mongoose');

const connectionOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
};

mongoose.connect(process.env.MONGODB_URI || config.mongodb_uri, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    Developers: require('../domains/models.js'),
};