# Google Drive Integration Setup

## Prerequisites
1. A Google Cloud Console project
2. Google Drive API enabled
3. OAuth 2.0 credentials configured

## Configuration Steps

### 1. Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Drive API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click "Enable"

### 2. OAuth Consent Screen
1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required application information
4. Add the scope: `https://www.googleapis.com/auth/drive.file`

### 3. Create OAuth Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Add authorized redirect URI: `http://localhost:5173/api/storage/google/callback`
5. Save the generated client ID

### 4. Environment Configuration
1. Copy the generated client ID
2. Update the `.env` file with your credentials:
   ```env
   VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/api/storage/google/callback
   ```

## Testing the Integration
1. Start the application
2. Click the "Connect Google Drive" button
3. You should be redirected to Google's consent screen
4. After authorization, you'll be redirected back to the application

## Troubleshooting
- Ensure the client ID in `.env` matches your Google Cloud Console credentials
- Verify the redirect URI matches exactly in both the Google Cloud Console and `.env`
- Check browser console for any error messages
- Ensure the Google Drive API is enabled in your Google Cloud Console project