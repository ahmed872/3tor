/**
 * توليد صور المنتجات والمشاهد كملفات SVG محلية.
 * Generates every piece of fragrance artwork used on the site as a local SVG,
 * so the design never depends on an external image host or ships a broken URL.
 *
 * Run: npm run art
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = (p) => {
  const full = resolve(root, 'public/images', p);
  mkdirSync(dirname(full), { recursive: true });
  return full;
};

/* ------------------------------------------------------------------ */
/* لوحات الألوان / palettes                                            */
/* ------------------------------------------------------------------ */

const scenes = {
  ivory: { a: '#FCFAF6', b: '#EAE2D4', glow: '#FFFFFF', floor: '#DCD1BE', shadow: '#A99madeup' },
  sand: { a: '#F4ECDF', b: '#E0D0B8', glow: '#FFF9EC', floor: '#CFBC9D', shadow: '#9E8B70' },
  charcoal: { a: '#1D1E23', b: '#0B0B0D', glow: '#3D3E46', floor: '#212226', shadow: '#040405' },
  ink: { a: '#26272C', b: '#111114', glow: '#4A4B54', floor: '#2A2B31', shadow: '#050506' },
};
scenes.ivory.shadow = '#B3A68F';

const liquids = {
  amber: { light: '#F2C583', mid: '#C0842F', deep: '#7C4A11' },
  rose: { light: '#F3CBC4', mid: '#C4767A', deep: '#8B4248' },
  oud: { light: '#B07A4A', mid: '#6A3A1D', deep: '#331A0C' },
  musk: { light: '#F7EFDF', mid: '#DCC69E', deep: '#AE9469' },
  cedar: { light: '#BFCBB6', mid: '#6C8069', deep: '#3D4E3F' },
  night: { light: '#93A2C4', mid: '#3D4A6B', deep: '#1B2136' },
  saffron: { light: '#F7D89A', mid: '#D2932F', deep: '#8E5710' },
  fig: { light: '#D9D3AE', mid: '#8E8A55', deep: '#565430' },
};

const metals = {
  gold: { a: '#F2E2BC', b: '#C7A461', c: '#8A6B35' },
  dark: { a: '#5A5B62', b: '#26272C', c: '#0D0E10' },
  bronze: { a: '#E6C69F', b: '#A9754A', c: '#6B4527' },
};

/* ------------------------------------------------------------------ */
/* أشكال الزجاجات / bottle silhouettes                                 */
/* ------------------------------------------------------------------ */

/**
 * Every silhouette is drawn around x = 0 and sits on the floor line at y = 0.
 * `body` is the glass outline, `top` its highest point, and the neck/cap sizes
 * are tuned per shape so the proportions read as a real flacon.
 */
const shapeDefs = {
  flacon: {
    body: 'M -150 -18 L -150 -318 Q -150 -352 -118 -356 L 118 -356 Q 150 -352 150 -318 L 150 -18 Q 150 0 128 0 L -128 0 Q -150 0 -150 -18 Z',
    top: -356,
    width: 300,
    neckW: 76,
    neckH: 44,
    capW: 118,
    capH: 78,
    capRadius: 5,
    label: { y: -190, w: 118, h: 88 },
  },
  arch: {
    body: 'M -132 0 L -132 -196 Q -132 -300 0 -352 Q 132 -300 132 -196 L 132 0 Z',
    top: -352,
    width: 264,
    neckW: 64,
    neckH: 40,
    capW: 96,
    capH: 92,
    capRadius: 4,
    capTaper: 0.78,
    label: { y: -150, w: 104, h: 78 },
  },
  column: {
    body: 'M -104 -12 L -104 -394 Q -104 -410 -88 -410 L 88 -410 Q 104 -410 104 -394 L 104 -12 Q 104 0 88 0 L -88 0 Q -104 0 -104 -12 Z',
    top: -410,
    width: 208,
    neckW: 54,
    neckH: 38,
    capW: 84,
    capH: 118,
    capRadius: 3,
    label: { y: -230, w: 84, h: 96 },
  },
  orb: {
    body: 'M 0 -18 C -108 -18 -164 -96 -164 -178 C -164 -262 -96 -324 0 -324 C 96 -324 164 -262 164 -178 C 164 -96 108 -18 0 -18 Z',
    top: -324,
    width: 328,
    neckW: 60,
    neckH: 42,
    capW: 92,
    capH: 62,
    capRadius: 26,
    label: { y: -186, w: 116, h: 80 },
  },
  obelisk: {
    body: 'M -148 0 L -100 -372 Q -98 -382 -86 -382 L 86 -382 Q 98 -382 100 -372 L 148 0 Z',
    top: -382,
    width: 296,
    neckW: 62,
    neckH: 40,
    capW: 92,
    capH: 104,
    capRadius: 3,
    capTaper: 0.82,
    label: { y: -170, w: 104, h: 86 },
  },
};

