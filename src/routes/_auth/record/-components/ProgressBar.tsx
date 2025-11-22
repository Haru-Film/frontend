interface ProgressBarProps {
  progress: number; // 0~100
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="bg-primary/10 border-primary-semilight h-2 w-64 overflow-hidden rounded-full border-2">
      <div
        className="bg-primary h-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
