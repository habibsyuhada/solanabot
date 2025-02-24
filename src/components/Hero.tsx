import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const TypewriterText = ({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Typing speed

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span className={className}>{displayText}</span>;
};

const TerminalLine = ({ prefix, text, delay = 0, className = "" }: { prefix: string; text: string; delay?: number; className?: string }) => {
  return (
    <pre data-prefix={prefix} className={className}>
      <code>
        <TypewriterText text={text} delay={delay} />
      </code>
    </pre>
  );
};

const Hero = () => {
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    // Show stats after terminal lines are typed
    const timeout = setTimeout(() => {
      setShowStats(true);
    }, 2500); // Adjust based on your terminal lines total delay

    return () => clearTimeout(timeout);
  }, []);

  const terminalLines = [
    { prefix: "$", text: "Initialize trading_bot --network solana", delay: 0, className: "text-primary" },
    { prefix: ">", text: "Connecting to Solana mainnet...", delay: 1000, className: "text-blue-400" },
    { prefix: ">", text: "Connection established ✓", delay: 2000, className: "text-green-400" },
    { prefix: ">", text: "Analyzing market trends...", delay: 2500, className: "text-yellow-400" },
    { prefix: ">", text: "Loading trading strategies...", delay: 3000, className: "text-blue-400" },
    { prefix: ">", text: "Bot ready for trading ✓", delay: 3500, className: "text-green-400" }
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#00ff94]/10 via-black to-[#00ff94]/5"></div>

      <div className="container mx-auto px-4 relative">
        <div className="hero min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse gap-12 max-w-[1400px] w-full">
            {/* Trading Interface Mockup - Hidden on Mobile */}
            <motion.div 
              className="flex-1 relative min-h-[500px] hidden md:block"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="absolute inset-0 rounded-lg overflow-hidden border border-[#00ff94]/20 bg-black/40 backdrop-blur-xl">
                <motion.div 
                  className="w-full h-full p-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="mockup-code bg-black/50 border border-[#00ff94]/10">
                    {terminalLines.map((line, index) => (
                      <TerminalLine
                        key={index}
                        prefix={line.prefix}
                        text={line.text}
                        delay={line.delay}
                        className={line.className}
                      />
                    ))}
                  </div>

                  <motion.div 
                    className="mt-6 grid grid-cols-2 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showStats ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div 
                      className="stat bg-black/50 rounded-lg p-6 border border-[#00ff94]/10 overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <div className="relative z-10">
                        <div className="stat-title text-white/60">24h Volume</div>
                        <div className="stat-value text-[#00ff94]">$2.4M</div>
                        <div className="stat-desc text-green-400">↗︎ 14% vs last 24h</div>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="stat bg-black/50 rounded-lg p-6 border border-[#00ff94]/10 overflow-hidden group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      <div className="relative z-10">
                        <div className="stat-title text-white/60">Success Rate</div>
                        <div className="stat-value text-[#00ff94]">94%</div>
                        <div className="stat-desc text-green-400">↗︎ 2% vs last week</div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Main Content */}
            <motion.div 
              className="flex-1 text-center md:text-left"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative inline-block"
              >
                <span className="px-4 py-2 text-sm font-medium bg-[#00ff94]/10 text-[#00ff94] rounded-full border border-[#00ff94]/20">
                  Now in Beta
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-6xl font-bold leading-tight mt-6 mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Automated Solana Trading
                <span className="block text-[#00ff94]">Made Simple</span>
              </motion.h1>
              
              <motion.p 
                className="py-6 text-lg md:text-xl text-white/70 max-w-xl mx-auto md:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Experience the power of algorithmic trading with our advanced Solana trading bot. 
                Real-time market analysis, automated execution, and proven strategies to maximize your returns.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <button className="btn bg-[#00ff94] hover:bg-[#00ff94]/80 text-black border-none btn-lg">
                  Start Trading Now
                </button>
                <button className="btn btn-outline btn-lg border-[#00ff94]/20 text-white hover:bg-[#00ff94]/10 hover:border-[#00ff94]/40">
                  View Performance →
                </button>
              </motion.div>
              
              <motion.div 
                className="mt-12 flex items-center gap-6 justify-center md:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="flex -space-x-4">
                  {[1,2,3,4].map((i) => (
                    <motion.div 
                      key={i} 
                      className="avatar"
                      initial={{ scale: 0, x: -20 }}
                      animate={{ scale: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + (i * 0.1) }}
                    >
                      <div className="w-12 h-12 rounded-full bg-[#00ff94]/20 p-[2px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white font-medium border border-[#00ff94]/20">
                          U{i}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div>
                  <p className="font-medium text-white">Trusted by 10,000+ traders</p>
                  <div className="rating rating-sm">
                    {[1,2,3,4,5].map((i) => (
                      <motion.input 
                        key={i} 
                        type="radio" 
                        name="rating-2" 
                        className="mask mask-star-2 bg-[#00ff94]" 
                        checked={i === 5} 
                        readOnly
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2, delay: 1 + (i * 0.1) }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 