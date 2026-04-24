#!/bin/bash
# ============================================================
# DATA Maktabi — First-Time Server Deployment Script
# Server: 188.225.74.65  |  Domain: datamaktab.uz
# Run this ONCE for initial setup
# ============================================================

set -e  # Exit immediately on error

APP_DIR="/var/www/datamaktab"
REPO="https://github.com/norbekqodirov/datamaktab.git"
DOMAIN="datamaktab.uz"

echo ""
echo "======================================"
echo "  DATA Maktabi — First-Time Deploy"
echo "======================================"

# 1. System packages
echo "[1/8] Updating system packages..."
apt-get update -qq
apt-get install -y nginx certbot python3-certbot-nginx curl git

# 2. Install Node.js 20
echo "[2/8] Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 3. Install tsx + pm2 globally
echo "[3/8] Installing tsx and PM2..."
npm install -g tsx pm2

# 4. Clone repo
echo "[4/8] Cloning project..."
mkdir -p $APP_DIR
git clone $REPO $APP_DIR

# 5. Install dependencies
echo "[5/8] Installing npm packages..."
cd $APP_DIR
npm install --production=false

# 6. Create logs dir and persistent uploads dir
echo "[6/8] Setting up directories..."
mkdir -p $APP_DIR/logs
mkdir -p $APP_DIR/public/uploads

# 7. Nginx config
echo "[7/8] Configuring Nginx..."
cp $APP_DIR/nginx.conf /etc/nginx/sites-available/datamaktab
ln -sf /etc/nginx/sites-available/datamaktab /etc/nginx/sites-enabled/datamaktab
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# 8. SSL with Let's Encrypt
echo "[8/8] Setting up SSL (Let's Encrypt)..."
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos -m admin@datamaktab.uz

# 9. Start with PM2
echo "[9/9] Starting app with PM2..."
cd $APP_DIR
NODE_ENV=production pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u root --hp /root | bash

echo ""
echo "======================================"
echo "  ✅ DEPLOY MUVAFFAQIYATLI YAKUNLANDI"
echo "  🌐 https://$DOMAIN"
echo "======================================"
