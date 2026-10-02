// Shared theme engine - loaded by every logged-in page (home.html, dms.html,
// chat.html, themes.html). Defines all themes in one place so changing a
// theme here changes it everywhere automatically.

const THEMES = {
  aero: {
    label: 'Aero (Default)',
    swatch: ['#6fc3f0', '#a8e063'],
    vars: {
      '--sky-top': '#bfe9ff',
      '--sky-mid': '#6fc3f0',
      '--sky-deep': '#0a4d8c',
      '--glass': 'rgba(255,255,255,0.38)',
      '--glass-strong': 'rgba(255,255,255,0.62)',
      '--glass-border': 'rgba(255,255,255,0.75)',
      '--ink': '#0b3a5c',
      '--ink-soft': '#3d6b8c',
      '--lime': '#a8e063',
      '--lime-dark': '#6fae2f',
      '--aqua-accent': '#1fa9a0',
      '--topbar-bg': 'linear-gradient(180deg, #d4f77e 0%, #a8e063 55%, #7fbf3a 100%)',
      '--msg-bg': 'rgba(255,255,255,0.62)',
      '--msg-border': 'rgba(255,255,255,0.85)'
    },
    background: { bubbles: 8 }
  },
  dorfic: {
    label: 'DORFic',
    swatch: ['#ff9f40', '#ffffff'],
    vars: {
      '--sky-top': '#ffe0b0',
      '--sky-mid': '#ff9f40',
      '--sky-deep': '#c9600a',
      '--glass': 'rgba(255,255,255,0.88)',
      '--glass-strong': 'rgba(255,255,255,0.94)',
      '--glass-border': 'rgba(255,180,100,0.65)',
      '--ink': '#6b3a0a',
      '--ink-soft': '#a3653a',
      '--lime': '#ffb347',
      '--lime-dark': '#e6821f',
      '--aqua-accent': '#ff8c2b',
      '--topbar-bg': 'linear-gradient(180deg, #ffd27a 0%, #ff9f40 55%, #e67e22 100%)',
      '--msg-bg': 'rgba(255,255,255,0.92)',
      '--msg-border': 'rgba(255,140,0,0.5)'
    },
    background: { rings: true }
  },
  eco: {
    label: 'Eco',
    swatch: ['#52b788', '#d8f3dc'],
    vars: {
      '--sky-top': '#d8f3dc',
      '--sky-mid': '#74c69d',
      '--sky-deep': '#1b4332',
      '--glass': 'rgba(255,255,255,0.42)',
      '--glass-strong': 'rgba(255,255,255,0.66)',
      '--glass-border': 'rgba(255,255,255,0.78)',
      '--ink': '#1b4332',
      '--ink-soft': '#40704f',
      '--lime': '#95d5b2',
      '--lime-dark': '#52b788',
      '--aqua-accent': '#2d9d78',
      '--topbar-bg': 'linear-gradient(180deg, #d4f77e 0%, #a8e063 55%, #7fbf3a 100%)',
      '--msg-bg': 'rgba(190,235,190,0.55)',
      '--msg-border': 'rgba(120,200,140,0.6)'
    },
    background: { bubbles: 4, seaweed: 9, seaweedColor: '#1f8f6f', seaweedOpacity: 0.5, sunRays: true }
  },
  aqua: {
    label: 'Aqua',
    swatch: ['#3fa9f5', '#04315e'],
    vars: {
      '--sky-top': '#d0f0ff',
      '--sky-mid': '#3fa9f5',
      '--sky-deep': '#04315e',
      '--glass': 'rgba(210,240,255,0.4)',
      '--glass-strong': 'rgba(220,245,255,0.64)',
      '--glass-border': 'rgba(255,255,255,0.8)',
      '--ink': '#05304f',
      '--ink-soft': '#2f6690',
      '--lime': '#6fd6ff',
      '--lime-dark': '#1a8fd1',
      '--aqua-accent': '#1f8fd1',
      '--topbar-bg': 'linear-gradient(180deg, #8ec9ff 0%, #4fa3f0 55%, #1f6fbf 100%)',
      '--msg-bg': 'rgba(220,245,255,0.64)',
      '--msg-border': 'rgba(255,255,255,0.85)'
    },
    background: { bubbles: 16, seaweed: 7, seaweedColor: '#0a4d8c', seaweedOpacity: 0.35, fish: 5 }
  },
  darkaero: {
    label: 'Dark Aero',
    swatch: ['#000000', '#39ff14'],
    vars: {
      '--sky-top': '#1a1a1a',
      '--sky-mid': '#0d0d0d',
      '--sky-deep': '#000000',
      '--glass': 'rgba(70,70,70,0.32)',
      '--glass-strong': 'rgba(85,85,85,0.48)',
      '--glass-border': 'rgba(190,190,190,0.28)',
      '--ink': '#f5f5f5',
      '--ink-soft': '#cfcfcf',
      '--lime': '#39ff14',
      '--lime-dark': '#1fae0a',
      '--aqua-accent': '#4dff4d',
      '--topbar-bg': 'linear-gradient(180deg, #6bff5c 0%, #39ff14 55%, #1fae0a 100%)',
      '--msg-bg': 'rgba(65,65,65,0.5)',
      '--msg-border': 'rgba(150,255,150,0.25)'
    },
    background: { squares: 9 }
  }
};

