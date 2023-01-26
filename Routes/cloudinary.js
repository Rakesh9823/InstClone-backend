const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary")

cloudinary.config({
    name: process.env.CLOUDINARY_CLOUD_NAME,
    key: process.env.CLOUDINARY_KEY,
    secret: process.env.CLOUDINARY_SECRET

})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Instaclone",
        Formats: ['jpeg', 'png', 'jpg']
    }
})

module.exports = {
    cloudinary,
    storage
}