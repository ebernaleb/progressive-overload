# Task.md — Progressive Overload Tracker

## 🏋️‍♂️ Project Overview
Create a Progressive Overload Tracker web app using:
- **Next.js** (or React if preferred)
- **Tailwind CSS** for styling
- **Supabase** for backend (Auth + Database)
- **Recharts** for line chart visualization
- NO custom servers — only use Supabase’s BaaS features

## 🚀 Pages and Features

### 1. Home Page (`/`)
- Navbar:
  - Logo on the left (text-based or simple icon)
  - One button on the right: “Log In / Sign Up” → redirects to `/login`
- Hero Section:
  - Large heading: “Track Your Strength Progress”
  - Subtext: “Log your workouts and visualize your growth over time.”
  - Button: “Get Started” → also redirects to `/login`
- Clean, modern, minimal design
- Optional: Fitness-themed line icons for style (dumbbell, flexing arm, chart arrow)

---

### 2. Auth Pages
#### Login (`/login`)
- Email + Password inputs
- Button: “Log In”
- Link: “Don’t have an account? Sign Up” → `/register`
- Use Supabase Auth for login

#### Register (`/register`)
- Email + Password inputs
- Button: “Create Account”
- Link: “Already have an account? Log In” → `/login`
- Use Supabase Auth for registration
- Redirect to `/dashboard` on success

---

### 3. Dashboard (`/dashboard`)
#### Header:
- Left: Logo (“Progressive Overload Tracker”)
- Right: Logout button (Supabase auth sign out)

#### Dashboard Sections:
- Grid-based layout (responsive):
  - **Exercise List:**
    - List all exercises (Bench Press, Squat, etc.)
    - Add Exercise form (name input)
    - Delete Exercise option (confirmation before delete)
  - **Add Workout Form:**
    - Dropdown to select an exercise
    - Date Picker (default today)
    - Weight input
    - Reps input
    - Sets input
    - Notes (optional)
    - “Add Workout” button
  - **Workout History:**
    - Show past workouts:
      - Exercise name
      - Weight, Reps, Sets, Date
      - Delete (optional: Edit)
  - **Progress Chart:**
    - Line chart showing weight progression over time for the selected exercise
    - X-axis: Date, Y-axis: Weight
    - Use Recharts for charting
    - Dropdown to choose which exercise to view

---

## 📦 Database Schema (Supabase)

### Table: `exercises`
| Field        | Type      | Notes                    |
|--------------|-----------|-------------------------|
| id           | uuid (PK) | Primary Key             |
| user_id      | uuid      | References auth.users   |
| name         | text      | Exercise name           |
| created_at   | timestamp | Default: now()          |

### Table: `workouts`
| Field         | Type      | Notes                             |
|---------------|-----------|------------------------------------|
| id            | uuid (PK) | Primary Key                      |
| user_id       | uuid      | References auth.users            |
| exercise_id   | uuid      | References exercises.id          |
| weight        | numeric   | Weight lifted                    |
| reps          | integer   | Number of reps                   |
| sets          | integer   | Number of sets                   |
| notes         | text      | Optional workout notes           |
| performed_at  | timestamp | Date of workout (Default: now())  |

---

## 🔒 Row Level Security (RLS)
- Only allow logged-in users to view, insert, update, or delete their own exercises and workouts.

---

## ✅ Styling and UX
- Clean, modern layout with Tailwind CSS.
- Buttons and inputs: Rounded corners (2xl), soft shadows, hover effects.
- Simple animations on page load and interactions (Framer Motion optional).
- Use toast notifications or inline messages for feedback (success, error).

---

## ❌ Do not build or run custom backend servers — only use Supabase’s client SDK.
