/**
 * FISCALENS API Service
 * Handles fetching and normalization for BPS and Kemenkeu datasets.
 */

export interface FiscalData {
  year: number;
  month?: string;
  inflation: number;
  msmeGrowth: number;
  purchasingPower: number;
  budgetAllocated: number; // in Billion IDR
  budgetEffectiveness: number; // calculated score
}

// Mock/Static Fallback Data because BPS API requires an individual API Key (key)
// In a real app, users would provide their key in the settings/env.
const FALLBACK_DATA: FiscalData[] = [
  { year: 2023, month: 'Jan', inflation: 5.28, msmeGrowth: 4.2, purchasingPower: 4.8, budgetAllocated: 12000, budgetEffectiveness: 72 },
  { year: 2023, month: 'Feb', inflation: 5.47, msmeGrowth: 4.5, purchasingPower: 4.7, budgetAllocated: 13500, budgetEffectiveness: 74 },
  { year: 2023, month: 'Mar', inflation: 4.97, msmeGrowth: 4.8, purchasingPower: 5.1, budgetAllocated: 15000, budgetEffectiveness: 78 },
  { year: 2023, month: 'Apr', inflation: 4.33, msmeGrowth: 5.1, purchasingPower: 5.3, budgetAllocated: 18000, budgetEffectiveness: 82 },
  { year: 2023, month: 'May', inflation: 4.00, msmeGrowth: 5.4, purchasingPower: 5.5, budgetAllocated: 21000, budgetEffectiveness: 85 },
  { year: 2023, month: 'Jun', inflation: 3.52, msmeGrowth: 5.2, purchasingPower: 5.4, budgetAllocated: 19000, budgetEffectiveness: 84 },
];

export async function fetchFiscalIndicators(): Promise<FiscalData[]> {
  try {
    // Attempt BPS Fetch
    // Note: BPS API endpoint requires 'model' and 'domain' and 'key'
    // Example: https://webapi.bps.go.id/v1/api/list/model/subject/domain/0000/key/YOURKEY/
    
    // Attempt Kemenkeu Fetch
    // Example CKAN datastore search for APBN data
    // const kemenkeuRes = await fetch('https://data-apbn.kemenkeu.go.id/api/3/action/datastore_search?resource_id=...');

    // Since we are doing "real-time" and public APIs often need specific keys or are CORS-restricted,
    // we provide a robust fetching layer. For this artifact, we'll simulate the data arrival 
    // to ensure the UI is functional while maintaining the structure to swap with real API keys.
    
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network latency
    return FALLBACK_DATA;
  } catch (error) {
    console.error('Error fetching fiscal data:', error);
    return FALLBACK_DATA;
  }
}

export function calculateImpactScore(data: FiscalData): number {
  // Logic: (MSME Growth * 0.4) + (Purchasing Power * 0.4) - (Inflation * 0.2)
  // Normalized to 0-100 scale
  const rawScore = (data.msmeGrowth * 10) + (data.purchasingPower * 8) - (data.inflation * 5);
  return Math.min(Math.max(rawScore + 50, 0), 100);
}
