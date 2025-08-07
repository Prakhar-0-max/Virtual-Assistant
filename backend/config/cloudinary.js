import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async (filePath) => {
  try {
    // Config inside try block is okay but can be outside if done once globally
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const uploadResult = await cloudinary.uploader.upload(filePath);

    fs.unlinkSync(filePath); // delete local file after upload
    return uploadResult.secure_url;

  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // cleanup file if it exists
    }

    console.error("Cloudinary Upload Error:", error);
    throw new Error("Cloudinary Error"); // let the caller handle this
  }
};

export default uploadOnCloudinary;
