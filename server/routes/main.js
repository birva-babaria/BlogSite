const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

//Routes
router.get('/', async (req, res) => {
    try {
        const locals = {
            title: 'BlogSite',
            description: 'Blog-Site made by Birva!'
        }

        let perPage = 2;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: {updatedAt: -1} }])
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec();
        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage)
        res.render('index', { locals, data , currPage: page, nextPage: hasNextPage ? nextPage : null});
    
    } catch(error) {
        console.log(error);
    }
});

// function insertPostData () {
//     Post.insertMany([
//         {
//             title: "New Blog 1",
//             body: "This is the body text"
//         },
//         {
//             title: "old Blog 2",
//             body: "This is the old body text"
//         }
//     ])
// }
// insertPostData()

router.get('/about', (req, res) => {
    res.render('about');
})



module.exports = router;