// ---------- Fonts ----------
// 'aero' keeps each page's own Quicksand + Nunito Sans pair. The others
// replace every font in the app with one family.
const FONTS = {
  aero:        { label: 'Aero',        sample: 'Quicksand',     family: null },
  vista:       { label: 'Vista',       sample: 'Segoe UI',      family: "'Segoe UI', 'Frutiger', 'Helvetica Neue', Arial, sans-serif" },
  bubbly:      { label: 'Bubbly',      sample: 'Fredoka',       family: "'Fredoka', sans-serif",          google: 'Fredoka:wght@400;500;600;700' },
  handwritten: { label: 'Handwritten', sample: 'Patrick Hand',  family: "'Patrick Hand', cursive",         google: 'Patrick+Hand' },
  pixel:       { label: 'Pixel',       sample: 'Pixelify Sans', family: "'Pixelify Sans', monospace",     google: 'Pixelify+Sans:wght@400;500;600;700' },
  classic:     { label: 'Classic',     sample: 'Lora',          family: "'Lora', Georgia, serif",         google: 'Lora:wght@400;500;600;700' }
};

function loadFontFile(fontId) {
  const font = FONTS[fontId];
  if (!font || !font.google || document.getElementById('font-link-' + fontId)) return;
  const link = document.createElement('link');
  link.id = 'font-link-' + fontId;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${font.google}&display=swap`;
  document.head.appendChild(link);
}

function applyFont(fontId) {
  const font = FONTS[fontId] ? fontId : 'aero';
  loadFontFile(font);
  document.documentElement.setAttribute('data-font', font);
  if (FONTS[font].family) document.documentElement.style.setProperty('--app-font', FONTS[font].family);
  else document.documentElement.style.removeProperty('--app-font');
}

async function getSavedFontId() {
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) return null;
    const { data, error } = await supabaseClient.from('profiles').select('font').eq('id', session.user.id).single();
    if (error) return null; // column not added yet
    return (data && data.font) || 'aero';
  } catch (e) {
    return null;
  }
}

async function saveFontId(fontId) {
  writeThemeCache({ font: fontId });
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) return;
    await supabaseClient.from('profiles').update({ font: fontId }).eq('id', session.user.id);
  } catch (e) {}
}

// ---------- Appearance: message density, corner roundness, effect intensity ----------
// Saved as one object on the profile (profiles.appearance) and cached on the device.
const DENSITY_PRESETS = {
  compact:     { spacing: 3,  bubble: 0.6,  avatar: 22, text: 13.5 },
  comfortable: { spacing: 12, bubble: 1,    avatar: 32, text: 14.5 }, // the original look
  cozy:        { spacing: 22, bubble: 1.35, avatar: 44, text: 16 }
};
const DEFAULT_APPEARANCE = { density: 'comfortable', customDensity: null, roundness: 1, effects: {} };
let currentAppearance = { ...DEFAULT_APPEARANCE };

function normalizeAppearance(a) {
  return { ...DEFAULT_APPEARANCE, ...(a || {}), effects: { ...((a && a.effects) || {}) } };
}
function densityValues(a) {
  if (a.density === 'custom' && a.customDensity) return { ...DENSITY_PRESETS.comfortable, ...a.customDensity };
  return DENSITY_PRESETS[a.density] || DENSITY_PRESETS.comfortable;
}

// Message sizes are CSS variables the chat pages read (with the old look as fallback)
function applyDensityVars(a) {
  const d = densityValues(a);
  const root = document.documentElement.style;
  root.setProperty('--msg-gap', d.spacing + 'px');
  root.setProperty('--msg-pad-y', (10 * d.bubble).toFixed(1) + 'px');
  root.setProperty('--msg-pad-x', (14 * d.bubble).toFixed(1) + 'px');
  root.setProperty('--msg-avatar', d.avatar + 'px');
  root.setProperty('--msg-font', d.text + 'px');
}

// Corner roundness: every page hard-codes its own corner sizes, so instead of
// editing hundreds of rules we scale the px corner values in the page's
// stylesheets. % corners (circles like avatars and status dots) stay round.
const RADIUS_PROPS = ['border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius'];
const __radiusOriginals = new WeakMap(); // rule -> { prop: original value }
let __appliedRoundness = 1;

function scaleRadiusValue(value, k) {
  return value.replace(/(\d*\.?\d+)px/g, (_, n) => {
    const px = parseFloat(n);
    if (px >= 100) return (k >= 1 ? px : 30 * k) + 'px'; // "pill" shapes ease into rounded rectangles
    return (px * k).toFixed(2) + 'px';
  });
}
function scaleRadiusRules(rules, k) {
  for (const rule of rules) {
    if (rule.cssRules && !rule.style) { scaleRadiusRules(rule.cssRules, k); continue; }
    if (!rule.style) continue;
    let orig = __radiusOriginals.get(rule);
    if (!orig) {
      orig = {};
      // the shorthand covers all four corners; otherwise look at individual corners
      const shorthand = rule.style.getPropertyValue('border-radius');
      if (shorthand) orig['border-radius'] = shorthand;
      else RADIUS_PROPS.slice(1).forEach(p => { const v = rule.style.getPropertyValue(p); if (v) orig[p] = v; });
      __radiusOriginals.set(rule, orig);
    }
    for (const [p, v] of Object.entries(orig)) {
      rule.style.setProperty(p, k === 1 ? v : scaleRadiusValue(v, k), rule.style.getPropertyPriority(p));
    }
  }
}
function applyRoundness(k) {
  k = Number.isFinite(k) ? k : 1;
  if (k === 1 && __appliedRoundness === 1) return; // nothing to change or undo
  for (const sheet of document.styleSheets) {
    try { scaleRadiusRules(sheet.cssRules, k); } catch (e) { /* font stylesheets from other sites can't be read - they have no corners anyway */ }
  }
  __appliedRoundness = k;
}

function applyAppearance(a) {
  currentAppearance = normalizeAppearance(a);
  applyDensityVars(currentAppearance);
  const run = () => applyRoundness(currentAppearance.roundness);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
}

async function getSavedAppearance() {
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) return null;
    const { data, error } = await supabaseClient.from('profiles').select('appearance').eq('id', session.user.id).single();
    if (error) return null; // column not added yet
    return normalizeAppearance(data && data.appearance);
  } catch (e) {
    return null;
  }
}

async function saveAppearance(a) {
  writeThemeCache({ appearance: a });
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) return;
    await supabaseClient.from('profiles').update({ appearance: a }).eq('id', session.user.id);
  } catch (e) {}
}

// ---------- Inject the CSS these effects need (once, on load) ----------
(function injectThemeCss() {
  const css = `
    .seaweed {
      position: absolute; bottom: -10px; transform-origin: bottom center;
      animation: themeSway ease-in-out infinite;
    }
    @keyframes themeSway { 0%, 100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }

    .theme-ring {
      position: absolute; border-radius: 50%;
      /* --ring-color is the accent color in custom themes; gold otherwise */
      border: 3px solid color-mix(in srgb, var(--ring-color, rgb(255,220,80)) 90%, transparent);
      box-shadow: 0 0 20px 6px color-mix(in srgb, var(--ring-color, rgb(255,210,60)) 55%, transparent);
      opacity: 0; animation: themeRingPulse 1.6s ease-out forwards; pointer-events: none;
    }
    @keyframes themeRingPulse {
      0% { transform: scale(0.2); opacity: 0; }
      15% { opacity: 0.9; }
      70% { opacity: 0.5; }
      100% { transform: scale(1.6); opacity: 0; }
    }

    .sun-rays {
      position: absolute; top: -120px; right: -120px; width: 420px; height: 420px; border-radius: 50%;
      background: conic-gradient(from 200deg at 50% 50%, rgba(255,244,180,0.35), transparent 12%, rgba(255,244,180,0.3) 20%, transparent 30%, rgba(255,244,180,0.28) 40%, transparent 55%, rgba(255,244,180,0.3) 65%, transparent 80%);
      animation: themeSunRotate 50s linear infinite; pointer-events: none;
    }
    @keyframes themeSunRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    .theme-fish {
      position: absolute; left: -60px; font-size: 28px;
      animation-name: themeSwim; animation-timing-function: linear; animation-iteration-count: infinite;
      pointer-events: none;
    }
    .theme-fish span { display: inline-block; filter: drop-shadow(0 2px 4px rgba(0,40,80,0.3)); }
    @keyframes themeSwim { from { transform: translateX(-10vw); } to { transform: translateX(110vw); } }

    /* DORFic shine: a highlight painted into the glass's own background and slid across.
       (An overlay element would need overflow:hidden on the panel, which stops it scrolling.) */
    html[data-theme="dorfic"] .glass, html[data-effect="dorfic"] .glass {
      background-image: linear-gradient(115deg, transparent 38%, rgba(255,255,255,0.7) 50%, transparent 62%);
      background-size: 300% 100%;
      background-repeat: no-repeat;
      animation: themeShineSweep 4.5s ease-in-out infinite;
    }
    @keyframes themeShineSweep { 0% { background-position: 110% 0; } 40% { background-position: -10% 0; } 100% { background-position: -10% 0; } }

    .theme-square {
      position: absolute; bottom: -140px;
      background: rgba(165,165,165,0.22);
      border: 1px solid rgba(210,210,210,0.3);
      border-radius: 22%;
      animation: themeSquareRise linear infinite;
      will-change: transform;
    }
    @keyframes themeSquareRise {
      0% { transform: translateY(0) rotate(0deg); opacity: 0; }
      10% { opacity: 0.5; }
      100% { transform: translateY(-115vh) rotate(25deg); opacity: 0; }
    }

    html[data-theme="darkaero"] .add-error { color: #d8ffd8; }

    html[data-font]:not([data-font="aero"]) body,
    html[data-font]:not([data-font="aero"]) body * { font-family: var(--app-font) !important; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
})();

// ---------- Custom theme builder ----------
// Each preset's "effect" (background animation + glass treatment) can be
// mixed with any button/accent/background color the user picks.
const EFFECT_PRESETS = {
  aero: { background: { bubbles: 8 }, glassAlpha: 0.38, glassStrongAlpha: 0.62 },
  dorfic: { background: { rings: true }, glassAlpha: 0.88, glassStrongAlpha: 0.94 },
  darkaero: { background: { squares: 9 }, glassAlpha: 0.32, glassStrongAlpha: 0.48 },
  aqua: { background: { bubbles: 16, seaweed: 7, seaweedColor: '#0a4d8c', seaweedOpacity: 0.35, fish: 5 }, glassAlpha: 0.4, glassStrongAlpha: 0.64 }
};

function shadeColor(hex, percent) {
  hex = (hex || '#888888').replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  let r = (num >> 16) + percent, g = ((num >> 8) & 0x00FF) + percent, b = (num & 0x0000FF) + percent;
  r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
  return '#' + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
}

function hexToRgba(hex, alpha) {
  hex = (hex || '#ffffff').replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function isColorDark(hex) {
  hex = (hex || '#6fc3f0').replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) < 140;
}

function applyCustomThemeVars(settings) {
  const effect = EFFECT_PRESETS[settings.effect] || EFFECT_PRESETS.aero;
  // Light text only when panels are see-through enough to show the dark
  // background - DORFic's almost-solid white glass always needs dark text.
  const dark = isColorDark(settings.bgColor) && effect.glassAlpha < 0.8;
  const vars = {
    '--sky-top': shadeColor(settings.bgColor, 75),
    '--sky-mid': settings.bgColor,
    '--sky-deep': shadeColor(settings.bgColor, -75),
    '--glass': hexToRgba('#ffffff', effect.glassAlpha),
    '--glass-strong': hexToRgba('#ffffff', effect.glassStrongAlpha),
    '--glass-border': 'rgba(255,255,255,0.75)',
    '--ink': dark ? '#f5f5f5' : '#0b3a5c',
    '--ink-soft': dark ? '#cfcfcf' : '#3d6b8c',
    '--lime': settings.buttonColor,
    '--lime-dark': shadeColor(settings.buttonColor, -45),
    '--aqua-accent': settings.accentColor,
    '--topbar-bg': `linear-gradient(180deg, ${shadeColor(settings.accentColor, 55)} 0%, ${settings.accentColor} 55%, ${shadeColor(settings.accentColor, -45)} 100%)`,
    '--msg-bg': hexToRgba('#ffffff', effect.glassStrongAlpha),
    '--msg-border': 'rgba(255,255,255,0.85)',
    '--ring-color': settings.accentColor
  };
  const root = document.documentElement.style;
  Object.entries(vars).forEach(([k, v]) => root.setProperty(k, v));
  document.documentElement.setAttribute('data-theme', 'custom');
  document.documentElement.setAttribute('data-effect', settings.effect);
}

function applyCustomThemeBackground(settings) {
  const effect = EFFECT_PRESETS[settings.effect] || EFFECT_PRESETS.aero;
  spawnBackground(effect.background);
}

// Draws a theme's background effects, with the user's intensity sliders
// (from the theme editor) layered over the theme's own numbers.
function spawnBackground(baseBg) {
  const bubbleLayer = document.getElementById('bubbleLayer');
  const seaweedLayer = document.getElementById('seaweedLayer');
  clearThemeBackground();
  if (!bubbleLayer) return;
  const bg = baseBg || {};
  const fx = (currentAppearance && currentAppearance.effects) || {};
  // An override only applies to effects this theme actually has
  const pick = (key, base) => (base && fx[key] !== undefined && fx[key] !== null) ? fx[key] : base;
  const speed = key => fx[key] || 1;
  const seaweed = pick('seaweed', bg.seaweed);
  const bubbles = pick('bubbles', bg.bubbles);
  const fish = pick('fish', bg.fish);
  const squares = pick('squares', bg.squares);
  const ringRate = bg.rings ? pick('ringRate', 1) : 0;
  if (seaweed && seaweedLayer) spawnSeaweedInto(seaweedLayer, seaweed, bg.seaweedColor || '#0a4d8c', bg.seaweedOpacity ?? 0.35);
  if (bg.sunRays) spawnSunRays(bubbleLayer);
  if (bubbles) spawnBubblesInto(bubbleLayer, bubbles, speed('bubbleSpeed'));
  if (ringRate) spawnRingLoop(bubbleLayer, ringRate);
  if (fish) spawnFishInto(bubbleLayer, fish, speed('fishSpeed'));
  if (squares) spawnSquaresInto(bubbleLayer, squares, speed('squareSpeed'));
}

// The theme's own background numbers (before any sliders) - used by the theme editor
function baseBackgroundFor(themeId, settings) {
  if (themeId === 'custom') return (EFFECT_PRESETS[(settings || {}).effect] || EFFECT_PRESETS.aero).background;
  return (THEMES[themeId] || THEMES.aero).background || {};
}

async function getSavedCustomSettings() {
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) return null;
    const { data } = await supabaseClient.from('profiles')
      .select('custom_effect, custom_button_color, custom_accent_color, custom_bg_color')
      .eq('id', session.user.id).single();
    if (!data) return null;
    return {
      effect: data.custom_effect || 'aero',
      buttonColor: data.custom_button_color || '#a8e063',
      accentColor: data.custom_accent_color || '#a8e063',
      bgColor: data.custom_bg_color || '#6fc3f0'
    };
  } catch (e) {
    return null;
  }
}

