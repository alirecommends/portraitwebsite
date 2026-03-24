import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  ArrowRight,
  Check,
  Instagram,
  Plus,
  ChevronDown
} from 'lucide-react';

// --- Types ---
type Path = 'branding' | 'portrait' | 'custom' | null;

interface QuizState {
  step: number;
  path: Path;
  lighting: string | null;
  poses: string | null;
  palette: string | null;
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
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-8 md:px-16 bg-paper/80 backdrop-blur-xl border-b border-ink/5 transition-all duration-300">
      <button
        onClick={() => onNavigate('hero')}
        className="flex items-center gap-3 hover:opacity-70 transition-opacity"
      >
        <div className="w-10 h-10 rounded-full border border-ink/10 bg-white/50 flex items-center justify-center shadow-sm">
          <Camera className="w-4 h-4 text-ink" />
        </div>
        <span className="font-serif text-2xl tracking-[0.15em] uppercase text-ink">Ontario Photo</span>
      </button>
      <div className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.2em] font-bold text-ink/70">
        <button onClick={() => handleScroll('portfolio')} className="hover:text-accent transition-colors">Portfolio</button>
        <button onClick={() => handleScroll('experience')} className="hover:text-accent transition-colors">The Experience</button>
        <button onClick={() => handleScroll('pricing')} className="hover:text-accent transition-colors">Investment</button>
        <button
          onClick={() => onNavigate('quiz')}
          className="px-10 py-4 bg-ink text-paper rounded-full hover:bg-accent transition-all shadow-lg shadow-ink/10"
        >
          Book Your Shoot
        </button>
      </div>
    </nav>
  );
};

