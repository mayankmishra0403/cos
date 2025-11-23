# 📋 Appwrite Quick Setup Checklist

## ⚡ Step-by-Step Appwrite Configuration

### 1️⃣ Database Collections Setup

Navigate to: **Databases** → Database ID: `6922dea5003b2433dad8`

#### Collection 1: `academics_materials`
```
Create Collection → Name: academics_materials
```

**Attributes to add:**
1. `title` - String, 255 chars, Required
2. `description` - String, 1000 chars, Optional  
3. `category` - String, 100 chars, Required
4. `fileUrl` - String, 500 chars, Optional
5. `fileId` - String, 100 chars, Optional
6. `createdAt` - String, 100 chars, Required

**Permissions:**
- Role: Any → Read ✅
- Role: Users → Create, Update, Delete ✅

**Copy Collection ID** → Paste in `.env` as `VITE_APPWRITE_ACADEMICS_COLLECTION_ID`

---

#### Collection 2: `placements`
```
Create Collection → Name: placements
```

**Attributes to add:**
1. `title` - String, 255 chars, Required
2. `description` - String, 1000 chars, Optional
3. `category` - String, 100 chars, Required
4. `fileUrl` - String, 500 chars, Optional
5. `fileId` - String, 100 chars, Optional
6. `createdAt` - String, 100 chars, Required

**Permissions:**
- Role: Any → Read ✅
- Role: Users → Create, Update, Delete ✅

**Copy Collection ID** → Paste in `.env` as `VITE_APPWRITE_PLACEMENTS_COLLECTION_ID`

---

### 2️⃣ Storage Bucket Setup

Navigate to: **Storage** → Create Bucket

**Bucket Configuration:**
```
Name: default
Bucket ID: default (auto-generated, use this)
Maximum File Size: 50 MB
Allowed Extensions: pdf,jpg,png,jpeg,doc,docx
File Security: Enabled
```

**Permissions:**
- Role: Any → Read ✅
- Role: Users → Create, Update, Delete ✅

---

### 3️⃣ Authentication Setup

Navigate to: **Auth** → Settings

#### Enable Methods:
- ✅ Email/Password
- ✅ Google OAuth

#### Google OAuth Configuration:
1. **Get Google Credentials:**
   - Go to: https://console.cloud.google.com
   - Create project → Enable Google+ API
   - Credentials → Create OAuth 2.0 Client ID
   - Application Type: Web Application
   
2. **Authorized JavaScript Origins:**
   ```
   http://localhost:3001
   http://localhost:5173
   https://your-production-domain.com
   ```

3. **Authorized Redirect URIs:**
   ```
   https://fra.cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/redirect
   ```

4. **Copy Client ID & Secret** → Paste in Appwrite Auth Settings

---

### 4️⃣ Platform Configuration

Navigate to: **Settings** → Platforms → Add Platform

**Development Platform:**
```
Type: Web App
Name: Code of Shiksha Dev
Hostname: localhost
```

**Production Platform (when deploying):**
```
Type: Web App  
Name: Code of Shiksha
Hostname: your-domain.com
```

---

### 5️⃣ Update .env File

After creating collections, update your `.env`:

```env
# Already Configured
VITE_APPWRITE_PROJECT_ID=6922de57001dbd3fb5c3
VITE_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
VITE_APPWRITE_DATABASE_ID=6922dea5003b2433dad8

# UPDATE THESE with your collection IDs
VITE_APPWRITE_ACADEMICS_COLLECTION_ID=paste_academics_collection_id_here
VITE_APPWRITE_PLACEMENTS_COLLECTION_ID=paste_placements_collection_id_here

# Don't change admin credentials
VITE_ADMIN_EMAIL=admin@gmail.com
VITE_ADMIN_PASSWORD=admin@2006
```

---

## ✅ Verification Checklist

- [ ] Database `6922dea5003b2433dad8` exists
- [ ] Collection `academics_materials` created with all 6 attributes
- [ ] Collection `placements` created with all 6 attributes
- [ ] Both collections have correct read/write permissions
- [ ] Storage bucket `default` created
- [ ] Storage bucket has file size limit and extensions configured
- [ ] Email/Password auth enabled
- [ ] Google OAuth configured with correct credentials
- [ ] Platform added for localhost
- [ ] .env file updated with collection IDs
- [ ] npm install completed
- [ ] npm run dev runs without errors

---

## 🧪 Test Your Setup

1. **Start Dev Server:**
   ```bash
   npm run dev
   ```

2. **Test Authentication:**
   - Click "Login" → Sign up with email
   - Try "Continue with Google"
   - Verify you can logout

3. **Test Admin Access:**
   - Login with: `admin@gmail.com` / `admin@2006`
   - "Admin" button should appear in navbar
   - Go to `/admin` and try adding a material

4. **Test Protected Routes:**
   - Logout → Try accessing `/academics` (should redirect)
   - Login → Access should work

5. **Test File Upload:**
   - As admin, upload a PDF in admin panel
   - Check if it appears in Storage → default bucket

---

## 🚨 Common Issues

### "Collection not found"
➡️ Collection ID in .env doesn't match Appwrite

### "Unauthorized"  
➡️ Check collection permissions (Role: Any → Read)

### File upload fails
➡️ Verify bucket named `default` exists and has permissions

### Google OAuth error
➡️ Double-check redirect URI matches exactly

---

## 📞 Need Help?

If stuck, verify:
1. Appwrite console shows all resources created
2. .env file has correct IDs (no extra spaces)
3. Dev server restarted after .env changes
4. Browser console for specific error messages

---

**Once all checkboxes are ✅, your app is ready to use!** 🎉
