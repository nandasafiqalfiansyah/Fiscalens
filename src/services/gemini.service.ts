import { GoogleGenAI } from "@google/genai";
import { FiscalData } from "./api.service";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateFiscalInsights(data: FiscalData[]) {
  if (!process.env.GEMINI_API_KEY) {
    return "API Key Gemini tidak ditemukan. Silakan konfigurasi Rahasia (Secrets) Anda untuk mendapatkan insight otomatis.";
  }

  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];

  const prompt = `
    Anda adalah pakar ekonomi makro dari FISCALENS. 
    Analisis data fiskal terbaru berikut untuk Indonesia:
    
    Data Terbaru (${latestData.month} ${latestData.year}):
    - Inflasi: ${latestData.inflation}%
    - Pertumbuhan UMKM: ${latestData.msmeGrowth}%
    - Daya Beli: ${latestData.purchasingPower}%
    - Anggaran Dialokasikan: Rp ${latestData.budgetAllocated} Miliar
    - Skor Efektivitas: ${latestData.budgetEffectiveness}
    
    Data Sebelumnya:
    - Skor Efektivitas: ${previousData.budgetEffectiveness}
    
    Berikan analisis singkat (maks 3 poin) mengenai:
    1. Hubungan antara belanja pemerintah dan gairah UMKM.
    2. Dampak inflasi terhadap daya beli masyarakat saat ini.
    3. Rekomendasi strategis untuk efisiensi anggaran periode berikutnya.
    
    Gunakan bahasa Indonesia yang profesional dan lugas.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Gagal menghasilkan insight otomatis saat ini.";
  }
}
