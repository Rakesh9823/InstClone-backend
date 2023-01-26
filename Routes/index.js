const router = require("express").Router();
const multer = require("multer");
const bodyParser = require("body-parser")
const Post = require('../models/post.js');
const {storage} = require("./cloudinary");

router.use(bodyParser.urlencoded({extended:false}))

router.use(bodyParser.json())

const upload = multer({storage:storage})

router.post("/" , upload.single('Image'), async  (res , req) =>{
    console.log(req.file);
    const {name ,description, location } = req.body;
    try{
        let post = await Post.create({
            name:name,
            location:location,
            description:description,
            Image:req.file.path
        })
        res.json({
            status:"Success",
            post
        })

    }catch(e){
        res.status(400).json({
            status:"Failed",
            message : e.message
        })
    }
} )

router.get("/" , async (res , req) =>{
    try{
        let posts = await Post.find().sort({createdAt:-1})
        res.json({
            status:"Success",
            posts
        })

    }catch(e){
        res.status(400).json({
            status:"Failed",
            message:e.message
        })
    }
})