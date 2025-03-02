import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { 
  Wallet, 
  TrendingUp,
  ArrowUpRight,
  History,
  X,
  CircleDollarSign,
  Percent
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import Image from 'next/image';

// Helper function to generate PNL data
interface PnlData {
  date: string;
  pnl: number;
  pnlUsd: number;
}

export default function Dashboard() {
  // Bot state
  const [isBotActive, setIsBotActive] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [pnlData, setPnlData] = useState<PnlData[]>([]);
  const [avgPnl, setAvgPnl] = useState(0);
  const [avgPnlUsd, setAvgPnlUsd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Static data configuration - can be easily modified by the team
  const dashboardConfig = {
    // Financial data
    solPrice: 50.0, // Current SOL price in USD
    totalBalance: {
      sol: 245.67,
      usd: 12283.50,
      percentChange: 12.5
    },
    realizedProfit: {
      sol: 18.34,
      usd: 917.00,
      period: "This month"
    },
    unrealizedProfit: {
      sol: 5.21,
      usd: 260.50,
      label: "Open positions"
    },
    winRate: {
      percentage: 78.5,
      winningTrades: 62
    },
    
    // Chart configuration
    pnlMultiplier: 139.33, // Multiplier to convert SOL to USD for PNL
    
    // Active trades
    activeTrades: [
      { token: 'SOL/USDC', buy: '45.23', current: '46.12', pnl: '+2.45%' },
      { token: 'RAY/USDC', buy: '1.23', current: '1.18', pnl: '-4.12%' },
      { token: 'BONK/USDC', buy: '0.00001234', current: '0.00001334', pnl: '+8.10%' },
    ],
    
    // Trade history
    tradeHistory: [
      { token: 'SOL/USDC', type: 'LONG', entry: '44.23', exit: '46.12', pnl: '+$94.50', date: '2024-03-15 14:30' },
      { token: 'RAY/USDC', type: 'SHORT', entry: '1.45', exit: '1.38', pnl: '+$35.00', date: '2024-03-15 12:15' },
      { token: 'BONK/USDC', type: 'LONG', entry: '0.00001234', exit: '0.00001334', pnl: '+$128.90', date: '2024-03-15 10:45' },
      { token: 'SOL/USDC', type: 'SHORT', entry: '47.82', exit: '46.91', pnl: '+$45.50', date: '2024-03-14 22:30' },
      { token: 'RAY/USDC', type: 'LONG', entry: '1.23', exit: '1.18', pnl: '-$25.00', date: '2024-03-14 20:15' },
    ]
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const days = isMobile ? 30 : 90;
    
    // Use the generatePnlData function with the multiplier from config
    const generatePnlDataWithConfig = (days: number): PnlData[] => {
      return Array.from({ length: days }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (days - 1 - i));
        const pnl = Number((Math.random() * 10 - 3).toFixed(2));
        return {
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          pnl: pnl,
          pnlUsd: Number((pnl * dashboardConfig.pnlMultiplier).toFixed(2))
        };
      });
    };
    
    const data = generatePnlDataWithConfig(days);
    setPnlData(data);
    
    // Calculate averages
    const totalPnl = data.reduce((acc, curr) => acc + curr.pnl, 0);
    const totalPnlUsd = data.reduce((acc, curr) => acc + curr.pnlUsd, 0);
    setAvgPnl(Number((totalPnl / data.length).toFixed(2)));
    setAvgPnlUsd(Number((totalPnlUsd / data.length).toFixed(2)));
  }, [isMobile, dashboardConfig.pnlMultiplier]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  interface CustomTooltipProps extends TooltipProps<number, string> {
    active?: boolean;
    payload?: Array<{
      payload: PnlData;
    }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const value = payload[0].payload.pnl;
      const valueUsd = payload[0].payload.pnlUsd;
      return (
        <div className="bg-[#1a1a1a] border border-[#222222] rounded-lg p-3 backdrop-blur-sm">
          <p className="text-gray-400 text-sm mb-1">{label}</p>
          <p className={`font-medium ${value >= 0 ? 'text-[#00ff94]' : 'text-red-500'}`}>
            {value > 0 ? '+' : ''}{value} SOL
          </p>
          <p className={`text-sm ${value >= 0 ? 'text-[#00ff94]/70' : 'text-red-500/70'}`}>
            ${valueUsd}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <Head>
        <title>SolanaTrader Bot Dashboard</title>
        <meta name="description" content="Monitor your Solana trading bot performance and statistics" />
      </Head>
      <motion.div 
        className="min-h-screen bg-[#0a0a0a] text-white p-4 sm:p-6"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Bot Status Section */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-r from-[#111111] to-[#151515] rounded-2xl p-6 sm:p-8 border border-[#222222]"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#1a1a1a] to-[#222] rounded-2xl flex items-center justify-center p-4 border border-[#333]">
                  <Image src="/bot-logo.png" alt="Bot Logo" width={80} height={80} className="w-full h-full" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    SolanaTrader Bot
                  </h1>
                  <div className="flex items-center gap-3 mt-2">
                    <div className={`h-2 w-2 rounded-full ${isBotActive ? 'bg-[#00ff94]' : 'bg-red-500'} animate-pulse`} />
                    <p className="text-gray-400">
                      {isBotActive ? 'Active and Trading' : 'Bot Inactive'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="self-start sm:self-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isBotActive}
                    onChange={() => setIsBotActive(!isBotActive)}
                    className="sr-only peer"
                  />
                  <div className="w-14 sm:w-16 h-7 sm:h-8 bg-[#222222] rounded-full peer 
                                peer-checked:after:translate-x-7 sm:peer-checked:after:translate-x-8
                                after:content-[''] after:absolute after:top-1 after:left-1 
                                after:bg-gray-300 after:rounded-full after:h-5 sm:after:h-6 after:w-5 sm:after:w-6 
                                after:transition-all peer-checked:bg-[#00ff94]/20
                                peer-checked:after:bg-[#00ff94]">
                  </div>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <motion.div variants={itemVariants} className="bg-[#111111] rounded-2xl p-6 border border-[#222222]">
              <div className="flex items-center gap-3 text-gray-400 mb-3">
                <Wallet className="w-5 h-5" />
                <span>Total Balance</span>
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">{dashboardConfig.totalBalance.sol} SOL</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-[#00ff94] text-lg">${dashboardConfig.totalBalance.usd.toLocaleString()}</span>
                  <span className="text-[#00ff94] text-sm flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    {dashboardConfig.totalBalance.percentChange}%
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#111111] rounded-2xl p-6 border border-[#222222]">
              <div className="flex items-center gap-3 text-gray-400 mb-3">
                <CircleDollarSign className="w-5 h-5" />
                <span>Realized Profit</span>
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">+{dashboardConfig.realizedProfit.sol} SOL</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-[#00ff94] text-lg">${dashboardConfig.realizedProfit.usd.toLocaleString()}</span>
                  <span className="text-sm text-gray-400">{dashboardConfig.realizedProfit.period}</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#111111] rounded-2xl p-6 border border-[#222222]">
              <div className="flex items-center gap-3 text-gray-400 mb-3">
                <TrendingUp className="w-5 h-5" />
                <span>Unrealized Profit</span>
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">+{dashboardConfig.unrealizedProfit.sol} SOL</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-[#00ff94] text-lg">${dashboardConfig.unrealizedProfit.usd.toLocaleString()}</span>
                  <span className="text-sm text-gray-400">{dashboardConfig.unrealizedProfit.label}</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-[#111111] rounded-2xl p-6 border border-[#222222]">
              <div className="flex items-center gap-3 text-gray-400 mb-3">
                <Percent className="w-5 h-5" />
                <span>Win Rate</span>
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold">{dashboardConfig.winRate.percentage}%</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-[#00ff94] text-sm">{dashboardConfig.winRate.winningTrades} winning trades</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chart Section */}
          <motion.div 
            variants={itemVariants}
            className="bg-[#111111] rounded-2xl p-4 sm:p-6 border border-[#222222]"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                  <h2 className="text-xl font-semibold">Daily Average PNL</h2>
                  <span className={`text-lg font-medium ${avgPnl >= 0 ? 'text-[#00ff94]' : 'text-red-500'}`}>
                    {avgPnl > 0 ? '+' : ''}{avgPnl} SOL ({avgPnlUsd > 0 ? '+' : ''}${avgPnlUsd})
                  </span>
                </div>
              </div>
            </div>
            <div className="h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={pnlData}
                  margin={{
                    top: 10,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                  stackOffset="sign"
                  barCategoryGap={1}
                >
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false}
                    stroke="#222222" 
                    opacity={0.5}
                  />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={false}
                  />
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{
                      fill: '#333333',
                      opacity: 0.2
                    }}
                  />
                  <Bar
                    dataKey={(data: PnlData) => data.pnl >= 0 ? data.pnl : 0}
                    name="Positive"
                    stackId="stack"
                    fill="#00ff94"
                    radius={[2, 2, 0, 0]}
                    // maxBarSize={8}
                    fillOpacity={0.8}
                  />
                  <Bar
                    dataKey={(data: PnlData) => data.pnl < 0 ? data.pnl : 0}
                    name="Negative"
                    stackId="stack"
                    fill="#ef4444"
                    radius={[2, 2, 0, 0]}
                    // maxBarSize={20}
                    fillOpacity={0.8}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Trading Table */}
          <motion.div 
            variants={itemVariants}
            className="bg-[#111111] rounded-2xl p-6 border border-[#222222]"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">Active Trades</h2>
                <p className="text-gray-400 text-sm mt-1">Currently open positions</p>
              </div>
              <button 
                onClick={() => setShowHistory(true)}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <History className="w-4 h-4" />
                View History
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#222222]">
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Token</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Buy Price</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Current Price</th>
                    <th className="text-right py-4 px-4 text-gray-400 font-medium">PNL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#222222]">
                  {dashboardConfig.activeTrades.map((trade, index) => (
                    <tr key={index} className="hover:bg-[#1a1a1a] transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                            {trade.token.split('/')[0].charAt(0)}
                          </div>
                          {trade.token}
                        </div>
                      </td>
                      <td className="py-4 px-4">${trade.buy}</td>
                      <td className="py-4 px-4">${trade.current}</td>
                      <td className={`py-4 px-4 text-right ${
                        trade.pnl.startsWith('+') ? 'text-[#00ff94]' : 'text-red-500'
                      }`}>
                        {trade.pnl}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* History Modal */}
      <AnimatePresence>
        {showHistory && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <motion.div 
              className="bg-[#111111] rounded-2xl border border-[#222222] w-full max-w-4xl max-h-[80vh] overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="p-6 border-b border-[#222222] flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Trading History</h2>
                  <p className="text-gray-400 text-sm mt-1">All completed trades</p>
                </div>
                <button 
                  onClick={() => setShowHistory(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#222222]">
                      <th className="text-left py-4 px-4 text-gray-400 font-medium">Token</th>
                      <th className="text-left py-4 px-4 text-gray-400 font-medium">Type</th>
                      <th className="text-left py-4 px-4 text-gray-400 font-medium">Entry Price</th>
                      <th className="text-left py-4 px-4 text-gray-400 font-medium">Exit Price</th>
                      <th className="text-right py-4 px-4 text-gray-400 font-medium">PNL</th>
                      <th className="text-right py-4 px-4 text-gray-400 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222222]">
                    {dashboardConfig.tradeHistory.map((trade, index) => (
                      <tr key={index} className="hover:bg-[#1a1a1a] transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                              {trade.token.split('/')[0].charAt(0)}
                            </div>
                            {trade.token}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            trade.type === 'LONG' ? 'bg-[#00ff94]/10 text-[#00ff94]' : 'bg-red-500/10 text-red-500'
                          }`}>
                            {trade.type}
                          </span>
                        </td>
                        <td className="py-4 px-4">${trade.entry}</td>
                        <td className="py-4 px-4">${trade.exit}</td>
                        <td className={`py-4 px-4 text-right ${
                          trade.pnl.startsWith('+') ? 'text-[#00ff94]' : 'text-red-500'
                        }`}>
                          {trade.pnl}
                        </td>
                        <td className="py-4 px-4 text-right text-gray-400">
                          {trade.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
} 