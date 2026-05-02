import { registerAs } from '@nestjs/config';

export default registerAs('cloudinary', () => ({
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryUrl: process.env.CLOUDINARY_URL,
}));
