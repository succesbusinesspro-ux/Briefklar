import { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { Auth } from './components/Auth';
import { Impressum, PrivacyPolicy } from './components/Legal';
import { Mail, User, LogOut, Cookie, Heart, Globe, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { supabase } from './lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { translations, Language } from './lib/translations';

export default function App() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [language, setLanguage] = useState<Language>("Français");

  const t = translations[language];

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowCookieBanner(true);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setShowAuth(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShowCookieBanner(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "Français", label: "Français", flag: "🇫🇷" },
    { code: "English", label: "English", flag: "🇬🇧" },
    { code: "Deutsch", label: "Deutsch", flag: "🇩🇪" },
    { code: "Arabic", label: "العربية", flag: "🇸🇦" },
    { code: "Spanish", label: "Español", flag: "🇪🇸" },
    { code: "Ukrainian", label: "Українська", flag: "🇺🇦" },
  ];

  return (
    <div className={cn("min-h-screen flex flex-col bg-white", language === "Arabic" && "font-arabic")} dir={language === "Arabic" ? "rtl" : "ltr"}>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[100] origin-left"
        style={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Header */}
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled 
          ? "bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-lg shadow-gray-100/20 py-2" 
          : "bg-white border-b border-transparent py-4"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center relative shadow-xl shadow-blue-100 group-hover:scale-105 transition-transform">
              <Mail className="text-white w-6 h-6" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-blue-100">
                <Search className="text-blue-600 w-3 h-3" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter leading-none text-gray-900">{t.common.appName}</span>
              <span className="text-[10px] font-black text-blue-600 tracking-[0.2em] uppercase mt-1">{t.common.byAssociation}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Language Selector in Header */}
            <div className="relative group">
              <button className="px-3 py-2 hover:bg-gray-50 rounded-2xl transition-all flex items-center gap-2.5 border border-transparent hover:border-gray-100">
                <Globe className="w-4.5 h-4.5 text-gray-400" />
                <span className="text-xl leading-none">{languages.find(l => l.code === language)?.flag}</span>
              </button>
              <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-[24px] shadow-3xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] p-2.5">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-4",
                      language === lang.code ? "bg-blue-50 text-blue-600 scale-[1.02]" : "hover:bg-gray-50 text-gray-500 hover:text-gray-900"
                    )}
                  >
                    <span className="text-xl leading-none grayscale-[0.2]">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="h-8 w-px bg-gray-100 mx-1 hidden sm:block" />

            {user ? (
              <div className="flex items-center gap-3 sm:gap-5">
                <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <span className="text-sm font-bold text-gray-700">{user.email?.split('@')[0]}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title={t.common.logout}
                >
                  <LogOut className="w-5.5 h-5.5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowAuth(true)}
                className="px-6 sm:px-8 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all text-sm font-black shadow-xl shadow-blue-100 whitespace-nowrap active:scale-95"
              >
                {t.common.login}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {user ? (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Dashboard 
                user={user} 
                language={language} 
                setLanguage={setLanguage} 
                languages={languages} 
              />
            </motion.div>
          ) : (
            <motion.div 
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LandingPage 
                onLogin={() => setShowAuth(true)} 
                language={language} 
                setLanguage={setLanguage} 
                languages={languages} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-gray-50 border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Mail className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight">{t.common.appName}</span>
              </div>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed mb-6">
                {t.landing.associationText}
              </p>
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 inline-flex">
                <Heart className="w-5 h-5 text-red-500 fill-current" />
                <span className="text-xs font-bold text-gray-700">Soutenu par la communauté</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-6">Application</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><button onClick={() => setShowAuth(true)} className="hover:text-blue-600">{t.common.login}</button></li>
                <li><button onClick={() => setShowAuth(true)} className="hover:text-blue-600">{t.auth.signup}</button></li>
                <li><a href="#" className="hover:text-blue-600">{t.landing.guideBtn}</a></li>
                <li><a href="#" className="hover:text-blue-600">{t.dashboard.vaultTitle}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-6">{t.common.legal}</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><button onClick={() => setShowImpressum(true)} className="hover:text-blue-600">{t.common.impressum}</button></li>
                <li><button onClick={() => setShowPrivacy(true)} className="hover:text-blue-600">{t.common.privacy}</button></li>
                <li><a href="#" className="hover:text-blue-600">{t.common.terms}</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 text-center text-gray-400 text-xs">
            <p>© 2026 {t.common.appName} — Initiative de l'association <a href="https://kulturverein-afrokonexion.org/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline">Kulturverein Afrokonexion e.V.</a></p>
            <p className="mt-2 max-w-2xl mx-auto leading-relaxed opacity-60">
              {t.common.warning} : {t.common.legalDisclaimer}
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showCookieBanner && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-[200]"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Cookie className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{t.common.cookieTitle}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {t.common.cookieText}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleAcceptCookies}
                className="flex-grow py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all"
              >
                {t.common.accept}
              </button>
              <button 
                onClick={() => setShowPrivacy(true)}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-bold text-sm hover:bg-gray-200 transition-all"
              >
                {t.common.details}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showAuth && <Auth onClose={() => setShowAuth(false)} language={language} />}
      {showImpressum && <Impressum onClose={() => setShowImpressum(false)} language={language} />}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} language={language} />}
    </div>
  );
}
