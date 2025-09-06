import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProgressCircleProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export const ProgressCircle = ({ 
  value, 
  size = 120, 
  strokeWidth = 8, 
  className 
}: ProgressCircleProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'hsl(var(--success))';
    if (score >= 60) return 'hsl(var(--warning))';
    return 'hsl(var(--danger))';
  };

  return (
    <div className={cn("relative", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getScoreColor(value)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
      
      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <motion.span 
            className="text-3xl font-bold"
            style={{ color: getScoreColor(value) }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {value}%
          </motion.span>
          <p className="text-sm text-muted-foreground">ATS Score</p>
        </div>
      </div>
    </div>
  );
};