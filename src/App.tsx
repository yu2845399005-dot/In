/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  Brush, 
  Code, 
  Lightbulb, 
  Terminal, 
  Linkedin, 
  Dribbble, 
  Instagram, 
  Github,
  Mail,
  MapPin,
  Focus,
  Briefcase
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-primary/15 shadow-[0_0_40px_rgba(93,92,255,0.08)]">
      <div className="flex justify-between items-center px-8 py-6 max-w-[1440px] mx-auto">
        <div className="text-2xl font-bold tracking-tighter text-on-surface font-headline uppercase">
          YU QIANG
        </div>
        <div className="hidden md:flex items-center space-x-12">
          <a href="#" className="text-on-surface/70 hover:text-on-surface transition-colors duration-300 font-headline tracking-tight">Home</a>
          <a href="#" className="text-on-surface/70 hover:text-on-surface transition-colors duration-300 font-headline tracking-tight">Projects</a>
          <a href="#" className="text-primary font-bold border-b-2 border-primary pb-1 font-headline tracking-tight">About</a>
          <a href="#" className="text-on-surface/70 hover:text-on-surface transition-colors duration-300 font-headline tracking-tight">Contact</a>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-3 rounded-full font-label text-xs font-bold uppercase tracking-widest"
        >
          Hire Me
        </motion.button>
      </div>
    </nav>
  );
};

