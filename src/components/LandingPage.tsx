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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-bold mb-8 border border-blue-100"
          >
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              <Search className="w-3.5 h-3.5 opacity-50" />
            </div>
            {t.landing.heroBadge}
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-black tracking-tight text-gray-900 mb-8 leading-[1.1]"
          >
            {t.landing.heroTitle}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {t.landing.heroSubtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={onLogin}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2 group"
            >
              {t.common.start}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="#mission"
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-600 rounded-2xl font-bold text-lg border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
            >
              {t.landing.missionBtn}
            </a>
          </motion.div>

          <div className="mt-16 flex justify-center gap-2 flex-wrap">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                  language === lang.code 
                    ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105" 
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
                )}
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Association Mission Section */}
      <section id="mission" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl" />
              <div className="relative bg-white p-8 rounded-[40px] shadow-xl border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <Users className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{t.landing.frist} Afrokonexion e.V.</h3>
                    <p className="text-sm text-gray-400">{t.landing.bescheid}</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t.landing.associationText}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    {t.landing.check1}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    {t.landing.check2}
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    {t.landing.check3}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
                {t.landing.missionTitle}
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t.landing.missionText}
              </p>
              <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6 text-red-500 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{t.landing.supportText}</h4>
                  <p className="text-sm text-gray-500">{t.landing.supportText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{t.landing.whyTitle}</h2>
            <p className="text-gray-500">{t.landing.whySubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t.landing.feature1Title,
                desc: t.landing.feature1Desc,
                icon: (
                  <div className="relative">
                    <Zap className="w-6 h-6 text-blue-600" />
                    <Search className="w-3.5 h-3.5 text-blue-400 absolute -bottom-1 -right-1" />
                  </div>
                ),
                bg: "bg-blue-50"
              },
              {
                title: t.landing.feature2Title,
                desc: t.landing.feature2Desc,
                icon: <Shield className="w-6 h-6 text-green-600" />,
                bg: "bg-green-50"
              },
              {
                title: t.landing.feature3Title,
                desc: t.landing.feature3Desc,
                icon: <Globe className="w-6 h-6 text-purple-600" />,
                bg: "bg-purple-50"
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-white rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", feature.bg)}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Survival Guide Preview */}
      <section className="py-24 bg-blue-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-blue-200 text-sm font-bold mb-6 border border-white/10">
                <BookOpen className="w-4 h-4" />
                {t.landing.guideBadge}
              </div>
              <h2 className="text-4xl font-black mb-6 leading-tight">{t.landing.guideTitle}</h2>
              <p className="text-blue-100/70 text-lg mb-8 leading-relaxed">
                {t.landing.guideText}
              </p>
              <button 
                onClick={onLogin}
                className="px-8 py-4 bg-white text-blue-900 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all flex items-center gap-2"
              >
                {t.landing.guideBtn}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
                  <h4 className="font-bold mb-2">{t.landing.frist}</h4>
                  <p className="text-xs text-blue-100/50">{t.landing.fristDesc}</p>
                </div>
                <div className="p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
                  <h4 className="font-bold mb-2">{t.landing.bescheid}</h4>
                  <p className="text-xs text-blue-100/50">{t.landing.bescheidDesc}</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
                  <h4 className="font-bold mb-2">{t.landing.original}</h4>
                  <p className="text-xs text-blue-100/50">{t.landing.originalDesc}</p>
                </div>
                <div className="p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
                  <h4 className="font-bold mb-2">{t.landing.mahnung}</h4>
                  <p className="text-xs text-blue-100/50">{t.landing.mahnungDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[48px] p-12 sm:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-white rounded-full blur-[100px]" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black mb-8 relative z-10">
              {t.landing.readyTitle}
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto relative z-10">
              {t.landing.readySubtitle}
            </p>
            <button 
              onClick={onLogin}
              className="px-12 py-5 bg-white text-blue-600 rounded-2xl font-black text-xl hover:bg-blue-50 transition-all shadow-xl relative z-10"
            >
              {t.landing.ctaBtn}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
