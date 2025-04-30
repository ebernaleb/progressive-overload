'use client';

import React, { useState, useRef, useCallback } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Activity,
  ArrowUpRight,
  Plus,
  Dumbbell,
  Calendar,
  History,
  LineChart,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  X,
  Save,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddWorkoutSchema, AddWorkoutFormValues, WorkoutExerciseSchema } from '@/schemas/add-workout';
import { AddExerciseSchema, AddExerciseFormValues } from '@/schemas/add-exercise';
import { useAuth } from '@/context/auth-provider';

// Types
interface Exercise {
  id: string;
  name: string;
  category: string;
  description: string;
}

interface Workout {
  id: string;
  date: string;
  exercises: WorkoutExercise[];
  completed: boolean;
}

interface WorkoutExercise {
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
}

interface ProgressData {
  month: string;
  workouts: number;
}

interface AnimatedGradientProps {
  colors: string[];
  speed?: number;
  blur?: "light" | "medium" | "heavy";
}

// Custom hook for expandable sections
function useExpandable(initialState = false) {
  const [isExpanded, setIsExpanded] = useState(initialState);
  const springConfig = { stiffness: 300, damping: 30 };
  const animatedHeight = useSpring(0, springConfig);

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return { isExpanded, toggleExpand, animatedHeight };
}

