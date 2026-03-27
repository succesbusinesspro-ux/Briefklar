import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Info, ArrowRight, Clock, ShieldCheck, FileEdit, Copy, Check, Loader2, Save } from 'lucide-react';
import { BriefAnalysis, generateReplyDraft } from '@/src/services/geminiService';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '@/src/lib/supabase';
import { User } from '@supabase/supabase-js';
import { translations, Language } from '../lib/translations';

interface AnalysisResultProps {
  analysis: BriefAnalysis;
  onReset: () => void;
  userLanguage: string;
  user: User | null;
  isPro?: boolean;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, onReset, userLanguage, user, isPro = false }) => {
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);
  const [draftReply, setDraftReply] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const t = translations[userLanguage as Language] || translations.Français;

  const handleSaveToVault = async () => {
    if (!user) return;
    if (!isPro) {
      alert(t.dashboard.vaultText);
      return;
    }
    setIsSaving(true);
    try {
      const { error } = await supabase.from('documents').insert({
        user_id: user.id,
        sender: analysis.sender,
        type_document: analysis.type,
        category: analysis.category,
        urgency: analysis.urgency,
        summary: analysis.summary,
        deadline: analysis.deadline,
        expiration_date: analysis.expirationDate,
        requirements: analysis.requirements,
        next_steps: analysis.nextSteps,
        reassurance: analysis.reassurance
      });
      if (error) throw error;
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving to vault:", error);
      alert(t.common.error);
    } finally {
      setIsSaving(false);
    }
  };

  const urgencyConfig = {
    URGENT: {
      icon: <AlertCircle className="w-6 h-6" />,
      class: "urgency-red",
      label: userLanguage === 'Arabic' ? "عاجل" : "URGENT"
    },
    IMPORTANT: {
      icon: <Info className="w-6 h-6" />,
      class: "urgency-orange",
      label: userLanguage === 'Arabic' ? "هام" : "IMPORTANT"
    },
    INFO: {
      icon: <CheckCircle2 className="w-6 h-6" />,
      class: "urgency-green",
      label: userLanguage === 'Arabic' ? "معلومات" : "INFO"
    }
  };

  const categoryLabels = t.categories;

  const handleGenerateReply = async (type: string) => {
    setIsGeneratingReply(true);
    setDraftReply(null);
    try {
      const draft = await generateReplyDraft(analysis, type, userLanguage);
      setDraftReply(draft);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGeneratingReply(false);
    }
  };

  const copyToClipboard = () => {
    if (draftReply) {
      navigator.clipboard.writeText(draftReply);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-50 border-green-100";
    if (score >= 70) return "text-orange-600 bg-orange-50 border-orange-100";
    return "text-red-600 bg-red-50 border-red-100";
  };

  const config = urgencyConfig[analysis.urgency];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto space-y-6 pb-24"
    >
      {/* Legal Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl flex items-start gap-4 shadow-sm">
        <div className="p-2 bg-amber-100 rounded-lg">
          <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
        </div>
        <div className="text-sm text-amber-900 leading-relaxed">
          <p className="font-bold mb-1 uppercase tracking-wider text-xs">{t.common.warning}</p>
          <p>
            {t.common.legalDisclaimer}
          </p>
          <ul className="mt-2 space-y-1 list-disc list-inside opacity-80 text-xs">
            <li>{t.common.notLegalAdvice}</li>
            <li>{t.common.notReplacement}</li>
            <li>{t.common.consultExpert}</li>
          </ul>
        </div>
      </div>

      {analysis.isUnsure && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border-2 border-red-200 p-5 rounded-2xl flex items-start gap-4"
        >
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
          </div>
          <div>
            <h4 className="font-bold text-red-900">{t.common.unsureTitle}</h4>
            <p className="text-sm text-red-800 mt-1">
              {t.common.unsureText}
            </p>
          </div>
        </motion.div>
      )}

      <div className={cn("p-6 rounded-2xl border-2 flex flex-col md:flex-row md:items-center justify-between gap-4", config.class)}>
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-full shadow-sm">
            {config.icon}
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">{config.label} — {analysis.type}</h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm opacity-90">{t.analysis.sender} : {analysis.sender}</p>
              <span className="text-[10px] px-2 py-0.5 bg-white/20 rounded-full font-bold uppercase">
                {categoryLabels[analysis.category as keyof typeof categoryLabels]}
              </span>
            </div>
          </div>
        </div>
        
        <div className={cn("px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-2", getConfidenceColor(analysis.confidenceScore))}>
          {t.analysis.confidence} : {analysis.confidenceScore}%
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Detailed Explanation Section */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-blue-900 uppercase tracking-widest">{t.analysis.explanationTitle}</h3>
            </div>
            <div className="prose prose-blue max-w-none">
              <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
                {analysis.fullExplanation}
              </p>
            </div>
          </section>

          {/* Key Vocabulary Section */}
          {analysis.vocabulary && analysis.vocabulary.length > 0 && (
            <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                {t.analysis.vocabularyTitle}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.vocabulary.map((item, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-blue-700 text-lg">{item.german}</span>
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-tighter">{t.analysis.translation}</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 mb-2">{item.translation}</p>
                    <p className="text-xs text-gray-500 italic leading-snug">{item.context}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">{t.analysis.summaryTitle}</h3>
            <p className="text-lg leading-relaxed">{analysis.summary}</p>
            <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{t.analysis.reasoningTitle}</p>
              <p className="text-xs text-gray-500 italic leading-relaxed">{analysis.interpretationReasoning}</p>
            </div>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">{t.analysis.requirementsTitle}</h3>
            <ul className="space-y-3">
              {analysis.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-gray-700">{req}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">{t.analysis.nextStepsTitle}</h3>
            <div className="space-y-4">
              {analysis.nextSteps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 pt-1">{step}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[10px] text-gray-400 text-center italic">
              {t.analysis.stepsNote}
            </p>
          </section>

          <section className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl shadow-xl text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/10 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold">{t.analysis.tipsTitle}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold shrink-0 mt-1">1</div>
                <p className="text-sm text-gray-300"><span className="text-white font-bold">{t.analysis.tip1Title}</span> {t.analysis.tip1Text} <span className="text-blue-400 font-bold">"{categoryLabels[analysis.category as keyof typeof categoryLabels]}"</span>.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold shrink-0 mt-1">2</div>
                <p className="text-sm text-gray-300"><span className="text-white font-bold">{t.analysis.tip2Title}</span> {t.analysis.tip2Text}</p>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold shrink-0 mt-1">3</div>
                <p className="text-sm text-gray-300"><span className="text-white font-bold">{t.analysis.tip3Title}</span> {t.analysis.tip3Text}</p>
              </div>
            </div>
          </section>

          {/* Reply Generator Section */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <FileEdit className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold">{t.analysis.replyTitle}</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {analysis.suggestedReplies?.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => handleGenerateReply(reply.title)}
                  disabled={isGeneratingReply}
                  className="p-4 text-left border border-gray-100 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group"
                >
                  <p className="font-bold text-gray-900 group-hover:text-blue-600 mb-1">{reply.title}</p>
                  <p className="text-xs text-gray-500">{reply.description}</p>
                </button>
              ))}
            </div>

            <AnimatePresence>
              {isGeneratingReply && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center py-8 gap-3"
                >
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="text-sm text-gray-500">{t.analysis.replyLoading}</p>
                </motion.div>
              )}

              {draftReply && !isGeneratingReply && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <div className="relative">
                    <div className="absolute right-4 top-4 flex gap-2">
                      <button 
                        onClick={copyToClipboard}
                        className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center gap-2 text-xs font-medium"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        {copied ? t.common.copied : t.common.copy}
                      </button>
                    </div>
                    <div className="bg-gray-50 p-6 pt-14 rounded-xl border border-gray-200 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                      {draftReply}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 italic text-center">
                    {t.analysis.replyNote}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-gray-400 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">{t.analysis.deadlineTitle}</span>
            </div>
            <p className="text-xl font-bold text-gray-900">{analysis.deadline}</p>
          </div>

          {analysis.expirationDate && analysis.expirationDate !== "Aucune" && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-gray-400 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider">{t.analysis.expirationTitle}</span>
              </div>
              <p className="text-xl font-bold text-blue-600">{analysis.expirationDate}</p>
            </div>
          )}

          <div className="bg-blue-600 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-semibold uppercase tracking-wider">{t.analysis.reassuranceTitle}</span>
            </div>
            <p className="text-sm leading-relaxed italic">"{analysis.reassurance}"</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2">{t.analysis.imageQualityTitle}</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              {t.analysis.imageQualityText}
            </p>
          </div>

          {user && (
            <button 
              onClick={handleSaveToVault}
              disabled={isSaving || saveSuccess}
              className={cn(
                "w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2",
                saveSuccess 
                  ? "bg-green-100 text-green-600 border border-green-200" 
                  : "bg-white text-blue-600 border border-blue-200 hover:bg-blue-50"
              )}
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : (saveSuccess ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />)}
              {saveSuccess ? t.common.saved : t.analysis.saveToVault}
            </button>
          )}

          <button 
            onClick={onReset}
            className="w-full py-4 bg-gray-100 text-gray-600 rounded-2xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            {t.analysis.analyzeAnother}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
