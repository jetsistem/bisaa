#!/usr/bin/env node
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

console.log('▶ Bissa Akademi — cPanel Subdomain Dağıtım Paketi Hazırlanıyor...');

execSync('npm run build', { stdio: 'inherit' });

const distDir = path.resolve(process.cwd(), 'dist');
const htaccessPath = path.join(distDir, '.htaccess');

// Clean up any temporary attachment previews if present
const tempAiStudioDir = path.join(distDir, 'assets', 'aistudio');
if (fs.existsSync(tempAiStudioDir)) {
  fs.rmSync(tempAiStudioDir, { recursive: true, force: true });
}

if (!fs.existsSync(htaccessPath)) {
  throw new Error('.htaccess dosyası dist klasörüne kopyalanamadı!');
}

console.log('\n✓ Derleme tamamlandı! cPanel sunucusuna yüklenecek hazır dosyalar "dist/" klasöründedir:');
for (const entry of fs.readdirSync(distDir)) {
  console.log(`  - dist/${entry}`);
}
console.log('\nKurulum: "dist/" klasörü içindeki TÜM dosya ve klasörleri (.htaccess dahil) cPanel File Manager üzerinden subdomain klasörünüze (örn. public_html/akademi veya akademi.alanadiniz.com) yükleyin.');
