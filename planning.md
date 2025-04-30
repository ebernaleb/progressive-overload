# Planning.md — Progressive Overload Tracker

## 🎯 Goal
The Progressive Overload Tracker is designed to help users log and track their strength training progress over time. The key feature is allowing users to visually see their progressive overload through line charts of weight lifted for each exercise.

## 👤 User Flow
1. Visit homepage → directed to log in or sign up.
2. After login, access the dashboard.
3. Add exercises to their personal list.
4. Log workouts under each exercise (weight, reps, sets, date).
5. View workout history and visualize progress with a line chart.

## 💾 Backend
- **Supabase Auth:** For login, registration, logout.
- **Supabase Postgres Database:** Two tables — `exercises` and `workouts`.
- **Row Level Security:** Users can only view and edit their own data.

## 📊 Visualization
- Use **Recharts** for simple, clean line charts.
- Show weight lifted over time for each selected exercise.

## ✨ Design and Aesthetic
- Minimal, modern design using **Tailwind CSS**.
- Rounded elements, soft shadows, and whitespace-focused layout.
- Responsive across mobile, tablet, and desktop.

## ❌ No custom servers or backend code needed.
- Use only Supabase’s BaaS features.
- All database operations and auth handled via `@supabase/supabase-js` in the frontend.

## 🚀 Core Features
- Add exercises.
- Log workouts.
- Delete exercises or workouts.
- View past logs.
- View progress chart per exercise.

The focus is on aesthetics, usability, and clear presentation of workout progress to encourage consistent strength training.
