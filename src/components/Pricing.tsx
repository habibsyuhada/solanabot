import { motion } from 'framer-motion';

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for getting started with automated trading",
      features: [
        "Basic trading strategies",
        "Manual trade execution",
        "Real-time market data",
        "Basic portfolio tracking",
        "Community support"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$49/mo",
      description: "Advanced features for serious traders",
      features: [
        "All Basic features",
        "Advanced trading strategies",
        "Automated trading execution",
        "Priority support",
        "Custom strategy builder",
        "Advanced analytics",
        "API access"
      ],
      cta: "Get Started",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For institutional traders and large portfolios",
      features: [
        "All Pro features",
        "Custom strategy development",
        "Dedicated account manager",
        "White-label solutions",
        "Custom API integration",
        "24/7 phone support",
        "SLA guarantee"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="pricing" className="py-24 bg-black relative overflow-hidden">
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
          <h2 className="text-4xl font-bold mb-4 text-white">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Choose the plan that best fits your trading needs
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div 
              key={index} 
              variants={item}
              className={`relative group ${
                plan.popular ? 'md:-mt-8' : ''
              }`}
            >
              <div className={`h-full relative backdrop-blur-sm rounded-2xl overflow-hidden border ${
                plan.popular 
                  ? 'bg-primary/10 border-primary/20 shadow-[0_0_15px_rgba(0,255,148,0.1)]' 
                  : 'bg-white/5 border-white/10 hover:border-primary/20'
              }`}>
                {plan.popular && (
                  <div className="absolute top-6 inset-x-0 flex justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-1"
                    >
                      <span className="text-primary font-semibold text-sm">Most Popular</span>
                    </motion.div>
                  </div>
                )}
                <div className="p-8 relative">
                  <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300 mt-4">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold mb-4 text-primary">
                    {plan.price}
                  </div>
                  <p className="mb-6 text-white/70">
                    {plan.description}
                  </p>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-white/80">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="card-actions justify-center mt-auto">
                    <button className={`btn btn-block ${
                      plan.popular 
                        ? 'btn-primary' 
                        : 'btn-outline border-primary/20 text-white hover:bg-primary hover:text-primary-content hover:border-primary'
                    }`}>
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-white/60">
            All plans include 14-day free trial. No credit card required.
          </p>
        </motion.div>

        {/* Tech Decoration */}
        <div className="absolute -bottom-12 left-0 w-full h-24 bg-gradient-to-t from-primary/5 to-transparent"></div>
        <div className="absolute top-1/2 -left-12 w-24 h-24 bg-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Pricing; 