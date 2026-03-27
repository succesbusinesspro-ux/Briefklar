import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { translations, Language } from '../lib/translations';

interface LegalModalProps {
  onClose: () => void;
  language: string;
}

export const Impressum: React.FC<LegalModalProps> = ({ onClose, language }) => {
  const t = translations[language as Language] || translations.Français;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-8 w-full max-w-2xl relative shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="prose prose-blue max-w-none">
          <h1 className="text-2xl font-bold mb-6">{t.common.impressum}</h1>
          
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2">Angaben gemäß § 5 TMG</h2>
            <p>BriefKlar App<br />
            Abra Dzigbodi AGBEVOHIA<br />
            Kirchstraße 11<br />
            73730 Esslingen Neckar</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2">Kontakt</h2>
            <p>E-Mail: info@briefklar.de</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2">Redaktionell verantwortlich</h2>
            <p>Kodzo Doh Dogbeda AKPADJE<br />
            Kirchstraße 11, 73730 Esslingen Neckar<br />
            E-Mail: kodzo.akpadje@gmail.com</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2">EU-Streitschlichtung</h2>
            <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline ml-1">
              https://ec.europa.eu/consumers/odr/
            </a>.<br />
            Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
          </section>
        </div>

        <button 
          onClick={onClose}
          className="mt-8 w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
        >
          {t.common.close}
        </button>
      </motion.div>
    </div>
  );
};

export const PrivacyPolicy: React.FC<LegalModalProps> = ({ onClose, language }) => {
  const t = translations[language as Language] || translations.Français;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl p-8 w-full max-w-2xl relative shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="prose prose-blue max-w-none">
          <h1 className="text-2xl font-bold mb-6">{t.common.privacy}</h1>
          
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2">1. Datenschutz auf einen Blick</h2>
            <h3 className="font-bold mt-4">Allgemeine Hinweise</h3>
            <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2">2. Hosting und Content Delivery Networks (CDN)</h2>
            <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
            <h3 className="font-bold mt-2">Google Cloud / Firebase</h3>
            <p>Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2">3. Datenerfassung sur cette application</h2>
            <h3 className="font-bold mt-2">Supabase (Datenbank & Authentifizierung)</h3>
            <p>Nous utilisons Supabase pour stocker vos documents (si vous choisissez de les sauvegarder) et gérer votre compte. Les données sont hébergées dans l'UE (Francfort) et sont chiffrées.</p>
            
            <h3 className="font-bold mt-4">Google Gemini (Analyse IA)</h3>
            <p>Le texte extrait de vos documents est envoyé à l'API Google Gemini pour analyse. Conformément aux conditions d'utilisation de l'API Google Cloud, ces données ne sont pas utilisées pour entraîner les modèles d'IA de Google.</p>
 
            <h3 className="font-bold mt-4">Mode Privé (Incognito)</h3>
            <p>En activant le "Mode Privé", l'analyse est effectuée uniquement en mémoire vive. Aucune donnée n'est stockée dans notre base de données, et l'option de sauvegarde dans le coffre-fort est désactivée.</p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2">4. Ihre Rechte</h2>
            <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.</p>
          </section>
        </div>

        <button 
          onClick={onClose}
          className="mt-8 w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
        >
          {t.common.close}
        </button>
      </motion.div>
    </div>
  );
};
