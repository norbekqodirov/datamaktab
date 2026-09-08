// PM2 Process Manager Configuration for DATA Maktabi
// Run: pm2 start ecosystem.config.cjs

const fs = require('fs');
const path = require('path');

// Admin credentials come from the environment, or from a local, git-ignored
// .env.local file (see .env.example) — never hardcoded/committed here.
const secretsPath = path.join(__dirname, '.env.local');
const secrets = {};
if (fs.existsSync(secretsPath)) {
  for (const line of fs.readFileSync(secretsPath, 'utf-8').split('\n')) {
    const match = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
    if (match) secrets[match[1]] = match[2];
  }
}

module.exports = {
  apps: [
    {
      name: 'datamaktab',
      script: './server.ts',
      interpreter: 'tsx',
      env: {
        NODE_ENV: 'production',
        PORT: 5500,
        ADMIN_USERNAME: process.env.ADMIN_USERNAME || secrets.ADMIN_USERNAME || 'admin',
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || secrets.ADMIN_PASSWORD,
      },
      watch: false,
      max_memory_restart: '500M',
      restart_delay: 3000,
      max_restarts: 10,
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
    },
  ],
};