async function saveCustomSettings(settings) {
  writeThemeCache({ custom: settings });
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) return;
    await supabaseClient.from('profiles').update({
      custom_effect: settings.effect,
      custom_button_color: settings.buttonColor,
      custom_accent_color: settings.accentColor,
      custom_bg_color: settings.bgColor
    }).eq('id', session.user.id);
  } catch (e) {}
}

function applyThemeVars(themeId) {
  const theme = THEMES[themeId] || THEMES.aero;
  const root = document.documentElement.style;
  root.removeProperty('--ring-color'); // left over from a custom theme
  Object.entries(theme.vars).forEach(([k, v]) => root.setProperty(k, v));
  document.documentElement.setAttribute('data-theme', themeId);
}

let __themeRingInterval = null;

function clearThemeBackground() {
  const bubbleLayer = document.getElementById('bubbleLayer');
  const seaweedLayer = document.getElementById('seaweedLayer');
  if (bubbleLayer) bubbleLayer.innerHTML = '';
  if (seaweedLayer) seaweedLayer.innerHTML = '';
  if (__themeRingInterval) { clearInterval(__themeRingInterval); __themeRingInterval = null; }
}

function spawnBubblesInto(layer, count, speed = 1) {
  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = 20 + Math.random() * 65;
    b.style.width = size + 'px';
    b.style.height = size + 'px';
    b.style.left = Math.random() * 100 + 'vw';
    b.style.animationDuration = ((13 + Math.random() * 16) / speed) + 's';
    b.style.animationDelay = ((Math.random() * -20) / speed) + 's';
    layer.appendChild(b);
    if (typeof wireBubblePopSound === 'function') wireBubblePopSound(b);
  }
}

