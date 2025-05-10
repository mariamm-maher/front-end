// Cloudinary configuration for image uploads
import { Cloudinary } from "cloudinary-core";

// Initialize Cloudinary with your cloud name
const cloudinaryConfig = {
  cloudName: "dumsrgndl", // Replace with your Cloudinary cloud name
  apiKey: "127342328434244", // Replace with your Cloudinary API key
  apiSecret: "yB6zbgWNf8kiM6pIZhYhZz1BaKs", // Replace with your Cloudinary API secret
  uploadPreset: "Travel-app", // Create an unsigned upload preset in your Cloudinary dashboard
};

// Initialize Cloudinary
const cloudinary = new Cloudinary({
  cloud_name: cloudinaryConfig.cloudName,
  secure: true,
});

export default cloudinary;
export { cloudinaryConfig };
