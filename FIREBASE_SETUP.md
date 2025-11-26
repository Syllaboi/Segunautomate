# Firebase Setup Instructions

Follow these steps to set up Firebase for your portfolio:

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `portfolio-website` (or any name you prefer)
4. Disable Google Analytics (optional for this project)
5. Click "Create project"

## Step 2: Register Your Web App

1. In your Firebase project, click the **Web icon** (`</>`) to add a web app
2. Enter app nickname: `Portfolio Admin`
3. **Do NOT** check "Set up Firebase Hosting" (we'll deploy elsewhere)
4. Click "Register app"
5. You'll see your Firebase configuration - **COPY THIS**, you'll need it in Step 4

## Step 3: Set Up Firestore Database

1. In the Firebase Console, go to **Build** → **Firestore Database**
2. Click "Create database"
3. Choose **"Start in production mode"** (we'll add security rules next)
4. Select a location close to you (e.g., `us-central` or `europe-west`)
5. Click "Enable"

## Step 4: Configure Security Rules

1. In Firestore, go to the **Rules** tab
2. Replace the default rules with this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read portfolio content and projects
    match /portfolio_content/{document=**} {
      allow read: if true;
      allow write: if false; // Only admin can write (via admin panel)
    }
    
    match /projects/{document=**} {
      allow read: if true;
      allow write: if false; // Only admin can write (via admin panel)
    }
  }
}
```

3. Click "Publish"

**Note**: These rules allow public read access (so visitors can see your portfolio) but prevent direct writes. Your admin panel will write data through your app's code.

## Step 5: Create .env File

1. In your project root (`c:\Users\OLUWASEGUN\Documents\Portfolio`), create a file named `.env`
2. Copy the Firebase config values from Step 2 and paste them in this format:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Example** (with fake values):
```env
VITE_FIREBASE_API_KEY=AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=portfolio-website-12345.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=portfolio-website-12345
VITE_FIREBASE_STORAGE_BUCKET=portfolio-website-12345.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
```

## Step 6: Restart Your Dev Server

After creating the `.env` file:

1. Stop your current dev server (Ctrl+C in the terminal)
2. Restart it: `npm run dev`
3. The app will now connect to Firebase!

## Step 7: Initialize Firestore with Default Data

The first time you run the app, it will automatically:
- Create the `portfolio_content` collection
- Create the `projects` collection
- Populate them with your default content

## Verification

1. Make a change in your admin panel
2. Check Firebase Console → Firestore Database
3. You should see your data saved there!
4. Open your site in a different browser → changes should appear

---

## Important Notes

- ✅ The `.env` file is already in `.gitignore` (your credentials won't be committed)
- ✅ Firebase free tier is more than enough for a portfolio
- ✅ Your data is now persistent across all browsers and devices
- ✅ When you deploy, add these environment variables to your hosting platform (Vercel/Netlify)

## Need Help?

If you encounter any issues during setup, let me know which step you're on and I'll help you troubleshoot!
