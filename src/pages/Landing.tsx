import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LayoutGrid, Zap, Share2, Globe, Palette, BarChart3, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-indigo-500" />
            <span className="text-xl font-bold tracking-tight">BentoLink</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Login
            </Link>
            <Link 
              to="/dashboard" 
              className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm mb-8">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
              The new standard for creators
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
              One link for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                everything you do.
              </span>
            </h1>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              Build a beautiful, bento-style portfolio in minutes. Share your links, social profiles, and content with a single, powerful URL.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/dashboard" 
                className="h-14 px-8 bg-white text-black text-lg font-semibold rounded-full hover:scale-105 transition-transform flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Claim your link <ArrowRight className="w-5 h-5" />
              </Link>
              <div className="text-white/40 text-sm">
                It's free, and takes less than a minute.
              </div>
            </div>
          </motion.div>

          {/* Hero Image / Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-24 relative max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
            <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-4 shadow-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=2000&q=80" 
                alt="Dashboard Preview" 
                className="w-full h-auto rounded-xl opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <div className="border-t border-white/10 bg-[#050505] py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Built for growth.</h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">Everything you need to showcase your work and grow your audience, packed into one beautiful interface.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Palette />}
                title="Beautifully Designed"
                description="Stand out with a modern bento-grid layout that looks incredible on any device."
              />
              <FeatureCard 
                icon={<Zap />}
                title="Lightning Fast"
                description="Optimized for speed. Your profile loads instantly, keeping your audience engaged."
              />
              <FeatureCard 
                icon={<Share2 />}
                title="Highly Viral"
                description="Every shared link acts as a billboard for your brand, driving organic growth."
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="py-32 bg-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Simple, transparent pricing.</h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">Start for free, upgrade when you need more power.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold mb-2">Starter</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-white/50">/forever</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <PricingFeature text="Unlimited basic blocks" />
                  <PricingFeature text="Standard themes" />
                  <PricingFeature text="BentoLink branding" />
                </ul>
                <Link to="/dashboard" className="block w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-center font-semibold transition-colors">
                  Get Started
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="p-8 rounded-3xl bg-gradient-to-b from-indigo-500/20 to-purple-500/10 border border-indigo-500/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                <h3 className="text-2xl font-bold mb-2 text-indigo-400">Pro</h3>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-bold">$9</span>
                  <span className="text-white/50">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <PricingFeature text="Everything in Starter" />
                  <PricingFeature text="Custom domains" />
                  <PricingFeature text="Advanced analytics" />
                  <PricingFeature text="Remove branding" />
                  <PricingFeature text="Premium glass themes" />
                </ul>
                <Link to="/dashboard" className="block w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-center font-semibold transition-colors shadow-lg shadow-indigo-500/25">
                  Upgrade to Pro
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-white/40 text-sm">
        <p>&copy; {new Date().getFullYear()} BentoLink. Built for creators.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-white/50 leading-relaxed">{description}</p>
    </div>
  );
}

function PricingFeature({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-white/80">
      <CheckCircle2 className="w-5 h-5 text-indigo-400" />
      <span>{text}</span>
    </li>
  );
}
