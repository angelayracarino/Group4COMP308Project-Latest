//Create a model for Vitals
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VitalSchema = new Schema({
    bodyTemperature: {
        type: Number,
        required: true
    },
    heartRate: {
        type: Number,
        required: true
    },
    bloodPressure: {
        type: Number,
        required: true
    },
    respiratoryRate: {
        type: Number,
        required: true
    },
    pulseRate: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    patient: {
        type: String,
        ref: 'User'
    }
});

module.exports = mongoose.model('Vital', VitalSchema);
