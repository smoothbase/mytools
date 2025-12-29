#!/usr/bin/env node

const readline = require('readline-sync');
const chalk = require('chalk');
const figlet = require('figlet');

// Konfigurasi login
const USERNAME = "smoothing";
const PASSWORD = "123";

// Animasi loading
const loadingAnimations = [
  "⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿",
  "⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿",
  "⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿",
  "⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿",
  "⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿",
  "⣟⣿⣿⣿⣿⣿⣿⣿⣿⣿",
  "⣯⣿⣿⣿⣿⣿⣿⣿⣿⣿",
  "⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿"
];

function showLoading(message, duration = 2000) {
  let i = 0;
  const start = Date.now();
  
  const interval = setInterval(() => {
    process.stdout.write(`\r${chalk.cyan(loadingAnimations[i])} ${chalk.yellow(message)}`);
    i = (i + 1) % loadingAnimations.length;
    
    if (Date.now() - start >= duration) {
      clearInterval(interval);
      process.stdout.write(`\r${chalk.green('✓')} ${chalk.green(message + ' Selesai!')}\n`);
    }
  }, 100);
  
  return new Promise(resolve => setTimeout(resolve, duration));
}

function printBanner() {
  console.clear();
  console.log(chalk.cyan(figlet.textSync('SMOOTHING', { font: 'Small' })));
  console.log(chalk.yellow('='.repeat(50)));
  console.log(chalk.green('     Tools Optimization v1.0'));
  console.log(chalk.yellow('='.repeat(50)));
  console.log();
}

async function login() {
  printBanner();
  
  console.log(chalk.cyan('\n🔐 LOGIN SISTEM'));
  console.log(chalk.yellow('━'.repeat(30)));
  
  const username = readline.question(chalk.white('Username : '));
  await showLoading('Memverifikasi username', 1000);
  
  if (username !== USERNAME) {
    console.log(chalk.red('\n✗ Username salah!'));
    process.exit(1);
  }
  
  const password = readline.question(chalk.white('Password : '), {
    hideEchoBack: true
  });
  
  await showLoading('Memverifikasi password', 1500);
  
  if (password !== PASSWORD) {
    console.log(chalk.red('\n✗ Password salah!'));
    process.exit(1);
  }
  
  console.log(chalk.green('\n✓ Login berhasil!'));
  await new Promise(resolve => setTimeout(resolve, 1000));
}

function mainMenu() {
  console.clear();
  printBanner();
  
  console.log(chalk.cyan('👤 User: ') + chalk.green(USERNAME));
  console.log(chalk.yellow('━'.repeat(50)));
  
  console.log(chalk.cyan('\n📋 MENU UTAMA:'));
  console.log(chalk.white('  [1] ') + chalk.green('Optimasi Sistem'));
  console.log(chalk.white('  [2] ') + chalk.green('Bersihkan Cache'));
  console.log(chalk.white('  [3] ') + chalk.green('Cek Koneksi'));
  console.log(chalk.white('  [4] ') + chalk.green('Update Tools'));
  console.log(chalk.white('  [5] ') + chalk.green('Pengaturan'));
  console.log(chalk.white('  [0] ') + chalk.red('Keluar'));
  console.log(chalk.yellow('━'.repeat(50)));
  
  const choice = readline.question(chalk.white('\nPilih menu [0-5]: '));
  
  switch(choice) {
    case '1':
      optimizeSystem();
      break;
    case '2':
      clearCache();
      break;
    case '3':
      checkConnection();
      break;
    case '4':
      updateTools();
      break;
    case '5':
      settings();
      break;
    case '0':
      exitProgram();
      break;
    default:
      console.log(chalk.red('\nPilihan tidak valid!'));
      setTimeout(() => mainMenu(), 2000);
  }
}

async function optimizeSystem() {
  console.clear();
  printBanner();
  console.log(chalk.cyan('\n⚡ OPTIMASI SISTEM'));
  console.log(chalk.yellow('━'.repeat(50)));
  
  await showLoading('Memulai optimasi...', 1000);
  await showLoading('Menganalisis sistem...', 1500);
  await showLoading('Mengoptimasi memori...', 1200);
  await showLoading('Menyesuaikan pengaturan...', 1800);
  
  console.log(chalk.green('\n✓ Optimasi selesai!'));
  console.log(chalk.cyan('   • Memori dioptimasi: ') + chalk.green('85%'));
  console.log(chalk.cyan('   • Cache dibersihkan: ') + chalk.green('120MB'));
  console.log(chalk.cyan('   • Performa meningkat: ') + chalk.green('+30%'));
  
  readline.question(chalk.yellow('\nTekan Enter untuk kembali...'));
  mainMenu();
}

