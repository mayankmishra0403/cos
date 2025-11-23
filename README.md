<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🎓 Code of Shiksha - Complete Ed-Tech Platform

A comprehensive learning platform for AKTU students featuring academic resources, placement preparation, AI-powered tutoring, and secure authentication with role-based admin access.

## ✨ Features

### 🔐 **Authentication & Authorization**
- Email/Password signup and login
- Google OAuth integration
- Role-based access control (Admin vs Regular Users)
- Protected routes for premium content
- Persistent sessions with Appwrite

### 📚 **Academic Resources** (Protected)
- Unit-wise AKTU syllabus notes
- Admin-uploaded study materials
- Downloadable PDFs
- Category-based organization
- Previous year questions

### 💼 **Placement Preparation** (Protected)
- 500+ curated DSA problems
- Company-specific questions (Google, Amazon, Microsoft, etc.)
- Difficulty-based filtering (Easy, Medium, Hard)
- Progress tracking
- Admin-uploaded placement resources

### 🤖 **AI Tutor** (Public - Free for All)
- 24/7 AI-powered doubt solving
- Powered by Google Gemini 2.5 Flash
- Instant code examples
- Concept explanations
- No login required

### 🛡️ **Admin Panel** (Admin Only)
- Add/Delete academic materials
- Add/Delete placement resources
- PDF upload to cloud storage
- Category management
- Real-time content updates

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Appwrite account
- Google Cloud Console project (for OAuth)

### 1. Installation

```bash
# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Appwrite Configuration
VITE_APPWRITE_PROJECT_ID=6922de57001dbd3fb5c3
VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_DATABASE_ID=6922dea5003b2433dad8

# Collection IDs (Create these in Appwrite - See APPWRITE_SETUP.md)
VITE_APPWRITE_ACADEMICS_COLLECTION_ID=your_academics_collection_id
VITE_APPWRITE_PLACEMENTS_COLLECTION_ID=your_placements_collection_id

# Admin Credentials
VITE_ADMIN_EMAIL=admin@gmail.com
VITE_ADMIN_PASSWORD=admin@2006

# Gemini API Key
VITE_GEMINI_API_KEY=your_gemini_api_key
```

### 3. Appwrite Setup

**Important:** You must set up Appwrite collections before running the app.

Follow the detailed guide: **[APPWRITE_SETUP.md](./APPWRITE_SETUP.md)**

Quick checklist:
- [ ] Create `academics_materials` collection
- [ ] Create `placements` collection  
- [ ] Create `default` storage bucket
- [ ] Enable Email/Password authentication
- [ ] Configure Google OAuth
- [ ] Add platform for localhost
- [ ] Update collection IDs in `.env`

### 4. Run the Application

```bash
npm run dev
```

Visit: **http://localhost:3001**

## 📖 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup instructions
- **[APPWRITE_SETUP.md](./APPWRITE_SETUP.md)** - Appwrite configuration guide
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Feature overview

## 🔑 Access Levels

| Page | Access | Description |
|------|--------|-------------|
| Home | Public | Landing page with overview |
| AI Tutor | Public | Free AI assistance for everyone |
| Academics | Protected | Login required to access materials |
| Placements | Protected | Login required to access resources |
| Admin Panel | Admin Only | Only `admin@gmail.com` can access |

### Admin Credentials
- **Email:** `admin@gmail.com`
- **Password:** `admin@2006`

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Backend:** Appwrite (BaaS)
- **Database:** Appwrite Database
- **Storage:** Appwrite Storage
- **Authentication:** Appwrite Auth + Google OAuth
- **AI:** Google Gemini 2.5 Flash
- **Icons:** Lucide React
- **Routing:** React Router v6

## 📁 Project Structure

```
cos/
├── components/          # React components
│   ├── AdminPanel.tsx
│   ├── LoginModal.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProtectedRoute.tsx
├── context/            # Global state
│   └── AuthContext.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── Academics.tsx
│   ├── Placement.tsx
│   └── AITutor.tsx
├── services/           # Backend services
│   ├── appwriteConfig.ts
│   ├── authService.ts
│   ├── databaseService.ts
│   └── geminiService.ts
├── .env               # Environment variables
├── App.tsx            # Main app component
└── package.json
```

## 🎨 Features Breakdown

### Authentication Flow
1. User clicks "Login" in navbar
2. Modal appears with signup/login options
3. Choose Email/Password or Google OAuth
4. After authentication, access protected content
5. Admin users see additional "Admin" button

### Admin Workflow
1. Login with admin credentials
2. Click "Admin" button in navbar
3. Add materials with title, category, description
4. Upload PDFs (stored in Appwrite Storage)
5. Materials appear on Academics/Placements pages
6. Delete materials when needed

### Student Workflow
1. Browse public content (Home, AI Tutor)
2. Login/Signup to access Academics & Placements
3. View and download study materials
4. Track placement preparation progress
5. Use AI Tutor for instant help (no login needed)

## 🐛 Troubleshooting

### "Collection not found" error
- Verify collection IDs in `.env` match Appwrite console
- Ensure collections are created with correct attributes

### Google OAuth not working
- Check redirect URIs in Google Console
- Verify Client ID/Secret in Appwrite Auth settings

### Admin panel not visible
- Must login with exact email: `admin@gmail.com`
- Check admin credentials in `.env`

### File upload fails
- Verify storage bucket named `default` exists
- Check bucket permissions allow authenticated users to create

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables
Update `.env` for production:
- Add production domain to Appwrite platforms
- Update OAuth redirect URLs
- Keep all other credentials secure

### Deploy
Deploy the `dist/` folder to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📊 Stats

- 📝 500+ DSA Problems
- 📚 20+ AKTU Subjects
- 🤖 24/7 AI Support
- 🎯 100% Free Access

## 🤝 Contributing

This project is created for AKTU students. Contributions are welcome!

## 📄 License

MIT License

## 📧 Support

For issues or questions:
- Check documentation files
- Review Appwrite setup guide
- Contact: support@codeofshiksha.com

---

<div align="center">
  <p>Made with ❤️ for AKTU Students</p>
  <p>View app in AI Studio: https://ai.studio/apps/drive/1d-AR_AkieM_TYoAWodlG15HU-l98A6GD</p>
</div>