function spawnSeaweedInto(layer, count, color, opacity) {
  for (let i = 0; i < count; i++) {
    const left = (i / count) * 100 + (Math.random() * 6 - 3);
    const height = 200 + Math.random() * 240;
    const width = height * 0.22;
    const duration = 5 + Math.random() * 5;
    const delay = Math.random() * -6;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 100 400');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.classList.add('seaweed');
    svg.style.left = left + 'vw';
    svg.style.animationDuration = duration + 's';
    svg.style.animationDelay = delay + 's';
    svg.style.opacity = opacity;
    svg.innerHTML = `<path d="M50 400 C 25 320, 75 260, 50 190 C 25 120, 75 70, 50 0" stroke="${color}" stroke-width="7" fill="none" stroke-linecap="round" />`;
    layer.appendChild(svg);
  }
}

function spawnRingLoop(layer, rate = 1) {
  function spawnOne() {
    const ring = document.createElement('div');
    ring.className = 'theme-ring';
    const size = 40 + Math.random() * 100;
    ring.style.width = size + 'px';
    ring.style.height = size + 'px';
    ring.style.left = Math.random() * 90 + 'vw';
    ring.style.top = Math.random() * 90 + 'vh';
    layer.appendChild(ring);
    setTimeout(() => ring.remove(), 1700);
  }
  spawnOne();
  __themeRingInterval = setInterval(spawnOne, (550 + Math.random() * 400) / rate);
}

