import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  ArrowRight,
  Check,
  Star,
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
const Navbar = ({ onNavigate }: { onNavigate: (view: 'hero' | 'quiz' | 'booking', sectionId?: string) => void }) => {
  const handleScroll = (id: string) => {
    onNavigate('hero');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-10 md:px-16 bg-paper/90 backdrop-blur-sm transition-all duration-300">
      <button
        onClick={() => onNavigate('hero')}
        className="flex items-center gap-3 hover:opacity-70 transition-opacity"
      >
        <div className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center">
          <Camera className="w-4 h-4 text-ink" />
        </div>
        <span className="font-serif text-2xl tracking-[0.2em] uppercase text-ink">Ontario Photo Co.</span>
      </button>
      <div className="hidden md:flex items-center gap-12 text-[9px] uppercase tracking-[0.3em] font-bold text-ink/70">
        <button onClick={() => handleScroll('portfolio')} className="hover:text-ink transition-colors">Portfolio</button>
        <button onClick={() => handleScroll('experience')} className="hover:text-ink transition-colors">The Experience</button>
        <button onClick={() => handleScroll('pricing')} className="hover:text-ink transition-colors">Investment</button>
        <button
          onClick={() => onNavigate('quiz')}
          className="px-10 py-4 bg-ink text-paper rounded-full hover:scale-105 transition-all shadow-lg shadow-ink/10"
        >
          Book Your Shoot
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
      <span className="text-[11px] uppercase tracking-[0.5em] text-accent mb-10 block font-bold">A Transformative Experience</span>
      <h1 className="font-serif text-7xl md:text-[110px] mb-10 leading-[0.9] text-ink tracking-tight">
        How do you want to <br />
        <span className="italic font-light">be photographed?</span>
      </h1>
      <p className="text-xl md:text-2xl text-ink/70 mb-16 max-w-2xl mx-auto font-light leading-relaxed serif italic">
        A luxury portrait and personal branding studio empowering modern visionaries.
      </p>
      <button
        onClick={onStartQuiz}
        className="group relative px-12 py-6 bg-ink text-paper rounded-full font-bold overflow-hidden transition-all hover:scale-105 shadow-xl shadow-ink/10 flex items-center justify-center mx-auto gap-4"
      >
        <span className="relative z-10 uppercase tracking-[0.3em] text-[10px]">Design Your Session</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>

    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 opacity-40">
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
            className={`flex items-center gap-4 px-8 py-4 rounded-full border border-ink/20 text-[10px] uppercase tracking-widest font-bold text-ink/70 hover:text-ink hover:bg-soft transition-all ${state.step === 1 ? 'invisible' : ''}`}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-16 text-center space-y-6">
                    <h3 className="font-serif text-4xl italic text-white">Elevating my professional brand</h3>
                    <div className="w-12 h-px bg-white/50 group-hover:w-24 transition-all duration-500" />
                    <p className="text-[9px] uppercase tracking-[0.4em] text-white/80 group-hover:text-white transition-colors font-bold">Select Path</p>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-16 text-center space-y-6">
                    <h3 className="font-serif text-4xl italic text-white">Capturing my personal legacy</h3>
                    <div className="w-12 h-px bg-white/50 group-hover:w-24 transition-all duration-500" />
                    <p className="text-[9px] uppercase tracking-[0.4em] text-white/80 group-hover:text-white transition-colors font-bold">Select Path</p>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* BRANDING PATH QUIZ */}
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
                    className="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-ink/10 text-left card-shadow"
                  >
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-serif italic mb-2 text-white">{opt.label}</h3>
                      <p className="text-sm text-white/90">{opt.desc}</p>
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
                  { id: 'candid', label: 'Social Media & Content', desc: 'Authentic behind-the-scenes and daily stories.', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800' },
                  { id: 'classic', label: 'Website & Press Features', desc: 'High-end landing pages and PR media kits.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => nextStep({ poses: opt.id as any })}
                    className="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-ink/10 text-left card-shadow"
                  >
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-serif italic mb-2 text-white">{opt.label}</h3>
                      <p className="text-sm text-white/90">{opt.desc}</p>
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
                  { id: 'airy', label: 'Bright, Modern Studio', desc: 'Clean lines, controlled light, and a minimalist aesthetic.', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600' },
                  { id: 'moody', label: 'In-Action & On-Location', desc: 'Your office, a stylish hotel, or an urban backdrop.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => nextStep({ palette: opt.id as any })}
                    className="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-ink/10 text-left card-shadow"
                  >
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-serif italic mb-2 text-white">{opt.label}</h3>
                      <p className="text-sm text-white/90">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* PORTRAIT QUIZ - SUE BRYCE OPTIMIZED */}
          {state.step === 2 && state.path === 'portrait' && (
            <motion.div
              key="step2-portrait"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl text-ink">How do you want to <br /><span className="italic font-light">feel in your portraits?</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'airy', label: 'Fierce & Empowered', desc: 'Bold, confident, and unapologetically you.', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800' },
                  { id: 'moody', label: 'Timeless & Elegant', desc: 'Classic, graceful, and beautifully sophisticated.', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => nextStep({ lighting: opt.id as any })}
                    className="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-ink/10 text-left card-shadow"
                  >
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-serif italic mb-2 text-white">{opt.label}</h3>
                      <p className="text-sm text-white/90">{opt.desc}</p>
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
                <h2 className="font-serif text-4xl md:text-5xl text-ink">Who are we <br /><span className="italic font-light">celebrating today?</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'classic', label: 'Celebrating Myself', desc: 'A day of pampering just for you to reconnect with your beauty.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600' },
                  { id: 'candid', label: 'Generations & Family', desc: 'Capturing the legacy and connection with those you love most.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => nextStep({ poses: opt.id as any })}
                    className="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-ink/10 text-left card-shadow"
                  >
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-serif italic mb-2 text-white">{opt.label}</h3>
                      <p className="text-sm text-white/90">{opt.desc}</p>
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
                <h2 className="font-serif text-4xl md:text-5xl text-ink">What is your dream <br /><span className="italic font-light">wardrobe style?</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { id: 'moody', label: 'Glamour & Couture', desc: 'Tulle, gowns, dark laces, and show-stopping elegance.', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=600' },
                  { id: 'airy', label: 'Soft & Intimate', desc: 'Silks, sheer fabrics, casual knits, and beautiful simplicity.', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => nextStep({ palette: opt.id as any })}
                    className="group relative aspect-[16/9] rounded-2xl overflow-hidden border border-ink/10 text-left card-shadow"
                  >
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <h3 className="text-2xl font-serif italic mb-2 text-white">{opt.label}</h3>
                      <p className="text-sm text-white/90">{opt.desc}</p>
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
                <p className="text-ink/70">What are you looking to create? Share as much or as little as you'd like.</p>
              </div>
              <div className="space-y-8">
                <textarea
                  autoFocus
                  className="w-full bg-transparent border-b border-ink/30 py-4 text-xl font-serif italic focus:border-ink outline-none transition-colors resize-none text-ink"
                  rows={4}
                  placeholder="I'm looking for..."
                  onChange={(e) => setState({ ...state, customMessage: e.target.value })}
                />
                <button
                  onClick={() => nextStep({})}
                  className="w-full py-6 bg-ink text-paper rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:opacity-90 transition-all"
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

const InquiryForm = ({ quizState, onEditQuiz }: { quizState: QuizState | null, onEditQuiz: () => void }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [moodboard, setMoodboard] = useState('');
  const [formData, setFormData] = useState({
    service: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Prevent submission and highlight errors if fields are missing
    if (!formData.service || !form.checkValidity()) {
      setShowErrors(true);
      return;
    }

    setIsSubmitting(true);
    const data = new FormData(form);

    // Clean up empty https:// prefix so it doesn't send junk to your inbox
    if (data.get('moodboardLink') === 'https://') {
      data.set('moodboardLink', '');
    }

    try {
      const response = await fetch("https://formspree.io/f/mzdjnrqy", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
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
          <h2 className="font-serif text-4xl text-ink">Thank you.</h2>
          <p className="text-ink/70">I've received your inquiry. Expect a personalized response within 24-48 hours to schedule your complimentary discovery call.</p>
          <button onClick={() => window.location.reload()} className="text-[10px] uppercase tracking-widest underline text-accent hover:text-ink font-bold transition-colors">Back to Home</button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-32 px-6 bg-paper">
      <div className="max-w-4xl mx-auto">
        <div className="mb-20 text-center space-y-4">
          <h2 className="font-serif text-6xl md:text-7xl text-ink">Let's Design It.</h2>
          <p className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold">Inquire about availability for 2025/2026</p>
        </div>

        {/* Discovery Profile Summary */}
        {quizState && (
          <div className="mb-16 p-8 rounded-3xl border border-ink/10 bg-soft space-y-6 card-shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] uppercase tracking-widest text-accent font-bold">Your Session Profile</h3>
              <button
                onClick={onEditQuiz}
                className="text-[10px] uppercase tracking-widest underline text-accent hover:text-ink font-bold transition-colors"
              >
                Edit Style
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Path', value: quizState.path === 'branding' ? 'Branding' : 'Legacy Portrait' },
                { label: quizState.path === 'branding' ? 'Vibe' : 'Feeling', value: quizState.path === 'branding' ? (quizState.lighting === 'airy' ? 'Warm' : 'Sleek') : (quizState.lighting === 'airy' ? 'Fierce' : 'Elegant') },
                { label: quizState.path === 'branding' ? 'Focus' : 'Focus', value: quizState.path === 'branding' ? (quizState.poses === 'candid' ? 'Social Content' : 'Website Assets') : (quizState.poses === 'classic' ? 'Self Celebration' : 'Generations') }
              ].map((chip, i) => (
                <div key={i} className="px-5 py-2.5 rounded-full border border-ink/15 bg-paper flex items-center gap-3 shadow-sm">
                  <span className="text-[10px] uppercase tracking-widest text-accent font-bold">{chip.label}</span>
                  <span className="text-xs font-bold text-ink">{chip.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-16" noValidate>
          {/* Hidden inputs to capture React state data in Formspree */}
          <input type="hidden" name="selectedService" value={formData.service} />
          {quizState && (
            <>
              <input type="hidden" name="quizPath" value={quizState.path || ''} />
              <input type="hidden" name="quizLighting" value={quizState.lighting || ''} />
              <input type="hidden" name="quizPoses" value={quizState.poses || ''} />
              <input type="hidden" name="quizPalette" value={quizState.palette || ''} />
            </>
          )}

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase tracking-widest text-accent font-bold">Which experience are you drawn to? *</label>
              {showErrors && !formData.service && <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold">Please select an experience</span>}
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-colors ${showErrors && !formData.service ? 'p-4 -mx-4 bg-red-50/50 rounded-3xl border border-red-200' : ''}`}>
              {(quizState?.path === 'branding' ? [
                { id: 'Personal Branding', price: '$950', desc: 'Pre-consultation, guided shoot, and 5 digital assets.' },
                { id: 'Brand Authority', price: '$1,850', desc: 'Half-day shoot, HMUA included, and full commercial folio.' },
                { id: 'The Refresh', price: '$500', desc: 'Quick 30-min headshot update.' }
              ] : [
                { id: 'The Portrait Session', price: '$390 Session Fee', desc: 'Consultation, HMUA, and fully guided photoshoot.' },
                { id: 'The Legacy Folio', price: '$1,200+', desc: 'Session fee + beautiful handcrafted folio box of matted prints.' },
                { id: 'Generations', price: '$490 Session Fee', desc: 'Bring your mother, sister, or daughter. HMUA for two.' }
              ]).map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, service: service.id });
                    if (showErrors) setShowErrors(false);
                  }}
                  className={`p-6 rounded-2xl border text-left transition-all card-shadow ${formData.service === service.id
                      ? 'border-ink bg-ink text-paper'
                      : 'border-ink/10 bg-white hover:border-ink/30'
                    }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-serif text-lg leading-tight">{service.id}</h4>
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${formData.service === service.id ? 'text-accent' : 'text-accent'}`}>{service.price}</div>
                  <p className={`text-[10px] leading-relaxed tracking-wider ${formData.service === service.id ? 'text-paper/80' : 'text-ink/60'}`}>{service.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-accent font-bold">Full Name *</label>
              <input required name="fullName" type="text" className={`w-full bg-transparent border-b py-3 outline-none transition-colors font-medium text-ink ${showErrors ? 'border-ink/30 focus:border-ink invalid:border-red-500 invalid:text-red-500' : 'border-ink/30 focus:border-ink'}`} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-accent font-bold">Email Address *</label>
              <input required name="email" type="email" className={`w-full bg-transparent border-b py-3 outline-none transition-colors font-medium text-ink ${showErrors ? 'border-ink/30 focus:border-ink invalid:border-red-500 invalid:text-red-500' : 'border-ink/30 focus:border-ink'}`} placeholder="hello@example.com" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-accent font-bold">What is the occasion? *</label>
              <select required name="occasion" className={`w-full bg-transparent border-b py-3 outline-none transition-colors appearance-none cursor-pointer font-medium text-ink ${showErrors ? 'border-ink/30 focus:border-ink invalid:border-red-500 invalid:text-red-500' : 'border-ink/30 focus:border-ink'}`}>
                <option className="bg-paper" value="">Select Occasion</option>
                <option className="bg-paper">Celebrating Myself</option>
                <option className="bg-paper">Business Milestone</option>
                <option className="bg-paper">Maternity / Motherhood</option>
                <option className="bg-paper">Generations</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-accent font-bold">Phone Number (Optional)</label>
              <input name="phone" type="tel" className="w-full bg-transparent border-b border-ink/30 py-3 focus:border-ink outline-none transition-colors font-medium text-ink" placeholder="For a quicker response" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-accent font-bold">Why is now the right time for a photoshoot?</label>
            <textarea
              name="specialRequests"
              rows={4}
              defaultValue={quizState?.customMessage || ''}
              className="w-full bg-transparent border-b border-ink/30 py-3 focus:border-ink outline-none transition-colors resize-none text-ink font-medium"
              placeholder="Tell me more about your vision and what this shoot means to you..."
            />
          </div>

          <div className="space-y-2 pt-4">
            <label className="text-[10px] uppercase tracking-widest text-accent font-bold">Do you have a moodboard or inspiration link?</label>
            <input
              name="moodboardLink"
              type="url"
              value={moodboard}
              onFocus={() => { if (!moodboard) setMoodboard('https://'); }}
              onBlur={() => { if (moodboard === 'https://') setMoodboard(''); }}
              onChange={(e) => setMoodboard(e.target.value)}
              className={`w-full bg-transparent border-b py-3 outline-none transition-colors text-ink font-medium ${showErrors ? 'invalid:border-red-500 border-ink/30 focus:border-ink' : 'border-ink/30 focus:border-ink'}`}
              placeholder="Pinterest or Instagram link (Optional)"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-8 rounded-full font-bold uppercase tracking-[0.2em] text-sm transition-all shadow-xl ${isSubmitting ? 'bg-ink/50 text-paper/80 cursor-not-allowed shadow-none' : 'bg-ink text-paper hover:scale-[1.01] shadow-ink/10'}`}
          >
            {isSubmitting ? 'Sending Inquiry...' : 'Submit Inquiry'}
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
        <p className="text-lg text-ink/70 font-light leading-relaxed max-w-sm serif italic">
          It is my job to take the most beautiful photograph you have ever seen of yourself. Based in Toronto, traveling worldwide.
        </p>
        <div className="flex gap-6">
          <a href="#" className="w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center text-ink hover:bg-ink hover:text-paper transition-all">
            <Instagram className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Navigation</h4>
        <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] text-ink/80 font-bold">
          <li><a href="#" className="hover:text-accent transition-colors">Portfolio</a></li>
          <li><a href="#" className="hover:text-accent transition-colors">The Experience</a></li>
          <li><a href="#" className="hover:text-accent transition-colors">Investment</a></li>
          <li><a href="#" className="hover:text-accent transition-colors">Journal</a></li>
        </ul>
      </div>

      <div className="space-y-6">
        <h4 className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Contact</h4>
        <ul className="space-y-4 text-[11px] uppercase tracking-[0.2em] text-ink/80 font-bold">
          <li>hello@ontariophoto.co</li>
          <li>Toronto, Ontario</li>
          <li>Kawartha Lakes, ON</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-ink/5 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-[9px] uppercase tracking-[0.3em] text-ink/50 font-bold">© 2026 Ontario Photo Co. All rights reserved.</p>
      <div className="flex gap-8 text-[9px] uppercase tracking-[0.3em] text-ink/50 font-bold">
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
          <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">My Philosophy</span>
          <h2 className="font-serif text-6xl md:text-7xl leading-[0.9] text-ink tracking-tight">
            Exist in photos for <br /><span className="italic font-light">your legacy.</span>
          </h2>
          <div className="space-y-8 text-xl text-ink/70 font-light leading-relaxed serif italic">
            <p>
              I believe every woman deserves to see her own beauty. We so often hide behind the camera, waiting to lose 10 pounds or waiting for the "perfect" time. The perfect time is right now.
            </p>
            <p>
              It is my absolute passion to take the most beautiful photograph you have ever seen of yourself. Let's design a luxury photoshoot that celebrates exactly who you are today.
            </p>
          </div>
          <div className="pt-8">
            <button onClick={onStartQuiz} className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] font-bold text-ink hover:text-accent transition-colors">
              <span>Design Your Session</span>
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
        <div className="text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">Portfolio</span>
          <h2 className="font-serif text-6xl md:text-8xl text-ink tracking-tight">The <span className="italic font-light">Folio.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8 aspect-video rounded-[48px] overflow-hidden relative group card-shadow">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200" alt="Portrait" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-16">
              <div className="text-left space-y-4">
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/90 font-bold">Contemporary Portrait</p>
                <h3 className="font-serif text-4xl italic text-white">The Empowered Woman</h3>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 aspect-square md:aspect-auto rounded-[48px] overflow-hidden relative group card-shadow">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600" alt="Branding" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-12">
              <div className="text-left space-y-4">
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/90 font-bold">Personal Branding</p>
                <h3 className="font-serif text-3xl italic text-white">The Visionary</h3>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 aspect-square md:aspect-auto rounded-[48px] overflow-hidden relative group card-shadow">
            <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=600" alt="Creative" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" />
          </div>
          <div className="md:col-span-8 aspect-video rounded-[48px] overflow-hidden relative group card-shadow">
            <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200" alt="Landscape" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </section>

    <section id="experience" className="py-48 px-8 bg-paper">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold">How It Works</span>
          <h2 className="font-serif text-5xl md:text-6xl text-ink">The Luxury Experience</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { step: '01', title: 'Consultation & Styling', desc: 'We begin with a design consultation to discuss your dream shoot, wardrobe selection, and how you want to be photographed.' },
            { step: '02', title: 'Hair, Makeup & Shoot', desc: 'Arrive at the studio for professional hair and makeup. Then, I will fully direct and pose you to capture your most flattering angles.' },
            { step: '03', title: 'The Reveal Session', desc: 'Return to the studio (or join via Zoom) to view your beautifully retouched portraits and purchase your luxury Folio Box or wall art.' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8 p-12 rounded-[40px] border border-ink/10 bg-soft/50"
            >
              <span className="font-serif text-6xl italic text-accent opacity-40">{item.step}</span>
              <h3 className="text-2xl font-serif text-ink">{item.title}</h3>
              <p className="text-ink/70 font-light leading-relaxed serif italic">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section id="pricing" className="py-48 bg-soft px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32 space-y-6">
          <h2 className="font-serif text-6xl md:text-8xl text-ink tracking-tight">Investment.</h2>
          <p className="text-accent uppercase tracking-[0.5em] text-[10px] font-bold">Session fee required to book your date</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="p-16 rounded-[48px] border border-ink/10 bg-paper space-y-8 card-shadow">
            <h3 className="font-serif text-4xl italic text-ink">Portrait Session Fee</h3>
            <p className="text-ink/70 font-light leading-relaxed serif italic">Includes your design consultation, professional hair & makeup artistry, a fully guided photoshoot, and your reveal session. (Images sold separately).</p>
            <p className="text-3xl font-serif text-ink">$390</p>
            <button onClick={onStartQuiz} className="text-[10px] uppercase tracking-[0.3em] underline text-accent hover:text-ink font-bold transition-colors">Inquire Now</button>
          </div>
          <div className="p-16 rounded-[48px] border border-ink/10 bg-paper space-y-8 card-shadow">
            <h3 className="font-serif text-4xl italic text-ink">The Folio Box</h3>
            <p className="text-ink/70 font-light leading-relaxed serif italic">Purchased at your Reveal Session. A beautiful, handcrafted luxury leather box containing your chosen matted prints and matching digital files.</p>
            <p className="text-3xl font-serif text-ink">Starting at $1,200</p>
            <button onClick={onStartQuiz} className="text-[10px] uppercase tracking-[0.3em] underline text-accent hover:text-ink font-bold transition-colors">Design Your Shoot</button>
          </div>
        </div>
      </div>
    </section>

    <section className="py-48 px-8 bg-paper overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-32 items-center">
          <div className="md:w-1/3 space-y-8">
            <h2 className="font-serif text-7xl md:text-8xl italic text-ink leading-none">Client <br />Love.</h2>
            <p className="text-accent text-[10px] uppercase tracking-[0.5em] font-bold">Transformations from Ontario</p>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-16">
            {[
              { quote: "I walked into the studio feeling anxious, but by the time I was in hair and makeup, I felt like a queen. When I saw my photos, I cried. I didn't know I could look like that.", author: "Sarah J., Entrepreneur" },
              { quote: "Doing a generations shoot with my mother and daughter is something I will cherish forever. The Folio Box is now our family's most prized possession.", author: "Michelle R." }
            ].map((t, i) => (
              <div key={i} className="space-y-6">
                <p className="text-2xl font-serif italic leading-relaxed text-ink">"{t.quote}"</p>
                <div className="w-8 h-px bg-accent/40" />
                <p className="text-[9px] uppercase tracking-[0.3em] text-accent font-bold">— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-64 px-8 text-center bg-soft relative">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,var(--color-accent)_0%,transparent_70%)]" />
      </div>
      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        <h2 className="font-serif text-7xl md:text-[120px] text-ink leading-[0.85] tracking-tight">Ready to see <br /><span className="italic font-light">your beauty?</span></h2>
        <button
          onClick={onStartQuiz}
          className="px-20 py-8 bg-ink text-paper rounded-full font-bold uppercase tracking-[0.4em] text-[10px] hover:scale-105 transition-all shadow-2xl shadow-ink/20"
        >
          Book Your Consultation
        </button>
      </div>
    </section>
  </div>
);

export default function App() {
  const [view, setView] = useState<'hero' | 'quiz' | 'booking'>('hero');
  const [quizState, setQuizState] = useState<QuizState | null>(null);

  const handleStartQuiz = () => setView('quiz');

  const handleQuizComplete = (state: QuizState) => {
    setQuizState(state);
    setView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="selection:bg-accent/20 selection:text-ink">
      <Navbar onNavigate={(v) => {
        setView(v);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      <main>
        {view === 'hero' && <Home onStartQuiz={handleStartQuiz} />}

        {view === 'quiz' && <Quiz onComplete={handleQuizComplete} />}

        {view === 'booking' && (
          <InquiryForm
            quizState={quizState}
            onEditQuiz={() => setView('quiz')}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}