const defs = (id, scene, liquid, metal) => `
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stop-color="${scene.a}"/>
      <stop offset="1" stop-color="${scene.b}"/>
    </linearGradient>
    <radialGradient id="glow-${id}" cx="0.5" cy="0.4" r="0.58">
      <stop offset="0" stop-color="${scene.glow}" stop-opacity="0.8"/>
      <stop offset="1" stop-color="${scene.glow}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="liq-${id}" x1="0" y1="0" x2="0.25" y2="1">
      <stop offset="0" stop-color="${liquid.light}"/>
      <stop offset="0.45" stop-color="${liquid.mid}"/>
      <stop offset="1" stop-color="${liquid.deep}"/>
    </linearGradient>
    <linearGradient id="empty-${id}" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stop-color="${liquid.light}" stop-opacity="0.34"/>
      <stop offset="1" stop-color="${liquid.mid}" stop-opacity="0.42"/>
    </linearGradient>
    <linearGradient id="glass-${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.34"/>
      <stop offset="0.14" stop-color="#ffffff" stop-opacity="0.05"/>
      <stop offset="0.62" stop-color="#000000" stop-opacity="0.04"/>
      <stop offset="0.9" stop-color="#000000" stop-opacity="0.2"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.16"/>
    </linearGradient>
    <linearGradient id="cap-${id}" x1="0" y1="0" x2="1" y2="0.25">
      <stop offset="0" stop-color="${metal.c}"/>
      <stop offset="0.16" stop-color="${metal.b}"/>
      <stop offset="0.42" stop-color="${metal.a}"/>
      <stop offset="0.72" stop-color="${metal.b}"/>
      <stop offset="1" stop-color="${metal.c}"/>
    </linearGradient>
    <linearGradient id="neck-${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.3"/>
      <stop offset="0.35" stop-color="${liquid.light}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${liquid.deep}" stop-opacity="0.35"/>
    </linearGradient>
    <linearGradient id="fade-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <mask id="reflect-${id}">
      <rect x="-1000" y="-1000" width="2000" height="2000" fill="url(#fade-${id})"/>
    </mask>
    <filter id="soft-${id}" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="16"/>
    </filter>
  </defs>`;

/** لوحة الاسم — رمز هندسي بدل الاعتماد على خط معيّن */
const plate = (label, tone) => `
  <g opacity="0.92">
    <rect x="${-label.w / 2}" y="${label.y - label.h / 2}" width="${label.w}" height="${label.h}"
          rx="2" fill="none" stroke="${tone}" stroke-opacity="0.5"/>
    <path d="M 0 ${label.y - 20} L 15 ${label.y - 3} L 0 ${label.y + 14} L -15 ${label.y - 3} Z"
          fill="none" stroke="${tone}" stroke-opacity="0.9" stroke-width="1.5"/>
    <path d="M -22 ${label.y + 26} L 22 ${label.y + 26}" stroke="${tone}" stroke-opacity="0.45" stroke-width="1.2"/>
  </g>`;

