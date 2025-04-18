# OAuth2 Credentials Setup Guide

This guide explains how to obtain the OAuth2 credentials for Google Drive and OneDrive integration.

## Google Drive Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Drive API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click "Enable"
4. Configure OAuth consent screen:
   - Go to "APIs & Services" > "OAuth consent screen"
   - Choose "External" user type
   - Fill in the required application information
   - Add the scope: `https://www.googleapis.com/auth/drive.file`
5. Create OAuth credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Web application"
   - Add authorized redirect URI: `http://localhost:8181/api/storage/google/callback`
   - Save the generated client ID and client secret

## OneDrive Setup

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to Azure Active Directory
3. Register a new application:
   - Go to "App registrations" > "New registration"
   - Enter application name
   - Select "Accounts in any organizational directory and personal Microsoft accounts"
   - Add redirect URI: `http://localhost:8181/api/storage/onedrive/callback`
4. Configure permissions:
   - Go to "API permissions"
   - Add "Files.ReadWrite" and "offline_access" permissions
   - Grant admin consent if required
5. Get credentials:
   - Copy the Application (client) ID
   - Generate a new client secret under "Certificates & secrets"

## Securing Credentials

1. Create a new file named `application-secrets.properties` in the same directory as `application.properties`
2. Move the following properties to `application-secrets.properties`:
```properties
spring.security.oauth2.client.registration.google.client-id=your_google_client_id
spring.security.oauth2.client.registration.google.client-secret=your_google_client_secret
spring.security.oauth2.client.registration.onedrive.client-id=your_onedrive_client_id
spring.security.oauth2.client.registration.onedrive.client-secret=your_onedrive_client_secret
```
3. Add `application-secrets.properties` to `.gitignore`
4. Reference the secrets file in `application.properties`:
```properties
spring.profiles.include=secrets
```

## Important Security Notes

- Never commit OAuth credentials to version control
- Use environment variables or secure vaults in production
- Regularly rotate client secrets
- Monitor API usage and set up alerts
- Implement proper error handling for OAuth flows