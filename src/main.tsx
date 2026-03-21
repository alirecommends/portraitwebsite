import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  ArrowRight,
  Check,
  Star,
  Sparkles,
  Instagram,
  Plus
} from 'lucide-react';

// --- Types ---
type Path = 'branding' | 'portrait' | 'custom' | null;

interface QuizState {
  step: number;
  path: Path;
  lighting: 'airy' | 'moody' | null;
  poses: 'classic' | 'candid' | null;
  palette: 'moody' | 'airy' | null;
  customMessage?: string;
}

// --- Components ---
const Navbar = ({ onNavigate }: { onNavigate: (view: 'hero' | 'quiz' | 'results' | 'booking', sectionId?: string) => void }) => {
  const handleScroll = (id: string) => {
    onNavigate('hero');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-10 md:px-16 bg-paper/90 backdrop-blur-sm">
      <button
        onClick={() => onNavigate('hero')}
        className="flex items-center gap-3 hover:opacity-70 transition-opacity"
      >
        <div className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center">
          <Camera className="w-4 h-4 text-ink" />
        </div>
        <span className="font-serif text-2xl tracking-[0.2em] uppercase text-ink">Ontario Photo Co.</span>
      </button>
      <div className="hidden md:flex items-center gap-12 text-[9px] uppercase tracking-[0.3em] font-bold text-ink/50">
        <button onClick={() => handleScroll('portfolio')} className="hover:text-ink transition-colors">Portfolio</button>
        <button onClick={() => handleScroll('experience')} className="hover:text-ink transition-colors">Experience</button>
        <button onClick={() => handleScroll('pricing')} className="hover:text-ink transition-colors">Pricing</button>
        <button
          onClick={() => onNavigate('quiz')}
          className="px-10 py-4 bg-ink text-paper rounded-full hover:scale-105 transition-all shadow-lg shadow-ink/10"
        >
          Book Now
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ onStartQuiz }: { onStartQuiz: () => void }) => (
  <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-paper">
    <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden lg:block">
      <span className="writing-mode-vertical-rl rotate-180 text-[9px] uppercase tracking-[0.5em] text-accent font-bold">
        Est. 2018 — Toronto & The Kawarthas
      </span>
    </div>

    <div className="absolute inset-0 z-0">
      <img
        src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2000"
        alt="Photography background"
        className="w-full h-full object-cover opacity-[0.05] scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-paper via-transparent to-paper" />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 max-w-5xl"
    >
      <span className="text-[11px] uppercase tracking-[0.5em] text-accent mb-10 block font-bold">Aesthetic Discovery</span>
      <h1 className="font-serif text-7xl md:text-[120px] mb-10 leading-[0.85] text-ink tracking-tight">
        Your Story, <br />
        <span className="italic font-light">Expertly Told.</span>
      </h1>
      <p className="text-xl md:text-2xl text-ink/50 mb-16 max-w-2xl mx-auto font-light leading-relaxed serif italic">
        Elevated photography for the modern visionary.
      </p>
      <button
        onClick={onStartQuiz}
        className="group relative px-12 py-6 bg-ink text-paper rounded-full font-bold overflow-hidden transition-all hover:scale-105 shadow-xl shadow-ink/10"
      >
        <span className="relative z-10 uppercase tracking-[0.3em] text-[10px]">Begin Your Discovery</span>
      </button>
    </motion.div>

    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-30">
      <div className="w-px h-20 bg-ink" />
      <span className="text-[9px] uppercase tracking-[0.4em] text-ink font-bold">Scroll</span>
    </div>
  </section>
);

