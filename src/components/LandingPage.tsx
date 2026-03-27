import React from 'react';
import { motion } from 'motion/react';
import { Mail, Shield, Zap, Globe, BookOpen, AlertCircle, CheckCircle2, Heart, Users, ArrowRight, Search } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { translations, Language } from '@/src/lib/translations';

interface LandingPageProps {
  onLogin: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  languages: { code: Language; label: string; flag: string }[];
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin, language, setLanguage, languages }) => {
  const t = translations[language];

  return (
    <div className="bg-white selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Advanced Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-blue-50/50 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-indigo-50/40 rounded-full blur-[100px]" />
          <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-sky-50/30 rounded-full blur-[80px]" />
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] brightness-100 contrast-150" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-left max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50/80 backdrop-blur-sm rounded-full text-blue-700 text-[13px] font-bold mb-8 border border-blue-100/50 shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                <span className="tracking-tight uppercase tracking-widest">{t.landing.heroBadge}</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-gray-900 mb-8 leading-[0.9]"
              >
                {t.landing.heroTitle.split('.').map((part, i) => (
                  <span key={i} className="block">
                    {part}{i === 0 && "."}
                  </span>
                ))}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl sm:text-2xl text-gray-500 mb-12 leading-relaxed font-medium max-w-xl"
              >
                {t.landing.heroSubtitle}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center gap-5"
              >
                <button 
                  onClick={onLogin}
                  className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 flex items-center justify-center gap-3 group active:scale-95"
                >
                  {t.common.start}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a 
                  href="#mission"
                  className="w-full sm:w-auto px-10 py-5 bg-white text-gray-700 rounded-2xl font-bold text-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  {t.landing.missionBtn}
                </a>
              </motion.div>

              {/* Language Selection - Refined */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-16 flex gap-3 flex-wrap"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={cn(
                      "px-5 py-2.5 rounded-xl text-sm font-bold transition-all border flex items-center gap-2.5",
                      language === lang.code 
                        ? "bg-white text-blue-600 border-blue-200 shadow-lg shadow-blue-50 scale-105" 
                        : "bg-white/50 backdrop-blur-sm text-gray-500 border-gray-100 hover:border-blue-200 hover:text-blue-500"
                    )}
                  >
                    <span className="text-base grayscale-[0.2]">{lang.flag}</span>
                    {lang.label}
                  </button>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-blue-600/20 rounded-[80px] blur-[100px] -z-10 translate-x-10 translate-y-10 opacity-50" />
              <div className="relative rounded-[80px] overflow-hidden border-8 border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] transform hover:scale-[1.01] transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&q=80&w=1200&h=1600" 
                  alt="Relieved couple with documents" 
                  className="w-full h-full object-cover aspect-[3/4]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent" />
                
                {/* Floating Info Card */}
                <div className="absolute bottom-12 left-12 right-12 p-8 bg-white/10 backdrop-blur-2xl rounded-[40px] border border-white/20 shadow-2xl">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <CheckCircle2 className="text-white w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-white font-black text-2xl tracking-tight">BriefKlar AI</p>
                      <p className="text-blue-100 text-base font-medium opacity-80">Analyse terminée avec succès</p>
                    </div>
                  </div>
                </div>

                {/* Secondary Floating Badge */}
                <div className="absolute top-12 right-12 p-4 bg-white rounded-3xl shadow-2xl border border-blue-50 flex items-center gap-3 animate-bounce-slow">
                  <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-gray-900 font-black text-sm pr-2">100% Privé</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust / Stats Bar - Refined Logo Cloud */}
      <section className="py-16 border-y border-gray-100 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-12">
            Compatible avec toutes les administrations allemandes
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex items-center gap-2 font-black text-gray-900 text-2xl tracking-tighter italic hover:scale-110 transition-transform cursor-default">Familienkasse</div>
            <div className="flex items-center gap-2 font-black text-gray-900 text-2xl tracking-tighter italic hover:scale-110 transition-transform cursor-default">Jobcenter</div>
            <div className="flex items-center gap-2 font-black text-gray-900 text-2xl tracking-tighter italic hover:scale-110 transition-transform cursor-default">Ausländerbehörde</div>
            <div className="flex items-center gap-2 font-black text-gray-900 text-2xl tracking-tighter italic hover:scale-110 transition-transform cursor-default">Krankenkasse</div>
          </div>
        </div>
      </section>

      {/* Association Mission Section */}
      <section id="mission" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-600/5 rounded-full blur-3xl" />
              <div className="relative bg-gray-50 p-10 rounded-[48px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-5 mb-10">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-100">
                    <Users className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900">Afrokonexion e.V.</h3>
                    <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">{t.landing.bescheid}</p>
                  </div>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium">
                  {t.landing.associationText}
                </p>
                <div className="space-y-5">
                  {[t.landing.check1, t.landing.check2, t.landing.check3].map((check, i) => (
                    <div key={i} className="flex items-center gap-4 text-base font-bold text-gray-800">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      {check}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                {t.landing.missionBtn}
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-8 leading-[1.1]">
                {t.landing.missionTitle}
              </h2>
              <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium">
                {t.landing.missionText}
              </p>
              <div className="flex items-center gap-5 p-8 bg-white rounded-[32px] border border-gray-100 shadow-xl shadow-gray-100/50">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Heart className="w-7 h-7 text-red-500 fill-current" />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-lg">{t.landing.supportText}</h4>
                  <p className="text-sm font-medium text-gray-500 mt-1">Impact social direct en Allemagne</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-gray-900 mb-4">{t.landing.whyTitle}</h2>
            <p className="text-xl text-gray-500 font-medium">{t.landing.whySubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: t.landing.feature1Title,
                desc: t.landing.feature1Desc,
                icon: <Zap className="w-7 h-7 text-blue-600" />,
                bg: "bg-blue-50",
                border: "hover:border-blue-200"
              },
              {
                title: t.landing.feature2Title,
                desc: t.landing.feature2Desc,
                icon: <Shield className="w-7 h-7 text-green-600" />,
                bg: "bg-green-50",
                border: "hover:border-green-200"
              },
              {
                title: t.landing.feature3Title,
                desc: t.landing.feature3Desc,
                icon: <Globe className="w-7 h-7 text-purple-600" />,
                bg: "bg-purple-50",
                border: "hover:border-purple-200"
              }
            ].map((feature, i) => (
              <div key={i} className={cn("p-10 bg-white rounded-[40px] border border-gray-100 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-2 group", feature.border)}>
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500", feature.bg)}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Survival Guide Preview */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-900 rounded-[64px] p-12 lg:p-24 text-white overflow-hidden relative shadow-3xl shadow-blue-900/20">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-800/50 to-transparent pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row items-center gap-20 relative z-10">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-blue-200 text-sm font-bold mb-8 border border-white/10 backdrop-blur-sm">
                  <BookOpen className="w-4 h-4" />
                  {t.landing.guideBadge}
                </div>
                <h2 className="text-4xl sm:text-5xl font-black mb-8 leading-tight">{t.landing.guideTitle}</h2>
                <p className="text-blue-100/70 text-xl mb-12 leading-relaxed font-medium">
                  {t.landing.guideText}
                </p>
                <button 
                  onClick={onLogin}
                  className="w-full sm:w-auto px-10 py-5 bg-white text-blue-900 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  {t.landing.guideBtn}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="lg:w-1/2 grid grid-cols-2 gap-6">
                {[
                  { title: t.landing.frist, desc: t.landing.fristDesc },
                  { title: t.landing.bescheid, desc: t.landing.bescheidDesc },
                  { title: t.landing.original, desc: t.landing.originalDesc },
                  { title: t.landing.mahnung, desc: t.landing.mahnungDesc }
                ].map((item, i) => (
                  <div key={i} className={cn("p-8 bg-white/5 backdrop-blur-md rounded-[32px] border border-white/10 hover:bg-white/10 transition-colors", i % 2 === 1 ? "mt-8" : "")}>
                    <h4 className="font-black text-xl mb-3">{item.title}</h4>
                    <p className="text-sm text-blue-100/60 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[64px] p-12 lg:p-20 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-white rounded-full blur-[120px]" />
              <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-400 rounded-full blur-[120px]" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <div className="text-left">
                <h2 className="text-4xl sm:text-6xl font-black mb-10 leading-[1.1]">
                  {t.landing.readyTitle}
                </h2>
                <p className="text-xl text-blue-100 mb-14 max-w-xl font-medium">
                  {t.landing.readySubtitle}
                </p>
                <button 
                  onClick={onLogin}
                  className="w-full sm:w-auto px-14 py-6 bg-white text-blue-600 rounded-2xl font-black text-2xl hover:bg-blue-50 transition-all shadow-2xl active:scale-95"
                >
                  {t.landing.ctaBtn}
                </button>
              </div>

              <div className="hidden lg:block relative">
                <div className="absolute -inset-8 bg-white/20 rounded-[64px] blur-3xl -z-10" />
                <div className="rounded-[64px] overflow-hidden border-4 border-white/30 shadow-3xl aspect-[4/3] transform rotate-2 hover:rotate-0 transition-transform duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200&h=900" 
                    alt="Team success and peace of mind" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-10 -left-10 p-8 bg-white rounded-[40px] shadow-3xl border border-blue-50 flex items-center gap-5 animate-bounce-slow">
                  <div className="w-14 h-14 bg-green-50 rounded-3xl flex items-center justify-center shadow-inner">
                    <Shield className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-black text-xl tracking-tight">Sécurité Totale</p>
                    <p className="text-gray-500 text-sm font-medium">Chiffrement de bout en bout</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
