import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Connect Your Wallet",
      description: "Securely connect your Solana wallet to start trading. We support Phantom, Solflare, and other popular wallets."
    },
    {
      number: "02",
      title: "Choose Your Strategy",
      description: "Select from our pre-built strategies or create your own custom trading strategy using our intuitive builder."
    },
    {
      number: "03",
      title: "Set Parameters",
      description: "Configure your risk management settings, trading pairs, and automation preferences to match your goals."
    },
    {
      number: "04",
      title: "Start Trading",
      description: "Activate your bot and watch it execute trades automatically based on your strategy and market conditions."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-base-200">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Get started with automated Solana trading in four simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Connector line with animation */}
              {index < steps.length - 1 && (
                <motion.div 
                  className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index + 1) * 0.2 }}
                  style={{ transformOrigin: "left" }}
                />
              )}
              
              <motion.div 
                className="card bg-base-100 hover:bg-base-300 transition-all duration-300"
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="card-body">
                  <motion.div 
                    className="text-4xl font-bold text-primary mb-4"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      delay: index * 0.1 
                    }}
                  >
                    {step.number}
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-bold mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p 
                    className="text-base-content/70"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                  >
                    {step.description}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button 
            className="btn btn-primary btn-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Trading Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks; 