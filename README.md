# FISCALENS ANALYTICS - Intelligence Engine

## 1. Latar Belakang (Background)
FISCALENS ANALYTICS adalah platform dashboard intelijen fiskal yang dirancang untuk memberikan visualisasi dan analisis mendalam terhadap data ekonomi makro Indonesia. Di tengah kompleksitas data anggaran (APBN/APBD) dan indikator pasar (Inflasi, UMKM), sistem ini hadir untuk mentransformasi "Raw Data" menjadi "Strategic Insights" menggunakan teknologi kecerdasan buatan (Gemini AI).

Platform ini mengusung estetika *Brutalist-Minimalist* dengan nuansa *dark-mode* untuk fokus maksimal pada akurasi data dan kecepatan transmisi informasi.

## 2. Fitur Utama (Core Features)

### A. Dashboard Real-Time
- **6-Month Matrix Tracking**: Pemantauan indikator ekonomi selama 6 bulan terakhir.
- **Dynamic KPI Cards**: Kartu metrik yang menampilkan indeks digital, kepercayaan konsumen, dan alokasi anggaran dengan pergerakan tren.
- **Integrated Charting**: Visualisasi korelasi antara inflasi dan pertambahan UMKM menggunakan D3-powered charts.

### B. Segmentasi Data Analitik
- **Nasional (APBN)**: Fokus pada distribusi anggaran pusat.
- **Daerah (APBD)**: Sinkronisasi fiskal antar wilayah.
- **UMKM & Retail**: Kecepatan velocity ekonomi digital di sektor mikro.
- **Daya Beli (CPI)**: Fluktuasi indeks harga konsumen dan daya serap pasar.

### C. Geospatial Intelligence
- **3D-Projected Mapping**: Visualisasi spasial sebaran efisiensi fiskal di 5 pulau besar di Indonesia (Sumatera, Jawa, Kalimantan, Sulawesi, Papua).
- **Regional Signal Mapping**: Analisis perbedaan kecepatan ekonomi digital antar region.

### D. AI Executive Summary
- **Gemini Neural Engine**: Menggunakan modalitas AI untuk melakukan regresi data secara otomatis.
- **Automated Intelligence Briefing**: Menghasilkan poin-poin kesimpulan strategis secara "Live" berdasarkan data yang aktif.
- **Structural Findings**: Analisis multiplier fiskal dan korelasi pasar secara instan.

## 3. Teknologi yang Digunakan (Tech Stack)

| Komponen | Teknologi |
| :--- | :--- |
| **Framework** | React 18+ (Vite) |
| **Styling** | Tailwind CSS (Arbitrary Values & Dark Theme) |
| **Icons** | Lucide React |
| **Animations** | Framer Motion (Motion for React) |
| **Data Viz** | Recharts / SVG Optimization |
| **Intelligence** | Gemini AI (Google Generative AI SDK) |

## 4. Arsitektur Data
Sistem menggunakan strategi **Client-Side Fetch & Normalization**. Data dikonfigurasi melalui `api.service.ts` yang mensimulasikan normalisasi dari endpoint BPS (Badan Pusat Statistik) dan Open Data Kemenkeu.

## 5. Akses Publik
Aplikasi telah dikonfigurasi untuk **Public Guest Access**. Tidak memerlukan autentikasi khusus (SSO/OAuth) untuk navigasi publik, memungkinkan akses cepat ke node-node intelijen bagi seluruh stakeholder ekonomi.

---
*FISCALENS © 2024 - Automated Fiscal Intelligence for National Growth*
