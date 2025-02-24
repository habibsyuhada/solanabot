import { useEffect, useState } from 'react';
import Head from 'next/head';

// Components will be created next
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Stats from '../components/Stats';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    // Set default theme
    document.documentElement.setAttribute('data-theme', 'black');
  }, []);

  return (
    <>
      <Head>
        <title>SolanaTradeBot - Automated Crypto Trading Bot</title>
        <meta name="description" content="Advanced Solana trading bot with automated strategies and real-time market analysis" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-black text-white">
        {/* Drawer for mobile */}
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={(e) => setIsDrawerOpen(e.target.checked)} />
          <div className="drawer-content">
            {/* Navbar */}
            <nav className="navbar fixed top-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
              <div className="container mx-auto px-4">
                <div className="flex-1">
                  <a className="text-xl font-bold">
                    <span className="text-white">Solana</span>
                    <span className="text-[#00ff94]">TradeBot</span>
                  </a>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-4">
                  <a className="btn btn-sm bg-[#00ff94] hover:bg-[#00ff94]/80 text-black border-none">Login</a>
                  <label htmlFor="my-drawer" className="btn btn-ghost btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </label>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                  <a href="#learn" className="text-sm font-medium hover:text-[#00ff94] transition-colors">Learn</a>
                  <a href="#vip" className="text-sm font-medium hover:text-[#00ff94] transition-colors">VIP</a>
                  <a className="btn btn-sm bg-[#00ff94] hover:bg-[#00ff94]/80 text-black border-none">Login</a>
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <div className="pt-16">
              <Hero />
              <Features />
              <HowItWorks />
              <Stats />
              <Pricing />
              <FAQ />
              <Footer />
            </div>
          </div>

          {/* Drawer Side */}
          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="min-h-screen w-full p-4 bg-black text-white">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xl font-bold">
                    <span className="text-white">Solana</span>
                    <span className="text-[#00ff94]">TradeBot</span>
                  </span>
                  <label htmlFor="my-drawer" className="btn btn-ghost btn-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </label>
                </div>
                <a href="#learn" className="btn btn-ghost justify-start text-lg hover:text-[#00ff94]" onClick={() => setIsDrawerOpen(false)}>Learn</a>
                <a href="#vip" className="btn btn-ghost justify-start text-lg hover:text-[#00ff94]" onClick={() => setIsDrawerOpen(false)}>VIP</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
