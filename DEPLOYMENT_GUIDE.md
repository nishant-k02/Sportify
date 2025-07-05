# Sportify - Vercel Deployment Guide

This guide will help you deploy the Sportify full-stack application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Database**: Set up a MongoDB database (MongoDB Atlas recommended)
3. **OpenAI API Key**: Get your API key from [OpenAI](https://platform.openai.com)

## Step 1: Environment Variables

### Backend Environment Variables
In your Vercel dashboard, set these environment variables for your backend:

```env
MONGO_URI=mongodb_key
FRONTEND_URL=https://your-frontend-url.vercel.app
JWT_SECRET=your-jwt-secret-key
NODE_ENV=production
```

### Frontend Environment Variables
For your frontend deployment, set:

```env
REACT_APP_API_URL=https://your-backend-url.vercel.app
REACT_APP_OPENAI_API_KEY=your-openai-api-key
```

## Step 2: Update Configuration Files

### Update Frontend URLs
Before deploying, update the placeholder URLs in:

1. **frontend/src/config/config.js**:
   ```javascript
   const config = {
     development: {
       API_URL: 'http://localhost:8000',
     },
     production: {
       API_URL: process.env.REACT_APP_API_URL || 'https://your-actual-backend-url.vercel.app',
     },
   };
   ```

2. **backend/index.js** (CORS configuration):
   ```javascript
   origin: process.env.NODE_ENV === 'production' 
     ? [process.env.FRONTEND_URL, "https://your-actual-frontend-url.vercel.app"]
     : "http://localhost:3000",
   ```

## Step 3: File Upload Configuration

⚠️ **Important**: Vercel's serverless functions have file size limitations. For production, consider using:

1. **Cloudinary** for image uploads
2. **AWS S3** for file storage
3. **Vercel Blob** for file storage

Update the multer configuration in `backend/multer/multerUpload.js` to use cloud storage.

## Step 4: Deployment Steps

### Option A: Deploy via Git (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect the configuration

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel --prod
   ```

## Step 5: Post-Deployment Configuration

1. **Update API URLs**: Once deployed, update the URLs in your config files with the actual Vercel URLs
2. **Test Authentication**: Verify JWT tokens work correctly
3. **Test File Uploads**: Ensure profile picture uploads work (may need cloud storage)
4. **Test Database**: Verify MongoDB connection works

## Step 6: Domain Configuration (Optional)

1. In Vercel dashboard, go to your project settings
2. Add custom domains if desired
3. Update environment variables with new domain URLs

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure frontend URL is added to CORS configuration
2. **Environment Variables**: Double-check all environment variables are set
3. **File Upload Errors**: Implement cloud storage for production
4. **Database Connection**: Ensure MongoDB allows connections from Vercel IPs

### Debug Steps:

1. Check Vercel function logs in the dashboard
2. Verify environment variables are correctly set
3. Test API endpoints individually
4. Check MongoDB connection strings

## Architecture Notes

- **Frontend**: Deployed as static files
- **Backend**: Deployed as serverless functions
- **Database**: MongoDB (external)
- **File Storage**: Requires cloud storage solution

## Security Considerations

1. Use strong JWT secrets
2. Implement rate limiting
3. Validate all inputs
4. Use HTTPS only
5. Secure database connections

## Performance Optimization

1. Enable caching for static assets
2. Optimize images
3. Use CDN for file serving
4. Implement database indexing

---

**Note**: Replace all placeholder URLs with your actual Vercel deployment URLs after the first deployment. 