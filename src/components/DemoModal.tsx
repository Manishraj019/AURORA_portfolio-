import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ArrowLeft, ArrowRight, Check, Link as LinkIcon, 
  CheckCircle, Globe, Terminal, Users, Cpu, Shield, HelpCircle, Briefcase, Zap, Star
} from 'lucide-react';
import { Product, DemoFormData } from '../types';

// Concrete product options matching the screenshots
export const PRODUCTS: Product[] = [
  {
    id: 'restaurant-os',
    name: 'RestaurantOS',
    tagline: 'AI-Powered Core Operations',
    description: 'Run your entire restaurant from a single intelligent platform. Manage QR ordering, digital menus, billing, kitchen operations, inventory, staff, analytics, customer loyalty, and multi-branch operations with enterprise-grade reliability.',
    icon: 'restaurant',
    gradient: 'from-violet-600 to-purple-600',
    accentColor: '#a78bfa',
    features: [
      { title: 'QR Ordering & Digital Menu', description: 'Replace paper menus with contactless real-time customer loops.', icon: 'zap' },
      { title: 'Kitchen & Inventory Control', description: 'Track ingredients, waste, and stock levels automatically with AI.', icon: 'cpu' },
      { title: 'Real-Time Sales POS & Multi-Branch', description: 'Streamline billing, table layouts, and branch management from one hub.', icon: 'api' }
    ],
    specs: {
      architecture: 'Cloud-Based Hybrid Nodes',
      protocols: 'Flutter / gRPC / WebSockets',
      aiEngine: 'Gemini-2.5-Flash'
    }
  },
  {
    id: 'aurora-studio',
    name: 'AURORA Studio',
    tagline: 'Premium Website & App Development',
    description: 'Create a memorable online presence with custom web applications, mobile applications (iOS/Android/Flutter), restaurant landing pages, booking systems, and modern UI/UX design designed to convert.',
    icon: 'code',
    gradient: 'from-blue-600 to-cyan-600',
    accentColor: '#06b6d4',
    features: [
      { title: 'Premium Website Development', description: 'Custom high-performance portfolios, landing pages, and corporate sites.', icon: 'globe' },
      { title: 'Enterprise Web & Mobile Apps', description: 'Cross-platform Flutter applications, user portals, and dashboard systems.', icon: 'smartphone' },
      { title: 'Aesthetic Craftsmanship & UX', description: 'Exquisite modern typography, responsive layout structures, and sleek transitions.', icon: 'sparkles' }
    ],
    specs: {
      architecture: 'Jamstack / Serverless Architecture',
      protocols: 'Next.js / React / Tailwind CSS',
      aiEngine: 'Gemini-2.5-Pro'
    }
  },
  {
    id: 'aurora-growth',
    name: 'AURORA Growth',
    tagline: 'SEO & Digital Marketing Agency',
    description: 'Reach more customers and accelerate revenue through targeted digital marketing, social campaigns, advanced SEO, Google Business Profile optimization, email marketing, and loyalty campaigns.',
    icon: 'growth',
    gradient: 'from-pink-600 to-rose-600',
    accentColor: '#f43f5e',
    features: [
      { title: 'Social Commerce & Performance Ads', description: 'Optimized Meta/Google Ads, food reels, stories, and social promotions.', icon: 'image' },
      { title: 'SEO & Local Search Dominance', description: 'Rank for high-volume local searches and drive active intent traffic.', icon: 'trending-up' },
      { title: 'Engagement & Loyalty Ecosystems', description: 'SuperCoins rewards, referral programmes, digital coupons, and retention loops.', icon: 'gift' }
    ],
    specs: {
      architecture: 'Heuristic Multi-Agent CRM',
      protocols: 'RESTful / Event-Driven Metrics',
      aiEngine: 'Gemini-2.5-Pro'
    }
  },
  {
    id: 'aurora-ai',
    name: 'AURORA AI',
    tagline: 'AI Automation & Business Intelligence',
    description: 'Transform business data into actionable insights with AI-powered dashboards, sales forecasting, demand prediction, inventory optimisation, CRM integrations, and automated workflows.',
    icon: 'brain',
    gradient: 'from-indigo-600 to-violet-600',
    accentColor: '#6366f1',
    features: [
      { title: 'Business Intelligence & Dashboards', description: 'Real-time charts tracking sales, margins, staff, and customer retention.', icon: 'bar-chart' },
      { title: 'Intelligent Workflow Automation', description: 'AI-powered chatbots, automated alerts, CRM syncs, and task delegation.', icon: 'cpu' },
      { title: 'Predictive Demand Modeling', description: 'Forecast peak table traffic and order volumes to optimize operational labor.', icon: 'brain' }
    ],
    specs: {
      architecture: 'Distributed Vector Engine',
      protocols: 'GraphQL / WebSocket Streaming',
      aiEngine: 'Gemini-1.5-Pro'
    }
  }
];

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [step, setStep] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [formData, setFormData] = useState<DemoFormData>({
    productId: '',
    companyName: '',
    websiteUrl: '',
    monthlyTraffic: '<100k',
    techStack: '',
    industryVertical: 'hospitality',
    teamSize: '1-10',
    fullName: '',
    workEmail: '',
    roleTitle: '',
    linkedinUrl: '',
    preferredDateTime: ''
  });

  const [referenceId, setReferenceId] = useState('AR-9482-X');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Generate a cool unique reference ID when opened
      const num = Math.floor(1000 + Math.random() * 9000);
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const char = chars[Math.floor(Math.random() * chars.length)];
      setReferenceId(`AR-${num}-${char}`);
    } else {
      // Reset steps on close
      setStep(1);
    }
  }, [isOpen]);

  const selectProduct = (productId: string) => {
    setSelectedProduct(productId);
    setFormData(prev => ({ ...prev, productId }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const selectedProductName = PRODUCTS.find(p => p.id === selectedProduct)?.name || selectedProduct;

    const payload = {
      _subject: `⚡ New AURORA Demo Request: ${formData.companyName} (${formData.fullName})`,
      "Selected Product": selectedProductName,
      "Full Name": formData.fullName,
      "Work Email": formData.workEmail,
      "Company Name": formData.companyName,
      "Website URL": formData.websiteUrl,
      "Monthly Volume/Traffic": formData.monthlyTraffic,
      "Primary Tech Stack": formData.techStack || "Not Specified",
      "Industry Vertical": formData.industryVertical,
      "Team Size": formData.teamSize,
      "Role / Title": formData.roleTitle || "Not Specified",
      "LinkedIn URL": formData.linkedinUrl || "Not Specified",
      "Preferred Date & Time": formData.preferredDateTime || "Not Specified",
      "Reference ID": referenceId,
      _replyto: formData.workEmail,
      _template: "table"
    };

    try {
      const response = await fetch("https://formsubmit.co/ajax/aurora.web011@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error("Network transmission failed");
      }
      
      setStep(4); // Show success screen ONLY if successful
    } catch (err) {
      console.error("Error submitting to FormSubmit:", err);
      alert("We're sorry, our mail server is currently experiencing high load. Please try again in a few minutes, or email us directly at aurora.web011@gmail.com!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validation helpers
  const isStep1Valid = selectedProduct !== '';
  const isStep2Valid = formData.companyName.trim() !== '' && formData.websiteUrl.trim() !== '';
  const isStep3Valid = formData.fullName.trim() !== '' && formData.workEmail.includes('@');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 overflow-y-auto no-scrollbar">
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 dark:bg-black/80 backdrop-blur-md z-40"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl bg-white dark:bg-[#08090d] border border-slate-200 dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl z-50 flex flex-col my-auto"
          >
            {/* Ambient Background Corner Glows */}
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-violet-600/20 rounded-full mix-blend-screen filter blur-[90px] opacity-60 pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[90px] opacity-60 pointer-events-none" />

            {/* Header - Hidden in Success Step */}
            {step < 4 && (
              <div className="relative z-10 flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-white/[0.08] bg-white/50 dark:bg-transparent backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg font-extrabold tracking-tighter text-slate-900 dark:text-white">AURORA</span>
                  <span className="font-sans text-xs font-semibold text-slate-500 dark:text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08]">
                    Request Demo
                  </span>
                </div>
                <button 
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/[0.05] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                >
                  <X aria-hidden="true" className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Linear Progress Bar */}
            {step < 4 && (
              <div className="relative z-10 w-full h-[2px] bg-slate-100 dark:bg-white/[0.05]">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 rounded-r-full"
                />
              </div>
            )}

            {/* Content Area */}
            <div className="relative z-10 p-6 md:p-8 flex-1 overflow-y-auto max-h-[80vh] no-scrollbar">
              <AnimatePresence mode="wait">
              
              {/* STEP 1: Product Selection */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="text-center md:text-left mb-8">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                      Which product are you interested in?
                    </h2>
                    <p className="font-sans text-slate-500 dark:text-slate-400">
                      Select the ecosystem you want to explore.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {PRODUCTS.map((prod) => {
                      const isSelected = selectedProduct === prod.id;
                      return (
                        <div
                          key={prod.id}
                          onClick={() => selectProduct(prod.id)}
                          className={`product-card cursor-pointer border rounded-xl flex flex-col gap-5 p-6 transition-all duration-300 relative overflow-hidden group ${
                            isSelected 
                              ? 'border-violet-500/80 bg-violet-500/[0.03] dark:bg-violet-500/[0.05] shadow-[0_0_20px_rgba(124,58,237,0.15)] dark:shadow-[0_0_25px_rgba(124,58,237,0.25)]' 
                              : 'border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50/[0.3] dark:hover:bg-white/[0.02]'
                          }`}
                        >
                          {/* Selected Glow Dot */}
                          {isSelected && (
                            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,246,0.8)] animate-pulse" />
                          )}

                          {/* Icon Container */}
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${prod.gradient} text-white shadow-md`}>
                            {prod.id === 'restaurant-os' ? <Cpu className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
                          </div>

                          <div>
                            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-2">
                              {prod.name}
                            </h3>
                            <p className="font-sans text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">
                              {prod.description}
                            </p>

                            {/* Features list */}
                            <ul className="space-y-3.5 mb-6">
                              {prod.features.map((feat, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                  <div className="w-5 h-5 mt-0.5 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] shrink-0">
                                    <Check className={`w-3.5 h-3.5 ${prod.id === 'restaurant-os' ? 'text-violet-500' : 'text-blue-500'}`} />
                                  </div>
                                  <div className="leading-tight">
                                    <span className="font-bold text-slate-800 dark:text-slate-200">{feat.title}:</span>{' '}
                                    <span className="text-slate-500 dark:text-slate-400">{feat.description}</span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Technical Specs Footer */}
                          <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/[0.08]">
                            <h4 className={`font-sans text-[11px] font-bold tracking-widest uppercase mb-2 ${
                              prod.id === 'restaurant-os' ? 'text-violet-500' : 'text-blue-500'
                            }`}>
                              Technical Specs
                            </h4>
                            <ul className="space-y-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                              <li className="flex justify-between">
                                <span>Architecture:</span>
                                <span className="text-slate-800 dark:text-slate-200 font-medium">{prod.specs.architecture}</span>
                              </li>
                              <li className="flex justify-between">
                                <span>Protocols:</span>
                                <span className="text-slate-800 dark:text-slate-200 font-medium">{prod.specs.protocols}</span>
                              </li>
                              <li className="flex justify-between">
                                <span>AI Engine:</span>
                                <span className="text-slate-800 dark:text-slate-200 font-medium">{prod.specs.aiEngine}</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-white/[0.08]">
                    <button
                      onClick={handleNext}
                      disabled={!isStep1Valid}
                      className={`px-6 py-3 rounded-lg font-sans text-sm font-semibold flex items-center gap-2 transition-all ${
                        isStep1Valid
                          ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg hover:scale-[1.02] cursor-pointer'
                          : 'bg-slate-100 dark:bg-white/[0.03] text-slate-400 dark:text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      Next Step
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Business Details */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="text-center md:text-left mb-8">
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                      Business Details
                    </h2>
                    <p className="font-sans text-slate-500 dark:text-slate-400">
                      Help us understand your venture's scale and technical requirements.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Company Name */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="e.g. Aurora Systems"
                        className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-lg px-4 py-3 text-slate-950 dark:text-white font-sans placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                      />
                    </div>

                    {/* Website URL */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                        Website URL
                      </label>
                      <input
                        type="url"
                        id="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com"
                        className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-lg px-4 py-3 text-slate-950 dark:text-white font-sans placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                      />
                    </div>

                    {/* Monthly Volume */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                        Monthly Volume/Traffic
                      </label>
                      <select
                        id="monthlyTraffic"
                        value={formData.monthlyTraffic}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-lg px-4 py-3 text-slate-950 dark:text-white font-sans focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all appearance-none cursor-pointer"
                      >
                        <option value="<100k">&lt;100k</option>
                        <option value="100k-1M">100k-1M</option>
                        <option value="1M+">1M+</option>
                      </select>
                    </div>

                    {/* Technical Stack */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                        Primary Technical Stack
                      </label>
                      <input
                        type="text"
                        id="techStack"
                        value={formData.techStack}
                        onChange={handleInputChange}
                        placeholder="e.g. React, Node.js, AWS"
                        className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-lg px-4 py-3 text-slate-950 dark:text-white font-sans placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                      />
                    </div>

                    {/* Industry Vertical */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                        Industry Vertical
                      </label>
                      <select
                        id="industryVertical"
                        value={formData.industryVertical}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-lg px-4 py-3 text-slate-950 dark:text-white font-sans focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all appearance-none cursor-pointer"
                      >
                        <option value="hospitality">Hospitality</option>
                        <option value="saas">SaaS / Enterprise</option>
                        <option value="fintech">Fintech</option>
                        <option value="other">Other Ventures</option>
                      </select>
                    </div>

                    {/* Team Size */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                        Team Size
                      </label>
                      <select
                        id="teamSize"
                        value={formData.teamSize}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-lg px-4 py-3 text-slate-950 dark:text-white font-sans focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all appearance-none cursor-pointer"
                      >
                        <option value="1-10">1-10 members</option>
                        <option value="11-50">11-50 members</option>
                        <option value="51-200">51-200 members</option>
                        <option value="200+">200+ members</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-white/[0.08]">
                    <button
                      onClick={handleBack}
                      className="px-5 py-3 rounded-lg font-sans text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!isStep2Valid}
                      className={`px-6 py-3 rounded-lg font-sans text-sm font-semibold flex items-center gap-2 transition-all ${
                        isStep2Valid
                          ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg hover:scale-[1.02] cursor-pointer'
                          : 'bg-slate-100 dark:bg-white/[0.03] text-slate-400 dark:text-slate-600 cursor-not-allowed'
                      }`}
                    >
                      Final Step
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Contact Details */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <form onSubmit={handleSubmit}>
                    <div className="text-center md:text-left mb-8">
                      <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-violet-500 font-sans text-xs font-bold tracking-wider uppercase">
                        <Briefcase className="w-4 h-4" />
                        <span>Step 3 of 3</span>
                      </div>
                      <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        Contact Details
                      </h2>
                      <p className="font-sans text-slate-500 dark:text-slate-400">
                        Finalize your request to connect with our venture partners.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Full Name */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Jane Doe"
                          required
                          className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-lg px-4 py-3 text-slate-950 dark:text-white font-sans placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                        />
                      </div>

                      {/* Work Email */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                          Work Email
                        </label>
                        <input
                          type="email"
                          id="workEmail"
                          value={formData.workEmail}
                          onChange={handleInputChange}
                          placeholder="jane@company.com"
                          required
                          className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-lg px-4 py-3 text-slate-950 dark:text-white font-sans placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                        />
                      </div>

                      {/* Role / Title */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                          Role / Title
                        </label>
                        <input
                          type="text"
                          id="roleTitle"
                          value={formData.roleTitle}
                          onChange={handleInputChange}
                          placeholder="Founder & CEO"
                          className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-lg px-4 py-3 text-slate-950 dark:text-white font-sans placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                        />
                      </div>

                      {/* LinkedIn URL */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                          LinkedIn Profile URL
                        </label>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 dark:text-slate-600">
                            <LinkIcon className="w-4 h-4" />
                          </span>
                          <input
                            type="url"
                            id="linkedinUrl"
                            value={formData.linkedinUrl}
                            onChange={handleInputChange}
                            placeholder="linkedin.com/in/janedoe"
                            className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-lg pl-11 pr-4 py-3 text-slate-950 dark:text-white font-sans placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                          />
                        </div>
                      </div>

                      {/* Date & Time Scheduling Selection */}
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="block text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                          Preferred Scheduling Session
                        </label>
                        <input
                          type="datetime-local"
                          id="preferredDateTime"
                          value={formData.preferredDateTime}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] rounded-lg px-4 py-3 text-slate-950 dark:text-white font-sans focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-white/[0.08]">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="px-5 py-3 rounded-lg font-sans text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/[0.08] hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={!isStep3Valid || isSubmitting}
                        className={`px-8 py-3 rounded-lg font-sans text-sm font-semibold flex items-center gap-2 transition-all glow-btn ${
                          isStep3Valid && !isSubmitting
                            ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg hover:scale-[1.02] cursor-pointer'
                            : 'bg-slate-100 dark:bg-white/[0.03] text-slate-400 dark:text-slate-600 cursor-not-allowed'
                        }`}
                      >
                        {isSubmitting ? 'Transmitting...' : 'Submit Request'}
                        {!isSubmitting && <CheckCircle className="w-4 h-4" />}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 4: Success confirmation */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ type: 'spring', damping: 25, duration: 0.3 }}
                  className="text-center py-8 px-4"
                >
                  {/* Huge glowing circle tick */}
                  <div className="mb-8 flex justify-center">
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="absolute inset-0 bg-violet-500/20 rounded-full animate-ping opacity-60" />
                      <div className="absolute inset-1 bg-blue-500/15 rounded-full animate-pulse" />
                      <div className="relative z-10 w-16 h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center border border-slate-200 dark:border-white/[0.08] shadow-lg text-violet-500">
                        <Check className="w-8 h-8 stroke-[3px]" />
                      </div>
                    </div>
                  </div>

                  <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-violet-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
                    Transmission Successful
                  </h1>
                  <p className="font-sans text-slate-500 dark:text-slate-400 max-w-lg mx-auto text-base md:text-lg leading-relaxed mb-10">
                    Your request has been integrated into our queue. A venture partner will initiate contact within the next 24 computational hours.
                  </p>

                  {/* Status Indicator block */}
                  <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.08] rounded-xl p-5 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 max-w-md mx-auto">
                    <div className="text-center sm:text-left">
                      <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</span>
                      <span className="font-sans text-sm font-semibold text-emerald-500 flex items-center justify-center sm:justify-start gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        Processing
                      </span>
                    </div>
                    <div className="text-center sm:text-right">
                      <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Reference ID</span>
                      <span className="font-mono text-sm font-bold text-slate-900 dark:text-white opacity-90 bg-slate-200/50 dark:bg-white/[0.05] px-3 py-1 rounded-md">
                        {referenceId}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 max-w-sm mx-auto">
                    <button
                      onClick={onClose}
                      className="w-full py-3.5 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 text-white font-sans text-sm font-bold shadow-lg hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Globe className="w-4 h-4" />
                      Return to Home
                    </button>
                    <button
                      onClick={onClose}
                      className="w-full py-3.5 rounded-lg border border-slate-200 dark:border-white/[0.08] hover:bg-slate-50 dark:hover:bg-white/[0.02] text-slate-700 dark:text-slate-300 font-sans text-sm font-semibold transition-all cursor-pointer"
                    >
                      Explore Ventures
                    </button>
                  </div>
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
