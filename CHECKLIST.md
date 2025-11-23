# ✅ Final Setup Checklist

## 🎯 Complete This Before Running Your App

### 📋 Pre-Setup Verification
- [x] Node.js installed
- [x] npm install completed
- [x] .env file created
- [x] Appwrite account created
- [x] Project ID obtained: `6922de57001dbd3fb5c3`
- [x] Database ID obtained: `6922dea5003b2433dad8`

---

## 🔴 CRITICAL STEPS (Must Complete)

### 1. Create Appwrite Collections

#### Academics Collection
- [ ] Go to Appwrite Console → Databases → `6922dea5003b2433dad8`
- [ ] Click "Create Collection"
- [ ] Name: `academics_materials`
- [ ] Add these attributes:
  - [ ] `title` (String, 255, Required)
  - [ ] `description` (String, 1000, Optional)
  - [ ] `category` (String, 100, Required)
  - [ ] `fileUrl` (String, 500, Optional)
  - [ ] `fileId` (String, 100, Optional)
  - [ ] `createdAt` (String, 100, Required)
- [ ] Set Permissions:
  - [ ] Role: Any → Read ✅
  - [ ] Role: Users → Create, Update, Delete ✅
- [ ] **Copy Collection ID**
- [ ] Paste in `.env` as `VITE_APPWRITE_ACADEMICS_COLLECTION_ID`

#### Placements Collection
- [ ] Click "Create Collection" again
- [ ] Name: `placements`
- [ ] Add same 6 attributes as above
- [ ] Set same permissions
- [ ] **Copy Collection ID**
- [ ] Paste in `.env` as `VITE_APPWRITE_PLACEMENTS_COLLECTION_ID`

### 2. Create Storage Bucket
- [ ] Go to Storage → Create Bucket
- [ ] Name: `default`
- [ ] Bucket ID: `default`
- [ ] Max file size: 50MB
- [ ] Extensions: `pdf,jpg,png,jpeg,doc,docx`
- [ ] Enable File Security
- [ ] Set Permissions:
  - [ ] Role: Any → Read ✅
  - [ ] Role: Users → Create, Update, Delete ✅

### 3. Configure Authentication
- [ ] Go to Auth → Settings
- [ ] Enable "Email/Password"
- [ ] Enable "Google OAuth"
- [ ] Get Google OAuth credentials (see below)

### 4. Google OAuth Setup
- [ ] Go to https://console.cloud.google.com
- [ ] Create project or select existing
- [ ] Enable "Google+ API"
- [ ] Create OAuth 2.0 Client ID
- [ ] Add Authorized JavaScript origins:
  - [ ] `http://localhost:3001`
  - [ ] `http://localhost:5173`
- [ ] Add Authorized redirect URI:
  - [ ] `https://fra.cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/redirect`
- [ ] Copy Client ID and Secret
- [ ] Paste in Appwrite Auth → Google OAuth settings

### 5. Add Platform
- [ ] Go to Appwrite Settings → Platforms
- [ ] Add Web Platform
- [ ] Name: `Code of Shiksha Dev`
- [ ] Hostname: `localhost`

### 6. Update .env File
- [ ] Open `.env`
- [ ] Verify Project ID: `6922de57001dbd3fb5c3`
- [ ] Verify Endpoint: `https://fra.cloud.appwrite.io/v1`
- [ ] Verify Database ID: `6922dea5003b2433dad8`
- [ ] **Add Academics Collection ID** ⚠️
- [ ] **Add Placements Collection ID** ⚠️
- [ ] Verify admin email: `admin@gmail.com`
- [ ] Verify admin password: `admin@2006`

---

## 🟡 OPTIONAL (Recommended)

### Get Gemini API Key (For AI Tutor)
- [ ] Go to https://aistudio.google.com/app/apikey
- [ ] Create API key
- [ ] Add to `.env` as `VITE_GEMINI_API_KEY`

---

## 🟢 TESTING CHECKLIST

### First Run
- [ ] Run `npm run dev`
- [ ] No errors in terminal
- [ ] App opens at http://localhost:3001
- [ ] Home page loads correctly

### Authentication
- [ ] Click "Login" button
- [ ] Modal appears
- [ ] Try signup with email/password
- [ ] Logout works
- [ ] Login again
- [ ] Try "Continue with Google"
- [ ] Google OAuth redirects correctly

### Protected Routes
- [ ] Logout
- [ ] Try accessing `/academics` → Should show "Access Restricted"
- [ ] Login
- [ ] Can access `/academics` now ✅
- [ ] Same for `/placements`

### AI Tutor
- [ ] Go to `/ai-tutor`
- [ ] Works without login ✅
- [ ] Can send messages
- [ ] Gets AI responses

### Admin Panel
- [ ] Login with `admin@gmail.com` / `admin@2006`
- [ ] "Admin" button appears in navbar ✅
- [ ] Click Admin → Goes to admin panel
- [ ] Try adding academic material:
  - [ ] Fill title, category, description
  - [ ] Upload a test PDF
  - [ ] Click "Add Material"
  - [ ] Success message appears
- [ ] Go to `/academics`
- [ ] New material appears in cards ✅
- [ ] Can download PDF
- [ ] Go back to admin
- [ ] Delete the test material
- [ ] Material removed from academics page ✅

### Repeat for Placements
- [ ] Add placement material as admin
- [ ] Verify appears on `/placements`
- [ ] Delete and verify removed

---

## 🚨 Troubleshooting

### If you see "Collection not found"
➡️ Collection IDs in `.env` don't match Appwrite
- Double check you copied the right IDs
- No extra spaces in .env
- Restart dev server after changing .env

### If upload fails
➡️ Storage bucket issue
- Verify bucket named `default` exists
- Check bucket has correct permissions

### If Google OAuth fails
➡️ OAuth misconfiguration
- Verify redirect URI matches exactly
- Check Client ID/Secret in Appwrite

### If admin panel doesn't show
➡️ Not logged in as admin
- Must use exact email: `admin@gmail.com`
- Case sensitive!

---

## 📝 Your Status

Current Progress: ____ / 100%

### Completion Stages:
- [ ] 0-25%: Environment setup done
- [ ] 25-50%: Appwrite collections created
- [ ] 50-75%: Authentication working
- [ ] 75-90%: Protected routes working
- [ ] 90-100%: Admin panel working

---

## 🎉 Success Criteria

**You're 100% done when:**
1. ✅ App runs without errors
2. ✅ Can signup/login with email
3. ✅ Can login with Google
4. ✅ Academics requires login
5. ✅ Placements requires login
6. ✅ AI Tutor works without login
7. ✅ Admin can add materials
8. ✅ Admin can delete materials
9. ✅ Materials show on pages
10. ✅ PDFs download correctly

---

## 📞 Need Help?

1. Read `SETUP_GUIDE.md` for detailed instructions
2. Read `APPWRITE_SETUP.md` for Appwrite-specific help
3. Check browser console for error messages
4. Verify all collection IDs are correct
5. Make sure .env file has no syntax errors

---

**Once all critical steps are ✅, run `npm run dev` and test everything!**

Good luck! 🚀
