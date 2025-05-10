# Cloudinary Setup Instructions

## 1. Create a Cloudinary Account

If you don't already have a Cloudinary account, sign up for a free account at [https://cloudinary.com/](https://cloudinary.com/).

## 2. Locate Your Cloudinary Credentials

After creating an account, go to your dashboard to find your:

- Cloud Name
- API Key
- API Secret

These can be found in the dashboard under "Account Details".

## 3. Create an Upload Preset

Upload presets allow your frontend to upload images directly to Cloudinary without requiring the API secret on the client side.

1. In the Cloudinary dashboard, go to **Settings** → **Upload** → **Upload presets**
2. Click **Add upload preset**
3. Configure your preset:

   - **Preset name**: `travel_app` (use this exact name to match your code)
   - **Signing Mode**: `Unsigned` (important for frontend uploads)
   - **Folder**: You can specify a default folder or leave blank
   - Under **Media Analysis and AI**:
     - Enable **Auto-tagging** for better image organization
     - Set **Categorization** to improve search
   - Under **Transformations**:
     - Consider setting up automatic image optimization
     - You can set maximum dimensions to save storage

4. Click **Save** to create the preset

## 4. Update Your Cloudinary Configuration

In your project, update the `cloudinaryConfig.js` file with your actual Cloudinary details:

```javascript
// Replace placeholders with your actual Cloudinary credentials
const cloudinaryConfig = {
  cloudName: "YOUR_CLOUD_NAME", // From dashboard
  apiKey: "YOUR_API_KEY", // From dashboard
  uploadPreset: "travel_app", // The preset you created
};
```

## 5. Configure CORS Settings

Ensure Cloudinary accepts uploads from your domain:

1. In your Cloudinary dashboard, go to **Settings** → **Security**
2. Under **CORS allowed origins**, add:
   - `http://localhost:5173` (for local development)
   - Your production domain(s)

## Benefits Over Firebase Storage

- More generous free tier (25GB storage and 25GB bandwidth/month)
- Advanced image optimization and transformation features
- No CORS configuration issues with unsigned upload presets
- Better CDN performance for global image delivery
- Built-in responsive image delivery and automatic format conversion
