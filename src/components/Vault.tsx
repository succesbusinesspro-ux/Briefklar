import React, { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase';
import { FolderLock, Loader2, Calendar, AlertCircle, Info, CheckCircle2, Trash2, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface SavedDocument {
  id: string;
  sender: string;
  type_document: string;
  category: "RESIDENCE" | "FAMILY" | "FINANCE" | "HEALTH" | "WORK" | "OTHER";
  urgency: "URGENT" | "IMPORTANT" | "INFO";
  summary: string;
  deadline: string;
  expiration_date?: string;
  created_at: string;
}

export const Vault: React.FC = () => {
  const [documents, setDocuments] = useState<SavedDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<SavedDocument | null>(null);
  const [filter, setFilter] = useState<string>("ALL");

  const categoryLabels = {
    RESIDENCE: "Séjour",
    FAMILY: "Famille",
    FINANCE: "Finance",
    HEALTH: "Santé",
    WORK: "Travail",
    OTHER: "Autre"
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setDocuments(data);
    }
    setLoading(false);
  };

  const deleteDocument = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce document ?")) return;
    const { error } = await supabase.from('documents').delete().eq('id', id);
    if (!error) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  const urgencyIcons = {
    URGENT: <AlertCircle className="w-4 h-4 text-red-500" />,
    IMPORTANT: <Info className="w-4 h-4 text-orange-500" />,
    INFO: <CheckCircle2 className="w-4 h-4 text-green-500" />
  };

  const filteredDocuments = filter === "ALL" 
    ? documents 
    : documents.filter(doc => doc.category === filter);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-gray-500">Chargement de votre coffre-fort...</p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-gray-100 text-center shadow-sm">
        <FolderLock className="w-16 h-16 text-gray-200 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">Votre coffre-fort est vide pour l'instant.</p>
        <p className="text-gray-400 mt-2">Analysez un document et cliquez sur "Sauvegarder" pour le retrouver ici.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setFilter("ALL")}
          className={cn(
            "px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
            filter === "ALL" ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-100"
          )}
        >
          Tous
        </button>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button 
            key={key}
            onClick={() => setFilter(key)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap",
              filter === key ? "bg-blue-600 text-white" : "bg-white text-gray-600 border border-gray-100"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredDocuments.map((doc) => (
          <motion.div 
            key={doc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between group gap-4"
          >
            <div className="flex items-start sm:items-center gap-4 flex-grow min-w-0">
              <div className={cn(
                "p-3 rounded-xl shrink-0",
                doc.urgency === "URGENT" ? "bg-red-50" : doc.urgency === "IMPORTANT" ? "bg-orange-50" : "bg-green-50"
              )}>
                {urgencyIcons[doc.urgency]}
              </div>
              <div className="min-w-0 flex-grow">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-gray-900 truncate">{doc.type_document}</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full font-bold uppercase shrink-0">
                    {categoryLabels[doc.category]}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">{doc.sender}</p>
                
                <div className="flex items-center gap-4 mt-2 flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {new Date(doc.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-xs font-semibold text-gray-700 break-words">
                    Action: {doc.deadline}
                  </span>
                  {doc.expiration_date && doc.expiration_date !== "Aucune" && (
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase tracking-wider shrink-0">
                      Expire: {doc.expiration_date}
                    </span>
                  )}
                </div>
              </div>
            </div>
          
          <div className="flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity self-end sm:self-center">
            <button 
              onClick={() => deleteDocument(doc.id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setSelectedDoc(doc)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      ))}
      </div>

      {/* Details Modal Placeholder */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 w-full max-w-2xl relative shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedDoc(null)}
                className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
              <h2 className="text-2xl font-bold mb-6 pr-8 break-words">{selectedDoc.type_document}</h2>
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-semibold text-gray-400 uppercase mb-1">Catégorie</p>
                  <p className="font-bold text-blue-600">{categoryLabels[selectedDoc.category]}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm font-semibold text-gray-400 uppercase mb-1">Résumé</p>
                  <p className="text-gray-700 leading-relaxed break-words">{selectedDoc.summary}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-sm font-semibold text-gray-400 uppercase mb-1">Deadline / Action</p>
                    <p className="font-bold break-words">{selectedDoc.deadline}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm font-semibold text-blue-400 uppercase mb-1">Expiration</p>
                    <p className="font-bold text-blue-600 break-words">{selectedDoc.expiration_date || "N/A"}</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="mt-8 w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
              >
                Fermer
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