function spawnSunRays(layer) {
  const rays = document.createElement('div');
  rays.className = 'sun-rays';
  layer.appendChild(rays);
}

function spawnFishInto(layer, count, speed = 1) {
  for (let i = 0; i < count; i++) {
    const wrap = document.createElement('div');
    wrap.className = 'theme-fish';
    const top = 10 + Math.random() * 70;
    const duration = (14 + Math.random() * 14) / speed;
    const delay = (Math.random() * -20) / speed;
    const reverse = Math.random() < 0.5;
    wrap.style.top = top + 'vh';
    wrap.style.animationDuration = duration + 's';
    wrap.style.animationDelay = delay + 's';
    if (reverse) wrap.style.animationDirection = 'reverse';

    const inner = document.createElement('span');
    inner.textContent = '🐟';
    if (!reverse) inner.style.transform = 'scaleX(-1)'; // 🐟 faces left by default; flip it to face right when swimming left-to-right
    wrap.appendChild(inner);
    layer.appendChild(wrap);
  }
}

function spawnSquaresInto(layer, count, speed = 1) {
  for (let i = 0; i < count; i++) {
    const sq = document.createElement('div');
    sq.className = 'theme-square';
    const size = 26 + Math.random() * 70;
    sq.style.width = size + 'px';
    sq.style.height = size + 'px';
    sq.style.left = Math.random() * 100 + 'vw';
    sq.style.animationDuration = ((20 + Math.random() * 22) / speed) + 's'; // slow, drifting
    sq.style.animationDelay = ((Math.random() * -30) / speed) + 's';
    layer.appendChild(sq);
  }
}

