# 🎮 Clean Retro Portfolio - Yusra Sakti Wardhana

Portfolio web bertema **Clean Retro** yang dibangun menggunakan React, Vite, dan Vanilla CSS. Portofolio ini dirancang khusus untuk peran **Data Analyst & Data Scientist**.

---

## 🚀 Cara Mendeploy ke GitHub Pages (`github.io`)

Ada 2 cara mudah untuk mendeploy proyek React + Vite ke GitHub Pages. Pilih salah satu cara berikut:

### Pilihan 1: Menggunakan GitHub Actions (Sangat Direkomendasikan - Otomatis)
Dengan cara ini, GitHub akan melakukan build dan deploy secara otomatis setiap kali Anda melakukan `git push` ke repositori.

1. **Sesuaikan `vite.config.js`**
   Buka file `vite.config.js` dan tambahkan properti `base` yang mengarah ke nama repositori GitHub Anda:
   ```javascript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/nama-repositori-anda/', // Ganti dengan nama repo GitHub Anda
   })
   ```
   *(Catatan: Jika Anda mendeploy ke repositori utama bernama `username.github.io`, gunakan `base: '/'`)*.

2. **Buat File Workflow GitHub**
   Buat folder `.github/workflows/` di root direktori proyek, lalu buat file bernama `deploy.yml` di dalamnya dengan konten berikut:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches:
         - main # Ganti dengan 'master' jika branch utama Anda bernama master

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: 'pages'
     cancel-in-progress: true

   jobs:
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         - name: Set up Node.js
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: npm
         - name: Install dependencies
           run: npm ci
         - name: Build
           run: npm run build
         - name: Setup Pages
           uses: actions/configure-pages@v4
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: './dist'
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

3. **Aktifkan Fitur Pages di Repositori GitHub**
   - Buka repositori Anda di GitHub.
   - Masuk ke **Settings** > **Pages**.
   - Di bagian **Build and deployment**, pada bagian **Source**, ubah dari `Deploy from a branch` menjadi **GitHub Actions**.

4. **Push Kode Anda**:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git remote add origin https://github.com/username/nama-repositori-anda.git
   git branch -M main
   git push -u origin main
   ```
   GitHub Actions akan berjalan otomatis dan situs Anda akan live di `https://username.github.io/nama-repositori-anda/`.

---

### Pilihan 2: Menggunakan package `gh-pages` (Manual dari Lokal)
Jika ingin melakukan build di laptop Anda lalu men-deploy hasilnya ke GitHub:

1. **Install Package `gh-pages`**:
   Jalankan perintah berikut di terminal proyek:
   ```bash
   npm install gh-pages --save-dev
   ```

2. **Edit `package.json`**:
   Tambahkan properti `"homepage"` dan script `"predeploy"` serta `"deploy"` di dalam `package.json`:
   ```json
   {
     "homepage": "https://username.github.io/nama-repositori-anda",
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist",
       "preview": "vite preview"
     }
   }
   ```

3. **Sesuaikan `vite.config.js`**:
   Sama seperti Pilihan 1, tambahkan `base: '/nama-repositori-anda/'`.

4. **Jalankan Perintah Deploy**:
   ```bash
   npm run deploy
   ```
   Perintah ini akan men-build aplikasi Anda dan mengunggah isi folder `dist` ke branch `gh-pages` di GitHub.

5. **Aktifkan di Settings**:
   - Di halaman GitHub repositori Anda, masuk ke **Settings** > **Pages**.
   - Pastikan **Source** diatur ke **Deploy from a branch**, dan pilih branch **gh-pages** (folder `/root`).
