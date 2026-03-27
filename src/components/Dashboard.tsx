import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileUpload } from './FileUpload';
import { AnalysisResult } from './AnalysisResult';
import { Vault } from './Vault';
import { BriefAnalysis, analyzeBrief } from '../services/geminiService';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { Zap, FolderLock, Loader2, Shield, Crown, Info, BookOpen, AlertCircle, Clock, CheckCircle2, Search } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { translations, Language } from '../lib/translations';

interface DashboardProps {
  user: SupabaseUser;
  language: string;
  setLanguage: (lang: string) => void;
  languages: { code: string; label: string; flag: string }[];
}

export const Dashboard: React.FC<DashboardProps> = ({ user, language, setLanguage, languages }) => {
  const [view, setView] = useState<"analyze" | "vault" | "guide">("analyze");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<BriefAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [isPro, setIsPro] = useState(false); // Simulate Pro status

  const t = translations[language as Language] || translations.Français;

  const handleFileSelect = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const base64 = await fileToBase64(file);
      const result = await analyzeBrief(base64, file.type, language);
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.common.error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">{isPro ? t.dashboard.vaultTitle : t.dashboard.dashboardTitle}</h1>
          <p className="text-gray-500">
            {t.dashboard.welcome} {user.email?.split('@')[0]}
          </p>
        </div>

        <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-2xl">
          <button 
            onClick={() => setView("analyze")}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
              view === "analyze" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <div className="relative">
              <Zap className="w-4 h-4" />
              <Search className="w-2.5 h-2.5 text-blue-400 absolute -bottom-0.5 -right-0.5" />
            </div>
            {t.dashboard.tabAnalyze}
          </button>
          <button 
            onClick={() => setView("vault")}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
              view === "vault" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <FolderLock className="w-4 h-4" />
            {t.dashboard.tabVault}
          </button>
          <button 
            onClick={() => setView("guide")}
            className={cn(
              "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
              view === "guide" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <BookOpen className="w-4 h-4" />
            {t.dashboard.tabGuide}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "analyze" && (
          <motion.div 
            key="analyze"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            {!analysis ? (
              <div className="max-w-3xl mx-auto text-center">
                <div className="flex justify-center gap-4 mb-8">
                  <button 
                    onClick={() => setPrivacyMode(!privacyMode)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border",
                      privacyMode 
                        ? "bg-purple-600 text-white border-purple-600 shadow-lg scale-105" 
                        : "bg-white text-gray-500 border-gray-200 hover:border-purple-300"
                    )}
                  >
                    <Shield className="w-3 h-3" />
                    {privacyMode ? t.dashboard.privacyModeOn : t.dashboard.privacyModeOff}
                  </button>
                  <div className="group relative">
                    <Info className="w-4 h-4 text-gray-300 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-[10px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                      <p className="font-bold mb-1">{t.dashboard.privacyVsVault}</p>
                      <p className="opacity-80">
                        {t.analysis.tip3Text}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center gap-2 mb-8 flex-wrap">
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

                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">{t.dashboard.analyzeTitle}</h2>
                  <p className="text-gray-500">{t.dashboard.analyzeSubtitle}</p>
                </div>

                <FileUpload 
                  onFileSelect={handleFileSelect} 
                  isAnalyzing={isAnalyzing} 
                  privacyMode={privacyMode}
                  language={language}
                />

                {isAnalyzing && (
                  <div className="mt-8 flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    <p className="text-blue-600 font-medium animate-pulse">
                      {t.dashboard.analyzing}
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mt-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
                    {error}
                  </div>
                )}
              </div>
            ) : (
              <AnalysisResult 
                analysis={analysis} 
                onReset={() => setAnalysis(null)} 
                userLanguage={language}
                user={privacyMode ? null : user}
                isPro={isPro}
              />
            )}
          </motion.div>
        )}

        {view === "vault" && (
          <motion.div 
            key="vault"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {!isPro ? (
              <div className="bg-white rounded-[40px] p-12 border border-gray-100 text-center shadow-sm max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <Crown className="w-10 h-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-black mb-4">{t.common.activatePro}</h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  {t.dashboard.vaultText}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-left">
                  <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">{t.landing.check1}</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">{t.landing.check2}</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">{t.landing.check3}</span>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">{t.common.pro}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsPro(true)} // Simulate upgrade
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
                >
                  {t.common.activatePro} — 4.99€ / mois
                </button>
                <p className="mt-4 text-xs text-gray-400 italic">
                  {t.dashboard.proSimulationNote}
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{t.dashboard.vaultTitle}</h2>
                  <div className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold flex items-center gap-2">
                    <Crown className="w-3 h-3" />
                    {t.common.pro.toUpperCase()}
                  </div>
                </div>
                <Vault />
              </div>
            )}
          </motion.div>
        )}

        {view === "guide" && (
          <motion.div 
            key="guide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 p-12 rounded-[48px] text-white shadow-2xl">
              <h2 className="text-4xl font-black mb-8">{t.dashboard.guideTitle}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: t.dashboard.rule1Title,
                    desc: t.dashboard.rule1Text,
                    icon: <Shield className="w-6 h-6" />
                  },
                  {
                    title: t.dashboard.rule2Title,
                    desc: t.dashboard.rule2Text,
                    icon: <Clock className="w-6 h-6" />
                  },
                  {
                    title: t.dashboard.rule4Title,
                    desc: t.dashboard.rule4Text,
                    icon: <FolderLock className="w-6 h-6" />
                  }
                ].map((tip, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30">
                      {tip.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-3">{tip.title}</h4>
                    <p className="text-blue-100/70 text-sm leading-relaxed">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  {t.common.warning}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t.common.unsureText}
                </p>
              </div>
              <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-500" />
                  {t.dashboard.rule5Title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t.dashboard.rule5Text} <a href="https://kulturverein-afrokonexion.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline">{t.common.details}</a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
