//Create a model for Tips
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TipSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

});

module.exports = mongoose.model('Tip', TipSchema);