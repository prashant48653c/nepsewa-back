import { v2 as Cloudinary } from "cloudinary";
import * as sharp from 'sharp';

import { Readable } from "stream";

export async function uploadImages(files: Express.Multer.File | Express.Multer.File[]): Promise<string[]> {
    Cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const fileArray = Array.isArray(files) ? files : [files];

    const uploadPromises = fileArray.map(async (file) => {
        try {
            // Optimize the image using sharp
            const optimizedImg = await sharp(file.buffer)
                .resize(800) // Resize to a maximum width of 800 pixels
                .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
                .toBuffer();

            // Create a readable stream from the optimized image buffer
            const stream = new Readable();
            stream.push(optimizedImg);
            stream.push(null); // Signal that the stream has ended

            // Upload the image to Cloudinary and return the URL
            return new Promise<string>((resolve, reject) => {
                const uploadStream = Cloudinary.uploader.upload_stream(
                    {
                        folder: 'uploads', // Specify folder in Cloudinary
                    },
                    (error, result) => {
                        if (error) {
                            return reject(new Error(`Upload error: ${error.message}`));
                        }
                        resolve(result.secure_url); // Use secure_url for the URL
                    }
                );
                stream.pipe(uploadStream); // Pipe the stream to Cloudinary
            });
        } catch (error) {
            throw new Error(`Error processing file ${file.originalname}: ${error.message}`);
        }
    });

    // Wait for all uploads to complete and return the URLs
    return Promise.all(uploadPromises);
}




export async function uploadPdf(pdfStream): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = Cloudinary.uploader.upload_stream(
        { folder: 'uploads' },
        (error, result) => {
          if (error) return reject(new Error(`Upload error: ${error.message}`));
          resolve(result.secure_url);
        }
      );
  
      pdfStream.pipe(uploadStream); // Pipe the ReadStream
    });
  }