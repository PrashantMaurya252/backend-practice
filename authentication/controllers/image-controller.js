const Image = require('../models/image');
const {uploadToCloudinary} = require('../helper/cloudinary-helper')
const fs = require('fs')

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
        const images = await Image.find({});
        if(images){
            res.status(200).json({
                success:true,
                data:images
            })
        }
    } catch (error) {
        console.log(error,"fetch image error")
        res.status(200).json({
            success:false,
            message:"fetch image error"
            
        })
    }
}

module.exports = {uploadImage,fetchImageController}