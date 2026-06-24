<div align="center">

# ðŸ§  MindBridge AI â€” Frontend Application

**A Multimodal Wellness Guidance Platform powered by Multimodal AI**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EF0086?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

</div>

---

## ðŸ“– Description

This is the **React Single Page Application (SPA)** frontend for the MindBridge AI platform â€” a multimodal mental health counselling system. It guides users through a fully animated assessment journey covering **behavioural questionnaires**, **facial emotion detection**, **voice mood analysis**, and **AI-powered counselling chat** to produce a personalised mental wellness report.

The application features a premium **glassmorphism dark UI**, a **WebGL particle background** on the landing page (Three.js + React Three Fiber), **cinematic page transitions** (Framer Motion + GSAP), and connects to a **FastAPI backend** hosted on Hugging Face Spaces.

---

## ðŸ› ï¸ Frontend Tech Stack

| Category | Technology |
|---|---|
| **UI Framework** | React 19 + React DOM |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS v4 (glassmorphism dark theme) |
| **3D / WebGL** | Three.js + React Three Fiber + React Three Drei |
| **Animations** | Framer Motion 12 + GSAP 3 + @gsap/react |
| **Routing** | React Router DOM v7 |
| **HTTP Client** | Axios |
| **Authentication** | `@react-oauth/google` (Google OAuth 2.0) + JWT |
| **Charts & Analytics** | Recharts |
| **Icons** | Lucide React + React Icons |
| **Face Detection** | `@vladmandic/face-api` (client-side, in-browser) |
| **Notifications** | React Hot Toast |
| **Progress UI** | React Circular Progressbar |

---

## ðŸ“ Project Structure

```
frontend/
â”‚
â”œâ”€â”€ public/                        # Static assets served at root
â”œâ”€â”€ src/
â”‚   â”‚
â”‚   â”œâ”€â”€ main.jsx                   # React app entry point
â”‚   â”œâ”€â”€ App.jsx                    # Root component â€” BrowserRouter, all routes, providers
â”‚   â”œâ”€â”€ App.css                    # Root-level global styles
â”‚   â”œâ”€â”€ index.css                  # Tailwind base, custom CSS variables, glassmorphism utilities
â”‚   â”‚
â”‚   â”œâ”€â”€ pages/                     # Full-page route components
â”‚   â”‚   â”œâ”€â”€ Landing.jsx            # Hero landing page â€” Three.js WebGL background, GSAP scroll animations
â”‚   â”‚   â”œâ”€â”€ Login.jsx              # Login form â€” email/password + Google OAuth
â”‚   â”‚   â”œâ”€â”€ Register.jsx           # Multi-field registration with validation
â”‚   â”‚   â”œâ”€â”€ ForgotPassword.jsx     # 3-step OTP password reset flow
â”‚   â”‚   â”œâ”€â”€ BehaviourTest.jsx      # Multi-step behavioural questionnaire
â”‚   â”‚   â”œâ”€â”€ ChatCounselling.jsx    # Real-time AI counsellor chat (streaming)
â”‚   â”‚   â”œâ”€â”€ FaceEmotion.jsx        # Webcam/upload facial emotion analysis
â”‚   â”‚   â”œâ”€â”€ VoiceAnalysis.jsx      # Audio recording/upload voice mood analysis
â”‚   â”‚   â”œâ”€â”€ FinalSeverity.jsx      # Multimodal severity score results & suggestions
â”‚   â”‚   â””â”€â”€ Dashboard.jsx          # User analytics dashboard â€” charts, history, PDF export
â”‚   â”‚
â”‚   â”œâ”€â”€ components/                # Reusable UI components
â”‚   â”‚   â”œâ”€â”€ AnimatedBackground.jsx # Reusable animated gradient background
â”‚   â”‚   â”œâ”€â”€ CinematicTransition.jsx# Page entry/exit transition wrapper (Framer Motion)
â”‚   â”‚   â”œâ”€â”€ CustomCursor.jsx       # Custom animated cursor with magnetic hover effect
â”‚   â”‚   â”œâ”€â”€ GlitchText.jsx         # Glitch text animation effect component
â”‚   â”‚   â”œâ”€â”€ PageTransition.jsx     # Lightweight fade transition wrapper
â”‚   â”‚   â”œâ”€â”€ Particles.jsx          # Lightweight CSS particle backdrop for inner pages
â”‚   â”‚   â””â”€â”€ StepProgress.jsx       # Animated step progress indicator for multi-step flows
â”‚   â”‚
â”‚   â”œâ”€â”€ contexts/
â”‚   â”‚   â””â”€â”€ AuthContext.jsx        # Global authentication state (JWT token, user object)
â”‚   â”‚
â”‚   â”œâ”€â”€ services/
â”‚   â”‚   â””â”€â”€ api.js                 # Axios instance â€” hardcoded HF Space baseURL, JWT interceptor
â”‚   â”‚
â”‚   â”œâ”€â”€ hooks/
â”‚   â”‚   â””â”€â”€ useScrollTimeline.js   # Custom GSAP scroll-triggered animation hook
â”‚   â”‚
â”‚   â””â”€â”€ api.js                     # Legacy Axios instance (kept for compatibility)
â”‚
â”œâ”€â”€ .env                           # Local environment variables (never committed)
â”œâ”€â”€ .env.example                   # Environment variable template
â”œâ”€â”€ vercel.json                    # Vercel SPA routing config (rewrites all paths to index.html)
â”œâ”€â”€ vite.config.js                 # Vite build configuration
â”œâ”€â”€ tailwind.config.js             # Tailwind v4 configuration
â””â”€â”€ package.json                   # NPM dependencies and scripts
```