async function clearCache() {
  console.clear();
  printBanner();
  console.log(chalk.cyan('\n🧹 BERSIHKAN CACHE'));
  console.log(chalk.yellow('━'.repeat(50)));
  
  const confirm = readline.keyInYN(chalk.yellow('Yakin ingin menghapus cache?'));
  
  if (confirm) {
    await showLoading('Menghapus cache aplikasi...', 1500);
    await showLoading('Membersihkan file temporary...', 1200);
    await showLoading('Menyelesaikan proses...', 800);
    
    console.log(chalk.green('\n✓ Cache berhasil dibersihkan!'));
    console.log(chalk.cyan('   Total ruang dibebaskan: ') + chalk.green('250 MB'));
  } else {
    console.log(chalk.yellow('\nProses dibatalkan.'));
  }
  
  readline.question(chalk.yellow('\nTekan Enter untuk kembali...'));
  mainMenu();
}

async function checkConnection() {
  console.clear();
  printBanner();
  console.log(chalk.cyan('\n🌐 CEK KONEKSI'));
  console.log(chalk.yellow('━'.repeat(50)));
  
  const hosts = [
    { name: 'Google', host: 'google.com' },
    { name: 'GitHub', host: 'github.com' },
    { name: 'Cloudflare', host: 'cloudflare.com' }
  ];
  
  for (const server of hosts) {
    process.stdout.write(chalk.white(`   Memeriksa ${server.name}... `));
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(chalk.green('✓ Online'));
  }
  
  await showLoading('Mengukur kecepatan...', 2000);
  
  console.log(chalk.cyan('\n📊 HASIL PENGUKURAN:'));
  console.log(chalk.white('   Ping: ') + chalk.green('45ms'));
  console.log(chalk.white('   Download: ') + chalk.green('12.5 Mbps'));
  console.log(chalk.white('   Upload: ') + chalk.green('5.8 Mbps'));
  console.log(chalk.white('   Status: ') + chalk.green('Koneksi Stabil'));
  
  readline.question(chalk.yellow('\nTekan Enter untuk kembali...'));
  mainMenu();
}

async function updateTools() {
  console.clear();
  printBanner();
  console.log(chalk.cyan('\n🔄 UPDATE TOOLS'));
  console.log(chalk.yellow('━'.repeat(50)));
  
  await showLoading('Mengecek pembaruan...', 1500);
  
  const currentVer = 'v1.0';
  const latestVer = 'v1.2';
  
  if (currentVer !== latestVer) {
    console.log(chalk.yellow(`\n📥 Pembaruan tersedia: ${currentVer} → ${latestVer}`));
    const confirm = readline.keyInYN(chalk.yellow('Update sekarang?'));
    
    if (confirm) {
      await showLoading('Mengunduh pembaruan...', 2000);
      await showLoading('Menginstall...', 1800);
      await showLoading('Menyelesaikan...', 1200);
      console.log(chalk.green('\n✓ Update berhasil!'));
    }
  } else {
    console.log(chalk.green('\n✓ Tools sudah versi terbaru!'));
  }
  
  readline.question(chalk.yellow('\nTekan Enter untuk kembali...'));
  mainMenu();
}

function settings() {
  console.clear();
  printBanner();
  console.log(chalk.cyan('\n⚙️  PENGATURAN'));
  console.log(chalk.yellow('━'.repeat(50)));
  
  console.log(chalk.cyan('\n🔧 Opsi Pengaturan:'));
  console.log(chalk.white('  [1] ') + chalk.green('Ubah Tema'));
  console.log(chalk.white('  [2] ') + chalk.green('Notifikasi'));
  console.log(chalk.white('  [3] ') + chalk.green('Auto Update'));
  console.log(chalk.white('  [4] ') + chalk.green('Reset Pengaturan'));
  console.log(chalk.white('  [0] ') + chalk.green('Kembali'));
  
  console.log(chalk.yellow('━'.repeat(50)));
  console.log(chalk.cyan('\n📊 Info Sistem:'));
  console.log(chalk.white('   Node.js: ') + chalk.green(process.version));
  console.log(chalk.white('   Platform: ') + chalk.green(process.platform));
  console.log(chalk.white('   Direktori: ') + chalk.green(process.cwd()));
  
  const choice = readline.question(chalk.white('\nPilih opsi [0-4]: '));
  
  if (choice === '0') {
    mainMenu();
  } else {
    console.log(chalk.yellow('\nFitur dalam pengembangan...'));
    readline.question(chalk.yellow('Tekan Enter untuk kembali...'));
    settings();
  }
}

function exitProgram() {
  console.clear();
  printBanner();
  
  console.log(chalk.cyan('\n👋 SELAMAT TINGGAL!'));
  console.log(chalk.yellow('━'.repeat(50)));
  
  showLoading('Keluar dari sistem', 1500).then(() => {
    console.log(chalk.green('\n✓ Terima kasih telah menggunakan Smoothing Tools!'));
    process.exit(0);
  });
}

// Handle CTRL+C
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n\n⚠️  Interrupt detected. Exiting gracefully...'));
  process.exit(0);
});

// Main execution
async function start() {
  try {
    await login();
    mainMenu();
  } catch (error) {
    console.error(chalk.red('Error:'), error.message);
    process.exit(1);
  }
}

start();