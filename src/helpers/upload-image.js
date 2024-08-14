import { cloudinary } from './cloudinary'; 
import { Buffer } from 'buffer';

export const UploadImage = async (file, folder) => {
    try {
        const buffer = Buffer.from(await file.arrayBuffer());

        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto',
                    folder: folder,
                },
                (error, result) => {
                    if (error) {
                        reject(`Cloudinary upload error: ${error.message}`);
                    } else {
                        resolve(result);
                    }
                }
            ).end(buffer);
        });
    } catch (error) {
        throw new Error(`Error uploading image: ${error.message}`);
    }
};