function applyThemeBackground(themeId) {
  spawnBackground((THEMES[themeId] || THEMES.aero).background);
}

async function getSavedThemeId() {
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) return 'aero';
    const { data } = await supabaseClient.from('profiles').select('theme').eq('id', session.user.id).single();
    return (data && data.theme) || 'aero';
  } catch (e) {
    return 'aero';
  }
}

async function saveThemeId(themeId) {
  writeThemeCache({ themeId });
  try {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) return;
    await supabaseClient.from('profiles').update({ theme: themeId }).eq('id', session.user.id);
  } catch (e) {}
}

// ---------- Theme cache (this device) ----------
// The real theme lives in the user's profile, but fetching it takes a moment,
// so pages would flash the default Aero look first. We keep a copy in
// localStorage and apply it instantly, then double-check with the server.
const THEME_CACHE_KEY = 'aerochat-theme';
let __appliedThemeKey = null; // what's on screen right now, so we don't redraw it twice

function readThemeCache() {
  try { return JSON.parse(localStorage.getItem(THEME_CACHE_KEY)) || null; } catch (e) { return null; }
}
function writeThemeCache(changes) {
  try {
    const next = { ...(readThemeCache() || {}), ...changes };
    localStorage.setItem(THEME_CACHE_KEY, JSON.stringify(next));
  } catch (e) {}
}
function themeKeyFor(themeId, settings) {
  const base = themeId === 'custom' ? 'custom:' + JSON.stringify(settings) : themeId;
  return base + '|' + JSON.stringify(currentAppearance.effects || {}); // effect sliders change the background too
}

