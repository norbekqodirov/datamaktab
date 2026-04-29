#!/usr/bin/env pwsh
# Deploy script — runs all server setup commands via SSH

$server = "root@188.225.74.65"
$keyPath = "$HOME\.ssh\datamaktab_deploy"
$pubKey = Get-Content "$HOME\.ssh\datamaktab_deploy.pub"

Write-Host "Step 1: Copying SSH public key to server (enter password when prompted)..."
# Add our public key to server's authorized_keys
ssh -o StrictHostKeyChecking=no -o BatchMode=no $server "mkdir -p ~/.ssh && echo '$pubKey' >> ~/.ssh/authorized_keys && chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys"

Write-Host "Step 2: Running full deployment on server..."
$deployScript = @"
set -e
export DEBIAN_FRONTEND=noninteractive

echo '--- [1/7] System update ---'
apt-get update -qq && apt-get install -y -qq nginx curl git

echo '--- [2/7] Install Node.js 20 ---'
if ! command -v node &> /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
node --version
npm --version

echo '--- [3/7] Install tsx and PM2 globally ---'
npm install -g tsx pm2 --silent

echo '--- [4/7] Clone repo ---'
mkdir -p /var/www/datamaktab
if [ -d '/var/www/datamaktab/.git' ]; then
  echo 'Already cloned, pulling latest...'
  cd /var/www/datamaktab && git pull origin main
else
  git clone https://github.com/norbekqodirov/datamaktab.git /var/www/datamaktab
fi
cd /var/www/datamaktab

echo '--- [5/7] Install npm dependencies ---'
npm install --legacy-peer-deps

echo '--- [6/7] Create required directories ---'
mkdir -p /var/www/datamaktab/logs
mkdir -p /var/www/datamaktab/public/uploads

echo '--- [7/7] Configure Nginx ---'
cat > /etc/nginx/sites-available/datamaktab << 'NGINXEOF'
server {
    listen 80;
    server_name datamaktab.uz www.datamaktab.uz;

    gzip on;
    gzip_types text/plain application/json application/javascript text/css image/svg+xml;

    location /uploads/ {
        alias /var/www/datamaktab/public/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location / {
        proxy_pass         http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade \$http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host \$host;
        proxy_set_header   X-Real-IP \$remote_addr;
        proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_cache_bypass \$http_upgrade;
        client_max_body_size 20M;
    }
}
NGINXEOF

ln -sf /etc/nginx/sites-available/datamaktab /etc/nginx/sites-enabled/datamaktab
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo '--- Starting app with PM2 ---'
cd /var/www/datamaktab
pm2 delete datamaktab 2>/dev/null || true
NODE_ENV=production pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u root --hp /root

echo ''
echo '=============================='
echo ' DEPLOY MUVAFFAQIYATLI YAKUNLANDI!'
echo ' http://datamaktab.uz'
echo '=============================='
"@

ssh -i $keyPath -o StrictHostKeyChecking=no $server $deployScript