const Quiz = ({ onComplete }: { onComplete: (state: QuizState) => void }) => {
  const [state, setState] = useState<QuizState>({
    step: 1,
    path: null,
    lighting: null,
    poses: null,
    palette: null,
  });

  const nextStep = (updates: Partial<QuizState>) => {
    const newState = { ...state, ...updates, step: state.step + 1 };
    setState(newState);

    const totalSteps = newState.path === 'custom' ? 2 : 4;
    if (newState.step > totalSteps) {
      onComplete(newState);
    }
  };

  const prevStep = () => {
    if (state.step > 1) {
      setState({ ...state, step: state.step - 1 });
    }
  };

  return (
    <section className="min-h-screen py-32 px-6 flex items-center justify-center bg-paper relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <div className="mb-16 flex items-center justify-between">
          <button
            onClick={prevStep}
            className={`flex items-center gap-4 px-8 py-4 rounded-full border border-ink/10 text-[10px] uppercase tracking-widest font-bold text-ink/60 hover:text-ink hover:bg-soft transition-all ${state.step === 1 ? 'invisible' : ''}`}
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back</span>
          </button>
          <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
            Step 0{state.step} / 0{state.path === 'custom' ? '2' : '4'}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {state.step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-16"
            >
              <div className="text-center space-y-6">
                <h2 className="font-serif text-6xl md:text-8xl text-ink leading-[0.9]">What are we <br /><span className="italic font-light">creating today?</span></h2>
                <p className="text-[11px] uppercase tracking-[0.4em] text-accent font-bold">Select your path to begin</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <button
                  onClick={() => nextStep({ path: 'branding' })}
                  className="group relative aspect-[3/4] rounded-[40px] overflow-hidden border border-ink/5 card-shadow"
                >
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                    alt="Branding"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-16 text-center space-y-6">
                    <h3 className="font-serif text-4xl italic text-paper">Elevating my professional brand</h3>
                    <div className="w-12 h-px bg-paper/50 group-hover:w-24 transition-all duration-500" />
                    <p className="text-[9px] uppercase tracking-[0.4em] text-paper/80 group-hover:text-paper transition-colors font-bold">Select Path</p>
                  </div>
                </button>

                <button
                  onClick={() => nextStep({ path: 'portrait' })}
                  className="group relative aspect-[3/4] rounded-[40px] overflow-hidden border border-ink/5 card-shadow"
                >
                  <img
                    src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=800"
                    alt="Portrait"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-16 text-center space-y-6">
                    <h3 className="font-serif text-4xl italic text-paper">Capturing a personal milestone</h3>
                    <div className="w-12 h-px bg-paper/50 group-hover:w-24 transition-all duration-500" />
                    <p className="text-[9px] uppercase tracking-[0.4em] text-paper/80 group-hover:text-paper transition-colors font-bold">Select Path</p>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* BRANDING PATH QUIZ UPDATES */}
          {state.step === 2 && state.path === 'branding' && (
            <motion.div
              key="step2-branding"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl text-ink">How would you describe your <br /><span className="italic font-light">brand's personality?</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'airy', label: 'Warm & Approachable', desc: 'Perfect for coaches, wellness, and creatives.', img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800' },
                  { id: 'moody', label: 'Sleek & Editorial', desc: 'Perfect for realtors, executives, and premium services.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => nextStep({ lighting: opt.id as any })}
                    className="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-ink/5 text-left card-shadow"
                  >
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent opacity-80" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-serif italic mb-2 text-paper">{opt.label}</h3>
                      <p className="text-sm text-paper/90">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {state.step === 3 && state.path === 'branding' && (
            <motion.div
              key="step3-branding"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl text-ink">Where will you use these <br /><span className="italic font-light">photos the most?</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'candid', label: 'Social Media & Daily Content', desc: 'Instagram, TikTok, and authentic daily stories.', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800' },
                  { id: 'classic', label: 'Website & Press Features', desc: 'Landing pages, speaker bios, and PR media kits.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => nextStep({ poses: opt.id as any })}
                    className="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-ink/5 text-left card-shadow"
                  >
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent opacity-80" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-serif italic mb-2 text-paper">{opt.label}</h3>
                      <p className="text-sm text-paper/90">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {state.step === 4 && state.path === 'branding' && (
            <motion.div
              key="step4-branding"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl text-ink">What is your ideal <br /><span className="italic font-light">shoot setting?</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'airy', label: 'Bright, Modern Studio', desc: 'Clean lines, natural light, and minimalist aesthetic.', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600' },
                  { id: 'moody', label: 'In-Action & On-Location', desc: 'Your office, a stylish cafe, or urban outdoors.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => nextStep({ palette: opt.id as any })}
                    className="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-ink/5 text-left card-shadow"
                  >
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent opacity-80" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-serif italic mb-2 text-paper">{opt.label}</h3>
                      <p className="text-sm text-paper/90">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* PORTRAIT QUIZ */}
          {state.step === 2 && state.path === 'portrait' && (
            <motion.div
              key="step2-portrait"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl text-ink">Which lighting do you <br /><span className="italic font-light">feel drawn to?</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'airy', label: 'Bright & Airy', desc: 'Soft, clean, and filled with natural light.', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600' },
                  { id: 'moody', label: 'Dark & Moody', desc: 'Dramatic shadows, rich contrast, and deep tones.', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => nextStep({ lighting: opt.id as any })}
                    className="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-ink/5 text-left card-shadow"
                  >
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent opacity-80" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-serif italic mb-2 text-paper">{opt.label}</h3>
                      <p className="text-sm text-paper/90">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {state.step === 3 && state.path === 'portrait' && (
            <motion.div
              key="step3-portrait"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl text-ink">What kind of poses <br /><span className="italic font-light">do you prefer?</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'classic', label: 'Classic & Posed', desc: 'Timeless, intentional, and polished.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600' },
                  { id: 'candid', label: 'Candid & Natural', desc: 'Unscripted, movement-focused, and raw.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => nextStep({ poses: opt.id as any })}
                    className="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-ink/5 text-left card-shadow"
                  >
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent opacity-80" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-serif italic mb-2 text-paper">{opt.label}</h3>
                      <p className="text-sm text-paper/90">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {state.step === 4 && state.path === 'portrait' && (
            <motion.div
              key="step4-portrait"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl text-ink">Which color palette <br /><span className="italic font-light">speaks to you?</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'moody', label: 'Deep & Rich Tones', desc: 'Warm browns, deep greens, and golden hues.', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600' },
                  { id: 'airy', label: 'Soft & Pastel Hues', desc: 'Cool blues, soft whites, and muted tones.', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => nextStep({ palette: opt.id as any })}
                    className="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-ink/5 text-left card-shadow"
                  >
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent opacity-80" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-serif italic mb-2 text-paper">{opt.label}</h3>
                      <p className="text-sm text-paper/90">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* CUSTOM PATH */}
          {state.step === 2 && state.path === 'custom' && (
            <motion.div
              key="step-custom"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12 max-w-2xl mx-auto"
            >
              <div className="space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl text-ink">Tell me about <br /><span className="italic font-light">your vision.</span></h2>
                <p className="text-ink/60">What are you looking to create? Share as much or as little as you'd like.</p>
              </div>
              <div className="space-y-8">
                <textarea
                  autoFocus
                  className="w-full bg-transparent border-b border-ink/20 py-4 text-xl font-serif italic focus:border-ink outline-none transition-colors resize-none text-ink"
                  rows={4}
                  placeholder="I'm looking for..."
                  onChange={(e) => setState({ ...state, customMessage: e.target.value })}
                />
                <button
                  onClick={() => nextStep({})}
                  className="w-full py-6 bg-ink text-paper rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:bg-accent transition-all"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const Results = ({ quizState, onBook, onSelectPackage }: { quizState: QuizState, onBook: () => void, onSelectPackage: (pkg: string) => void }) => {
  const isBranding = quizState.path === 'branding';
  const isAiry = quizState.lighting === 'airy';
  const isMoody = quizState.lighting === 'moody';
  const isCandid = quizState.poses === 'candid';

  const brandingImages = [
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400'
  ];

  const portraitImages = [
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400'
  ];

  const images = isBranding ? brandingImages : portraitImages;

  const handleSelect = (pkg: string) => {
    onSelectPackage(pkg);
    onBook();
  };

  return (
    <div className="min-h-screen bg-paper">
      <section className="pt-56 pb-32 px-6 text-center max-w-5xl mx-auto relative">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 font-serif text-[180px] opacity-[0.03] select-none pointer-events-none text-ink">
          {isBranding ? 'Brand' : 'Story'}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-accent/10 border border-accent/20 text-[9px] uppercase tracking-[0.4em] mb-12 text-accent font-bold"
        >
          <Sparkles className="w-3 h-3" />
          <span>Style Profile Identified</span>
        </motion.div>

        <h2 className="font-serif text-6xl md:text-[100px] mb-12 text-ink leading-[0.85] tracking-tight">
          {isBranding ? (
            <>The <span className="italic font-light">{isMoody ? 'Sophisticated' : 'Modern'}</span> <br />Visionary.</>
          ) : (
            <>The <span className="italic font-light">{isCandid ? 'Natural' : 'Classic'}</span> <br />Storyteller.</>
          )}
        </h2>

        <p className="text-xl md:text-2xl text-ink/60 font-light leading-relaxed mb-20 max-w-3xl mx-auto serif italic">
          {isBranding
            ? `Your brand needs to look as high-end as the service you provide. We'll capture your authority with ${isAiry ? 'warm, inviting' : 'sleek, editorial'} visuals that convert.`
            : `You want portraits that feel like you, not a posed mannequin. We'll focus on ${isCandid ? 'candid moments and movement' : 'timeless, intentional compositions'} to tell your story.`}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32 max-w-4xl mx-auto">
          {[
            {
              label: isBranding ? 'Brand Vibe' : 'Lighting',
              value: isBranding ? (isAiry ? 'Warm & Approachable' : 'Sleek & Editorial') : (isAiry ? 'Luminous & Soft' : 'Dramatic & Rich')
            },
            {
              label: isBranding ? 'Primary Focus' : 'Direction',
              value: isBranding ? (isCandid ? 'Social Media & Daily' : 'Website & PR Assets') : (isCandid ? 'Guided Movement' : 'Editorial Posing')
            },
            {
              label: isBranding ? 'Setting' : 'Palette',
              value: isBranding ? (quizState.palette === 'airy' ? 'Bright Studio Setup' : 'In-Action Workspace') : (quizState.palette === 'moody' ? 'Deep Earth Tones' : 'Soft Neutrals')
            }
          ].map((item, i) => (
            <div key={i} className="space-y-3 p-8 rounded-[32px] border border-ink/5 bg-soft/50">
              <p className="text-[9px] uppercase tracking-[0.4em] text-accent font-bold">{item.label}</p>
              <p className="font-serif text-xl italic text-ink">{item.value}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onBook}
          className="px-16 py-6 bg-ink text-paper rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:scale-105 transition-all shadow-xl shadow-ink/10"
        >
          Proceed to Booking
        </button>
      </section>

      <section className="px-8 pb-48">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className={`aspect-[3/4] rounded-[32px] overflow-hidden card-shadow group ${i % 2 === 1 ? 'md:translate-y-12' : ''}`}
            >
              <img src={img} alt="Portfolio item" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
            </motion.div>
          ))}
        </div>

        <div className="mt-40 text-center space-y-8">
          <div className="w-px h-24 bg-accent/30 mx-auto" />
          <p className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">The Ontario Factor</p>
          <p className="text-3xl md:text-4xl font-serif italic max-w-3xl mx-auto text-ink leading-relaxed">
            {isBranding
              ? "Available for on-location shoots at your GTA office or my partner studios in Liberty Village."
              : "Available for outdoor sessions in the Blue Mountains, Kawarthas, or urban shoots in downtown Toronto."}
          </p>
        </div>
      </section>

      <section className="py-48 bg-soft px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 space-y-6">
            <h2 className="font-serif text-5xl md:text-7xl text-ink">Investment</h2>
            <p className="text-accent uppercase tracking-[0.5em] text-[10px] font-bold">2025 / 2026 Collections</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="p-16 rounded-[48px] border border-ink/5 bg-paper space-y-12 relative overflow-hidden group card-shadow">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity text-ink">
                <Star className="w-32 h-32" />
              </div>
              <div className="space-y-4">
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">The Essential</h3>
                <p className="font-serif text-4xl text-ink">{isBranding ? 'Branding Base' : 'Portrait Session'}</p>
              </div>
              <div className="text-6xl font-serif text-ink">
                <span className="text-2xl align-top mr-2 opacity-30">$</span>
                {isBranding ? '950' : '500'}
              </div>
              <ul className="space-y-6 text-sm text-ink/70 font-light">
                <li className="flex items-center gap-4"><Check className="w-4 h-4 text-accent" /> 90-minute session</li>
                <li className="flex items-center gap-4"><Check className="w-4 h-4 text-accent" /> Pre-shoot style consultation</li>
                <li className="flex items-center gap-4"><Check className="w-4 h-4 text-accent" /> Private digital gallery</li>
                {isBranding && <li className="flex items-center gap-4"><Check className="w-4 h-4 text-accent" /> 3 Social Media Motion clips</li>}
              </ul>
              <button
                onClick={() => handleSelect(isBranding ? 'The Branding Suite' : 'The Signature Session')}
                className="w-full py-6 rounded-full border border-ink/20 hover:bg-ink hover:text-paper transition-all uppercase tracking-[0.3em] text-[10px] font-bold text-ink"
              >
                Select Collection
              </button>
            </div>

            <div className="p-16 rounded-[48px] bg-ink text-paper space-y-12 relative overflow-hidden card-shadow">
              <div className="absolute top-10 right-10 px-4 py-1.5 rounded-full bg-paper/10 text-[9px] uppercase tracking-[0.3em] font-bold">Most Popular</div>
              <div className="space-y-4">
                <h3 className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold">The Full Story</h3>
                <p className="font-serif text-4xl">{isBranding ? 'Brand Authority' : 'Legacy Collection'}</p>
              </div>
              <div className="text-6xl font-serif">
                <span className="text-2xl align-top mr-2 opacity-30">$</span>
                {isBranding ? '1,850' : '950'}
              </div>
              <ul className="space-y-6 text-sm opacity-80 font-light">
                <li className="flex items-center gap-4"><Check className="w-4 h-4 text-accent" /> Half-day session (4 hours)</li>
                <li className="flex items-center gap-4"><Check className="w-4 h-4 text-accent" /> Multiple location options</li>
                <li className="flex items-center gap-4"><Check className="w-4 h-4 text-accent" /> Full commercial usage rights</li>
                {isBranding && <li className="flex items-center gap-4"><Check className="w-4 h-4 text-accent" /> 8 Social Media Motion clips</li>}
                {!isBranding && <li className="flex items-center gap-4"><Check className="w-4 h-4 text-accent" /> Hand-crafted linen photo book</li>}
              </ul>
              <button
                onClick={() => handleSelect(isBranding ? 'The Branding Suite' : 'The Signature Session')}
                className="w-full py-6 rounded-full bg-paper text-ink hover:opacity-90 transition-all uppercase tracking-[0.3em] text-[10px] font-bold"
              >
                Select Collection
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const InquiryForm = ({ quizState, onEditQuiz, initialService }: { quizState: QuizState | null, onEditQuiz: () => void, initialService?: string }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    service: initialService || ''
  });

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 bg-paper">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 max-w-md"
        >
          <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto">
            <Check className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-4xl text-ink">Thank you!</h2>
          <p className="text-ink/60">I've received your inquiry. Expect a personalized response within 24 hours to schedule our discovery call.</p>
          <button onClick={() => window.location.reload()} className="text-[10px] uppercase tracking-widest underline text-accent hover:text-ink font-bold">Back to Home</button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-32 px-6 bg-paper">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20 text-center space-y-4">
          <h2 className="font-serif text-6xl md:text-7xl text-ink">Let's Begin.</h2>
          <p className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold">Secure your date for 2025/2026</p>
        </div>

        {quizState && (
          <div className="mb-16 p-8 rounded-3xl border border-ink/5 bg-soft/60 space-y-6 card-shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] uppercase tracking-widest text-accent font-bold">Your Discovery Profile</h3>
              <button
                onClick={onEditQuiz}
                className="text-[10px] uppercase tracking-widest underline text-accent hover:text-ink font-bold"
              >
                Edit Style
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Path', value: quizState.path === 'branding' ? 'Branding' : 'Portrait' },
                { label: quizState.path === 'branding' ? 'Vibe' : 'Lighting', value: quizState.path === 'branding' ? (quizState.lighting === 'airy' ? 'Warm' : 'Sleek') : (quizState.lighting === 'airy' ? 'Airy' : 'Moody') },
                { label: quizState.path === 'branding' ? 'Focus' : 'Pose', value: quizState.path === 'branding' ? (quizState.poses === 'candid' ? 'Social' : 'Website') : (quizState.poses === 'classic' ? 'Classic' : 'Candid') }
              ].map((chip, i) => (
                <div key={i} className="px-4 py-2 rounded-full border border-ink/10 bg-paper flex items-center gap-3">
                  <span className="text-[9px] uppercase tracking-tighter text-accent font-bold">{chip.label}</span>
                  <span className="text-xs font-medium text-ink">{chip.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-16">
          <div className="space-y-6">
            <label className="text-[10px] uppercase tracking-widest text-accent font-bold">Which service are you interested in?</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(quizState?.path === 'branding' ? [
                { id: 'The Branding Suite', price: '$950', desc: '90-minute session, 3 motion clips' },
                { id: 'Brand Authority', price: '$1,850', desc: 'Half-day, 8 motion clips, full rights' },
                { id: 'The Mini Collection', price: '$500', desc: '30-minute express branding' }
              ] : [
                { id: 'The Signature Session', price: '$500', desc: '90-minute session, digital gallery' },
                { id: 'Legacy Collection', price: '$950', desc: 'Half-day, linen photo book' },
                { id: 'The Mini Collection', price: '$350', desc: '30-minute seasonal session' }
              ]).map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, service: service.id })}
                  className={`p-6 rounded-2xl border text-left transition-all card-shadow ${formData.service === service.id
                      ? 'border-ink bg-ink text-paper'
                      : 'border-ink/5 bg-white hover:border-ink/20'
                    }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-serif text-lg leading-tight">{service.id}</h4>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${formData.service === service.id ? 'text-accent' : 'text-accent'}`}>{service.price}</span>
                  </div>
                  <p className={`text-[10px] leading-relaxed uppercase tracking-wider ${formData.service === service.id ? 'text-paper/60' : 'text-ink/60'}`}>{service.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-accent font-bold">Full Name</label>
              <input required type="text" className="w-full bg-transparent border-b border-ink/20 py-3 focus:border-ink outline-none transition-colors text-ink" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-accent font-bold">Email Address</label>
              <input required type="email" className="w-full bg-transparent border-b border-ink/20 py-3 focus:border-ink outline-none transition-colors text-ink" placeholder="hello@example.com" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-accent font-bold">What is the occasion?</label>
              <select required className="w-full bg-transparent border-b border-ink/20 py-3 focus:border-ink outline-none transition-colors appearance-none cursor-pointer text-ink">
                <option className="bg-paper" value="">Select Occasion</option>
                <option className="bg-paper">Personal Milestone</option>
                <option className="bg-paper">Business Branding</option>
                <option className="bg-paper">Family Legacy</option>
                <option className="bg-paper">Creative Project</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-accent font-bold">Who will be in the photos?</label>
              <select required className="w-full bg-transparent border-b border-ink/20 py-3 focus:border-ink outline-none transition-colors appearance-none cursor-pointer text-ink">
                <option className="bg-paper" value="">Select Attendees</option>
                <option className="bg-paper">Just Me</option>
                <option className="bg-paper">Couple</option>
                <option className="bg-paper">Family (3-5)</option>
                <option className="bg-paper">Large Group (6+)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-accent font-bold">Preferred Location Type</label>
              <select required className="w-full bg-transparent border-b border-ink/20 py-3 focus:border-ink outline-none transition-colors appearance-none cursor-pointer text-ink">
                <option className="bg-paper" value="">Select Location</option>
                <option className="bg-paper">Natural / Outdoor</option>
                <option className="bg-paper">Studio / Minimal</option>
                <option className="bg-paper">Urban / Architectural</option>
                <option className="bg-paper">In-Home / Lifestyle</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-accent font-bold">Any special requests or details to share?</label>
            <textarea
              rows={4}
              defaultValue={quizState?.customMessage || ''}
              className="w-full bg-transparent border-b border-ink/20 py-3 focus:border-ink outline-none transition-colors resize-none text-ink"
              placeholder="Tell me more about your vision..."
            />
          </div>

          <div className="flex flex-col md:flex-row items-end gap-8 pt-8">
            <div className="flex-1 space-y-2 w-full">
              <label className="text-[10px] uppercase tracking-widest text-accent font-bold">Do you have a moodboard or inspiration link?</label>
              <input type="url" className="w-full bg-transparent border-b border-ink/20 py-3 focus:border-ink outline-none transition-colors text-ink" placeholder="Pinterest or Instagram link" />
            </div>
            <div className="relative">
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
              <button type="button" className="flex items-center gap-3 px-6 py-4 border border-ink/10 rounded-xl hover:bg-soft transition-colors text-[10px] uppercase tracking-widest whitespace-nowrap text-ink font-bold">
                <Plus className="w-4 h-4" />
                Upload File
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-8 bg-ink text-paper rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:scale-[1.01] transition-transform shadow-xl shadow-ink/10"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-32 px-8 bg-paper border-t border-ink/5">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
      <div className="md:col-span-2 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center">
            <Camera className="w-4 h-4 text-ink" />
          </div>
          <span className="font-serif text-2xl tracking-[0.2em] uppercase text-ink">Ontario Photo Co.</span>
        </div>
        <p className="text-lg text-ink/60 font-light leading-relaxed max-w-sm serif italic">
          Capturing the modern visionaries and authentic storytellers of Ontario. Based in Toronto, traveling worldwide.
        </p>
        <div className="flex gap-6">
          <a href="#" className="w-10 h-10 rounded-full border border-ink/10 flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-all">
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Navigation</h4>
        <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] text-ink/70 font-bold">
          <li><a href="#" className="hover:text-ink transition-colors">Portfolio</a></li>
          <li><a href="#" className="hover:text-ink transition-colors">Experience</a></li>
          <li><a href="#" className="hover:text-ink transition-colors">Pricing</a></li>
          <li><a href="#" className="hover:text-ink transition-colors">Journal</a></li>
        </ul>
      </div>

      <div className="space-y-6">
        <h4 className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Contact</h4>
        <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] text-ink/70 font-bold">
          <li>hello@ontariophoto.co</li>
          <li>Toronto, Ontario</li>
          <li>Kawartha Lakes, ON</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-[9px] uppercase tracking-[0.3em] text-ink/40 font-bold">© 2026 Ontario Photo Co. All rights reserved.</p>
      <div className="flex gap-8 text-[9px] uppercase tracking-[0.3em] text-ink/40 font-bold">
        <a href="#" className="hover:text-ink transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-ink transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

const Home = ({ onStartQuiz }: { onStartQuiz: () => void }) => (
  <div className="space-y-0">
    <Hero onStartQuiz={onStartQuiz} />

    <section className="py-48 px-8 bg-paper relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">The Philosophy</span>
          <h2 className="font-serif text-6xl md:text-7xl leading-[0.9] text-ink tracking-tight">
            Capturing the <br /><span className="italic font-light">Unspoken</span> Narrative.
          </h2>
          <div className="space-y-8 text-xl text-ink/60 font-light leading-relaxed serif italic">
            <p>
              In a world of filtered perfection, I seek the raw, the real, and the refined. Whether it's the quiet confidence of a CEO in Toronto's core or the soft laughter of a family in the Muskoka pines, my lens is focused on the truth of the moment.
            </p>
            <p>
              I don't just take photos; I curate legacies. Your story deserves more than a pose—it deserves a perspective.
            </p>
          </div>
          <div className="pt-8">
            <button onClick={onStartQuiz} className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold text-ink hover:text-accent transition-colors">
              <span>Discover your aesthetic</span>
              <div className="w-12 h-px bg-ink group-hover:w-20 transition-all duration-500" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="relative aspect-[4/5] rounded-[60px] overflow-hidden card-shadow group"
        >
          <img
            src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=800"
            alt="Photographer at work"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-ink/5" />
        </motion.div>
      </div>
    </section>

    <section id="portfolio" className="py-48 px-8 bg-soft">
      <div className="max-w-7xl mx-auto space-y-32">
        <div className="text-