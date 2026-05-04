import sharp from 'sharp';

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#062bad"/>
      <stop offset="100%" stop-color="#03caff"/>
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#03caff" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#062bad" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Decorative circles -->
  <circle cx="950" cy="120" r="220" fill="rgba(3,202,255,0.12)"/>
  <circle cx="1050" cy="520" r="150" fill="rgba(3,202,255,0.08)"/>
  <circle cx="150" cy="500" r="180" fill="rgba(255,255,255,0.05)"/>

  <!-- D logo (large, faint watermark) -->
  <g transform="translate(820, 140) scale(4.2)" opacity="0.12">
    <path fill="white" fill-rule="evenodd"
      d="M53.34,63.47c-3.97,3.7-9.34,5.56-16.11,5.56h-7.17V26.26h7.17c6.77,0,12.14,1.85,16.11,5.54,3.97,3.71,5.96,8.98,5.96,15.84s-1.99,12.14-5.96,15.83h0ZM83.66,23c-4.06-7.22-9.86-12.86-17.39-16.91C58.73,2.02,49.95,0,39.95,0H0v95.83h39.95c10,0,18.78-2.09,26.32-6.3,7.53-4.19,13.33-9.94,17.39-17.25,4.06-7.32,6.09-15.53,6.09-24.64s-2.03-17.41-6.09-24.63Z"/>
  </g>

  <!-- D logo (small, left accent) -->
  <g transform="translate(80, 220) scale(2.0)" opacity="0.9">
    <path fill="#03caff" fill-rule="evenodd"
      d="M53.34,63.47c-3.97,3.7-9.34,5.56-16.11,5.56h-7.17V26.26h7.17c6.77,0,12.14,1.85,16.11,5.54,3.97,3.71,5.96,8.98,5.96,15.84s-1.99,12.14-5.96,15.83h0ZM83.66,23c-4.06-7.22-9.86-12.86-17.39-16.91C58.73,2.02,49.95,0,39.95,0H0v95.83h39.95c10,0,18.78-2.09,26.32-6.3,7.53-4.19,13.33-9.94,17.39-17.25,4.06-7.32,6.09-15.53,6.09-24.64s-2.03-17.41-6.09-24.63Z"/>
  </g>

  <!-- Main text -->
  <text x="80" y="420" font-family="Arial, Helvetica, sans-serif" font-size="96" font-weight="bold" fill="white" letter-spacing="-3">DATA</text>
  <text x="80" y="490" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="normal" fill="rgba(255,255,255,0.9)" letter-spacing="6">XALQARO MAKTABI</text>

  <!-- Divider line -->
  <rect x="80" y="514" width="160" height="3" rx="2" fill="#03caff"/>

  <!-- Tagline -->
  <text x="80" y="558" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="rgba(255,255,255,0.65)">Urganch shahridagi zamonaviy xalqaro maktab</text>

  <!-- URL -->
  <text x="80" y="600" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="rgba(255,255,255,0.45)" font-weight="normal">datamaktab.uz</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile('public/og-image.png');
console.log('OG image generated: public/og-image.png (1200x630)');
