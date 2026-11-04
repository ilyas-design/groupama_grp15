import type { AlertLevel, RiskType } from '@/content/anticiper';

/** Couleurs SVG par type de risque (fill = décor clair, stroke = motif/point, contrasté). */
export const riskColor: Record<RiskType, { fill: string; stroke: string }> = {
  hail: { fill: '#F2785C', stroke: '#B3442B' },
  flood: { fill: '#2DA9DA', stroke: '#0D6F95' },
  drought: { fill: '#B8925F', stroke: '#7A5A30' },
};

/** Pastille de légende : même couleur + même motif que sur la carte. */
export const riskSwatch: Record<RiskType, string> = {
  hail: 'bg-coral/30 bg-[radial-gradient(#B3442B_1.2px,transparent_1.4px)] [background-size:6px_6px]',
  flood: 'bg-water/30 bg-[repeating-linear-gradient(0deg,#0D6F95_0_1.2px,transparent_1.2px_4px)]',
  drought: 'bg-earth/30 bg-[repeating-linear-gradient(45deg,#7A5A30_0_1.2px,transparent_1.2px_4px)]',
};

export const levelStyle: Record<AlertLevel, string> = {
  high: 'bg-coral-lt text-coral-dk',
  medium: 'bg-sand-2 text-earth-dk',
  low: 'bg-leaf-lt text-leaf-dk',
};
