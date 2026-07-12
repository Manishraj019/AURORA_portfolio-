import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, Video, ArrowDown, Sparkles, Shield, Zap, TrendingUp, 
  Terminal, CheckCircle, RefreshCw, HelpCircle, ExternalLink, Code, ChevronRight, X,
  ChefHat, QrCode, Coins, Gift, Cloud, Brain, Smartphone, Network, Store, BarChart3, Film, Lock,
  Save, Trash2, ChevronDown
} from 'lucide-react';


import ThemeToggle from './components/ThemeToggle';

import DemoModal from './components/DemoModal';
import AmbientAudio from './components/AmbientAudio';
import GooeyNav, { GooeyNavItem } from './components/GooeyNav';
const CircularGallery = lazy(() => import('./components/CircularGallery'));
import { BackdropPreset, BackgroundVideoOption } from './types';

const DEFAULT_VIDEOS: BackgroundVideoOption[] = [
  {
    id: 'cyberpunk-city',
    name: 'Cyberpunk Cityscape',
    url: '/background-video.mp4',
    description: 'Neon-lit futuristic metropolis',
    category: 'Sci-Fi'
  }
];

const CATEGORIES = [
  {
    id: 'restaurant',
    name: 'Restaurant Technology',
    tag: 'AURORAOS',
    colorClass: 'text-violet-600 dark:text-violet-400 border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 shadow-violet-500/5',
    activeGlow: 'ring-2 ring-violet-500 border-violet-500 dark:bg-violet-950/20 bg-violet-50/50',
    icon: ChefHat,
    items: [
      { image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80', text: 'Interactive QR Menu' },
      { image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', text: 'Smart POS Terminal' },
      { image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80', text: 'KMS Automation' },
      { image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', text: 'AI Stock Inventory' },
      { image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', text: 'Multi-Branch Analytics' },
    ],
    list: [
      'RestaurantOS Core Platform',
      'Enterprise POS Solutions',
      'Contactless QR Ordering',
      'Digital Interactive Menus',
      'Kitchen Management Systems (KMS)',
      'Live Stock & Inventory Automation',
      'Multi-Branch Operating Control'
    ]
  },
  {
    id: 'website',
    name: 'Website Development',
    tag: 'STUDIO',
    colorClass: 'text-blue-600 dark:text-blue-400 border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 shadow-blue-500/5',
    activeGlow: 'ring-2 ring-blue-500 border-blue-500 dark:bg-blue-950/20 bg-blue-50/50',
    icon: Code,
    items: [
      { image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80', text: 'Creative Platforms' },
      { image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80', text: 'Custom Portals' },
      { image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=80', text: 'Robust Frameworks' },
      { image: 'https://images.unsplash.com/photo-1581291518655-9523c932dedf?auto=format&fit=crop&w=800&q=80', text: 'Conversion-Focused' },
      { image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80', text: 'Responsive Web' },
    ],
    list: [
      'Corporate Websites',
      'Restaurant Websites',
      'Conversion Landing Pages',
      'Portfolio Websites',
      'Booking Platforms',
      'E-Commerce Stores',
      'Custom Web Applications'
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile App Development',
    tag: 'MOBILE',
    colorClass: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 shadow-emerald-500/5',
    activeGlow: 'ring-2 ring-emerald-500 border-emerald-500 dark:bg-emerald-950/20 bg-emerald-50/50',
    icon: Smartphone,
    items: [
      { image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80', text: 'iOS & Android Apps' },
      { image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80', text: 'Cross-Platform UI' },
      { image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80', text: 'Smooth Workflows' },
      { image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80', text: 'Dynamic Experience' },
      { image: 'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?auto=format&fit=crop&w=800&q=80', text: 'Responsive Architecture' },
    ],
    list: [
      'Native Android Applications',
      'Native iOS Applications',
      'Flutter App Development',
      'Cross-Platform Deployments',
      'Customer-Facing Apps',
      'Operational Admin Dashboards'
    ]
  },
  {
    id: 'branding',
    name: 'Branding & Design',
    tag: 'CREATIVE',
    colorClass: 'text-cyan-600 dark:text-cyan-400 border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 shadow-cyan-500/5',
    activeGlow: 'ring-2 ring-cyan-500 border-cyan-500 dark:bg-cyan-950/20 bg-cyan-50/50',
    icon: Film,
    items: [
      { image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80', text: 'Visual Identity' },
      { image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80', text: 'UI/UX Guidelines' },
      { image: 'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=800&q=80', text: 'Brandmarks & Logos' },
      { image: 'https://images.unsplash.com/photo-1501183007986-d0d080b147f9?auto=format&fit=crop&w=800&q=80', text: 'Premium Aesthetics' },
      { image: 'https://images.unsplash.com/photo-1541462608141-2ff01dd914e0?auto=format&fit=crop&w=800&q=80', text: 'Product Design' },
    ],
    list: [
      'Logo & Brandmark Design',
      'Brand Identity Guidelines',
      'UI/UX Interface Design',
      'Digital Product Design',
      'Marketing Creative Suites',
      'Premium Digital Asset Packs'
    ]
  },
  {
    id: 'marketing',
    name: 'Digital Marketing',
    tag: 'GROWTH',
    colorClass: 'text-pink-600 dark:text-pink-400 border-pink-500/30 bg-pink-500/10 hover:bg-pink-500/20 shadow-pink-500/5',
    activeGlow: 'ring-2 ring-pink-500 border-pink-500 dark:bg-pink-950/20 bg-pink-50/50',
    icon: TrendingUp,
    items: [
      { image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', text: 'Advanced SEO/SEM' },
      { image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80', text: 'Growth Campaigns' },
      { image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80', text: 'Social Reach' },
      { image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80', text: 'Funnel Optimisation' },
      { image: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80', text: 'Audience Engagement' },
    ],
    list: [
      'Advanced SEO Services',
      'Social Media Marketing (SMM)',
      'Google Ads & Search Campaigns',
      'Meta Ads & Performance Marketing',
      'Content Marketing & Brand Copy',
      'Email & Newsletter Campaigns'
    ]
  },
  {
    id: 'ai',
    name: 'AI Solutions',
    tag: 'AI LABS',
    colorClass: 'text-indigo-600 dark:text-indigo-400 border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 shadow-indigo-500/5',
    activeGlow: 'ring-2 ring-indigo-500 border-indigo-500 dark:bg-indigo-950/20 bg-indigo-50/50',
    icon: Brain,
    items: [
      { image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80', text: 'Neural Interfaces' },
      { image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=800&q=80', text: 'Automated Workflows' },
      { image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80', text: 'Smart Forecasting' },
      { image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80', text: 'Intelligent Insights' },
      { image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80', text: 'AI Business Copilot' },
    ],
    list: [
      'Real-Time Business Analytics',
      'Intelligent AI Chatbots',
      'Predictive Inventory Analytics',
      'Marketing Process Automation',
      'AI-Powered Customer Insights',
      'Automated Smart Reporting'
    ]
  }
];

const FAQS = [
  {
    question: "What is AURORA and how does it benefit my business?",
    answer: "AURORA is an all-in-one AI-powered hospitality technology and business growth ecosystem. We provide custom-designed interactive software (like RestaurantOS), high-performance website development, AI automation workflows, and tailored growth campaigns to help businesses modernize their operations and acquire more customers."
  },
  {
    question: "Can RestaurantOS integrate with my existing POS system?",
    answer: "Yes. RestaurantOS is built with open API standards, allowing bi-directional synchronization with popular legacy POS terminals, billing platforms, inventory management tools, and digital receipt hardware."
  },
  {
    question: "How does the Backdrop Controller and audio feature work?",
    answer: "Our immersive cinematic backdrop controller allows you to tune your focus environment. You can select premium high-definition video backgrounds, adjust opacity and brightness levels, and save your custom configurations as persistent presets in your browser's local storage so they remain on reload."
  },
  {
    question: "Is there a free trial or customized product demo?",
    answer: "Absolutely! You can instantly request a personalized product demo or schedule a free strategy consultation by clicking the 'Request Demo' or 'Book Free Consultation' buttons across the site."
  },
  {
    question: "How do I save and manage custom backdrop presets?",
    answer: "Simply open the Backdrop Controller from the gear/sliders icon, type a custom name for your current background settings (such as opacity and brightness), and click 'Save Preset'. You can save as many configurations as you like, and delete them anytime using the trash icon."
  }
];

export default function App() {
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>(() => {
    const saved = localStorage.getItem('aurora_currentVideoUrl');
    return (saved && !saved.startsWith('blob:')) ? saved : DEFAULT_VIDEOS[0].url;
  });
  const [playbackMode, setPlaybackMode] = useState<'scroll-play' | 'scroll-scrub'>(() => {
    const saved = localStorage.getItem('aurora_playbackMode');
    return (saved === 'scroll-play' || saved === 'scroll-scrub') ? saved : 'scroll-play';
  });
  const [customVideoFile, setCustomVideoFile] = useState<{ name: string; url: string } | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBackdropOpen, setIsBackdropOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'Admin011') {
      setIsAdminAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Invalid administrator password.');
    }
  };
  const [customUrlInput, setCustomUrlInput] = useState<string>(() => {
    return localStorage.getItem('aurora_customUrlInput') || '';
  });
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [videoOpacity, setVideoOpacity] = useState<number>(() => {
    const saved = localStorage.getItem('aurora_videoOpacity');
    return saved ? Math.min(100, Math.max(10, parseInt(saved, 10))) : 85;
  });
  const [videoBrightness, setVideoBrightness] = useState<number>(() => {
    const saved = localStorage.getItem('aurora_videoBrightness');
    return saved ? Math.min(150, Math.max(50, parseInt(saved, 10))) : 105;
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('restaurant');

  // Custom persistent presets state and operations
  const [customPresets, setCustomPresets] = useState<BackdropPreset[]>(() => {
    const saved = localStorage.getItem('aurora_backdrop_presets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse backdrop presets from localStorage:', e);
      }
    }
    return [];
  });
  const [newPresetName, setNewPresetName] = useState<string>('');
  const [isRestoringCustomVideo, setIsRestoringCustomVideo] = useState<boolean>(() => {
    return localStorage.getItem('aurora_use_custom_video') === 'true';
  });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    localStorage.setItem('aurora_backdrop_presets', JSON.stringify(customPresets));
  }, [customPresets]);

  const handleSavePreset = () => {
    const nameToSave = newPresetName.trim() || `Config ${customPresets.length + 1}`;
    const newPreset: BackdropPreset = {
      id: `preset-${Date.now()}`,
      name: nameToSave,
      url: currentVideoUrl,
      opacity: videoOpacity,
      brightness: videoBrightness
    };
    setCustomPresets(prev => [...prev, newPreset]);
    setNewPresetName('');
  };

  const handleDeletePreset = (id: string) => {
    setCustomPresets(prev => prev.filter(p => p.id !== id));
  };

  // Restore custom video file from IndexedDB on mount to prevent removal on refresh
  useEffect(() => {
    const useCustom = localStorage.getItem('aurora_use_custom_video') === 'true';
    if (useCustom) {
      try {
        const request = indexedDB.open('aurora_db', 1);
        request.onupgradeneeded = (e) => {
          const db = request.result;
          if (!db.objectStoreNames.contains('videos')) {
            db.createObjectStore('videos');
          }
        };
        request.onsuccess = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains('videos')) {
            setIsRestoringCustomVideo(false);
            return;
          }
          const tx = db.transaction('videos', 'readonly');
          const store = tx.objectStore('videos');
          const getRequest = store.get('custom_video');
          getRequest.onsuccess = () => {
            const file = getRequest.result;
            if (file instanceof Blob) {
              const name = localStorage.getItem('aurora_custom_video_name') || 'custom_video.mp4';
              const url = URL.createObjectURL(file);
              setCustomVideoFile({ name, url });
              setCurrentVideoUrl(url);
            }
            setIsRestoringCustomVideo(false);
          };
          getRequest.onerror = () => {
            setIsRestoringCustomVideo(false);
          };
        };
        request.onerror = () => {
          setIsRestoringCustomVideo(false);
        };
      } catch (error) {
        console.error('Failed to restore custom video from IndexedDB:', error);
        setIsRestoringCustomVideo(false);
      }
    } else {
      setIsRestoringCustomVideo(false);
    }
  }, []);

  // Save custom video file to IndexedDB for robust persistent state
  const saveCustomVideoFile = (file: File) => {
    const url = URL.createObjectURL(file);
    
    // Revoke old blob URL to avoid memory leaks
    if (customVideoFile?.url && customVideoFile.url.startsWith('blob:')) {
      URL.revokeObjectURL(customVideoFile.url);
    }

    setCustomVideoFile({ name: file.name, url });
    setCurrentVideoUrl(url);
    setPlaybackMode('scroll-play');

    try {
      const request = indexedDB.open('aurora_db', 1);
      request.onupgradeneeded = (e) => {
        const db = request.result;
        if (!db.objectStoreNames.contains('videos')) {
          db.createObjectStore('videos');
        }
      };
      request.onsuccess = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('videos')) return;
        const tx = db.transaction('videos', 'readwrite');
        const store = tx.objectStore('videos');
        store.put(file, 'custom_video');
        localStorage.setItem('aurora_custom_video_name', file.name);
        localStorage.setItem('aurora_use_custom_video', 'true');
      };
    } catch (error) {
      console.error('Failed to store custom video in IndexedDB:', error);
    }
  };

  // Clean up blob URL on unmount to prevent leaks
  useEffect(() => {
    return () => {
      if (customVideoFile?.url && customVideoFile.url.startsWith('blob:')) {
        URL.revokeObjectURL(customVideoFile.url);
      }
    };
  }, [customVideoFile?.url]);

  // Persist background settings to localStorage when they change
  useEffect(() => {
    if (isRestoringCustomVideo) return;

    if (!currentVideoUrl.startsWith('blob:')) {
      localStorage.setItem('aurora_currentVideoUrl', currentVideoUrl);
      localStorage.setItem('aurora_use_custom_video', 'false');
    } else {
      localStorage.setItem('aurora_use_custom_video', 'true');
    }
  }, [currentVideoUrl, isRestoringCustomVideo]);

  useEffect(() => {
    localStorage.setItem('aurora_playbackMode', playbackMode);
  }, [playbackMode]);

  useEffect(() => {
    localStorage.setItem('aurora_videoOpacity', videoOpacity.toString());
  }, [videoOpacity]);

  useEffect(() => {
    localStorage.setItem('aurora_videoBrightness', videoBrightness.toString());
  }, [videoBrightness]);

  useEffect(() => {
    localStorage.setItem('aurora_customUrlInput', customUrlInput);
  }, [customUrlInput]);

  // Auto-scroll explanation indicator state
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Gooey Navigation Items configuration matching section IDs exactly
  const navItems: GooeyNavItem[] = [
    { label: 'OS', href: '#vision' },
    { label: 'Operations', href: '#principles' },
    { label: 'Capabilities', href: '#ecosystem' },
    { label: 'Growth', href: '#partner' }
  ];

  const [activeHref, setActiveHref] = useState<string>('#vision');

  useEffect(() => {
    if (scrollProgress < 0.22) {
      setActiveHref('#vision');
    } else if (scrollProgress < 0.48) {
      setActiveHref('#principles');
    } else if (scrollProgress < 0.78) {
      setActiveHref('#ecosystem');
    } else {
      setActiveHref('#partner');
    }
  }, [scrollProgress]);

  useEffect(() => {
    const handleScroll = () => {

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(scrollTop / docHeight);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global file drag-and-drop listeners for ultra-sleek user video loading
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer && e.dataTransfer.types.includes('Files')) {
        setIsDraggingFile(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      // Only dismiss when drag truly leaves window
      if (e.clientX === 0 && e.clientY === 0) {
        setIsDraggingFile(false);
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDraggingFile(false);
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith('video/')) {
          saveCustomVideoFile(file);
        }
      }
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  const handleCustomVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrlInput.trim().startsWith('http') || customUrlInput.trim().startsWith('/')) {
      setCurrentVideoUrl(customUrlInput.trim());
      setIsBackdropOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-transparent text-slate-900 dark:text-slate-100 selection:bg-violet-500/30 overflow-x-hidden transition-colors duration-500">




      {/* Navigation Header */}
      <header className="sticky top-0 w-full z-40 bg-transparent border-b border-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center w-full gap-6">
          
          {/* Logo and Application Title */}
          <div className="flex items-center gap-3 shrink-0 select-none">
            <a href="#vision" className="w-10 h-10 bg-slate-950/10 dark:bg-black/40 border border-slate-200/20 dark:border-white/10 rounded-full flex items-center justify-center p-1.5 transition-transform hover:scale-105 active:scale-95 duration-300">
              <img src="/logo.svg" alt="Aurora logo" className="w-full h-full object-contain" />
            </a>
            <span className="font-sans text-xl font-extrabold tracking-widest text-slate-950 dark:text-white relative">
              ΛURORΛ
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full opacity-70" />
            </span>
          </div>

          {/* Integrated Dynamic GooeyNav placed immediately after the title with minimal spacing */}
          <div className="shrink-0">
            <GooeyNav
              items={navItems}
              activeHref={activeHref}
              onActiveHrefChange={(href) => setActiveHref(href)}
              particleCount={16}
              particleDistances={[80, 10]}
              particleR={90}
              animationTime={400}
              timeVariance={200}
            />
          </div>

          {/* Controls Right - Action & Utility Icons */}
          <div className="flex items-center gap-4 shrink-0 ml-auto">
            
            {/* Ambient Background Soundtrack Controller */}
            <AmbientAudio />


            {/* Accessibility Theme Toggle */}
            <ThemeToggle />

            {/* CTA Request Trigger */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-900 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-sans text-xs font-bold shadow-md hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer"
            >
              Contact Us
            </button>
          </div>

        </div>
      </header>

      {/* Immersive Layout with Left and Right Side Rails */}
      <div className="flex relative max-w-7xl mx-auto w-full">
        
        {/* Left Cinematic Timeline Rail */}
        <aside className="w-24 border-r border-slate-200/50 dark:border-white/5 flex flex-col items-center py-12 shrink-0 sticky top-20 h-[calc(100vh-80px)] hidden lg:flex select-none">
          <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500 dark:text-white/30 rotate-180 font-bold" style={{ writingMode: 'vertical-rl' }}>
            Transition Viewport
          </div>
          <div className="flex-1 w-px bg-slate-200 dark:bg-white/10 my-8 relative">
            <div 
              className="absolute w-1.5 h-12 bg-violet-600 dark:bg-white/80 left-1/2 -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(124,58,237,0.5)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-75"
              style={{ top: `${scrollProgress * 80 + 5}%` }}
            />
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-white/40">
            {scrollProgress < 0.25 ? '01' : scrollProgress < 0.5 ? '02' : scrollProgress < 0.75 ? '03' : '04'} / 04
          </span>
        </aside>

        {/* Central main content container */}
        <main className="flex-1 relative z-10 px-6 md:px-12 flex flex-col gap-32 md:gap-48 pt-12 pb-32 overflow-hidden">
        
        {/* SECTION 1: HERO VIEW */}
        <section id="vision" className="min-h-[75vh] flex flex-col justify-start items-end text-right w-full pt-[40px] md:pt-[60px] relative">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-2xl flex flex-col items-end text-right ml-auto"
          >
            {/* Elegant Tagline Line Accent */}
            <div className="flex items-center gap-3 justify-end mb-0">
              <span className="text-xs tracking-[0.2em] uppercase text-violet-600 dark:text-indigo-400 font-bold">
                AI-Powered Business Growth Platform
              </span>
              <span className="h-px w-8 bg-indigo-500"></span>
            </div>

            {/* Giant Elegant Title */}
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extralight tracking-tight leading-[1.05] text-slate-950 dark:text-white text-right">
              BUILDING THE FUTURE OF <br />
              <span className="font-medium italic bg-gradient-to-r from-violet-500 via-indigo-400 to-blue-500 bg-clip-text text-transparent">HOSPITALITY, COMMERCE</span> <br />
              & DIGITAL GROWTH
            </h1>

            {/* Description */}
            <p className="font-sans text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed text-right">
              AURORA helps restaurants and hospitality businesses <strong className="text-slate-800 dark:text-slate-200">operate smarter, grow faster, and build stronger brands</strong> through AI-powered business software, digital marketing solutions, custom website development, customer engagement tools, business analytics, and intelligent automation—all in one unified ecosystem.
            </p>

            {/* Primary Action Button Bar with custom Elegant Dark double borders */}
            <div className="flex flex-col sm:flex-row justify-end items-center gap-4 w-full">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-violet-600 hover:bg-violet-700 dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_8px_30px_rgba(124,58,237,0.25)] dark:shadow-[0_0_40px_rgba(255,255,255,0.15)] rounded-full relative group cursor-pointer flex items-center justify-center gap-2"
              >
                Start Your Digital Journey
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white/70 hover:text-violet-600 dark:hover:text-white hover:border-violet-600 dark:hover:border-white/50 hover:bg-violet-50 dark:hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98] rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Book a Free Consultation
              </button>
            </div>

          </motion.div>

        </section>

        {/* SECTION 2: BENTO GRID PRINCIPLES */}
        <section id="principles" className="space-y-12">
          
          {/* Header */}
          <div className="text-center md:text-left max-w-3xl">
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white mb-4">
              Growth & Transformation Pillars for Hospitality Tech & Digital Growth
            </h2>
            <p className="font-sans text-slate-500 dark:text-slate-400 text-base md:text-lg">
              AURORA provides the foundational technology, strategic growth, and high-performance branding solutions required for sustainable enterprise success.
            </p>
          </div>

          {/* Bento Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento Block 1: Restaurant Operating System */}
            <div className="md:col-span-2 glass-panel rounded-2xl p-8 border border-slate-200/50 dark:border-white/[0.05] relative overflow-hidden flex flex-col justify-between min-h-[300px]">
              <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <div className="p-3 bg-violet-500/10 rounded-xl text-violet-600 dark:text-violet-300">
                  <ChefHat className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/[0.03] px-2.5 py-1 rounded-md">
                  AURORA: RestaurantOS
                </span>
              </div>

              <div className="space-y-3 mt-8">
                <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
                  🍽 RestaurantOS — Enterprise Hospitality Tech Operating System
                </h3>
                <p className="font-sans text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
                  Run your entire restaurant from a single intelligent platform. Manage <strong>QR ordering</strong>, <strong>digital menus</strong>, <strong>billing</strong>, kitchen operations, inventory, staff, analytics, customer loyalty, and multi-branch operations with enterprise-grade reliability.
                </p>
              </div>

              {/* Keywords Tag Grid */}
              <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 dark:border-white/[0.03]">
                {['Restaurant Management Software', 'Restaurant POS System', 'Hospitality Technology', 'QR Ordering System', 'Inventory Management'].map(kw => (
                  <span key={kw} className="text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-white/[0.02] px-2 py-0.5 rounded border border-slate-200/30 dark:border-white/[0.04]">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Bento Block 2: Business Growth & Digital Transformation */}
            <div className="glass-panel rounded-2xl p-8 border border-slate-200/50 dark:border-white/[0.05] relative overflow-hidden flex flex-col justify-between min-h-[300px]">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-300 w-fit">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/[0.03] px-2.5 py-1 rounded-md">
                  STRATEGY: Growth
                </span>
              </div>

              <div className="space-y-3 mt-8">
                <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
                  📈 Business Growth & Digital Growth Transformation
                </h3>
                <p className="font-sans text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  We don't just build software—we help businesses grow. From customer acquisition and retention to operational optimisation and AI-powered decision-making, AURORA becomes your long-term technology partner.
                </p>
              </div>

              {/* Keywords Tag Grid */}
              <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 dark:border-white/[0.03]">
                {['Business Growth Platform', 'Digital Transformation', 'Hospitality Technology'].map(kw => (
                  <span key={kw} className="text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-white/[0.02] px-2 py-0.5 rounded border border-slate-200/30 dark:border-white/[0.04]">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Bento Block 3: Brand Identity & Website Development */}
            <div className="glass-panel rounded-2xl p-8 border border-slate-200/50 dark:border-white/[0.05] relative overflow-hidden flex flex-col justify-between min-h-[300px]">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-300 w-fit">
                  <Code className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/[0.03] px-2.5 py-1 rounded-md">
                  STUDIO: Engineering
                </span>
              </div>

              <div className="space-y-3 mt-8">
                <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
                  🎨 Brand Identity, Website Development & Restaurant SEO
                </h3>
                <p className="font-sans text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Create a memorable online presence with premium websites, custom web applications, restaurant landing pages, booking systems, e-commerce solutions, SEO optimisation, and modern UI/UX experiences designed to convert visitors into customers.
                </p>
              </div>

              {/* Keywords Tag Grid */}
              <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 dark:border-white/[0.03]">
                {['Custom Website Development', 'Brand Development', 'SEO Services'].map(kw => (
                  <span key={kw} className="text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-white/[0.02] px-2 py-0.5 rounded border border-slate-200/30 dark:border-white/[0.04]">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Bento Block 4: Marketing & Customer Acquisition */}
            <div className="md:col-span-2 glass-panel rounded-2xl p-8 border border-slate-200/50 dark:border-white/[0.05] relative overflow-hidden flex flex-col justify-between min-h-[300px]">
              <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <div className="p-3 bg-pink-500/10 rounded-xl text-pink-600 dark:text-pink-300">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/[0.03] px-2.5 py-1 rounded-md">
                  GROWTH: Customer Outreach
                </span>
              </div>

              <div className="space-y-3 mt-8">
                <h3 className="font-display text-2xl font-bold text-slate-950 dark:text-white">
                  🚀 Digital Growth Marketing & Customer Acquisition
                </h3>
                <p className="font-sans text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
                  Reach more customers through digital marketing, social media campaigns, restaurant reels, SEO, Google Business Profile optimisation, email marketing, referral programmes, loyalty campaigns, and targeted promotions that increase visibility and repeat business.
                </p>
              </div>

              {/* Keywords Tag Grid */}
              <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-slate-100 dark:border-white/[0.03]">
                {['Digital Marketing Agency', 'Restaurant Marketing', 'Customer Loyalty Platform', 'SEOServices'].map(kw => (
                  <span key={kw} className="text-[10px] font-mono text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-white/[0.02] px-2 py-0.5 rounded border border-slate-200/30 dark:border-white/[0.04]">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </section>

        {/* SECTION 3: ECOSYSTEM & CAPABILITIES */}
        <section id="ecosystem" className="space-y-24">
          
          <div className="space-y-12">
            <div className="text-center md:text-left max-w-2xl">
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white mb-4">
                Ecosystem Capabilities for Advanced Hospitality Tech
              </h2>
              <p className="font-sans text-slate-500 dark:text-slate-400 text-base md:text-lg">
                Harness enterprise-level software, digital intelligence, and modern touchpoints custom-tailored to accelerate your business goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 5: AI Business Intelligence */}
              <div className="glass-panel rounded-2xl p-6 border border-slate-200/50 dark:border-white/[0.05] bg-white/[0.2] dark:bg-transparent backdrop-blur-sm relative flex flex-col justify-between hover:border-violet-500/30 transition-colors group">
                <div>
                  <div className="p-3 bg-violet-500/10 rounded-xl text-violet-600 dark:text-violet-300 w-fit mb-4">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white mb-2">
                    📊 AI Business Intelligence & RestaurantOS Insights
                  </h3>
                  <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Transform business data into actionable insights with AI-powered dashboards, sales forecasting, customer behaviour analysis, demand prediction, inventory optimisation, and growth recommendations that improve profitability.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/[0.03] flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-violet-500 dark:text-violet-400">Business Intelligence</span>
                  <button onClick={() => setIsModalOpen(true)} className="text-[11px] font-sans font-bold text-slate-900 dark:text-white hover:underline cursor-pointer">Explore</button>
                </div>
              </div>

              {/* Card 6: Customer Experience Platform */}
              <div className="glass-panel rounded-2xl p-6 border border-slate-200/50 dark:border-white/[0.05] bg-white/[0.2] dark:bg-transparent backdrop-blur-sm relative flex flex-col justify-between hover:border-indigo-500/30 transition-colors group">
                <div>
                  <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-300 w-fit mb-4">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white mb-2">
                    📱 Customer Experience Platform with QR Ordering System
                  </h3>
                  <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Deliver exceptional customer experiences with QR ordering, digital payments, reward programmes, personalised offers, online reservations, feedback management, and seamless omnichannel interactions that build lasting loyalty.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/[0.03] flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-500 dark:text-indigo-400">Customer Experience</span>
                  <button onClick={() => setIsModalOpen(true)} className="text-[11px] font-sans font-bold text-slate-900 dark:text-white hover:underline cursor-pointer">Explore</button>
                </div>
              </div>

              {/* Card 7: Enterprise Web & Mobile Development */}
              <div className="glass-panel rounded-2xl p-6 border border-slate-200/50 dark:border-white/[0.05] bg-white/[0.2] dark:bg-transparent backdrop-blur-sm relative flex flex-col justify-between hover:border-blue-500/30 transition-colors group">
                <div>
                  <div className="p-3 bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-300 w-fit mb-4">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white mb-2">
                    ⚙ Enterprise Web & Mobile Development with Built-in RestaurantOS
                  </h3>
                  <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Whether you're launching a restaurant, café, retail brand, startup, or service business, AURORA designs and develops high-performance websites, mobile applications, customer portals, admin dashboards, and business management systems tailored to your goals.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/[0.03] flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-500 dark:text-blue-400">Engineering</span>
                  <button onClick={() => setIsModalOpen(true)} className="text-[11px] font-sans font-bold text-slate-900 dark:text-white hover:underline cursor-pointer">Explore</button>
                </div>
              </div>

              {/* Card 8: AI Automation Solutions */}
              <div className="glass-panel rounded-2xl p-6 border border-slate-200/50 dark:border-white/[0.05] bg-white/[0.2] dark:bg-transparent backdrop-blur-sm relative flex flex-col justify-between hover:border-pink-500/30 transition-colors group">
                <div>
                  <div className="p-3 bg-pink-500/10 rounded-xl text-pink-600 dark:text-pink-300 w-fit mb-4">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white mb-2">
                    🤖 AI Automation Solutions for Modern Hospitality Tech
                  </h3>
                  <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Automate repetitive business tasks with AI-powered chatbots, customer support, workflow automation, CRM integrations, smart notifications, appointment systems, and business process optimisation.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/[0.03] flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-pink-500 dark:text-pink-400">Automation</span>
                  <button onClick={() => setIsModalOpen(true)} className="text-[11px] font-sans font-bold text-slate-900 dark:text-white hover:underline cursor-pointer">Explore</button>
                </div>
              </div>

            </div>
          </div>

          {/* Detailed Service Catalog Segment with Interactive Circular Gallery */}
          <div className="space-y-12">
            <div className="text-center md:text-left max-w-2xl">
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400">Services Catalog & Interactive Portfolios</span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white mt-1 mb-3">
                Our Services & Portfolio Showcases for Digital Growth
              </h2>
              <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                AURORA designs, develops, and deploys high-end digital solutions. Select any card below to experience its immersive 3D showcase and product suite.
              </p>
            </div>

            {/* Grid of Interactive Service Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {CATEGORIES.map(cat => {
                const CatIcon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`glass-panel p-5 rounded-2xl border text-left flex flex-col justify-between h-36 relative transition-all duration-300 hover:scale-[1.03] cursor-pointer ${
                      isActive 
                        ? cat.activeGlow + ' bg-slate-100/50 dark:bg-white/[0.04]' 
                        : 'border-slate-200/50 dark:border-white/[0.04] bg-slate-50/20 dark:bg-transparent hover:border-slate-300 dark:hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className={`p-2 bg-slate-100 dark:bg-white/5 rounded-lg border ${isActive ? 'border-violet-500/30' : 'border-transparent'}`}>
                        <CatIcon className={`w-4 h-4 ${isActive ? 'text-violet-500 dark:text-violet-400 animate-pulse' : 'text-slate-400 dark:text-slate-500'}`} />
                      </div>
                      <span className={`text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isActive ? 'bg-violet-500/20 text-violet-600 dark:text-violet-400' : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500'
                      }`}>
                        {cat.tag}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-display text-[11px] font-bold text-slate-950 dark:text-white tracking-wide leading-tight">
                        {cat.name}
                      </h4>
                      <p className="font-sans text-[9px] text-slate-400 dark:text-slate-500">
                        {cat.items.length} Interactive Assets
                      </p>
                    </div>

                    {isActive && (
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-violet-500 dark:bg-violet-400 rounded-full animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Split Screen Showcase Panel displaying CircularGallery & product listings */}
            {(() => {
              const activeCat = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];
              const ActiveIcon = activeCat.icon;
              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8 bg-slate-50/30 dark:bg-black/30 border border-slate-200/50 dark:border-white/[0.04] rounded-3xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 dark:bg-violet-500/2 rounded-full blur-3xl pointer-events-none" />

                  {/* Left Side: Product Specifications */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6 relative z-10">
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        Selected Ecosystem Category
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/20 dark:border-white/10 text-slate-950 dark:text-white">
                          <ActiveIcon className="w-5 h-5 text-violet-500 dark:text-violet-400" />
                        </div>
                        <h3 className="font-display text-xl md:text-2xl font-bold text-slate-950 dark:text-white">
                          {activeCat.name} Ecosystem for Hospitality Tech
                        </h3>
                      </div>
                      <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Explore AURORA's high-fidelity capabilities, modern workflows, and product architectures custom-built for scaling {activeCat.name.toLowerCase()} operations.
                      </p>

                      <div className="pt-2">
                        <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-3">
                          Core Features included
                        </span>
                        <ul className="space-y-2.5">
                          {activeCat.list.map((item, idx) => (
                            <motion.li
                              key={item}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.04 }}
                              className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-sans"
                            >
                              <CheckCircle className="w-4 h-4 text-violet-500 dark:text-violet-400 shrink-0" />
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-150 dark:border-white/[0.03]">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full px-5 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-sans text-xs font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-violet-500/10"
                      >
                        Request Demo for {activeCat.name}
                        <ChevronRight className="w-4 h-4 animate-bounce" />
                      </button>
                    </div>
                  </div>

                  {/* Right Side: 3D Circular WebGL Gallery Showcase */}
                  <div className="lg:col-span-7 relative min-h-[380px] md:min-h-[440px] lg:min-h-[480px] rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/[0.04] bg-slate-100/10 dark:bg-black/50">
                    <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-white/50 text-xs font-mono uppercase tracking-widest">Initializing 3D Engine...</div>}>
                      <CircularGallery
                        key={activeCat.id} // Forces clean WebGL context rebuild when selection updates
                        items={activeCat.items}
                        bend={3}
                        textColor="#ffffff"
                        borderRadius={0.06}
                        scrollEase={0.04}
                        scrollSpeed={2}
                        fontUrl="https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap"
                        font="bold 22px Orbitron"
                      />
                    </Suspense>

                    {/* Instruction overlay badge */}
                    <div className="absolute bottom-4 left-4 right-4 pointer-events-none bg-slate-950/80 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5 flex items-center justify-between z-20">
                      <span className="text-[9px] font-mono text-white/70 uppercase tracking-widest">
                        ↔ DRAG/SCROLL TO NAVIGATE IMAGES
                      </span>
                      <span className="text-[9px] font-mono text-violet-400 font-bold uppercase tracking-widest">
                        3D WEBGL ENGINE
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

        </section>

        {/* SECTION 4: WHY CHOOSE AURORA & FINAL BRAND STATEMENT */}
        <section id="partner" className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="space-y-4">
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400">Our Paradigm</span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white leading-tight">
                Why Choose AURORA for Your Digital Growth?
              </h2>
              <p className="font-sans text-slate-800 dark:text-slate-200 text-sm font-semibold">
                We Build Businesses — Not Just Software.
              </p>
              <p className="font-sans text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                Unlike traditional software vendors, AURORA combines technology, AI, branding, marketing, and business strategy into one integrated platform. Our mission is to help businesses launch, scale, and succeed in an increasingly digital world.
              </p>
              <p className="font-sans text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                Whether you're opening your first café, managing multiple restaurant locations, launching a startup, or expanding your online presence, AURORA provides the tools, expertise, and innovation needed to accelerate sustainable growth.
              </p>
            </div>

            <div className="glass-panel border border-slate-200/50 dark:border-white/[0.05] rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between h-full min-h-[320px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-4">
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Enterprise-Grade Acceleration
                </span>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  Technology & RestaurantOS That Powers Growth
                </h3>
                <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  At AURORA, we believe technology should do more than manage operations—it should unlock growth. By combining intelligent software, AI-driven insights, modern digital experiences, and strategic marketing, we empower businesses to operate efficiently, attract more customers, strengthen their brand, and scale with confidence.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-white/[0.03] flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full px-5 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 text-white font-sans text-[11px] font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 animate-pulse"
                >
                  Start Your Digital Journey
                  <ChevronRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full px-5 py-3 rounded-lg border border-slate-300 dark:border-white/20 text-slate-700 dark:text-white/70 hover:text-slate-950 dark:hover:text-white font-sans text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center"
                >
                  Book Free Consultation
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: FREQUENTLY ASKED QUESTIONS */}
        <section id="faq" className="space-y-12 pt-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-violet-600 dark:text-violet-400">
              Questions & Answers
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Frequently Asked Questions About RestaurantOS & Hospitality Tech
            </h2>
            <p className="font-sans text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
              Everything you need to know about the AURORA ecosystem, custom presets, and integration options.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="glass-panel border border-slate-200/50 dark:border-white/[0.04] rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-sans font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:bg-slate-50/50 dark:hover:bg-white/[0.01] transition-all cursor-pointer"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 text-violet-500 dark:text-violet-400" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans border-t border-slate-100 dark:border-white/[0.02] bg-slate-50/20 dark:bg-white/[0.005]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </main>

        {/* Right Info Rail - Part of Elegant Dark Theme Layout */}
        <aside className="w-16 border-l border-slate-200/50 dark:border-white/5 flex flex-col justify-between py-12 items-center shrink-0 sticky top-20 h-[calc(100vh-80px)] hidden lg:flex select-none">
          
          
          <div className="space-y-6 flex flex-col items-center">
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${scrollProgress < 0.25 ? 'bg-violet-600 scale-125 shadow-[0_0_8px_#7c3aed]' : 'bg-slate-300 dark:bg-white/20'}`} />
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${scrollProgress >= 0.25 && scrollProgress < 0.5 ? 'bg-violet-600 scale-125 shadow-[0_0_8px_#7c3aed]' : 'bg-slate-300 dark:bg-white/20'}`} />
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${scrollProgress >= 0.5 && scrollProgress < 0.75 ? 'bg-violet-600 scale-125 shadow-[0_0_8px_#7c3aed]' : 'bg-slate-300 dark:bg-white/20'}`} />
            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${scrollProgress >= 0.75 ? 'bg-violet-600 scale-125 shadow-[0_0_8px_#7c3aed]' : 'bg-slate-300 dark:bg-white/20'}`} />
          </div>

          <div className="text-slate-500 dark:text-white/20 text-[10px] font-mono tracking-widest uppercase [writing-mode:vertical-lr] rotate-180">
            ΛURORΛ • 2026
          </div>
        </aside>

      </div>

      {/* FOOTER */}
      <footer className="relative z-10 w-full border-t border-slate-200/50 dark:border-white/[0.05] bg-white/50 dark:bg-[#0d0e12]/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col gap-8">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="font-display font-black text-slate-950 dark:text-white">ΛURORΛ</span>
              <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                AI-POWERED HOSPITALITY TECHNOLOGY & BUSINESS GROWTH ECOSYSTEM
              </span>
            </div>

            {/* Minimalist System telemetry (No slop, clean display) */}
            <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap gap-4 justify-center">
              <span>PLATFORM: ACTIVE</span>
              <span>•</span>
              <span>RELIABILITY: 99.99%</span>
              <span>•</span>
              <span>CLOUDFLARE SECURED</span>
            </div>

            <div className="font-sans text-xs text-slate-400 dark:text-slate-500">
              © 2026 AURORA. All rights reserved.
            </div>
          </div>

          {/* SEO Tagline Row */}
          <div className="border-t border-slate-100 dark:border-white/[0.03] pt-6">
            <p className="font-sans text-[11px] leading-relaxed text-slate-400 dark:text-slate-500 text-center md:text-left">
              AURORA is an AI-powered hospitality technology and business growth ecosystem. We offer a comprehensive suite of products including RestaurantOS (QR ordering, digital menus, restaurant POS, billing, inventory, and kitchen automation), AURORA Studio custom web & mobile engineering, AURORA Growth SEO & social campaigns, and AURORA AI workflow intelligence.
            </p>
          </div>

        </div>
      </footer>

      {/* BACKDROP SETTINGS DRAWER */}
      

      {/* GLOBAL FULLSCREEN FILE DRAG OVERLAY */}
      <AnimatePresence>
        {isDraggingFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="max-w-md w-full border-2 border-dashed border-violet-500/50 dark:border-violet-400/50 bg-violet-500/5 dark:bg-violet-400/5 rounded-3xl p-12 flex flex-col items-center gap-6"
            >
              <div className="w-20 h-20 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400 shadow-[0_0_30px_rgba(124,58,237,0.2)] animate-bounce">
                <Video className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold text-white">
                  Drop to Set Backdrop Loop
                </h3>
                <p className="font-sans text-sm text-slate-400">
                  Drop your video file here (such as your anime Supra MP4) to immediately set it as the background loop.
                </p>
              </div>
              <span className="font-mono text-xs text-violet-400/70 uppercase tracking-widest bg-violet-500/10 px-3 py-1 rounded-full">
                Muted Auto-Playback Active
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MULTI-STEP REQUEST ACCESS MODAL */}
      <DemoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}
