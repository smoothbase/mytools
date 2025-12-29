const axios = require('axios');
const readline = require('readline-sync');
const chalk = require('chalk');

console.log(chalk.yellow.bold(`
╔══════════════════════════════════════╗
║      🚀 NGL SPAMMER TOOLS v1.0      ║
║      Created by SmoothBase          ║
╚══════════════════════════════════════╝
`));

// Fungsi untuk delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Fungsi untuk menampilkan animasi loading
async function showLoading(text, duration = 2000) {
  const frames = ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'];
  let i = 0;
  const start = Date.now();
  
  const interval = setInterval(() => {
    process.stdout.write(`\r${chalk.blue(frames[i])} ${chalk.yellow(text)}`);
    i = (i + 1) % frames.length;
  }, 100);

  await delay(duration);
  clearInterval(interval);
  process.stdout.write(`\r${chalk.green('✓')} ${chalk.green(text + ' selesai!')}\n`);
}

// Fungsi utama spam NGL
async function spamNGL() {
  try {
    console.log(chalk.cyan('\n📝 Masukkan link NGL:'));
    const url = readline.question(chalk.white('→ '));
    
    await showLoading('Memvalidasi link NGL...', 1500);
    
    console.log(chalk.cyan('\n🔢 Masukkan jumlah spam:'));
    const jumlah = parseInt(readline.question(chalk.white('→ ')));
    
    if (isNaN(jumlah) || jumlah < 1) {
      console.log(chalk.red('❌ Jumlah harus angka dan minimal 1!'));
      return;
    }
    
    console.log(chalk.cyan('\n💬 Masukkan pesan yang ingin dikirim:'));
    const pesan = readline.question(chalk.white('→ '));
    
    if (!pesan.trim()) {
      console.log(chalk.red('❌ Pesan tidak boleh kosong!'));
      return;
    }
    
    await showLoading('Mempersiapkan spam...', 1000);
    
    console.log(chalk.magenta('\n══════════════════════════════════════'));
    console.log(chalk.white.bold('📊 DETAIL PENGIRIMAN:'));
    console.log(chalk.magenta('══════════════════════════════════════'));
    console.log(chalk.white(`📌 Link NGL: ${chalk.yellow(url)}`));
    console.log(chalk.white(`🔢 Jumlah: ${chalk.yellow(jumlah)}x`));
    console.log(chalk.white(`💬 Pesan: ${chalk.yellow(pesan)}`));
    console.log(chalk.magenta('══════════════════════════════════════\n'));
    
    console.log(chalk.yellow('⚠️  Tekan Ctrl+C untuk membatalkan\n'));
    
    // Konfirmasi sebelum mulai
    console.log(chalk.cyan('🚀 Mulai spam? (y/n)'));
    const confirm = readline.question(chalk.white('→ ')).toLowerCase();
    
    if (confirm !== 'y') {
      console.log(chalk.yellow('❌ Dibatalkan oleh pengguna.'));
      return;
    }
    
    let sukses = 0;
    let gagal = 0;
    
    for (let i = 1; i <= jumlah; i++) {
      try {
        console.log(chalk.blue(`\n📤 Mengirim spam ke-${i}...`));
        
        // API endpoint
        const apiUrl = `https://api.elrayyxml.web.id/api/tools/spamngl?url=${encodeURIComponent(url)}&message=${encodeURIComponent(pesan)}`;
        
        const response = await axios.get(apiUrl, {
          timeout: 10000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        
        if (response.data && response.data.status === 'success') {
          console.log(chalk.green(`✓ Berhasil mengirim spam ke-${i}`));
          sukses++;
        } else {
          console.log(chalk.red(`✗ Gagal mengirim spam ke-${i}`));
          gagal++;
        }
        
        // Delay antar pengiriman (2-5 detik)
        const randomDelay = Math.floor(Math.random() * 3000) + 2000;
        await delay(randomDelay);
        
      } catch (error) {
        console.log(chalk.red(`✗ Error pada spam ke-${i}: ${error.message}`));
        gagal++;
        await delay(2000); // Delay lebih lama jika error
      }
    }
    
    // Tampilkan hasil akhir
    console.log(chalk.magenta('\n══════════════════════════════════════'));
    console.log(chalk.white.bold('📊 HASIL AKHIR:'));
    console.log(chalk.magenta('══════════════════════════════════════'));
    console.log(chalk.green(`✅ Sukses: ${sukses}`));
    console.log(chalk.red(`❌ Gagal: ${gagal}`));
    console.log(chalk.cyan(`📊 Total: ${jumlah}`));
    console.log(chalk.magenta('══════════════════════════════════════\n'));
    
    // Tanya apakah ingin mengulang
    console.log(chalk.cyan('🔄 Ingin spam lagi? (y/n)'));
    const again = readline.question(chalk.white('→ ')).toLowerCase();
    
    if (again === 'y') {
      console.clear();
      spamNGL();
    } else {
      console.log(chalk.yellow('\n👋 Terima kasih telah menggunakan tools ini!'));
    }
    
  } catch (error) {
    console.log(chalk.red(`❌ Error: ${error.message}`));
    console.log(chalk.yellow('🔄 Coba lagi? (y/n)'));
    const retry = readline.question(chalk.white('→ ')).toLowerCase();
    
    if (retry === 'y') {
      spamNGL();
    }
  }
}

// Fungsi utama
async function main() {
  console.clear();
  console.log(chalk.cyan.bold('🎯 Memulai NGL Spammer Tools...\n'));
  
  // Tampilkan disclaimer
  console.log(chalk.yellow('⚠️  PERINGATAN:'));
  console.log(chalk.yellow('• Gunakan tools ini dengan bijak'));
  console.log(chalk.yellow('• Jangan disalahgunakan'));
  console.log(chalk.yellow('• Penulis tidak bertanggung jawab atas penyalahgunaan\n'));
  
  // Mulai spam NGL
  await spamNGL();
}

// Jalankan program
if (require.main === module) {
  main().catch(error => {
    console.error(chalk.red('❌ Error fatal:'), error);
    process.exit(1);
  });
}

module.exports = { spamNGL };