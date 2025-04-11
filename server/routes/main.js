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
        const data = await Post.find().sort({UpdatedAt: -1});
        console.log(data);
        res.render('index', { locals, data });
    
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