const Hero = ({ onStartQuiz }: { onStartQuiz: () => void }) => (
  <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-paper pt-20">
    <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden lg:block">
      <span className="writing-mode-vertical-rl rotate-180 text-[10px] uppercase tracking-[0.5em] text-accent/80 font-bold">
        Est. 2018 — Toronto & The Kawarthas
      </span>
    </div>

    {/* Soft ambient background glow */}
    <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
      <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-soft rounded-full blur-3xl opacity-50"></div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 max-w-5xl"
    >
      <span className="inline-block py-2 px-6 rounded-full bg-white border border-ink/5 shadow-sm text-[10px] uppercase tracking-[0.4em] text-accent mb-10 font-bold">
        A Transformative Experience
      </span>
      <h1 className="font-serif text-6xl md:text-[100px] lg:text-[110px] mb-8 leading-[1] text-ink tracking-tight">
        How do you want to <br />
        <span className="italic font-light">be photographed?</span>
      </h1>
      <p className="text-xl md:text-2xl text-ink/70 mb-14 max-w-2xl mx-auto font-light leading-relaxed serif italic">
        A luxury portrait and personal branding studio empowering modern visionaries.
      </p>
      <button
        onClick={onStartQuiz}
        className="group relative px-12 py-6 bg-ink text-paper rounded-full font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-ink/20 flex items-center justify-center mx-auto gap-4"
      >
        <span className="relative z-10 uppercase tracking-[0.2em] text-[11px]">Design Your Session</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>

    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
      <div className="w-px h-16 bg-gradient-to-b from-ink to-transparent" />
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
    <section className="min-h-screen py-32 px-6 flex items-center justify-center bg-soft relative overflow-hidden">
      <div className="max-w-5xl w-full relative z-10">
        <div className="mb-16 flex items-center justify-between">
          <button
            onClick={prevStep}
            className={`flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-sm border border-ink/5 text-[10px] uppercase tracking-widest font-bold text-ink/70 hover:text-ink hover:shadow-md transition-all ${state.step === 1 ? 'invisible' : ''}`}
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back</span>
          </button>
          <span className="px-6 py-3 rounded-full bg-white shadow-sm border border-ink/5 text-[10px] uppercase tracking-[0.3em] text-accent font-bold">
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
                <h2 className="font-serif text-5xl md:text-7xl text-ink leading-[1]">What are we <br /><span className="italic font-light">creating today?</span></h2>
                <p className="text-[11px] uppercase tracking-[0.4em] text-accent font-bold">Select your path to begin</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
                <button
                  onClick={() => nextStep({ path: 'branding' })}
                  className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden border-4 border-white card-shadow bg-white"
                >
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                    alt="Branding"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100 rounded-[2.5rem]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent rounded-[2.5rem]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-12 text-center space-y-6">
                    <h3 className="font-serif text-4xl italic text-white">Professional Brand</h3>
                    <div className="w-12 h-px bg-white/50 group-hover:w-24 transition-all duration-500" />
                    <p className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[9px] uppercase tracking-[0.4em] text-white transition-colors font-bold">Select Path</p>
                  </div>
                </button>

                <button
                  onClick={() => nextStep({ path: 'portrait' })}
                  className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden border-4 border-white card-shadow bg-white"
                >
                  <img
                    src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=800"
                    alt="Portrait"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100 rounded-[2.5rem]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent rounded-[2.5rem]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-12 text-center space-y-6">
                    <h3 className="font-serif text-4xl italic text-white">Personal Legacy</h3>
                    <div className="w-12 h-px bg-white/50 group-hover:w-24 transition-all duration-500" />
                    <p className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[9px] uppercase tracking-[0.4em] text-white transition-colors font-bold">Select Path</p>
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
              <div className="space-y-4 text-center mb-12">
                <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight">What is the core energy of <br /><span className="italic font-light">your personal brand?</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { id: 'airy', label: 'Connection & Empathy', desc: 'Warm, approachable, and deeply authentic.', img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800' },
                  { id: 'moody', label: 'Authority & Expertise', desc: 'Polished, confident, and industry-leading.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => nextStep({ lighting: opt.id as any })}
                    className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border-[6px] border-white text-left card-shadow bg-white"
                  >
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 rounded-[2rem]" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent rounded-[2rem]" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                      <h3 className="text-3xl font-serif italic mb-3 text-white">{opt.label}</h3>
                      <p className="text-sm text-white/90 leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {state.step === 3 && state.path === 'branding' && (
            <motion.div key="step3-branding" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
              <div className="space-y-4 text-center mb-12">
                <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight">Where are you currently <br /><span className="italic font-light">struggling with your visual identity?</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { id: 'candid', label: 'Feeling Invisible', desc: "My current visuals don't reflect the high quality of my work.", img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800' },
                  { id: 'classic', label: 'Lacking Consistency', desc: 'I need a cohesive, premium look across my entire presence.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800' }
                ].map((opt) => (
                  <button key={opt.id} onClick={() => nextStep({ poses: opt.id as any })} className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border-[6px] border-white text-left card-shadow bg-white">
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 rounded-[2rem]" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent rounded-[2rem]" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                      <h3 className="text-3xl font-serif italic mb-3 text-white">{opt.label}</h3>
                      <p className="text-sm text-white/90 leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {state.step === 4 && state.path === 'branding' && (
            <motion.div key="step4-branding" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
              <div className="space-y-4 text-center mb-12">
                <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight">What is the ultimate goal <br /><span className="italic font-light">for this investment?</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { id: 'premium', label: 'Commanding Premium Prices', desc: 'Attracting higher-end clients by elevating my perceived value.', img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=600' },
                  { id: 'launch', label: 'A Powerful Campaign', desc: 'Creating striking, polished assets for a new website or launch.', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600' }
                ].map((opt) => (
                  <button key={opt.id} onClick={() => nextStep({ palette: opt.id as any })} className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border-[6px] border-white text-left card-shadow bg-white">
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 rounded-[2rem]" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent rounded-[2rem]" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                      <h3 className="text-3xl font-serif italic mb-3 text-white">{opt.label}</h3>
                      <p className="text-sm text-white/90 leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* PORTRAIT QUIZ */}
          {state.step === 2 && state.path === 'portrait' && (
            <motion.div key="step2-portrait" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
              <div className="space-y-4 text-center mb-12">
                <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight">Be honest—how do you feel about <br /><span className="italic font-light">being in front of the camera?</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { id: 'airy', label: 'I usually hide from it', desc: 'I feel awkward and prefer to be the one taking the photos.', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800' },
                  { id: 'moody', label: 'I am ready to embrace it', desc: 'It is my time to step into the light and celebrate my journey.', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800' }
                ].map((opt) => (
                  <button key={opt.id} onClick={() => nextStep({ lighting: opt.id as any })} className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border-[6px] border-white text-left card-shadow bg-white">
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 rounded-[2rem]" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent rounded-[2rem]" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                      <h3 className="text-3xl font-serif italic mb-3 text-white">{opt.label}</h3>
                      <p className="text-sm text-white/90 leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {state.step === 3 && state.path === 'portrait' && (
            <motion.div key="step3-portrait" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
              <div className="space-y-4 text-center mb-12">
                <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight">Whose legacy are we <br /><span className="italic font-light">capturing today?</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { id: 'classic', label: 'A Celebration of Me', desc: 'A day of luxury and pampering just to reconnect with myself.', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600' },
                  { id: 'candid', label: 'Generations & Family', desc: 'Capturing the beautiful connection with those I love most.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600' }
                ].map((opt) => (
                  <button key={opt.id} onClick={() => nextStep({ poses: opt.id as any })} className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border-[6px] border-white text-left card-shadow bg-white">
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 rounded-[2rem]" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent rounded-[2rem]" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                      <h3 className="text-3xl font-serif italic mb-3 text-white">{opt.label}</h3>
                      <p className="text-sm text-white/90 leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {state.step === 4 && state.path === 'portrait' && (
            <motion.div key="step4-portrait" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
              <div className="space-y-4 text-center mb-12">
                <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight">How do you dream of <br /><span className="italic font-light">preserving these portraits?</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { id: 'folio', label: 'The Luxury Folio Box', desc: 'A handcrafted leather box of matted prints to treasure privately.', img: 'https://images.unsplash.com/photo-1618365908648-e71bd5716cba?auto=format&fit=crop&q=80&w=600' },
                  { id: 'wallart', label: 'Statement Wall Art', desc: 'Beautifully framed heirloom pieces proudly displayed in my home.', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600' }
                ].map((opt) => (
                  <button key={opt.id} onClick={() => nextStep({ palette: opt.id as any })} className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border-[6px] border-white text-left card-shadow bg-white">
                    <img src={opt.img} alt={opt.label} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 rounded-[2rem]" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent rounded-[2rem]" />
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                      <h3 className="text-3xl font-serif italic mb-3 text-white">{opt.label}</h3>
                      <p className="text-sm text-white/90 leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* CUSTOM PATH */}
          {state.step === 2 && state.path === 'custom' && (
            <motion.div key="step-custom" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12 max-w-2xl mx-auto text-center">
              <div className="space-y-4">
                <h2 className="font-serif text-4xl md:text-5xl text-ink leading-tight">Tell me about <br /><span className="italic font-light">your vision.</span></h2>
                <p className="text-ink/70">What are you looking to create? Share as much or as little as you'd like.</p>
              </div>
              <div className="space-y-8 text-left">
                <textarea
                  autoFocus
                  className="w-full bg-white border border-ink/10 rounded-[2rem] p-8 text-xl font-serif italic focus:border-accent/50 focus:ring-4 focus:ring-accent/10 outline-none transition-all resize-none text-ink shadow-sm"
                  rows={4}
                  placeholder="I'm looking for..."
                  onChange={(e) => setState({ ...state, customMessage: e.target.value })}
                />
                <button
                  onClick={() => nextStep({})}
                  className="w-full py-6 bg-ink text-paper rounded-full font-bold uppercase tracking-[0.2em] text-sm hover:scale-[1.02] shadow-lg shadow-ink/10 transition-all"
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

    if (!formData.service || !form.checkValidity()) {
      setShowErrors(true);
      return;
    }

    setIsSubmitting(true);
    const data = new FormData(form);

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
      <section className="min-h-screen flex items-center justify-center px-6 bg-soft">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8 max-w-lg p-16 bg-white rounded-[3rem] card-shadow border border-ink/5"
        >
          <div className="w-24 h-24 bg-soft text-accent rounded-full flex items-center justify-center mx-auto shadow-sm">
            <Check className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-5xl text-ink">Thank you.</h2>
          <p className="text-ink/70 leading-relaxed text-lg">I've received your inquiry. Expect a personalized response within 24-48 hours to schedule your complimentary discovery call.</p>
          <button onClick={() => window.location.reload()} className="px-8 py-4 bg-ink text-paper rounded-full text-[10px] uppercase tracking-widest font-bold transition-all hover:scale-105 shadow-md">Back to Home</button>
        </motion.div>
      </section>
    );
  }

  const getGoalChip = () => {
    if (quizState?.path === 'branding') {
      return quizState.palette === 'premium' ? 'Attract Premium Clients' : 'Powerful Campaign Launch';
    }
    return quizState?.palette === 'folio' ? 'Luxury Folio Box' : 'Statement Wall Art';
  };

  // Base styling for the new soft, rounded form inputs
  const inputBaseStyle = `w-full bg-white/80 border border-ink/10 rounded-[1.5rem] px-6 py-4 outline-none transition-all font-medium text-ink hover:bg-white focus:bg-white focus:border-accent/50 focus:ring-4 focus:ring-accent/10 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] placeholder:text-ink/40`;
  const inputErrorStyle = showErrors ? "invalid:border-red-400 invalid:bg-red-50/50 invalid:focus:ring-red-400/20" : "";

  return (
    <section className="py-32 px-6 bg-paper relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-soft),transparent_50%)] opacity-50 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-20 text-center space-y-6">
          <span className="inline-block py-2 px-6 rounded-full bg-white border border-ink/5 shadow-sm text-[10px] uppercase tracking-[0.4em] text-accent font-bold">
            Availability for 2025/2026
          </span>
          <h2 className="font-serif text-6xl md:text-7xl text-ink tracking-tight">Let's Design It.</h2>
        </div>

        {quizState && (
          <div className="mb-16 p-10 rounded-[2.5rem] border border-ink/5 bg-white/60 backdrop-blur-xl space-y-8 card-shadow">
            <div className="flex items-center justify-between border-b border-ink/5 pb-6">
              <h3 className="text-[11px] uppercase tracking-widest text-ink font-bold">Your Session Profile</h3>
              <button
                onClick={onEditQuiz}
                className="text-[10px] uppercase tracking-widest text-accent hover:text-ink font-bold transition-colors flex items-center gap-2"
              >
                Edit Style <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              {[
                { label: 'Path', value: quizState.path === 'branding' ? 'Branding' : 'Legacy Portrait' },
                { label: quizState.path === 'branding' ? 'Energy' : 'Comfort', value: quizState.path === 'branding' ? (quizState.lighting === 'airy' ? 'Empathy' : 'Authority') : (quizState.lighting === 'airy' ? 'Hides from Camera' : 'Ready to Embrace') },
                { label: quizState.path === 'branding' ? 'Challenge' : 'Focus', value: quizState.path === 'branding' ? (quizState.poses === 'candid' ? 'Invisibility' : 'Inconsistency') : (quizState.poses === 'classic' ? 'Self Celebration' : 'Generations') },
                { label: quizState.path === 'branding' ? 'Goal' : 'Display', value: getGoalChip() }
              ].map((chip, i) => (
                <div key={i} className="px-5 py-3 rounded-[1rem] bg-white border border-ink/5 flex flex-col gap-1 shadow-sm flex-1 min-w-[140px]">
                  <span className="text-[9px] uppercase tracking-widest text-accent/80 font-bold">{chip.label}</span>
                  <span className="text-[13px] font-bold text-ink">{chip.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-12" noValidate>
          <input type="hidden" name="selectedService" value={formData.service} />
          {quizState && (
            <>
              <input type="hidden" name="quizPath" value={quizState.path || ''} />
              <input type="hidden" name="quizLighting" value={quizState.lighting || ''} />
              <input type="hidden" name="quizPoses" value={quizState.poses || ''} />
              <input type="hidden" name="quizPalette" value={quizState.palette || ''} />
            </>
          )}

          <div className="space-y-6 bg-white/40 p-8 md:p-10 rounded-[3rem] border border-ink/5">
            <div className="flex justify-between items-center mb-4">
              <label className="text-[11px] uppercase tracking-widest text-ink font-bold">Which experience are you drawn to? *</label>
              {showErrors && !formData.service && <span className="text-[10px] uppercase tracking-widest text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full">Required</span>}
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-colors ${showErrors && !formData.service ? 'p-6 -mx-6 bg-red-50/30 rounded-[2rem] border border-red-100' : ''}`}>
              {(quizState?.path === 'branding' ? [
                { id: 'Personal Branding', price: '$950', desc: 'Pre-consultation, guided shoot, and 5 digital assets.' },
                { id: 'Brand Authority', price: '$1,850', desc: 'Half-day shoot, HMUA included, and full commercial folio.' },
                { id: 'The Refresh', price: '$500', desc: 'Quick 30-min headshot update.' }
              ] : [
                { id: 'The Signature Portrait', price: '$390 Session Fee', desc: 'Consultation, HMUA for one, and fully guided photoshoot.' },
                { id: 'Generations', price: '$490 Session Fee', desc: 'Bring your mother, sister, or daughter. HMUA for two.' },
                { id: 'The Editorial Session', price: '$590 Session Fee', desc: 'Extended 3-hour shoot, advanced styling, and multiple looks.' }
              ]).map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, service: service.id });
                    if (showErrors) setShowErrors(false);
                  }}
                  className={`p-8 rounded-[2rem] border text-left transition-all ${formData.service === service.id
                    ? 'border-ink bg-ink text-paper shadow-lg shadow-ink/20 scale-[1.02]'
                    : 'border-white bg-white hover:border-accent/30 hover:shadow-md shadow-sm'
                    }`}
                >
                  <h4 className="font-serif text-xl leading-tight mb-3">{service.id}</h4>
                  <div className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${formData.service === service.id ? 'text-accent/90' : 'text-accent'}`}>{service.price}</div>
                  <p className={`text-[11px] leading-relaxed tracking-wider ${formData.service === service.id ? 'text-paper/80' : 'text-ink/60'}`}>{service.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-ink ml-2 font-bold">Full Name *</label>
              <input required name="fullName" type="text" className={`${inputBaseStyle} ${inputErrorStyle}`} placeholder="Jane Doe" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-ink ml-2 font-bold">Email Address *</label>
              <input required name="email" type="email" className={`${inputBaseStyle} ${inputErrorStyle}`} placeholder="hello@example.com" />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-ink ml-2 font-bold">What is the occasion? *</label>
              <div className="relative">
                <select required name="occasion" defaultValue="" className={`appearance-none ${inputBaseStyle} ${inputErrorStyle}`}>
                  <option value="" disabled hidden>Select Occasion</option>
                  <option value="Personal Milestone / Birthday">Personal Milestone / Birthday</option>
                  <option value="Business Rebranding">Business Rebranding</option>
                  <option value="Maternity / Motherhood">Maternity / Motherhood</option>
                  <option value="Family Legacy">Family Legacy</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-ink ml-2 font-bold">Who will be in the photos? *</label>
              <div className="relative">
                <select required name="attendees" defaultValue="" className={`appearance-none ${inputBaseStyle} ${inputErrorStyle}`}>
                  <option value="" disabled hidden>Select Headcount</option>
                  <option value="Just Me">Just Me</option>
                  <option value="Two People (Couple/Duo)">Two People (Couple/Duo)</option>
                  <option value="Small Family (3-4)">Small Family (3-4)</option>
                  <option value="Large Group (5+)">Large Group (5+)</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-3 md:col-span-2">
              <label className="text-[10px] uppercase tracking-widest text-ink ml-2 font-bold">Phone Number (Optional)</label>
              <input name="phone" type="tel" className={inputBaseStyle} placeholder="(555) 555-5555" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest text-ink ml-2 font-bold">Why is now the right time for a photoshoot?</label>
            <textarea
              name="specialRequests"
              rows={5}
              defaultValue={quizState?.customMessage || ''}
              className={`${inputBaseStyle} resize-none rounded-[2rem]`}
              placeholder="Tell me more about your vision and what this shoot means to you..."
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest text-ink ml-2 font-bold">Do you have a moodboard or inspiration link?</label>
            <input
              name="moodboardLink"
              type="url"
              value={moodboard}
              onFocus={() => { if (!moodboard) setMoodboard('https://'); }}
              onBlur={() => { if (moodboard === 'https://') setMoodboard(''); }}
              onChange={(e) => setMoodboard(e.target.value)}
              className={`${inputBaseStyle} ${inputErrorStyle}`}
              placeholder="Pinterest or Instagram link (Optional)"
            />
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-6 rounded-[2rem] font-bold uppercase tracking-[0.2em] text-[11px] transition-all duration-300 ${isSubmitting ? 'bg-ink/50 text-paper/80 cursor-not-allowed' : 'bg-ink text-paper hover:bg-accent shadow-[0_10px_30px_-10px_rgba(42,36,34,0.4)] hover:shadow-[0_10px_40px_-10px_rgba(138,101,90,0.6)] hover:-translate-y-1'}`}
            >
              {isSubmitting ? 'Sending Inquiry...' : 'Submit Inquiry'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-32 px-8 bg-paper border-t border-ink/5 mt-20">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
      <div className="md:col-span-2 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-ink/10 bg-white/50 flex items-center justify-center shadow-sm">
            <Camera className="w-4 h-4 text-ink" />
          </div>
          <span className="font-serif text-2xl tracking-[0.15em] uppercase text-ink">Ontario Photo</span>
        </div>
        <p className="text-lg text-ink/70 font-light leading-relaxed max-w-sm serif italic">
          It is my job to take the most beautiful photograph you have ever seen of yourself. Based in Toronto, traveling worldwide.
        </p>
        <div className="flex gap-4 pt-4">
          <a href="#" className="w-12 h-12 rounded-full bg-white border border-ink/5 shadow-sm flex items-center justify-center text-ink hover:bg-accent hover:text-white hover:border-accent transition-all">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="space-y-8">
        <h4 className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Navigation</h4>
        <ul className="space-y-5 text-[11px] uppercase tracking-[0.2em] text-ink/80 font-bold">
          <li><a href="#" className="hover:text-accent transition-colors">Portfolio</a></li>
          <li><a href="#" className="hover:text-accent transition-colors">The Experience</a></li>
          <li><a href="#" className="hover:text-accent transition-colors">Investment</a></li>
          <li><a href="#" className="hover:text-accent transition-colors">Journal</a></li>
        </ul>
      </div>

      <div className="space-y-8">
        <h4 className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Contact</h4>
        <ul className="space-y-5 text-[11px] uppercase tracking-[0.2em] text-ink/80 font-bold">
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
          <span className="inline-block py-2 px-6 rounded-full bg-white border border-ink/5 shadow-sm text-[10px] uppercase tracking-[0.4em] text-accent font-bold">
            My Philosophy
          </span>
          <h2 className="font-serif text-5xl md:text-7xl leading-[1] text-ink tracking-tight">
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
              <div className="w-12 h-px bg-ink/20 group-hover:w-20 group-hover:bg-accent transition-all duration-500" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border-[8px] border-white card-shadow group bg-white"
        >
          <img
            src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?auto=format&fit=crop&q=80&w=800"
            alt="Photographer at work"
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 rounded-[2.5rem]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </section>

    <section id="portfolio" className="py-48 px-8 bg-soft relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,white_0%,transparent_100%)] opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto space-y-32 relative z-10">
        <div className="text-center space-y-8">
          <span className="inline-block py-2 px-6 rounded-full bg-white border border-ink/5 shadow-sm text-[10px] uppercase tracking-[0.4em] text-accent font-bold">
            Portfolio
          </span>
          <h2 className="font-serif text-6xl md:text-8xl text-ink tracking-tight">The <span className="italic font-light">Folio.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-8 aspect-video rounded-[3rem] overflow-hidden relative group border-[6px] border-white card-shadow bg-white">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200" alt="Portrait" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 rounded-[2.5rem]" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-12 md:p-16 rounded-[2.5rem]">
              <div className="text-left space-y-3">
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/90 font-bold">Contemporary Portrait</p>
                <h3 className="font-serif text-3xl md:text-4xl italic text-white">The Empowered Woman</h3>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 aspect-square md:aspect-auto rounded-[3rem] overflow-hidden relative group border-[6px] border-white card-shadow bg-white">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600" alt="Branding" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 rounded-[2.5rem]" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10 rounded-[2.5rem]">
              <div className="text-left space-y-3">
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/90 font-bold">Personal Branding</p>
                <h3 className="font-serif text-2xl md:text-3xl italic text-white">The Visionary</h3>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 aspect-square md:aspect-auto rounded-[3rem] overflow-hidden relative group border-[6px] border-white card-shadow bg-white">
            <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=600" alt="Creative" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 rounded-[2.5rem]" referrerPolicy="no-referrer" />
          </div>
          <div className="md:col-span-8 aspect-video rounded-[3rem] overflow-hidden relative group border-[6px] border-white card-shadow bg-white">
            <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200" alt="Landscape" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 rounded-[2.5rem]" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </section>

    <section id="experience" className="py-48 px-8 bg-paper">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-8">
          <span className="inline-block py-2 px-6 rounded-full bg-white border border-ink/5 shadow-sm text-[10px] uppercase tracking-[0.4em] text-accent font-bold">
            How It Works
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-ink leading-tight">The Luxury Experience</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
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
              className="space-y-8 p-12 rounded-[3rem] border border-ink/5 bg-white card-shadow"
            >
              <div className="w-20 h-20 rounded-full bg-soft flex items-center justify-center mb-6">
                <span className="font-serif text-3xl italic text-accent">{item.step}</span>
              </div>
              <h3 className="text-2xl font-serif text-ink">{item.title}</h3>
              <p className="text-ink/70 font-light leading-relaxed serif italic text-lg">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section id="pricing" className="py-48 bg-soft px-8 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,white_0%,transparent_80%)] opacity-60 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-32 space-y-8">
          <h2 className="font-serif text-6xl md:text-8xl text-ink tracking-tight">Investment.</h2>
          <span className="inline-block py-2 px-6 rounded-full bg-white border border-ink/5 shadow-sm text-[10px] uppercase tracking-[0.4em] text-accent font-bold">
            Session fee required to book your date
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div className="p-12 md:p-16 rounded-[3rem] border-4 border-white bg-white/60 backdrop-blur-xl space-y-10 card-shadow hover:-translate-y-2 transition-transform duration-500">
            <h3 className="font-serif text-4xl italic text-ink">Portrait Session Fee</h3>
            <p className="text-ink/70 font-light leading-relaxed serif italic text-lg">Includes your design consultation, professional hair & makeup artistry, a fully guided photoshoot, and your reveal session. (Images sold separately).</p>
            <div className="pt-4 border-t border-ink/10">
              <p className="text-4xl font-serif text-ink">$390</p>
            </div>
            <button onClick={onStartQuiz} className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-accent hover:text-ink font-bold transition-colors">
              Inquire Now <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="p-12 md:p-16 rounded-[3rem] border-4 border-white bg-white/60 backdrop-blur-xl space-y-10 card-shadow hover:-translate-y-2 transition-transform duration-500">
            <h3 className="font-serif text-4xl italic text-ink">The Folio Box</h3>
            <p className="text-ink/70 font-light leading-relaxed serif italic text-lg">Purchased at your Reveal Session. A beautiful, handcrafted luxury leather box containing your chosen matted prints and matching digital files.</p>
            <div className="pt-4 border-t border-ink/10">
              <p className="text-4xl font-serif text-ink"><span className="text-2xl text-ink/40 mr-2">Starting at</span>$1,200</p>
            </div>
            <button onClick={onStartQuiz} className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-accent hover:text-ink font-bold transition-colors">
              Design Your Shoot <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <section className="py-48 px-8 bg-paper overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/3 space-y-8 text-center lg:text-left">
            <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl italic text-ink leading-[0.9]">Client <br className="hidden lg:block" />Love.</h2>
            <span className="inline-block py-2 px-6 rounded-full bg-white border border-ink/5 shadow-sm text-[10px] uppercase tracking-[0.4em] text-accent font-bold">
              Transformations from Ontario
            </span>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { quote: "I walked into the studio feeling anxious, but by the time I was in hair and makeup, I felt like a queen. When I saw my photos, I cried. I didn't know I could look like that.", author: "Sarah J., Entrepreneur" },
              { quote: "Doing a generations shoot with my mother and daughter is something I will cherish forever. The Folio Box is now our family's most prized possession.", author: "Michelle R." }
            ].map((t, i) => (
              <div key={i} className="p-12 rounded-[3rem] bg-white border border-ink/5 card-shadow space-y-8 relative">
                <div className="absolute top-8 left-8 text-6xl font-serif text-soft">"</div>
                <p className="text-xl font-serif italic leading-relaxed text-ink relative z-10">{t.quote}</p>
                <div className="flex items-center gap-4 pt-4 border-t border-ink/5">
                  <div className="w-10 h-10 rounded-full bg-soft flex items-center justify-center text-accent font-serif italic">
                    {t.author.charAt(0)}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ink/70 font-bold">{t.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="py-64 px-8 text-center bg-soft relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,white_0%,transparent_70%)] opacity-80 pointer-events-none" />
      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        <h2 className="font-serif text-6xl md:text-[100px] lg:text-[120px] text-ink leading-[0.85] tracking-tight">Ready to see <br /><span className="italic font-light">your beauty?</span></h2>
        <button
          onClick={onStartQuiz}
          className="px-16 py-8 md:px-20 md:py-8 bg-ink text-paper rounded-full font-bold uppercase tracking-[0.3em] text-[10px] md:text-[11px] hover:-translate-y-1 transition-all duration-500 shadow-[0_20px_40px_-10px_rgba(42,36,34,0.4)]"
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
    <div className="min-h-screen bg-paper text-ink selection:bg-accent/20 selection:text-ink font-sans">
      <Navbar onNavigate={(v) => {
        setView(v);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      <main>
        <AnimatePresence mode="wait">
          {view === 'hero' && (
            <motion.div key="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Home onStartQuiz={handleStartQuiz} />
            </motion.div>
          )}

          {view === 'quiz' && (
            <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Quiz onComplete={handleQuizComplete} />
            </motion.div>
          )}

          {view === 'booking' && (
            <motion.div key="booking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <InquiryForm quizState={quizState} onEditQuiz={() => setView('quiz')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {view === 'hero' && <Footer />}
    </div>
  );
}