const ExperienceCard = ({ date, title, company, icon, children }: { date: string, title: string, company: string, icon: string, children: React.ReactNode }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update spotlight variables
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);

    // Update motion values for tilt
    mouseX.set((x / rect.width) - 0.5);
    mouseY.set((y / rect.height) - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
      className="glass-card group relative p-8 md:p-12 rounded-2xl overflow-hidden transition-shadow duration-300"
    >
      <div className="spotlight-border" />
      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
        <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-inner overflow-hidden p-3">
          <img src={icon} alt={company} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
            <div className="space-y-1">
              <span className="text-primary font-label text-[10px] uppercase tracking-[0.2em]">{date}</span>
              <h3 className="text-2xl md:text-3xl font-headline font-bold text-on-surface">{title}</h3>
              <p className="text-on-surface-variant font-bold text-lg">{company}</p>
            </div>
            <a href="#" className="inline-flex items-center gap-2 text-primary hover:text-white text-xs font-bold transition-colors group/btn shrink-0 pt-2">
              VIEW PROJECTS
              <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>
          <div className="space-y-4 text-on-surface-variant leading-relaxed text-base">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BentoCard = ({ className, children, hoverable = true }: { className?: string, children: React.ReactNode, hoverable?: boolean }) => {
  return (
    <div className={`bg-surface-container-low p-10 flex flex-col justify-between group transition-colors duration-500 rounded-2xl ${hoverable ? 'hover:bg-surface-container-high' : ''} ${className}`}>
      {children}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isTikTokHovered, setIsTikTokHovered] = useState(false);
  const [isVisualDesignHovered, setIsVisualDesignHovered] = useState(false);
  const [isThesisHovered, setIsThesisHovered] = useState(false);
  const [isAICodingHovered, setIsAICodingHovered] = useState(false);

  return (
    <div className="min-h-screen bg-black selection:bg-primary/30">
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-[1440px] mx-auto px-8 mb-24 md:mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-8"
            >
              <span className="text-primary font-label text-xs tracking-[0.2em] uppercase mb-6 block">Biography</span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold tracking-tighter text-on-surface leading-tight">
                HELLO~ <br />
                <span className="text-gradient">I'M YU QIANG</span>
              </h1>
            </motion.div>
            <div className="lg:col-span-4 lg:text-right pb-4">
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-sm ml-auto">
                Crafting immersive digital environments that evoke emotion and command attention through meticulous detail.
              </p>
            </div>
          </div>
        </section>

        {/* Profile Section */}
        <section className="max-w-[1440px] mx-auto px-8 mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-xl blur-2xl group-hover:bg-primary/20 transition-all duration-700"></div>
              <div className="relative aspect-[4/5] bg-surface-container-low rounded-xl overflow-hidden">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMNSZ3ztjLHc4BxDbYaJyx8C9kQ6VS6kzKiZivCDgQBkG1ZsAOQpgAJAa3SlsOp6cqh1PjHgwukgWBdkaN-XSjcBQ9f8nsfNz6Q2afVja_FYK2fGD9iGkPMnt3u2XDRyvfILfKh_IICAcEMj1odawdEQa6godlQuPw814ViEzVfdKomSPVzJT0NLz8nbyNBqqwJFjPx3QJ4D-8B2DxTo2WZNXVyC1XVJVMEG-UzwoySActR3ztKP4PEc-SxcBQFM79mm07xXh1tI6N" 
                  alt="Yu Qiang portrait" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-full border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-primary">Open for opportunities</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight">
                  The Journey of <span className="text-primary">Yu Qiang</span>
                </h2>
                <div className="space-y-6">
                  <p className="text-on-surface-variant text-xl leading-[1.8] font-body">
                    My name is Yu Qiang. I am currently a student at the Hong Kong University of Science and Technology, where my research focuses on AI design, product experience design, and user experience.
                  </p>
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="glass-card p-10 rounded-2xl relative overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12 relative z-10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-label text-[10px] uppercase tracking-[0.2em] font-bold">
                      <Mail className="w-3 h-3" /> Email
                    </div>
                    <p className="text-on-surface font-headline font-bold text-lg">yu2845399005@gmail.com</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-label text-[10px] uppercase tracking-[0.2em] font-bold">
                      <MapPin className="w-3 h-3" /> Location
                    </div>
                    <p className="text-on-surface font-headline font-bold text-lg">Shenzhen, China</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-label text-[10px] uppercase tracking-[0.2em] font-bold">
                      <Focus className="w-3 h-3" /> Current Focus
                    </div>
                    <p className="text-on-surface font-headline font-bold text-lg">AI Coding, UED</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-label text-[10px] uppercase tracking-[0.2em] font-bold">
                      <Briefcase className="w-3 h-3" /> Experience
                    </div>
                    <p className="text-on-surface font-headline font-bold text-lg">TikTok Product Design</p>
                  </div>
                </div>
              </div>

              {/* Resume Link */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="pt-4"
              >
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-primary font-bold text-lg underline underline-offset-8 decoration-primary/30 hover:decoration-primary transition-all duration-300 group"
                >
                  Click here to download my resume
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="max-w-[1440px] mx-auto px-8 mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-headline font-bold text-on-surface tracking-tight sticky top-32 uppercase">
                Experience <br /> History
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-8">
              <ExperienceCard 
                date="2025.11 — 2026.04"
                title="Product Experience Designer"
                company="TikTok LIVE, Bytedance"
                icon="https://github.com/yu2845399005-dot/Image-for-Ai/blob/main/image%20951.png?raw=true"
              >
                <p>
                  1. <span className="text-primary font-bold">AI Research Focus:</span> Drive AI efficiency improvements, establish skills frameworks, and explore <span className="text-primary font-bold">generative interface design</span>.
                </p>
                <p>
                  2. <span className="text-primary font-bold">Business Design Focus:</span> Responsible for product design related to TT LIVE streaming, including <span className="text-primary font-bold">traffic tools</span> and customer service experience optimization.
                </p>
              </ExperienceCard>

              <ExperienceCard 
                date="2025.09 — 2026.10"
                title="AI Designer"
                company="Art and Machine Creativity, HKUST"
                icon="https://github.com/yu2845399005-dot/Image-for-Ai/blob/main/11.png?raw=true"
              >
                <p>
                  Developed <span className="text-primary font-bold">core brand identities</span> and <span className="text-primary font-bold">experimental web interactions</span> for international clients across premium sectors including luxury fashion and automotive.
                </p>
              </ExperienceCard>

              <ExperienceCard 
                date="2021.09 — 2025.06"
                title="Product Design"
                company="Anhui University"
                icon="https://github.com/yu2845399005-dot/Image-for-Ai/blob/main/22.png?raw=true"
              >
                <p>
                  1. <span className="text-primary font-bold">Design Research:</span> Conducted research on smart product-service systems and <span className="text-primary font-bold">user-centered design</span> approach for elderly service robots.
                </p>
                <p>
                  2. <span className="text-primary font-bold">Technology Integration:</span> Actively integrated <span className="text-primary font-bold">prototyping with Unity and Arduino</span> into design practice.
                </p>
              </ExperienceCard>
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="max-w-[1440px] mx-auto px-8 mb-40">
          <h2 className="text-3xl font-headline font-bold text-on-surface tracking-tight mb-16 uppercase">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            <div 
              className="md:col-span-2 md:row-span-2 bg-surface-container-low p-10 flex flex-col justify-between group/bento transition-colors duration-500 hover:bg-surface-container-high relative overflow-hidden rounded-2xl"
              onMouseEnter={() => setIsTikTokHovered(true)}
              onMouseLeave={() => setIsTikTokHovered(false)}
            >
              {/* Background Image - Increased size to fill more of the module */}
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img 
                  src="https://github.com/yu2845399005-dot/Image-for-Ai/blob/main/Group%201.png?raw=true" 
                  alt="TikTok Product Design Background" 
                  className={`w-full h-full object-contain transition-all duration-700 ease-out ${isTikTokHovered ? 'opacity-100 scale-125 object-center' : 'opacity-40 scale-[1.1]'}`}
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 z-1 transition-opacity duration-700 bg-gradient-to-br from-black/80 via-black/40 to-transparent ${isTikTokHovered ? 'opacity-30' : 'opacity-100'}`} />

              {/* Content Container */}
              <div className="relative z-10 h-full flex flex-col justify-center pointer-events-none">
                <motion.div 
                  className="space-y-6 origin-top-left"
                  animate={isTikTokHovered ? { 
                    opacity: 0,
                    scale: 0.8,
                  } : { 
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeInOut"
                  }}
                >
                  <div>
                    <h3 className="text-3xl font-headline font-bold mb-4 tracking-tight">Product Design in TikTok</h3>
                    <motion.p 
                      animate={{ 
                        opacity: isTikTokHovered ? 0 : 1,
                        height: isTikTokHovered ? 0 : "auto"
                      }}
                      className="text-on-surface-variant leading-relaxed text-lg max-w-md font-body overflow-hidden"
                    >
                      Focused on leveraging AI to drive business efficiency, overseeing TikTok's internal advertising resource modules and intelligent customer service systems.
                    </motion.p>
                  </div>
                  
                  <motion.div 
                    animate={{ 
                      opacity: isTikTokHovered ? 0 : 1,
                      height: isTikTokHovered ? 0 : "auto"
                    }}
                    className="flex flex-wrap gap-2 overflow-hidden"
                  >
                    {['Figma', 'After Effects', 'Cinema 4D'].map(tag => (
                      <span key={tag} className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[10px] uppercase font-bold tracking-widest border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <div 
              className="md:col-span-2 bg-surface-container-low p-10 flex flex-col justify-between group/bento transition-colors duration-500 hover:bg-surface-container-high relative overflow-hidden rounded-2xl min-h-[280px]"
              onMouseEnter={() => setIsVisualDesignHovered(true)}
              onMouseLeave={() => setIsVisualDesignHovered(false)}
            >
              {/* Background Image - Top Aligned to show screen fully */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://github.com/yu2845399005-dot/Image-for-Ai/blob/main/Group%202.png?raw=true" 
                  alt="AI Visual Design Background" 
                  className={`w-full h-full transition-all duration-700 ease-out ${isVisualDesignHovered ? 'opacity-100 scale-125 object-contain object-top translate-y-8 brightness-110' : 'opacity-40 scale-100 object-cover object-top brightness-50'}`}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 z-1 transition-opacity duration-700 bg-gradient-to-br from-black/80 via-black/40 to-transparent ${isVisualDesignHovered ? 'opacity-30' : 'opacity-100'}`} />

              <div className="relative z-10 h-full flex flex-col justify-center">
                <motion.div 
                  className="origin-top-left"
                  animate={isVisualDesignHovered ? { 
                    opacity: 0,
                    scale: 0.8,
                  } : { 
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeInOut"
                  }}
                >
                  <h3 className="text-3xl font-headline font-bold mb-4 tracking-tight text-on-surface">AI-Assisted Visual Design</h3>
                  <motion.p 
                    animate={{ 
                      opacity: isVisualDesignHovered ? 0 : 1,
                      height: isVisualDesignHovered ? 0 : "auto"
                    }}
                    className="text-on-surface-variant leading-relaxed font-body max-w-md text-lg overflow-hidden"
                  >
                    Building intelligent skills, defining platform visual styles, and engineering prompts to establish AI visual standards.
                  </motion.p>
                </motion.div>
              </div>
            </div>

            <a 
              href="https://openaccess.cms-conferences.org/publications/book/978-1-958651-77-3/article/978-1-958651-77-3_0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface-container-low p-10 flex flex-col justify-between group/bento transition-colors duration-500 hover:bg-surface-container-high relative overflow-hidden rounded-2xl min-h-[280px] block"
              onMouseEnter={() => setIsThesisHovered(true)}
              onMouseLeave={() => setIsThesisHovered(false)}
            >
              {/* Background Image */}
              <div className={`absolute inset-0 z-0 transition-all duration-700 ${isThesisHovered ? 'pt-1 px-2' : 'pt-4 px-6'}`}>
                <img 
                  src="https://github.com/yu2845399005-dot/Image-for-Ai/blob/main/Group%202117130522.png?raw=true" 
                  alt="Thesis Background" 
                  className={`w-full h-full object-contain transition-all duration-700 ease-out ${isThesisHovered ? 'opacity-100 scale-130 brightness-110' : 'opacity-40 scale-100 brightness-50'}`}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 z-1 transition-opacity duration-700 bg-gradient-to-br from-black/80 via-black/40 to-transparent ${isThesisHovered ? 'opacity-30' : 'opacity-100'}`} />

              <div className="relative z-10 h-full flex flex-col justify-center">
                <motion.div 
                  className="origin-top-left"
                  animate={isThesisHovered ? { 
                    opacity: 0,
                    scale: 0.8,
                  } : { 
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeInOut"
                  }}
                >
                  <h3 className="text-3xl font-headline font-bold mb-4 tracking-tight text-on-surface">Thesis</h3>
                  <motion.p 
                    animate={{ 
                      opacity: isThesisHovered ? 0 : 1,
                      height: isThesisHovered ? 0 : "auto"
                    }}
                    className="text-on-surface-variant leading-relaxed font-body max-w-md text-lg overflow-hidden"
                  >
                    Digital Design Research
                  </motion.p>
                </motion.div>
              </div>
            </a>

            <div 
              className="bg-surface-container-low p-10 flex flex-col justify-between group/bento transition-colors duration-500 hover:bg-surface-container-high relative overflow-hidden rounded-2xl min-h-[280px]"
              onMouseEnter={() => setIsAICodingHovered(true)}
              onMouseLeave={() => setIsAICodingHovered(false)}
            >
              {/* Background Image */}
              <div className={`absolute inset-0 z-0 transition-all duration-700 ${isAICodingHovered ? 'pt-1 px-2' : 'pt-4 px-6'}`}>
                <img 
                  src="https://github.com/yu2845399005-dot/Image-for-Ai/blob/main/Group%202117130523.png?raw=true" 
                  alt="AI Coding Background" 
                  className={`w-full h-full object-contain transition-all duration-700 ease-out ${isAICodingHovered ? 'opacity-100 scale-130 brightness-110' : 'opacity-40 scale-100 brightness-50'}`}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 z-1 transition-opacity duration-700 bg-gradient-to-br from-black/80 via-black/40 to-transparent ${isAICodingHovered ? 'opacity-30' : 'opacity-100'}`} />

              <div className="relative z-10 h-full flex flex-col justify-center">
                <motion.div 
                  className="origin-top-left"
                  animate={isAICodingHovered ? { 
                    opacity: 0,
                    scale: 0.8,
                  } : { 
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeInOut"
                  }}
                >
                  <h3 className="text-3xl font-headline font-bold mb-4 tracking-tight text-on-surface">AI Coding</h3>
                  <motion.p 
                    animate={{ 
                      opacity: isAICodingHovered ? 0 : 1,
                      height: isAICodingHovered ? 0 : "auto"
                    }}
                    className="text-on-surface-variant leading-relaxed font-body max-w-md text-lg overflow-hidden"
                  >
                    AI-Assisted Design
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-20 px-8 bg-black border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-[1440px] mx-auto gap-12">
          <div className="text-lg font-bold text-on-surface font-headline uppercase">
            YU QIANG
          </div>
          <div className="flex flex-wrap justify-center gap-12 font-body text-sm tracking-widest uppercase">
            {[
              { label: 'LinkedIn', icon: Linkedin },
              { label: 'Dribbble', icon: Dribbble },
              { label: 'Instagram', icon: Instagram },
              { label: 'GitHub', icon: Github }
            ].map(social => (
              <a 
                key={social.label}
                href="#" 
                className="text-on-surface/50 hover:text-primary hover:underline decoration-from-font underline-offset-8 transition-all duration-500 flex items-center gap-2"
              >
                <social.icon className="w-4 h-4" />
                {social.label}
              </a>
            ))}
          </div>
          <div className="text-on-surface/50 text-[10px] tracking-widest uppercase">
            © 2024 YU QIANG. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
