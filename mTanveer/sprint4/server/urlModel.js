const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        },
    url: {
        type: String,
        required: true
    }
    }
);

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;