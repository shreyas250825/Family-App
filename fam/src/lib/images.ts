/**
 * Curated family imagery — Unsplash CDN (reliable for Vercel demo).
 */
const CDN = {
  hero: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1400&h=600&fit=crop&q=85&auto=format',
  brunch: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=900&h=600&fit=crop&q=85&auto=format',
  dinner: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&h=600&fit=crop&q=85&auto=format',
  vacation: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&h=600&fit=crop&q=85&auto=format',
  beach: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&h=600&fit=crop&q=85&auto=format',
  birthday: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=600&fit=crop&q=85&auto=format',
  reunion: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&h=600&fit=crop&q=85&auto=format',
  diwali: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=900&h=600&fit=crop&q=85&auto=format',
  gathering: 'https://images.unsplash.com/photo-1609220136736-443891a64571?w=900&h=600&fit=crop&q=85&auto=format',
  travel: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=900&h=600&fit=crop&q=85&auto=format',
  memory1: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&h=600&fit=crop&q=85&auto=format',
  memory2: 'https://images.unsplash.com/photo-1609220136736-443891a64571?w=600&h=600&fit=crop&q=85&auto=format',
  memory3: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=600&fit=crop&q=85&auto=format',
  cover: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1400&h=600&fit=crop&q=85&auto=format',
} as const;

export const FAMILY_IMAGES = CDN;

export const IMAGE_FALLBACK: Record<keyof typeof FAMILY_IMAGES, string> = { ...CDN };

export const GRADIENTS: Record<string, string> = {
  warm: 'linear-gradient(135deg, #1a1033 0%, #2d1b4e 100%)',
  ocean: 'linear-gradient(135deg, #0c1929 0%, #1e3a5f 100%)',
  sunset: 'linear-gradient(135deg, #2d1b14 0%, #4a1942 100%)',
  brunch: 'linear-gradient(135deg, #1c1917 0%, #44403c 100%)',
};
