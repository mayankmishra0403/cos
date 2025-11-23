# Code of Shiksha - Complete Setup Guide

## 🎓 Overview
Code of Shiksha is a comprehensive ed-tech platform for AKTU students featuring:
- Academic resources with unit-wise notes
- Placement preparation with 500+ DSA problems
- AI-powered tutor (Gemini 2.5 Flash)
- Admin panel for content management
- Secure authentication with Appwrite

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Appwrite account ([cloud.appwrite.io](https://cloud.appwrite.io))
- Google Cloud Console project (for OAuth)

### 1. Clone & Install
```bash
cd /path/to/project
npm install
```

### 2. Appwrite Setup

#### Create Appwrite Project
1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Create a new project (already done - Project ID: `6922de57001dbd3fb5c3`)
3. Note your endpoint: `https://fra.cloud.appwrite.io/v1`

#### Create Database Collections
1. Go to **Databases** → Create database (already created - ID: `6922dea5003b2433dad8`)
2. Create two collections:

**Collection 1: academics_materials**
- Attributes:
  - `title` (String, Required)
  - `description` (String, Optional)
  - `category` (String, Required)
  - `fileUrl` (String, Optional)
  - `fileId` (String, Optional)
  - `createdAt` (String, Required)

**Collection 2: placements**
- Attributes:
  - `title` (String, Required)
  - `description` (String, Optional)
  - `category` (String, Required)
  - `fileUrl` (String, Optional)
  - `fileId` (String, Optional)
  - `createdAt` (String, Required)

#### Create Storage Bucket
1. Go to **Storage** → Create bucket
2. Name it `default`
3. Set permissions:
   - File Security: Enabled
   - Maximum File Size: 50MB
   - Allowed File Extensions: `pdf, jpg, png, jpeg`
   - Permissions: Anyone can read, Only authenticated users can create/update/delete

#### Setup Authentication
1. Go to **Auth** → Settings
2. Enable **Email/Password** authentication
3. Enable **Google OAuth**:
   - Add your Google Client ID and Secret
   - Set redirect URL: `http://localhost:3001/` (for development)

#### Configure Platform
1. Go to **Settings** → Platforms
2. Add Web App:
   - Name: Code of Shiksha
   - Hostname: `localhost` (for development)
   - For production, add your domain

### 3. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized JavaScript origins: `http://localhost:3001`
   - Authorized redirect URIs: `https://fra.cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/redirect`
5. Copy Client ID and Secret to Appwrite

### 4. Environment Configuration
Update your `.env` file:

```env
# Appwrite Configuration
VITE_APPWRITE_PROJECT_ID=6922de57001dbd3fb5c3
VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_DATABASE_ID=6922dea5003b2433dad8

# Replace these with your actual collection IDs from Appwrite
VITE_APPWRITE_ACADEMICS_COLLECTION_ID=your_academics_collection_id_here
VITE_APPWRITE_PLACEMENTS_COLLECTION_ID=your_placements_collection_id_here

# Admin Credentials (Do NOT change unless you want different admin)
VITE_ADMIN_EMAIL=admin@gmail.com
VITE_ADMIN_PASSWORD=admin@2006
```

### 5. Run the Application
```bash
npm run dev
```

Visit: `http://localhost:3001`

## 🔐 Authentication Flow

### For Regular Users
1. Click "Login" in navbar
2. Options:
   - Sign up with email/password
   - Continue with Google
3. After login, access to:
   - **Academics**: ✅ (Protected)
   - **Placements**: ✅ (Protected)
   - **AI Tutor**: ✅ (Always public)

### For Admin
1. Login with:
   - Email: `admin@gmail.com`
   - Password: `admin@2006`
2. "Admin" button appears in navbar
3. Access admin panel to:
   - Add academic materials
   - Add placement resources
   - Upload PDFs
   - Delete materials

## 📁 Project Structure
```
cos/
├── components/
│   ├── AdminPanel.tsx       # Admin content management
│   ├── Footer.tsx            # Enhanced footer
│   ├── LoginModal.tsx        # Auth modal
│   ├── Navbar.tsx            # Navigation with auth
│   └── ProtectedRoute.tsx    # Route protection
├── context/
│   └── AuthContext.tsx       # Global auth state
├── pages/
│   ├── Academics.tsx         # Academic resources
│   ├── AITutor.tsx          # AI chat interface
│   ├── Home.tsx             # Landing page
│   └── Placement.tsx        # Placement prep
├── services/
│   ├── appwriteConfig.ts    # Appwrite setup
│   ├── authService.ts       # Auth operations
│   ├── databaseService.ts   # CRUD operations
│   └── geminiService.ts     # AI integration
├── .env                     # Environment variables
├── App.tsx                  # Main app with routing
└── package.json
```

## 🎨 Features

### 1. Academic Resources
- ✅ Protected route (login required)
- ✅ AKTU syllabus organized by subjects
- ✅ Unit-wise content breakdown
- ✅ Admin-uploaded PDF materials
- ✅ Category-based filtering

### 2. Placement Preparation
- ✅ Protected route (login required)
- ✅ 500+ curated DSA problems
- ✅ Company-wise filtering (Google, Amazon, etc.)
- ✅ Difficulty-based filtering
- ✅ Progress tracking
- ✅ Admin-uploaded placement resources

### 3. AI Tutor
- ✅ Public access (no login needed)
- ✅ Powered by Gemini 2.5 Flash
- ✅ Instant doubt resolution
- ✅ Code examples
- ✅ 24/7 availability

### 4. Admin Panel
- ✅ Role-based access (admin@gmail.com only)
- ✅ Add/delete academic materials
- ✅ Add/delete placement resources
- ✅ PDF upload functionality
- ✅ Category management
- ✅ Real-time updates

### 5. Authentication
- ✅ Email/Password signup & login
- ✅ Google OAuth integration
- ✅ Secure session management
- ✅ Auto-detect admin role
- ✅ Protected routes

## 🛠️ Technology Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Appwrite (BaaS)
- **Database**: Appwrite Database
- **Storage**: Appwrite Storage
- **Auth**: Appwrite Auth + Google OAuth
- **AI**: Google Gemini 2.5 Flash
- **Icons**: Lucide React

## 📝 Important Notes

1. **Collection IDs**: You MUST update `.env` with your actual collection IDs from Appwrite console
2. **Admin Access**: Only `admin@gmail.com` with password `admin@2006` gets admin privileges
3. **Google OAuth**: Requires proper setup in both Google Console and Appwrite
4. **Storage Bucket**: Must be named `default` for file uploads to work
5. **Route Protection**: Academics and Placements require login, AI Tutor is public

## 🐛 Troubleshooting

### Issue: "Collection not found"
- **Solution**: Update collection IDs in `.env` file

### Issue: Google OAuth not working
- **Solution**: 
  1. Verify redirect URIs in Google Console
  2. Check Client ID/Secret in Appwrite
  3. Ensure platform is added in Appwrite

### Issue: Admin panel not visible
- **Solution**: Must login with exact email `admin@gmail.com`

### Issue: File upload fails
- **Solution**: 
  1. Check storage bucket named `default` exists
  2. Verify bucket permissions
  3. Check file size limits

## 🚢 Deployment

### Environment Variables for Production
Update these in your `.env`:
```env
VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=6922de57001dbd3fb5c3
# ... rest of variables
```

### Add Production Platform in Appwrite
1. Go to Appwrite Console → Settings → Platforms
2. Add your production domain
3. Update OAuth redirect URLs

### Build for Production
```bash
npm run build
```

Deploy the `dist/` folder to your hosting service (Vercel, Netlify, etc.)

## 📧 Support
For issues or questions, contact: support@codeofshiksha.com

## 📄 License
MIT License - Created for AKTU Students

---
Made with ❤️ for AKTU Students
