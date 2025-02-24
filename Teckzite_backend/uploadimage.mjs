
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

import pLimit from 'p-limit';
dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImages = async (image) => {
  console.log("In uploadImages function");

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { resource_type: 'auto' },  // Automatically detect the file type
      (error, result) => {
        if (error) {
          console.error('Error uploading image:', error.message);
          reject(error);  // Reject the promise with the error
        } else {
          console.log('Successfully uploaded image');
          console.log(`> Result: ${result.secure_url}`);
          resolve(result.secure_url);  // Resolve the promise with the image URL
        }
      }
    );

    // Pipe the buffer data directly to Cloudinary
    uploadStream.end(image.buffer);  // `image.buffer` is the binary data from the image file
  });
};



export{ uploadImages };
