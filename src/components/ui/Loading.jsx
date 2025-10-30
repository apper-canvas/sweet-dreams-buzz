import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full mx-auto mb-4"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full" />
          </motion.div>
        </div>
        
        <motion.h3
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-lg font-medium text-gray-900 mb-2"
        >
          Loading Sweet Treats...
        </motion.h3>
        
        <p className="text-gray-600 text-sm">
          Preparing something delicious for you
        </p>
      </motion.div>
    </div>
  );
};

export default Loading;