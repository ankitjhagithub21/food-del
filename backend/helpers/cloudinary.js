const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const uploadImage = async (filePath) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    
    const result = await cloudinary.uploader.upload(filePath, options);
    const data = {
      url:result.secure_url,
      publicId:result.public_id
    }
    return data
  } catch (error) {
    console.error(error);
  }
};

const deleteImage = async(publicId) =>{
  try{
    await cloudinary.uploader.destroy(publicId)
  }catch(error){
    console.log(error)
  }
}

module.exports = {
  uploadImage,
  deleteImage
}