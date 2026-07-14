import { useEffect } from "react";
import { motion } from "framer-motion";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#141414] flex items-center justify-center">

      {/* Background Glow */}
      <div className="absolute w-[700px] h-[700px] rounded-full bg-red-600/20 blur-[180px]" />

      {/* Floating Lights */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-red-500"
          initial={{
            opacity: 0,
            x: Math.random() * 1200 - 600,
            y: Math.random() * 700 - 350,
            scale: 0,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            y: "-120px",
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      <div className="relative z-10 text-center">

        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="relative inline-block"
        >
          {/* Logo */}
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center shadow-[0_0_60px_rgba(229,9,20,.45)] mx-auto">

            <span className="text-5xl">
              🎬
            </span>

          </div>

          {/* Light Sweep */}
          <motion.div
            initial={{ x: -220 }}
            animate={{ x: 220 }}
            transition={{
              delay: 1,
              duration: 1,
            }}
            className="absolute top-0 left-0 w-20 h-28 bg-white/20 blur-xl rotate-12"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.8,
          }}
          className="mt-8 text-6xl font-black tracking-wide"
        >
          <span className="text-red-600">
            Cine
          </span>

          <span className="text-white">
            X
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.4,
          }}
          className="mt-4 text-zinc-400 text-lg tracking-[0.3em]"
        >
          DISCOVER • WATCH • EXPERIENCE
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 220 }}
          transition={{
            delay: 1.8,
            duration: 1,
          }}
          className="mx-auto mt-10 h-[3px] rounded-full bg-gradient-to-r from-transparent via-red-600 to-transparent"
        />

      </div>
    </div>
  );
};

export default SplashScreen;