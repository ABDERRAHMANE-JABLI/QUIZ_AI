const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API,
    api_secret : process.env.CLOUDINARY_SECRET
});


const cloudinaryUploadImage = async(file) =>{
    try {
        const data = await cloudinary.uploader.upload(file,{
            resource_type : 'auto',
        });
        return data;
    } catch (error) {
        return error
    }
}

const cloudinaryRemoveImage = async(file) =>{
    try {
        const result = await cloudinary.uploader.destroy(file);
        return result;
    } catch (error) {
        return error
    }
}

module.exports = {
    cloudinaryUploadImage,
    cloudinaryRemoveImage,
}