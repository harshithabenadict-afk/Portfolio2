# Harshitha M — Computer Science Engineering Placement Portfolio

A modern, responsive, recruiter-ready placement portfolio website designed for campus recruitment drives, technical interviews, and professional profile sharing.

---

## 📁 Project Folder Structure

```text
placement-portfolio/
│
├── index.html                 # Semantic single-page HTML5 structure
├── README.md                  # Setup & deployment documentation
│
├── css/
│   └── style.css              # Custom Navy Blue, White & Light Blue stylesheet
│
├── js/
│   └── script.js              # Theme switcher, photo uploader, modal & tab handlers
│
└── assets/                    # Media, icons, mockups, and resume documents
    ├── default_avatar.svg     # Default professional vector avatar
    ├── mockup_iot_dashboard.svg # IoT farm telemetry visual mockup
    ├── mockup_disease_ai.svg  # AI disease classification mockup
    ├── mockup_digital_twin.svg# Digital Twin health simulator mockup
    ├── mockup_blockchain.svg  # Cryptographic blockchain ledger mockup
    ├── groundnut_default.jpg  # Project sample asset
    ├── test_isolated_leaf_1.jpg # Project leaf sample asset
    └── Harshitha_M_Resume.pdf # (Place your actual resume PDF here)
```

---

## 🚀 How to Run & Preview on Your Computer

### Option 1: Direct Browser Launch (Easiest & Instant)
1. Open File Explorer on Windows.
2. Navigate to:
   ```text
   C:\Users\harsh\.gemini\antigravity\scratch\placement-portfolio
   ```
3. Double-click **`index.html`** to open it in Google Chrome, Microsoft Edge, or Firefox.
4. The site will load immediately with all styling, icons, and interactions.

### Option 2: Using VS Code Live Server
1. Open the `placement-portfolio` folder in Visual Studio Code.
2. Install the **Live Server** extension if not already installed.
3. Right-click on `index.html` and click **"Open with Live Server"**.
4. The portfolio opens on `http://127.0.0.1:5500`.

### Option 3: Using Python HTTP Server (Command Line)
In PowerShell or Terminal:
```powershell
cd "C:\Users\harsh\.gemini\antigravity\scratch\placement-portfolio"
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 📸 Profile Photo Upload & Customization

You have two convenient ways to set your profile picture:

1. **Direct In-Browser Upload (Built-in)**:
   - Open `index.html` in your browser.
   - Click the **"Upload Photo"** camera button on the hero profile card.
   - Select your photo (JPG, PNG, or WebP).
   - Your photo will preview immediately and is saved in your browser's `localStorage` so it stays even when refreshed!
2. **Permanent File Method**:
   - Save your photo as `profile.jpg` inside the `assets/` folder.
   - In `index.html`, change line 118:
     ```html
     <img src="assets/profile.jpg" alt="Harshitha M - Profile Photo" class="profile-img">
     ```

---

## 📄 How to Add Your Actual Resume PDF

1. Name your official resume PDF file:
   ```text
   Harshitha_M_Resume.pdf
   ```
2. Place it directly inside the `assets/` folder:
   ```text
   assets/Harshitha_M_Resume.pdf
   ```
3. Both the **"Download Resume"** and **"View Resume"** buttons will automatically download and open your PDF in a new tab!

---

## ✏️ Where to Edit Your Details in `index.html`

All editable sections contain helpful comments in `index.html`:
- **Name & Hero Pitch**: Search for `class="hero-title"` (Lines ~75–85)
- **About Me**: Search for `id="about"` (Lines ~160–210)
- **Education Marks/Years**: Search for `id="education"` (Lines ~420–490)
  - College: The Oxford College of Engineering (VTU) (2027)
  - PUC: Lion's PU College (2020) — 82.16%
  - SSLC: Seventh-day Adventist English High School (2018) — 88.64%
- **Contact Email & Links**: Search for `id="contact"` (Lines ~550–600)
  - Email: `harshithabenadict@gmail.com`
  - LinkedIn: `linkedin.com/in/harshitha-m`
  - GitHub: `github.com/harshitha-m`

---

## 🌐 How to Publish Online for Free

### Method 1: GitHub Pages (Recommended for Placement Sharing)
1. Create a free account on [GitHub.com](https://github.com) (if you haven't already).
2. Create a new repository named `portfolio` (or `harshitha-portfolio`).
3. Upload all files from the `placement-portfolio` folder (`index.html`, `css/`, `js/`, `assets/`, `README.md`).
4. In your GitHub repository, go to **Settings** ➔ **Pages**.
5. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
6. Click **Save**.
7. In 1–2 minutes, your portfolio will be live at:
   ```text
   https://<your-username>.github.io/portfolio/
   ```

### Method 2: Netlify Drop (Instant Drag & Drop — 30 Seconds)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `placement-portfolio` folder into the drop zone.
3. Netlify will deploy your site instantly and provide a live URL (e.g. `https://harshitha-portfolio.netlify.app`).
