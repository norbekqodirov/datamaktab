// PM2 Process Manager Configuration for DATA Maktabi
// Run: pm2 start ecosystem.config.cjs

module.exports = {
  apps: [
    {
      name: 'datamaktab',
      script: './server.ts',
      interpreter: 'tsx',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
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
