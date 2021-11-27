// let tweets = require('../data/tweets.json');

const dao = require('../db/tweets/tweet-dao');


module.exports = (app) => {
    const findAllTweets = (req, res) =>
        dao.findAllTweets()
            .then(tweets => res.json(tweets));

    const createTweet = (req, res) => {
        const newTweet = {
                    "topic": "Web Development",
                    "userName": "ReactJS",
                    "verified": false,
                    "handle": "ReactJS",
                    "time": "2h",
                    "image": "../../images/elonmusk.png",
                    "logo-image": "../../images/elonmusk.png",
                    "stats": {
                        "comments": 123,
                        "retweets": 234,
                        "likes": 345
                    },
                    ...req.body,
                }
        dao.createTweet(newTweet)
            .then((insertedTweet) => res.json(insertedTweet));
    }


    const deleteTweet = (req, res) =>
        dao.deleteTweet(req.params.id)
            .then((status) => res.send(status));

    const likeTweet = (req, res) => {
        const id = req.params['id'];
        const tweet = req.body;
        console.log(req.body);

        if (tweet._id === id) {
            if (tweet.liked === true) {
                tweet.liked = false;
                tweet.stats.likes--;
            } else {
                tweet.liked = true;
                tweet.stats.likes++;
            }
        }

        delete tweet['_id'];
        console.log(tweet);
        dao.updateTweet(req.params.id, tweet)
            .then(status => res.send((status)));
    }






    // const findAllTweets = (req, res) => {
    //     res.json(tweets);
    // }
    //
    // const createTweet = (req, res) => {
    //     const newTweet = {
    //         _id: (new Date()).getTime() + '',
    //         "topic": "Web Development",
    //         "userName": "ReactJS",
    //         "verified": false,
    //         "handle": "ReactJS",
    //         "time": "2h",
    //         "image": "../../images/elonmusk.png",
    //         "logo-image": "../../images/elonmusk.png",
    //         "stats": {
    //             "comments": 123,
    //             "retweets": 234,
    //             "likes": 345
    //         },
    //         ...req.body,
    //     }
    //     // newTweet['_id'] = (new Date()).getTime();
    //     tweets = [
    //         newTweet,
    //         ...tweets
    //     ];
    //     res.json(newTweet);
    // }
    //
    // const deleteTweet = (req, res) => {
    //     const id = req.params['id'];
    //     tweets = tweets.filter(tweet => tweet._id !== id);
    //     res.sendStatus(200);
    // }
    //
    // const likeTweet = (req, res) => {
    //     const id = req.params['id'];
    //     tweets = tweets.map(tweet => {
    //         if (tweet._id === id) {
    //             if (tweet.liked === true) {
    //                 tweet.liked = false;
    //                 tweet.stats.likes--;
    //             } else {
    //                 tweet.liked = true;
    //                 tweet.stats.likes++;
    //             }
    //             return tweet;
    //         } else {
    //             return tweet;
    //         }
    //     });
    //     res.sendStatus(200);
    // }

    app.put('/api/tweets/:id/like', likeTweet);
    app.delete('/api/tweets/:id', deleteTweet);
    app.post('/api/tweets', createTweet);
    app.get('/api/tweets', findAllTweets);
};