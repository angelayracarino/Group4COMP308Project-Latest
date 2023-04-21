//Create a model for Alerts
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
    responderName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Alert', AlertSchema);
