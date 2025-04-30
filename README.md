# Progressive Overload Tracker

A modern web application to help users track their strength training progress over time. Built with Next.js, Tailwind CSS, and Supabase.

## Features

- 📊 Track your workout progress with visual charts
- 🏋️‍♂️ Log exercises, sets, reps, and weights
- 📱 Responsive design for all devices
- 🔒 Secure authentication with Supabase
- 📈 View progress over time with line charts

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, Recharts
- **Backend:** Supabase (Auth + Database)
- **Styling:** Tailwind CSS
- **Charts:** Recharts

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/ebernaleb/progressive-overload.git
   cd progressive-overload
   ```

2. Install dependencies:
   ```bash
   cd progressive-overload-tracker
   npm install
   ```

3. Create a `.env.local` file in the progressive-overload-tracker directory with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Schema

### Exercises Table
| Field      | Type      | Notes                  |
|------------|-----------|------------------------|
| id         | uuid      | Primary Key           |
| user_id    | uuid      | References auth.users |
| name       | text      | Exercise name         |
| created_at | timestamp | Default: now()        |

### Workouts Table
| Field        | Type      | Notes                           |
|--------------|-----------|----------------------------------|
| id           | uuid      | Primary Key                     |
| user_id      | uuid      | References auth.users           |
| exercise_id  | uuid      | References exercises.id         |
| weight       | numeric   | Weight lifted                   |
| reps         | integer   | Number of reps                  |
| sets         | integer   | Number of sets                  |
| notes        | text      | Optional workout notes          |
| performed_at | timestamp | Date of workout (Default: now()) |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/) 