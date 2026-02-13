function botResponse(e) {
  // ==============================
  // 1. KONFIGURASI
  // ==============================
  var token = "API BOT TELE";
  var chatid = "ID USER/GROUP";
  var spreadsheetId = "ID SHEET GOOGLE";
  var sheetName = "Sheet1";

  // Ambil data dari event
  if (!e) {
    Logger.log("Error: Script tidak dijalankan oleh form submission trigger.");
    return;
  }

  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);

  // ==============================
  // 2. DATA FORM
  // ==============================
  var formResponse = e.response;
  var itemResponses = formResponse.getItemResponses();
  var timestampRaw = formResponse.getTimestamp();
  
  // EMAIL PENGIRIM
  var responderEmail = formResponse.getRespondentEmail(); 

  var timestamp = Utilities.formatDate(
    timestampRaw,
    "Asia/Jakarta",
    "dd MMM yyyy, HH:mm"
  );

  var submissionID = Utilities.getUuid().split("-")[0].toUpperCase();
  var status = "⏳ *Pending Review*";

  // Ambil data jawaban secara berurutan sesuai urutan di Form
  var answers = [];
  for (var j = 0; j < itemResponses.length; j++) {
    var response = itemResponses[j].getResponse();
    
    // Konversi file ID Drive jadi link
    if (response.toString().length > 20 && response.toString().indexOf("http") === -1 && response.toString().indexOf(" ") === -1) {
      response = "https://drive.google.com/open?id=" + response;
    }
    
    answers.push(response);
  }

  // ==============================
  // 3. SIMPAN KE GOOGLE SHEET
  // ==============================
  var rowData = [
    timestamp,    
    answers[0],   // Nama
    answers[1],   // No HP
    answers[2],   // Foto ID
    answers[3],   // Foto Formal
    responderEmail, // Email
    submissionID, 
    status        
  ];

  sheet.appendRow(rowData);

  // ==============================
  // 4. FORMAT PESAN TELEGRAM (ELEGAN & MENARIK)
  // ==============================
  var text = "";
  
  // Hitung total entries hari ini
  var today = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd");
  var updatedData = sheet.getDataRange().getValues();
  var todayCount = 0;
  for (var k = 1; k < updatedData.length; k++) {
    if (updatedData[k][0]) {
      var rowDate = Utilities.formatDate(new Date(updatedData[k][0]), "Asia/Jakarta", "yyyy-MM-dd");
      if (rowDate == today) todayCount++;
    }
  }

  // HEADER - Estetik & Tegas
  text += "┏━━━━━━━━━━━━━━━━━━━━━━┓\n";
  text += "    💠 *NEW SUBMISSION* 💠\n";
  text += "┗━━━━━━━━━━━━━━━━━━━━━━┛\n";
  text += "_System Automation Report_" + "\n\n";

  // SECTION: PELAMAR - Elegan
  text += "✨ *Applicant Details:*\n";
  text += "• 👤 *Nama* : " + answers[0] + "\n";
  text += "• 📱 *HP* : `" + answers[1] + "`\n";
  text += "• 📧 *Email* : `" + responderEmail + "`\n\n";

  // SECTION: LAMPIRAN - Jelas
  text += "📂 *Documentation:*\n";
  text += "• 🖼 *ID Card* : " + (answers[2] ? "[🔗 Lihat File](" + answers[2] + ")" : "❌ Tidak Ada") + "\n";
  text += "• 📸 *Formal* : " + (answers[3] ? "[🔗 Lihat File](" + answers[3] + ")" : "❌ Tidak Ada") + "\n\n";

  // SECTION: LOGS - Ringkas
  text += "━━━━━━━━━━━━━━━━━━━━━━\n";
  text += "🔖 *Ref ID* : `" + submissionID + "`\n";
  text += "⏱ *Time* : `" + timestamp + "`\n";
  text += "📊 *Today* : `" + todayCount + "` entri.\n\n";
  text += "💡 _Data tersimpan. Menunggu verifikasi tim._";

  // ==============================
  // 5. KIRIM KE TELEGRAM (MARKDOWN)
  // ==============================
  var url = "https://api.telegram.org/bot" + token + "/sendMessage";
  var payload = {
    "chat_id": chatid,
    "text": text,
    "parse_mode": "Markdown", // Menggunakan Markdown agar bersih dan elegan
    "disable_web_page_preview": true // Matikan preview link untuk kerapian
  };
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };
  UrlFetchApp.fetch(url, options);
}