function bottle(id, shapeKey, { showLabel = true, tone = '#FBF4E4' } = {}) {
  const s = shapeDefs[shapeKey];
  const neckTop = s.top - s.neckH;
  const capTop = neckTop - s.capH;
  const capTaper = s.capTaper ?? 1;
  const capTopW = s.capW * capTaper;
  const fillTop = s.top + Math.abs(s.top) * 0.14;

  const cap =
    capTaper === 1
      ? `<rect x="${-s.capW / 2}" y="${capTop}" width="${s.capW}" height="${s.capH}" rx="${s.capRadius}" fill="url(#cap-${id})"/>`
      : `<path d="M ${-s.capW / 2} ${neckTop} L ${s.capW / 2} ${neckTop} L ${capTopW / 2} ${capTop} Q ${capTopW / 2} ${capTop - 6} ${capTopW / 2 - 6} ${capTop - 6} L ${-capTopW / 2 + 6} ${capTop - 6} Q ${-capTopW / 2} ${capTop - 6} ${-capTopW / 2} ${capTop} Z" fill="url(#cap-${id})"/>`;

  return `
    <clipPath id="clip-${id}"><path d="${s.body}"/></clipPath>

    <!-- العنق -->
    <rect x="${-s.neckW / 2}" y="${neckTop}" width="${s.neckW}" height="${s.neckH + 14}" fill="url(#neck-${id})"/>
    <rect x="${-s.neckW / 2}" y="${neckTop}" width="4" height="${s.neckH + 14}" fill="#ffffff" opacity="0.35"/>

    <!-- الغطاء -->
    ${cap}
    <rect x="${-s.capW / 2}" y="${capTop + 4}" width="${s.capW}" height="3" fill="#ffffff" opacity="0.28"/>
    <rect x="${-s.capW / 2 - 5}" y="${neckTop - 12}" width="${s.capW + 10}" height="12" rx="2" fill="url(#cap-${id})"/>

    <!-- الزجاج والعطر -->
    <path d="${s.body}" fill="url(#empty-${id})"/>
    <g clip-path="url(#clip-${id})">
      <rect x="-260" y="${fillTop}" width="520" height="${Math.abs(fillTop) + 40}" fill="url(#liq-${id})"/>
      <ellipse cx="0" cy="${fillTop}" rx="${s.width / 2}" ry="7" fill="#ffffff" opacity="0.18"/>
      <ellipse cx="${-s.width * 0.22}" cy="${s.top * 0.42}" rx="${s.width * 0.2}" ry="${Math.abs(s.top) * 0.24}" fill="#ffffff" opacity="0.1"/>
    </g>
    <path d="${s.body}" fill="url(#glass-${id})"/>
    <path d="${s.body}" fill="none" stroke="#ffffff" stroke-opacity="0.28" stroke-width="1.4"/>

    <!-- انعكاسات -->
    <g clip-path="url(#clip-${id})">
      <rect x="${-s.width * 0.36}" y="${s.top + 26}" width="11" height="${Math.abs(s.top) - 70}" rx="5.5" fill="#ffffff" opacity="0.3"/>
      <rect x="${-s.width * 0.28}" y="${s.top + 54}" width="5" height="${Math.abs(s.top) - 150}" rx="2.5" fill="#ffffff" opacity="0.18"/>
      <rect x="${s.width * 0.3}" y="${s.top + 40}" width="6" height="${Math.abs(s.top) - 110}" rx="3" fill="#ffffff" opacity="0.12"/>
    </g>

    ${showLabel ? plate(s.label, tone) : ''}`;
}

/* ------------------------------------------------------------------ */
/* المشاهد / scenes                                                    */
/* ------------------------------------------------------------------ */

