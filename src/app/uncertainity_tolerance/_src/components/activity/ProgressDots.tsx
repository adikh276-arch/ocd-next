import { motion } from 'framer-motion';

interface Props {
  currentScreen: number;
  totalScreens: number;
}

const ProgressDots = ({ currentScreen, totalScreens }: Props) => {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {Array.from({ length: totalScreens }, (_, i) => (
        <motion.div
          key={i}
          className={`rounded-full transition-all duration-500 ${
            i === currentScreen
              ? 'w-8 h-2 bg-primary'
              : i < currentScreen
              ? 'w-2 h-2 bg-primary/50'
              : 'w-2 h-2 bg-border'
          }`}
          layout
        />
      ))}
    </div>
  );
};

export default ProgressDots;