function applyFullTheme(themeId, settings) {
  const key = themeKeyFor(themeId, settings);
  if (key === __appliedThemeKey) return; // already showing exactly this
  if (themeId === 'custom') {
    applyCustomThemeVars(settings);
    applyCustomThemeBackground(settings);
  } else {
    applyThemeVars(themeId);
    applyThemeBackground(themeId);
  }
  // Only count it as "applied" once the background layers existed to draw into
  if (document.getElementById('bubbleLayer')) __appliedThemeKey = key;
}

// Runs the moment this script loads (in <head>, before anything is painted):
// colors immediately, background effects as soon as the page body exists.
(function applyCachedThemeEarly() {
  const cached = readThemeCache();
  if (cached && cached.font) applyFont(cached.font);
  if (cached && cached.appearance) applyAppearance(cached.appearance);
  if (!cached || !cached.themeId) return;
  if (cached.themeId === 'custom' && !cached.custom) return;
  if (cached.themeId === 'custom') applyCustomThemeVars(cached.custom);
  else applyThemeVars(cached.themeId);
  const applyBackground = () => applyFullTheme(cached.themeId, cached.custom);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyBackground);
  else applyBackground();
})();

const DEFAULT_CUSTOM_SETTINGS = { effect: 'aero', buttonColor: '#a8e063', accentColor: '#a8e063', bgColor: '#6fc3f0' };

// Call this on page load - applies the user's saved theme (colors + background)
async function initPageTheme() {
  getSavedFontId().then(fontId => {
    if (!fontId) return;
    writeThemeCache({ font: fontId });
    applyFont(fontId);
  });
  const appearancePromise = getSavedAppearance();
  const themeId = await getSavedThemeId();
  const savedAppearance = await appearancePromise;
  if (savedAppearance) {
    writeThemeCache({ appearance: savedAppearance });
    applyAppearance(savedAppearance);
  }
  const settings = themeId === 'custom' ? ((await getSavedCustomSettings()) || DEFAULT_CUSTOM_SETTINGS) : undefined;
  writeThemeCache(themeId === 'custom' ? { themeId, custom: settings } : { themeId });
  applyFullTheme(themeId, settings);
  return themeId;
}
