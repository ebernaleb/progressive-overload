# Progressive Overload Tracker

A web application to track your strength training progress over time. Built with Next.js and Tailwind CSS.

## Features

- 📊 Track your workouts and exercises
- 📈 View progress over time
- 🔒 User authentication
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/progressive-overload-tracker.git
cd progressive-overload-tracker
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
progressive-overload-tracker/
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # React components
│   ├── context/       # React context providers
│   └── lib/          # Utility functions and helpers
├── public/           # Static assets
└── package.json      # Project dependencies
```

## Data Models

The application uses the following data models:

### Exercise
```typescript
{
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}
```

### Workout
```typescript
{
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  exercises: {
    id: string;
    workout_id: string;
    exercise_id: string;
    sets: number;
    reps: number;
    weight: number;
    created_at: string;
  }[];
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
