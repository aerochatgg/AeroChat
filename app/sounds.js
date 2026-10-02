// Shared sound effects. Drop the actual mp3 files (same names referenced
// below) into this same folder - this file just plays them at the right
// moments and fails silently if a file is missing so it never breaks the app.

let globalSoundVolume = 1;   // 0 to 1, controlled by the Sound Volume slider
let bubblePopEnabled = true; // controlled by the Bubble Pop Sounds toggle

function getSoundVolume() { return globalSoundVolume; }
function setSoundVolume(v) { globalSoundVolume = v; }
function isBubblePopEnabled() { return bubblePopEnabled; }
function setBubblePopEnabled(v) { bubblePopEnabled = v; }

function playSound(path, volume) {
  try {
    const a = new Audio(path);
    const base = volume !== undefined ? volume : 0.6;
    a.volume = Math.max(0, Math.min(1, base * globalSoundVolume));
    a.play().catch(() => {}); // browsers block autoplay before first interaction - ignore
  } catch (e) {}
}

const BUBBLE_POP_FILES = ['bubblepop1.mp3', 'bubblepop2.mp3', 'bubblepop3.mp3', 'bubblepop4.mp3'];
let lastBubblePopAt = 0;

function playRandomBubblePop() {
  if (!bubblePopEnabled) return;
  const now = Date.now();
  if (now - lastBubblePopAt < 180) return; // throttle so overlapping bubbles don't turn into noise
  lastBubblePopAt = now;
  const file = BUBBLE_POP_FILES[Math.floor(Math.random() * BUBBLE_POP_FILES.length)];
  playSound(file, 0.05); // kept very quiet, as requested
}

// Call this on each ambient bubble div right after creating it
function wireBubblePopSound(bubbleEl) {
  bubbleEl.addEventListener('animationiteration', playRandomBubblePop);
}
