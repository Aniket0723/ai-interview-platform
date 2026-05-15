# HireAI Interview Platform

A modern, responsive AI-powered interview platform built as a frontend prototype. This application simulates a complete interview experience from candidate onboarding to final evaluation.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI primitives with shadcn/ui
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **State Management:** React Hooks

## ✨ Features Implemented

### 1. **Landing Screen**

- Platform branding and overview
- Candidate instructions
- Estimated interview duration

### 2. **Candidate Form**

- Personal details capture
- Role and experience level selection
- Skills input
- Resume upload UI

### 3. **Interview Setup**

- Device readiness checks (camera, microphone, internet)
- Interview guidelines
- Pre-interview checklist

### 4. **AI Interview Screen**

- Interactive AI interviewer avatar
- Real-time candidate video preview
- Question navigation (back/next)
- Recording controls (start, stop, retry, submit)
- Live transcript display
- Progress tracking
- Timer and confidence score
- Question difficulty badges
- Waveform visualization

### 5. **Coding Round**

- Multi-language support (JavaScript, TypeScript, Python)
- Code editor interface
- Test cases and examples
- Simulated execution output
- Submit functionality

### 6. **Summary Screen**

- Interview completion status
- Candidate profile overview
- Performance metrics
- AI evaluation placeholder
- Strengths and improvement areas
- Restart demo option

## 🎯 Development Journey

This project was built with a focus on:

1. **Component-based architecture** - Reusable UI components for scalability
2. **Responsive design** - Mobile-first approach with desktop optimization
3. **Type safety** - Full TypeScript implementation
4. **Clean code** - ESLint configuration and best practices
5. **User experience** - Smooth transitions and intuitive navigation

## 🛠️ Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd ai-interview-platform

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🚀 Deployment

### Deploy on Vercel

1. Push this repository to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Keep the framework preset as **Next.js**
4. Use default settings:
   - **Install Command:** `npm install`
   - **Build Command:** `npm run build`
   - **Output Directory:** (leave empty)
5. Deploy!

No environment variables required for this frontend prototype.

## 📁 Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── ui/          # Reusable UI primitives
│   └── ...          # Feature components
├── data/            # Mock data and types
└── lib/             # Utility functions
```

## 🎨 Design Highlights

- Clean, modern interface
- Consistent color scheme
- Accessible UI components
- Smooth animations and transitions
- Responsive layouts for all screen sizes

## 📝 License

This project is a frontend prototype for demonstration purposes.

---

Built with ❤️ using Next.js and TypeScript
