
# Telegram Form Submission Bot

Repositori ini menyimpan kode **Google Apps Script** untuk otomatisasi Google Form. Ketika ada respon baru, data akan disimpan ke Google Sheet dan mengirimkan ringkasan pesan elegan ke grup/channel Telegram.

## 🚀 Fitur
- ✅ Otomatisasi *Real-time* saat form disubmit.
- 💾 Penyimpanan data terstruktur di Google Sheets.
- 🚀 Notifikasi cepat ke Telegram menggunakan Telegram Bot API.
- 📝 Format pesan Telegram yang elegan menggunakan **Markdown**.
- 📊 Penghitung total entri harian.



---

## 🛠 Panduan Instalasi

Ikuti langkah-langkah berikut untuk memasang bot ini:

### 1. Persiapan
1.  Siapkan **Google Form** Anda.
2.  Siapkan **Bot Telegram** (dapatkan `TOKEN` dari @BotFather).
3.  Siapkan **ID Chat** Telegram (bisa ID user atau ID Group).

### 2. Mengatur Google Apps Script
1.  Buka Google Form Anda.
2.  Klik titik tiga di pojok kanan atas, lalu pilih **Script editor**.
3.  Hapus kode yang ada, lalu salin dan tempel kode dari file `kode.js` repositori ini.
4.  **Ubah Konfigurasi** pada bagian atas kode:
    ```javascript
    var token = "ISI_TOKEN_BOT_ANDA";
    var chatid = "ISI_CHAT_ID_ANDA";
    var spreadsheetId = "ISI_SPREADSHEET_ID_ANDA";
    var sheetName = "Sheet1"; // Sesuaikan dengan nama sheet Anda
    ```
5.  Klik ikon **Save** (diskette).

### 3. Mengatur Trigger (Otomatisasi)
Agar script berjalan otomatis saat form diisi, Anda harus mengatur trigger:
1.  Di sebelah kiri Script Editor, klik ikon jam (**Triggers**).
2.  Klik tombol **+ Add Trigger** di pojok kanan bawah.
3.  Konfigurasikan seperti berikut:
    * Choose which function to run: `botResponse`
    * Choose which deployment should run: `Head`
    * Select event source: `From form`
    * Select event type: `On form submit`
4.  Klik **Save**. Anda akan diminta untuk melakukan otorisasi akun Google (klik *Advanced* -> *Go to ... (unsafe)* -> *Allow*).

---

## 💬 Contoh Pesan Telegram

Bot akan mengirimkan pesan dengan format berikut ke Telegram Anda:

```text
┏━━━━━━━━━━━━━━━━━━━━━━┓
    💠 NEW SUBMISSION 💠
┗━━━━━━━━━━━━━━━━━━━━━━┛
System Automation Report

✨ Applicant Details:
• 👤 Nama : [Nama Pelamar]
• 📱 HP : `[Nomor HP]`
• 📧 Email : `[Email]`

📂 Documentation:
• 🖼 ID Card : [🔗 Lihat File](link_drive)
• 📸 Formal : [🔗 Lihat File](link_drive)

━━━━━━━━━━━━━━━━━━━━━━
🔖 Ref ID : `[Kode Unik]`
⏱ Time : `[Tanggal & Waktu]`
📊 Today : `[Jumlah]` entri.

💡 Data tersimpan. Menunggu verifikasi tim.
