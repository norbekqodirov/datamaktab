#!/bin/bash
# ============================================================
# DATA Maktabi — Update Script (run after git push)
# This SAFELY pulls new code without touching the database
# or uploaded images.
# ============================================================

set -e

APP_DIR="/var/www/datamaktab"

echo ""
echo "================================"
echo "  DATA Maktabi — Yangilash"
echo "================================"

cd $APP_DIR

# Pull only the src code (NOT the database)
echo "[1/3] Git pull yangi kod..."
git fetch origin main
git checkout main
git pull origin main

# Reinstall packages if package.json changed
echo "[2/3] npm paketlar tekshiruvi..."
npm install --production=false

# Reload without restart (zero-downtime)
echo "[3/3] PM2 qayta yuklash..."
pm2 reload datamaktab --update-env

echo ""
echo "================================"
echo "  ✅ Yangilash tugadi!"
echo "  📦 Database va rasmlar saqlab qolindi."
echo "================================"