---

## âš™ï¸ Setup & Installation

### Prerequisites
- **Node.js** v18 or higher
- **npm** v9 or higher

### 1. Clone the repository

```bash
git clone https://github.com/Hashmil-Muhammed/Smart-Mental-Health-Counselling-System-Using-Multimodal-AI.git
cd Smart-Mental-Health-Counselling-System-Using-Multimodal-AI/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `frontend/` directory (see [Environment Variables](#-environment-variables) below).

### 4. Start the development server

```bash
npm run dev
```

The app will be available at **`http://localhost:5173`** with hot module replacement (HMR) enabled.

### Other available scripts

```bash
npm run build      # Production build â†’ outputs to dist/
npm run preview    # Preview the production build locally
npm run lint       # Run ESLint across all source files
```

---

## ðŸ” Environment Variables

Create a `.env` file inside the `frontend/` directory with the following variables:

```env
# â”€â”€ Backend API â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
# Base URL of the FastAPI backend (Hugging Face Spaces)
VITE_API_BASE_URL=https://hashmil-muahmmed08-mindcare-backend.hf.space

# â”€â”€ Google OAuth â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
# Google Client ID from Google Cloud Console
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

> **Note:** All Vite environment variables **must** be prefixed with `VITE_` to be accessible in the browser bundle via `import.meta.env`.

> **For Vercel deployment:** Set these variables under  
> `Vercel Dashboard â†’ Project â†’ Settings â†’ Environment Variables`.

---

## ðŸ—ºï¸ Routing & Pages

All routes are defined in `src/App.jsx` and wrapped with **Framer Motion** cinematic transitions. Protected routes redirect unauthenticated users to `/login`.

| Route | Page Component | Auth Required | Description |
|---|---|---|---|
| `/` | `Landing.jsx` | âŒ | Hero landing â€” WebGL background, animated sections, feature showcase |
| `/login` | `Login.jsx` | âŒ | Email/password login + Google OAuth one-tap |
| `/register` | `Register.jsx` | âŒ | Full registration form with real-time validation |
| `/forgot-password` | `ForgotPassword.jsx` | âŒ | 3-step flow: email â†’ OTP verify â†’ new password |
| `/behaviour` | `BehaviourTest.jsx` | âœ… | Multi-step psychological behaviour questionnaire |
| `/chat` | `ChatCounselling.jsx` | âœ… | Live AI counselling chat with streaming responses |
| `/face` | `FaceEmotion.jsx` | âœ… | Webcam capture or image upload for emotion detection |
| `/voice` | `VoiceAnalysis.jsx` | âœ… | Microphone recording or audio upload for mood analysis |
| `/severity` | `FinalSeverity.jsx` | âœ… | Final multimodal severity score, AI suggestions, session summary |
| `/dashboard` | `Dashboard.jsx` | âœ… | Personal analytics â€” charts, session history, PDF report export |

---

## ðŸš€ Deployment

This frontend is optimised for deployment on **[Vercel](https://vercel.com/)**.

### SPA Routing Fix

Since this is a client-side SPA using React Router, a `vercel.json` is included at the root of the `frontend/` directory to rewrite all URL paths back to `index.html`, preventing 404 errors on page refresh or direct URL access:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Deploy to Vercel

```bash
# Option 1 â€” via Vercel CLI
npm install -g vercel
vercel --prod

# Option 2 â€” Connect your GitHub repository to Vercel
# Set the Root Directory to: frontend/
# Framework Preset: Vite
# Build Command: npm run build
# Output Directory: dist
```

> **Important:** Set all required environment variables in the Vercel dashboard before deploying. The backend URL is currently **hardcoded** in `src/services/api.js` as a production fallback â€” update this to use `VITE_API_BASE_URL` once the backend URL is stable.

---

## ðŸŽ¨ Design System

The UI is built on a **dark glassmorphism** design language with the following core principles:

- **Colour Palette:** Deep navy (`#0b1114`) base, emerald accent (`#7dd3fc`), cyan highlights (`#fb7185`)
- **Glass Cards:** `backdrop-filter: blur()` with semi-transparent backgrounds and coloured border glows
- **Typography:** System font stack with consistent weight hierarchy
- **Motion:** Every page entry/exit is a cinematic fade-slide transition; micro-animations on all interactive elements
- **WebGL Landing:** Three.js particle field rendered via React Three Fiber with GSAP scroll-driven camera animations

---

## ðŸ“„ License

This project is developed as part of an academic research initiative. All rights reserved Â© 2025 MindBridge AI.



