const mongoose = require('mongoose');

const ResultSchema = mongoose.Schema({
    recommender: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        max: 10000
    },
    recommend: {
        type: Number,
        required: true,
        min: 0,
        max: 1
    },
    keyword: {
        type: String,
    },
    resultID: {
        type: String,
        required: true
    },
    details: {
        type: Array,
        required: true
    }
});

const Result = mongoose.model('Result', ResultSchema)

module.exports = Result;