// Animated Gradient Component
const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 5,
  blur = "light",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }

    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const circleSize = React.useMemo(
    () => Math.max(dimensions.width, dimensions.height),
    [dimensions.width, dimensions.height]
  );

  const blurClass =
    blur === "light"
      ? "blur-2xl"
      : blur === "medium"
      ? "blur-3xl"
      : "blur-[100px]";

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div className={cn(`absolute inset-0`, blurClass)}>
        {colors.map((color, index) => (
          <svg
            key={index}
            className="absolute animate-background-gradient"
            style={
              {
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 50}%`,
                "--background-gradient-speed": `${1 / speed}s`,
                "--tx-1": Math.random() - 0.5,
                "--ty-1": Math.random() - 0.5,
                "--tx-2": Math.random() - 0.5,
                "--ty-2": Math.random() - 0.5,
                "--tx-3": Math.random() - 0.5,
                "--ty-3": Math.random() - 0.5,
                "--tx-4": Math.random() - 0.5,
                "--ty-4": Math.random() - 0.5,
              } as React.CSSProperties
            }
            width={circleSize * randomInt(0.5, 1.5)}
            height={circleSize * randomInt(0.5, 1.5)}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="50"
              fill={color}
              className="opacity-30 dark:opacity-[0.15]"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  colors: string[];
  delay: number;
  icon?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  colors,
  delay,
  icon,
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay + 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="relative overflow-hidden h-full bg-background dark:bg-background/50 rounded-xl border border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <AnimatedGradient colors={colors} speed={0.05} blur="medium" />
      <motion.div
        className="relative z-10 p-3 sm:p-5 md:p-6 text-foreground backdrop-blur-sm"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <motion.h3 
            className="text-sm sm:text-base md:text-lg text-foreground" 
            variants={item}
          >
            {title}
          </motion.h3>
        </div>
        <motion.p
          className="text-2xl sm:text-3xl md:text-4xl font-medium mb-2 text-foreground"
          variants={item}
        >
          {value}
        </motion.p>
        {subtitle && (
          <motion.p 
            className="text-sm text-foreground/80" 
            variants={item}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

// Exercise List Component
const ExerciseList: React.FC<{
  exercises: Exercise[];
  onSelectExercise: (exercise: Exercise) => void;
}> = ({ exercises, onSelectExercise }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5" />
          Exercises Library
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {exercises.map((exercise) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-3 border border-border rounded-lg hover:bg-accent/50 cursor-pointer"
              onClick={() => onSelectExercise(exercise)}
            >
              <div className="font-medium">{exercise.name}</div>
              <div className="text-sm text-muted-foreground">{exercise.category}</div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Add Exercise Form Component
const AddExerciseForm: React.FC<{ onAddExercise: (exercise: Exercise) => void }> = ({ onAddExercise }) => {
  const form = useForm<AddExerciseFormValues>({
    resolver: zodResolver(AddExerciseSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
    },
    mode: 'onBlur',
  });
  const { control, handleSubmit, reset, formState: { errors } } = form;

  const onSubmit = (data: AddExerciseFormValues) => {
    onAddExercise({
      id: `ex${Date.now()}`,
      name: data.name,
      category: data.category,
      description: data.description || '',
    });
    reset();
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5" />
          Add Exercise
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Bench Press" />
                    </FormControl>
                    {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Chest" />
                    </FormControl>
                    {errors.category && <span className="text-red-500 text-xs">{errors.category.message}</span>}
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Optional description" />
                    </FormControl>
                    {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Exercise
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

// Add Workout Form Component
const AddWorkoutForm: React.FC<{
  exercises: Exercise[];
  onAddWorkout: (workout: Omit<Workout, "id">) => void;
}> = ({ exercises, onAddWorkout }) => {
  const form = useForm<AddWorkoutFormValues>({
    resolver: zodResolver(AddWorkoutSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      exercises: [],
      completed: false,
    },
    mode: 'onBlur',
  });
  const { control, handleSubmit, setValue, watch, formState: { errors } } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });

  const handleAddExercise = (exercise: Exercise) => {
    append({
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      sets: 3,
      reps: 10,
      weight: 0,
    });
  };

  const onSubmit = (data: AddWorkoutFormValues) => {
    onAddWorkout({
      ...data,
    });
    form.reset({
      date: new Date().toISOString().split('T')[0],
      exercises: [],
      completed: false,
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Create New Workout
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workout Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} required />
                    </FormControl>
                    {errors.date && <span className="text-red-500 text-xs">{errors.date.message}</span>}
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Selected Exercises</FormLabel>
                {fields.length === 0 ? (
                  <div className="text-sm text-muted-foreground p-3 border border-dashed border-border rounded-lg">
                    No exercises selected. Choose from the exercise library.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                    {fields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3 border border-border rounded-lg"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{field.exerciseName}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <FormField
                            control={control}
                            name={`exercises.${index}.sets`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Sets</FormLabel>
                                <FormControl>
                                  <Input type="number" min="1" {...field} className="h-8" />
                                </FormControl>
                                {errors.exercises?.[index]?.sets && (
                                  <span className="text-red-500 text-xs">{errors.exercises[index]?.sets?.message}</span>
                                )}
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name={`exercises.${index}.reps`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Reps</FormLabel>
                                <FormControl>
                                  <Input type="number" min="1" {...field} className="h-8" />
                                </FormControl>
                                {errors.exercises?.[index]?.reps && (
                                  <span className="text-red-500 text-xs">{errors.exercises[index]?.reps?.message}</span>
                                )}
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={control}
                            name={`exercises.${index}.weight`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs">Weight (kg)</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" step="0.5" {...field} className="h-8" />
                                </FormControl>
                                {errors.exercises?.[index]?.weight && (
                                  <span className="text-red-500 text-xs">{errors.exercises[index]?.weight?.message}</span>
                                )}
                              </FormItem>
                            )}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" disabled={fields.length === 0} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Workout
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

// Workout History Component
const WorkoutHistory: React.FC<{
  workouts: Workout[];
  onToggleComplete: (id: string) => void;
}> = ({ workouts, onToggleComplete }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Workout History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {workouts.length === 0 ? (
            <div className="text-center text-muted-foreground p-4">
              No workout history yet. Create your first workout!
            </div>
          ) : (
            workouts.map((workout) => (
              <WorkoutHistoryItem 
                key={workout.id} 
                workout={workout} 
                onToggleComplete={onToggleComplete} 
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Workout History Item Component
const WorkoutHistoryItem: React.FC<{
  workout: Workout;
  onToggleComplete: (id: string) => void;
}> = ({ workout, onToggleComplete }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { isExpanded, toggleExpand, animatedHeight } = useExpandable(false);

  React.useEffect(() => {
    if (contentRef.current) {
      animatedHeight.set(isExpanded ? contentRef.current.offsetHeight : 0);
    }
  }, [isExpanded, animatedHeight]);

  const formattedDate = new Date(workout.date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-border rounded-lg overflow-hidden"
    >
      <div 
        className={cn(
          "p-3 flex justify-between items-center cursor-pointer",
          workout.completed ? "bg-accent/30" : "bg-background"
        )}
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(workout.id);
            }}
          >
            <CheckCircle2 className={cn(
              "h-5 w-5",
              workout.completed ? "text-green-500" : "text-muted-foreground"
            )} />
          </Button>
          <div>
            <div className="font-medium">{formattedDate}</div>
            <div className="text-xs text-muted-foreground">
              {workout.exercises.length} exercises
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      <motion.div
        style={{ height: animatedHeight }}
        className="overflow-hidden"
      >
        <div ref={contentRef} className="p-3 bg-accent/10">
          <div className="space-y-2">
            {workout.exercises.map((exercise, index) => (
              <div key={index} className="text-sm">
                <div className="font-medium">{exercise.exerciseName}</div>
                <div className="text-muted-foreground">
                  {exercise.sets} sets × {exercise.reps} reps × {exercise.weight}kg
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Progress Chart Component
const ProgressChart: React.FC<{
  data: ProgressData[];
}> = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.workouts));
  const chartHeight = 150;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChart className="h-5 w-5" />
          Workout Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] flex items-end justify-between gap-2">
          {data.map((item, index) => {
            const height = (item.workouts / maxValue) * chartHeight;
            return (
              <div key={index} className="flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-10 bg-primary/80 rounded-t-md"
                />
                <div className="mt-2 text-xs text-muted-foreground">{item.month}</div>
                <div className="text-xs font-medium">{item.workouts}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Dashboard Component
const WorkoutDashboard: React.FC = () => {
  const { user } = useAuth();

  // Sample data
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: "ex1", name: "Bench Press", category: "Chest", description: "Compound chest exercise" },
    { id: "ex2", name: "Squat", category: "Legs", description: "Compound leg exercise" },
    { id: "ex3", name: "Deadlift", category: "Back", description: "Compound back exercise" },
    { id: "ex4", name: "Pull-up", category: "Back", description: "Upper body pulling exercise" },
    { id: "ex5", name: "Push-up", category: "Chest", description: "Bodyweight chest exercise" },
  ]);

  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: "w1",
      date: "2023-05-15",
      exercises: [
        { exerciseId: "ex1", exerciseName: "Bench Press", sets: 3, reps: 10, weight: 80 },
        { exerciseId: "ex4", exerciseName: "Pull-up", sets: 3, reps: 8, weight: 0 },
      ],
      completed: true,
    },
    {
      id: "w2",
      date: "2023-05-18",
      exercises: [
        { exerciseId: "ex2", exerciseName: "Squat", sets: 4, reps: 8, weight: 100 },
        { exerciseId: "ex3", exerciseName: "Deadlift", sets: 3, reps: 6, weight: 120 },
      ],
      completed: false,
    },
  ]);

  const progressData: ProgressData[] = [
    { month: "Jan", workouts: 8 },
    { month: "Feb", workouts: 12 },
    { month: "Mar", workouts: 10 },
    { month: "Apr", workouts: 15 },
    { month: "May", workouts: 18 },
    { month: "Jun", workouts: 14 },
  ];

  const handleAddWorkout = (workout: Omit<Workout, "id">) => {
    const newWorkout: Workout = {
      ...workout,
      id: `w${workouts.length + 1}`,
    };
    setWorkouts([newWorkout, ...workouts]);
  };

  const handleToggleComplete = (id: string) => {
    setWorkouts(
      workouts.map((workout) =>
        workout.id === id
          ? { ...workout, completed: !workout.completed }
          : workout
      )
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Welcome back, {user?.email}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Workout History Card */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Workout History</h2>
          <p className="text-muted-foreground">View your recent workouts and track your progress over time.</p>
        </div>

        {/* Progress Stats Card */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Progress Stats</h2>
          <p className="text-muted-foreground">Track your strength gains and personal records.</p>
        </div>

        {/* Goals Card */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Fitness Goals</h2>
          <p className="text-muted-foreground">Set and monitor your fitness goals.</p>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDashboard; 