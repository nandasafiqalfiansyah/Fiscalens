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
    - Belanja Infrastruktur: Rp ${latestData.infrastructureSpend} Miliar
    - Perlindungan Sosial: Rp ${latestData.socialProtection} Miliar
    - Kecepatan Ekonomi Digital: ${latestData.digitalVelocity}%
    - Indeks Keyakinan Konsumen (CCI): ${latestData.consumerConfidence}
    
    Data Sebelumnya (${previousData.month} ${previousData.year}):
    - Skor Efektivitas: ${previousData.budgetEffectiveness}
    - Kecepatan Digital: ${previousData.digitalVelocity}%
    
    Berikan analisis mendalam (minimal 4 poin detail) mengenai:
    1. Korelasi antara belanja infrastruktur dan perlindungan sosial terhadap daya beli.
    2. Analisis akselerasi ekonomi digital pasca stimulus fiskal.
    3. Pergerakan Indeks Keyakinan Konsumen di tengah fluktuasi inflasi.
    4. **Rekomendasi Efisiensi Anggaran:** Terfokus pada alokasi sektoral yang paling berdampak.
    
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
