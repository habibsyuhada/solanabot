import { motion, useInView } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const AnimatedCounter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 1500; // Animation duration in ms
      const increment = end / (duration / 16); // Update every 16ms (60fps)
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayValue(end);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [value, isInView]);

  return <span ref={ref}>{displayValue.toLocaleString()}</span>;
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const stats = [
    { value: 5000, label: "Questions Answered" },
    { value: 98, label: "Customer Satisfaction" },
    { value: 24, label: "Hour Support" }
  ];

  const faqs = [
    {
      question: "What is SolanaTradeBot?",
      answer: "SolanaTradeBot is an advanced automated trading platform that helps you trade Solana and other cryptocurrencies 24/7. It uses sophisticated algorithms to analyze market trends and execute trades based on your chosen strategy."
    },
    {
      question: "Is it safe to use SolanaTradeBot?",
      answer: "Yes, security is our top priority. We use bank-grade encryption, secure API connections, and never store your private keys. Your funds remain in your wallet at all times, and the bot only executes trades based on your permissions."
    },
    {
      question: "How much experience do I need to use the bot?",
      answer: "SolanaTradeBot is designed for both beginners and experienced traders. Beginners can start with pre-built strategies, while advanced users can create custom strategies using our strategy builder."
    },
    {
      question: "What kind of returns can I expect?",
      answer: "Trading returns vary based on market conditions, chosen strategies, and risk management settings. While our bot has achieved an average success rate of 94%, past performance doesn't guarantee future results."
    },
    {
      question: "Which wallets are supported?",
      answer: "We support all major Solana wallets including Phantom, Solflare, Sollet, and more. You can easily connect your preferred wallet to start trading."
    },
    {
      question: "Can I customize trading strategies?",
      answer: "Yes! Pro and Enterprise users can create custom trading strategies using our intuitive strategy builder. You can set specific indicators, timeframes, and conditions for your trades."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="faq" className="py-24 bg-black relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Everything you need to know about SolanaTradeBot
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              <div className="card bg-black/40 backdrop-blur-sm border border-white/10 group-hover:border-primary/20 p-6 rounded-2xl text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative z-10">
                  <h3 className="text-4xl font-bold text-primary mb-2">
                    <AnimatedCounter value={stat.value} />
                    {stat.label === "Customer Satisfaction" && "%"}
                    {stat.label === "Hour Support" && "/7"}
                  </h3>
                  <p className="text-white/70">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="group"
              >
                <div className={`collapse bg-black/40 backdrop-blur-sm border ${
                  openIndex === index 
                    ? 'border-primary/20 bg-primary/5' 
                    : 'border-white/10 hover:border-primary/20'
                } rounded-2xl transition-all duration-300`}>
                  <input 
                    type="radio" 
                    name="faq-accordion" 
                    checked={openIndex === index}
                    onChange={() => setOpenIndex(openIndex === index ? null : index)}
                    className="peer"
                  />
                  <div className="collapse-title text-xl font-medium text-white peer-checked:text-primary flex items-center gap-4 pr-4">
                    <span className="text-primary/50 text-sm font-mono">0{index + 1}</span>
                    <span className="flex-1">{faq.question}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 transform transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180 text-primary' : 'text-white/70'
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  <div className="collapse-content">
                    <p className="text-white/70 pt-2 pl-11">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-16 relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="card bg-black/40 backdrop-blur-sm border border-white/10 group-hover:border-primary/20 p-8 rounded-2xl relative">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    Still have questions?
                  </h3>
                  <p className="text-white/70">
                    Our support team is here to help you 24/7
                  </p>
                </div>
                <button className="btn btn-primary min-w-[200px]">
                  Contact Support
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tech Decoration */}
        <div className="absolute -bottom-12 left-0 w-full h-24 bg-gradient-to-t from-primary/5 to-transparent"></div>
        <div className="absolute top-1/2 -left-12 w-24 h-24 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default FAQ; 