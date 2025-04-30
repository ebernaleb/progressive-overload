import { cn } from '@/lib/utils';

interface GradientSphereProps {
  className?: string;
}

export function GradientSphere({ className }: GradientSphereProps) {
  return (
    <div className={cn(
      'absolute w-[900px] h-[400px]',
      'bg-gradient-to-b from-blue-950/90 to-blue-900/90',
      'rounded-3xl',
      'backdrop-blur-md',
      'shadow-[0_0_15px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.2)]',
      'border border-white/5',
      'before:absolute before:inset-0',
      'before:bg-gradient-to-b before:from-transparent before:to-black/20',
      'before:rounded-3xl',
      'after:absolute after:inset-0',
      'after:bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_60%)]',
      'after:rounded-3xl',
      'pointer-events-none',
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-3xl" />
      <div className="absolute inset-[-1px] bg-gradient-to-t from-blue-800/10 via-white/5 to-transparent rounded-3xl" />
      <div className="absolute inset-0 shadow-inner rounded-3xl" />
    </div>
  );
} 