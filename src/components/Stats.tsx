import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    {
      value: "$250M+",
      label: "Trading Volume",
      description: "Total trading volume processed"
    },
    {
      value: "94%",
      label: "Success Rate",
      description: "Average trade success rate"
    },
    {
      value: "10K+",
      label: "Active Users",
      description: "Traders using our platform"
    },
    {
      value: "24/7",
      label: "Uptime",
      description: "Continuous operation"
    }
  ];

  const metrics = [
    { label: "Win Rate (24h)", value: "94%", trend: "up" },
    { label: "Average ROI", value: "32.5%", trend: "up" },
    { label: "Active Trades", value: "1,234", trend: "neutral" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"></div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Performance <span className="text-primary">Metrics</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Our trading bot has consistently delivered exceptional results for thousands of traders
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="relative group"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              <div className="card bg-black/40 backdrop-blur-sm border border-white/10 group-hover:border-primary/20 transition-colors duration-300">
                <motion.div 
                  className="card-body text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div 
                    className="stat-value text-4xl font-bold text-primary mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      delay: index * 0.1 
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <motion.div 
                    className="stat-title text-xl font-semibold mb-2 text-white group-hover:text-primary transition-colors duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  >
                    {stat.label}
                  </motion.div>
                  <motion.div 
                    className="stat-desc text-white/60 group-hover:text-white/70 transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  >
                    {stat.description}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative group"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative">
            <div>
              <motion.h3 
                className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Real-Time Performance
              </motion.h3>
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {metrics.map((metric, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center justify-between text-white/80"
                    variants={itemVariants}
                  >
                    <span>{metric.label}</span>
                    <span className={
                      metric.trend === "up" ? "text-primary" :
                      metric.trend === "down" ? "text-red-500" :
                      "text-white"
                    }>{metric.value}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <motion.div 
              className="relative h-48"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,148,0.1),transparent_70%)] rounded-lg">
                <div className="h-full w-full flex items-center justify-center">
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <div className="text-4xl font-bold text-primary mb-2">+127%</div>
                    <div className="text-sm text-white/60">30-day growth</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tech Decoration */}
        <div className="absolute -bottom-12 left-0 w-full h-24 bg-gradient-to-t from-primary/5 to-transparent"></div>
        <div className="absolute top-1/2 -left-12 w-24 h-24 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Stats; 