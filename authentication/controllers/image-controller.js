const Image = require('../models/image');
const {uploadToCloudinary} = require('../helper/cloudinary-helper')
const fs = require('fs')
const cloudinary = require('../config/cloudinary.js')

const uploadImage = async(req,res)=>{
    try {
        if(!req.file){
            console.log(req.file.path , "Requested file")
            return res.status(400).json({
                success:false,
                message:'File is missing'
            })
        }
        const {url,publicId} = await uploadToCloudinary(req.file.path)

        const newUploadedImage = new Image({
            url,
            publicId,uploadedBy:req.userInfo.userId
        })

        await newUploadedImage.save()

        // delete the file from local
        fs.unlinkSync(req.file.path)

        res.status(201).json({
            success:true,
            message:'Image uploaded',
            iamge:newUploadedImage
        })
    } catch (error) {
        console.log(error,"image error")
        res.status(500).json({
            success:false,
            message:'Something went wrong! Please try again'
        })
    }
}

const fetchImageController = async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const skip = (page - 1)*limit;

        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages/limit);
        const sortObj={};
        sortObj[sortBy] = sortOrder
        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);
        if(images){
            res.status(200).json({
                success:true,
                currentPage:page,
                totalPages:totalPages,
                totalImages:totalImages,
                data:images
            })
        }
    } catch (error) {
        console.log(error,"fetch image error")
        res.status(500).json({
            success:false,
            message:"fetch image error"
            
        })
    }
}


const deleteImageController = async(req,res)=>{
    try {
        const getCurrentIdOgImageToBEDeleted = req.params.id;
        const userId = req.userInfo.userId;

        const image = await Image.findById(getCurrentIdOgImageToBEDeleted);
        if(!image){
            return res.status(404).json({
                success:false,
                message:'Image not found'
            })
        }

        // check user is same who create upload the image

        if(image.uploadedBy.toString() !== userId){
            return res.status(403).json({
                success:false,
                message:'You are not authorized to delete this image because you haven nott uploaded it'
            })
        }
        await cloudinary.uploader.destroy(image.publicId);

        // delete this image from mongoDB database

        await Image.findByIdAndDelete(getCurrentIdOgImageToBEDeleted)
        res.status(200).json({
            success:true,
            message:'Image deleted successfully'
        })
    } catch (error) {
        console.log(error,"fetch image error")
        res.status(500).json({
            success:false,
            message:"Something went wrong! Please try again"
            
        })
    }
}

module.exports = {uploadImage,fetchImageController,deleteImageController}