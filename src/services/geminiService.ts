import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY || "";

export interface BriefAnalysis {
  sender: string;
  urgency: "URGENT" | "IMPORTANT" | "INFO";
  type: string;
  category: "RESIDENCE" | "FAMILY" | "FINANCE" | "HEALTH" | "WORK" | "OTHER";
  fullExplanation: string;
  summary: string;
  vocabulary: {
    german: string;
    translation: string;
    context: string;
  }[];
  requirements: string[];
  deadline: string;
  expirationDate?: string;
  nextSteps: string[];
  reassurance: string;
  confidenceScore: number;
  interpretationReasoning: string;
  isUnsure: boolean;
  suggestedReplies: {
    title: string;
    description: string;
    type: "PAYMENT" | "CONTEST" | "DELAY" | "INFO";
  }[];
}

export async function analyzeBrief(base64Image: string, mimeType: string, userLanguage: string = "Français"): Promise<BriefAnalysis> {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `Tu es un assistant expert et surtout TRÈS HUMAIN, chaleureux et empathique, spécialisé dans l'aide à la lecture de courriers administratifs en Allemagne. Tu travailles pour l'association "Kulturverein Afrokonexion e.V.".
Ton but est de rassurer l'utilisateur, de lui expliquer les choses simplement comme un ami expert le ferait, tout en restant précis et VRAI.

OPTIMISATION : Sois efficace et concis pour une réponse rapide, sans perdre la qualité de l'information.

Analyse ce courrier allemand et réponds en ${userLanguage} au format JSON strict avec les champs suivants:
- sender: l'expéditeur identifié.
- urgency: "URGENT" (rouge), "IMPORTANT" (orange), ou "INFO" (vert).
- type: type de document (ex: Aufenthaltstitel, Kindergeld-Bescheid, etc.).
- category: "RESIDENCE", "FAMILY", "FINANCE", "HEALTH", "WORK", "OTHER".
- fullExplanation: Une explication CONCISE, CLAIRE et PÉDAGOGIQUE de l'essentiel de la lettre. Explique le contexte, pourquoi ils écrivent, et ce que cela signifie concrètement pour l'utilisateur. Utilise un ton humain et bienveillant.
- summary: Un résumé très court (1-2 phrases).
- vocabulary: Une liste de 2 à 3 mots ou expressions clés ESSENTIELS en ALLEMAND trouvés dans la lettre, avec leur traduction et une explication du contexte.
- requirements: liste des éléments demandés.
- deadline: date limite mentionnée (sinon "Non identifiée").
- expirationDate: date de fin de validité mentionnée (ex: fin de visa), sinon "Non identifiée".
- nextSteps: actions suggérées pour vérifier ou avancer.
- reassurance: un message de rassurance personnalisé et humain.
- confidenceScore: ton niveau de confiance de 0 à 100.
- interpretationReasoning: ton raisonnement technique.
- isUnsure: true si tu as un doute critique.
- suggestedReplies: 2-3 types de réponses types.

Format de réponse attendu:
{
  "sender": "...",
  "urgency": "URGENT" | "IMPORTANT" | "INFO",
  "type": "...",
  "category": "...",
  "fullExplanation": "...",
  "summary": "...",
  "vocabulary": [{"german": "...", "translation": "...", "context": "..."}],
  "requirements": ["..."],
  "deadline": "...",
  "expirationDate": "...",
  "nextSteps": ["..."],
  "reassurance": "...",
  "confidenceScore": 85,
  "interpretationReasoning": "...",
  "isUnsure": false,
  "suggestedReplies": [{"title": "...", "description": "...", "type": "..."}]
}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              data: base64Image.split(',')[1] || base64Image,
              mimeType: mimeType
            }
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json"
    }
  });

  try {
    const text = response.text || "{}";
    return JSON.parse(text) as BriefAnalysis;
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Erreur lors de l'analyse du document.");
  }
}

export async function generateReplyDraft(
  analysis: BriefAnalysis, 
  replyType: string, 
  userLanguage: string = "Français"
): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `Tu es un expert administratif allemand. 
Basé sur l'analyse suivante d'un courrier reçu de "${analysis.sender}" (Type: ${analysis.type}), rédige une lettre de réponse officielle en ALLEMAND.
Le type de réponse souhaité est : ${replyType}.

La lettre doit être formelle, inclure des placeholders comme [NOM], [ADRESSE], [NUMÉRO DE DOSSIER] là où c'est nécessaire.
Ajoute également une traduction ou explication courte de la lettre en ${userLanguage} à la fin.

Réponds uniquement avec le texte de la lettre et sa traduction.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt
  });

  return response.text || "Erreur lors de la génération de la réponse.";
}