function bottleScene({
  id,
  width = 800,
  height = 1000,
  scene = 'ivory',
  liquid = 'amber',
  metal = 'gold',
  shape = 'flacon',
  scale = 1,
  offsetX = 0,
  carton = false,
  showLabel = true,
  rings = false,
}) {
  const sc = scenes[scene];
  const lq = liquids[liquid];
  const mt = metals[metal];
  const dark = scene === 'charcoal' || scene === 'ink';
  const floorY = height * 0.84;
  const cx = width / 2 + offsetX;
  const art = bottle(id, shape, { showLabel, tone: dark ? '#F0DFB6' : '#FDF8EC' });
  const shapeWidth = shapeDefs[shape].width;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img">
  ${defs(id, sc, lq, mt)}
  <rect width="${width}" height="${height}" fill="url(#bg-${id})"/>
  <rect width="${width}" height="${height}" fill="url(#glow-${id})" opacity="${dark ? 0.45 : 0.7}"/>
  ${
    rings
      ? `<circle cx="${cx}" cy="${floorY - 250 * scale}" r="${270 * scale}" fill="none" stroke="${dark ? '#C2A16B' : '#B9A47A'}" stroke-opacity="0.28"/>
         <circle cx="${cx}" cy="${floorY - 250 * scale}" r="${330 * scale}" fill="none" stroke="${dark ? '#C2A16B' : '#B9A47A'}" stroke-opacity="0.12"/>`
      : ''
  }
  <rect y="${floorY}" width="${width}" height="${height - floorY}" fill="${sc.floor}" opacity="${dark ? 0.45 : 0.3}"/>
  <path d="M 0 ${floorY} L ${width} ${floorY}" stroke="${sc.floor}" stroke-opacity="${dark ? 0.8 : 0.7}"/>
  ${
    carton
      ? `<g transform="translate(${cx + 210 * scale} ${floorY}) scale(${scale})">
           <rect x="-82" y="-306" width="164" height="306" rx="2" fill="${mt.c}" opacity="0.14"/>
           <rect x="-82" y="-306" width="164" height="306" rx="2" fill="none" stroke="${mt.b}" stroke-opacity="0.5"/>
           <path d="M -18 -186 L 0 -168 L 18 -186 L 0 -204 Z" fill="none" stroke="${mt.b}" stroke-opacity="0.75" stroke-width="1.4"/>
           <path d="M -34 -140 L 34 -140" stroke="${mt.b}" stroke-opacity="0.35"/>
         </g>`
      : ''
  }
  <ellipse cx="${cx}" cy="${floorY + 4}" rx="${(shapeWidth / 2 + 40) * scale}" ry="${22 * scale}"
           fill="${sc.shadow}" opacity="${dark ? 0.65 : 0.5}" filter="url(#soft-${id})"/>
  <g mask="url(#reflect-${id})" opacity="0.16" transform="translate(${cx} ${floorY}) scale(${scale} ${-scale * 0.42})">
    ${art}
  </g>
  <g transform="translate(${cx} ${floorY}) scale(${scale})">
    ${art}
  </g>
</svg>
`;
}

/* ------------------------------------------------------------------ */
/* المخرجات / manifest                                                 */
/* ------------------------------------------------------------------ */

const productArt = [
  { slug: 'layali-oud', liquid: 'oud', metal: 'gold', shape: 'flacon' },
  { slug: 'noor-al-sabah', liquid: 'musk', metal: 'gold', shape: 'arch' },
  { slug: 'ward-taifi', liquid: 'rose', metal: 'bronze', shape: 'orb' },
  { slug: 'rimal-dhahabiya', liquid: 'saffron', metal: 'gold', shape: 'obelisk' },
  { slug: 'sada-al-arz', liquid: 'cedar', metal: 'dark', shape: 'column' },
  { slug: 'misk-al-hujra', liquid: 'musk', metal: 'gold', shape: 'flacon' },
  { slug: 'layl-tawil', liquid: 'night', metal: 'dark', shape: 'obelisk' },
  { slug: 'bahar-al-ain', liquid: 'fig', metal: 'bronze', shape: 'column' },
  { slug: 'oud-malaki', liquid: 'oud', metal: 'gold', shape: 'orb' },
  { slug: 'zahr-al-yasmin', liquid: 'rose', metal: 'gold', shape: 'arch' },
];

for (const p of productArt) {
  const base = { liquid: p.liquid, metal: p.metal, shape: p.shape };
  writeFileSync(out(`products/${p.slug}-1.svg`), bottleScene({ id: `${p.slug}1`, scene: 'ivory', scale: 1.32, ...base }));
  writeFileSync(
    out(`products/${p.slug}-2.svg`),
    bottleScene({ id: `${p.slug}2`, scene: 'charcoal', scale: 1.7, showLabel: false, rings: true, ...base }),
  );
  writeFileSync(
    out(`products/${p.slug}-3.svg`),
    bottleScene({ id: `${p.slug}3`, scene: 'sand', scale: 1.05, offsetX: -90, carton: true, ...base }),
  );
}

const categoryArt = [
  { key: 'men', liquid: 'cedar', metal: 'dark', shape: 'column', scene: 'charcoal' },
  { key: 'women', liquid: 'rose', metal: 'gold', shape: 'orb', scene: 'ivory' },
  { key: 'unisex', liquid: 'fig', metal: 'bronze', shape: 'flacon', scene: 'sand' },
  { key: 'oriental', liquid: 'oud', metal: 'gold', shape: 'arch', scene: 'ink' },
  { key: 'western', liquid: 'night', metal: 'dark', shape: 'obelisk', scene: 'ivory' },
  { key: 'luxury', liquid: 'saffron', metal: 'gold', shape: 'obelisk', scene: 'charcoal' },
];

for (const c of categoryArt) {
  writeFileSync(
    out(`scenes/category-${c.key}.svg`),
    bottleScene({
      id: `cat${c.key}`,
      width: 640,
      height: 800,
      scene: c.scene,
      liquid: c.liquid,
      metal: c.metal,
      shape: c.shape,
      scale: 0.92,
      showLabel: false,
    }),
  );
}

writeFileSync(
  out('scenes/hero.svg'),
  bottleScene({
    id: 'hero',
    width: 900,
    height: 1125,
    scene: 'ink',
    liquid: 'amber',
    metal: 'gold',
    shape: 'arch',
    scale: 1.45,
    rings: true,
  }),
);

writeFileSync(
  out('scenes/story.svg'),
  bottleScene({
    id: 'story',
    width: 900,
    height: 1125,
    scene: 'sand',
    liquid: 'amber',
    metal: 'gold',
    shape: 'flacon',
    scale: 1.25,
    offsetX: -80,
    carton: true,
  }),
);

console.log(`Generated ${productArt.length * 3} product images + ${categoryArt.length + 2} scenes`);
