const express = require('express');
const Result = require('../models/resultModel.js');
const User = require('../models/usersModel.js');
const router = express.Router();

router.post('/allResult', (req, res) => {
    User.findOne({ username: req.body.authUser }).then((user) => {
        Result.find({ $or: [ { recommender: user.username }, { recommender: { $in: user.friends } } ] }).then((results) => {
            res.status(200).json({results});
        })
    })
})

router.post('/recommend', (req, res) => {
    Result.findOne({ recommender: req.body.authUser, resultID: req.body.result.objectID })
        .then((result) => {
            if (result) {
                result.recommend = 1;
                result.comment = req.body.comment;
                result.keyword = req.body.keyword;
                result.save()
                    .then(() => {
                        User.findOne({ username: req.body.authUser }).then((user) => {
                            Result.find({ $or: [ { recommender: user.username }, { recommender: { $in: user.friends } } ] }).then((results) => {
                                res.status(200).json({results});
                            })
                        })
                    })
            }else{
                const newResult = new Result({
                    recommender: req.body.authUser,
                    comment: req.body.comment,
                    recommend: 1,
                    keyword: req.body.keyword,
                    resultID: req.body.result.objectID,
                    details: req.body.result
                })
                newResult.save()
                .then(() => {
                    User.findOne({ username: req.body.authUser }).then((user) => {
                        Result.find({ $or: [ { recommender: user.username }, { recommender: { $in: user.friends } } ] }).then((results) => {
                            res.status(200).json({results});
                        })
                    })
                })
            }
        })
})

router.post('/reject', (req, res) => {
    Result.findOne({ recommender: req.body.authUser, resultID: req.body.result.objectID })
        .then((result) => {
            if (result) {
                result.recommend = 0;
                result.comment = req.body.comment;
                result.keyword = req.body.keyword;
                result.save()
                    .then(() => {
                        User.findOne({ username: req.body.authUser }).then((user) => {
                            Result.find({ $or: [ { recommender: user.username }, { recommender: { $in: user.friends } } ] }).then((results) => {
                                res.status(200).json({results});
                            })
                        })
                    })
            }else{
                const newResult = new Result({
                    recommender: req.body.authUser,
                    comment: req.body.comment,
                    recommend: 0,
                    keyword: req.body.keyword,
                    resultID: req.body.result.objectID,
                    details: req.body.result
                })
                newResult.save()
                .then(() => {
                    User.findOne({ username: req.body.authUser }).then((user) => {
                        Result.find({ $or: [ { recommender: user.username }, { recommender: { $in: user.friends } } ] }).then((results) => {
                            res.status(200).json({results});
                        })
                    })
                })
            }
        })
})

module.exports = router;
