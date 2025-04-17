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

router.get('/post/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const data = await Post.findById({_id: id});
        let locals = {
            title: data.title
        };
        res.render('post', {locals, data});
    
    } catch(error) {
        console.log(error);
    }
});

router.post('/search', async (req, res) => {
    try {
        let locals = {
            title: "Search..",
        };
        let search = req.body.search;
        const searchRefined = search.replace(/[^a-zA-Z0-9 ]/g, "");
        
        const data = await Post.find({
            $or: [
                {title: { $regex: new RegExp(searchRefined, 'i') }},
                {body: { $regex: new RegExp(searchRefined, 'i')}}
            ]
        })

        res.render("search", {locals, data});

    } catch(error) {
        console.log(error);
    }
})

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
