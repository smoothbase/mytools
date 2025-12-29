const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
const cliProgress = require('cli-progress');
const colors = require('colors');

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Clear console
console.clear();

// Banner
console.log(colors.cyan(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║      🚀 HTML DOWNLOADER FOR TERMUX - SMOOTH VERSION     ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
`.bold));

// Target directory
const targetDir = '/sdcard/smooth';
const targetFile = path.join(targetDir, 'index.html');

async function ensureDirectoryExists() {
    try {
        await fs.ensureDir(targetDir);
        console.log(colors.green(`✓ Directory created/verified: ${targetDir}`));
        return true;
    } catch (error) {
        console.log(colors.red(`✗ Error creating directory: ${error.message}`));
        return false;
    }
}

async function downloadHTML(url) {
    try {
        console.log(colors.yellow(`\n🔗 Downloading from: ${url}`));
        
        // Create progress bar
        const progressBar = new cliProgress.SingleBar({
            format: colors.cyan('{bar}') + ' {percentage}% | {value}/{total} bytes',
            barCompleteChar: '█',
            barIncompleteChar: '░',
            hideCursor: true,
            clearOnComplete: true
        });

        // Start progress bar with initial values
        progressBar.start(100, 0);

        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream',
            onDownloadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const total = parseInt(progressEvent.total);
                    const current = parseInt(progressEvent.loaded);
                    const percent = (current / total) * 100;
                    
                    // Update progress bar
                    progressBar.update(percent, {
                        value: current,
                        total: total
                    });
                }
            }
        });

        // Ensure directory exists
        if (!await ensureDirectoryExists()) {
            progressBar.stop();
            return false;
        }

        // Write file
        const writer = fs.createWriteStream(targetFile);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                progressBar.update(100);
                progressBar.stop();
                resolve(true);
            });
            
            writer.on('error', (err) => {
                progressBar.stop();
                reject(err);
            });
        });

    } catch (error) {
        console.log(colors.red(`\n✗ Download failed: ${error.message}`));
        return false;
    }
}

async function main() {
    console.log(colors.white('\n📁 Target file: ') + colors.cyan(targetFile));
    console.log(colors.gray('─────────────────────────────────────────────\n'));

    rl.question(colors.yellow('🌐 Masukkan link: '), async (url) => {
        if (!url || url.trim() === '') {
            console.log(colors.red('\n✗ Link tidak boleh kosong!'));
            rl.close();
            return;
        }

        // Validasi URL
        try {
            new URL(url);
        } catch (error) {
            console.log(colors.red('\n✗ Link tidak valid!'));
            rl.close();
            return;
        }

        console.log(colors.gray('\n─────────────────────────────────────────────'));
        
        // Download file
        const success = await downloadHTML(url);
        
        if (success) {
            console.log(colors.green('\n✅ Download berhasil!'));
            console.log(colors.white(`📄 File tersimpan di: `) + colors.cyan(targetFile));
            
            // Cek ukuran file
            try {
                const stats = await fs.stat(targetFile);
                const fileSize = (stats.size / 1024).toFixed(2);
                console.log(colors.white(`📊 Ukuran file: `) + colors.yellow(`${fileSize} KB`));
            } catch (error) {
                console.log(colors.yellow('\n⚠  Tidak dapat mengecek ukuran file'));
            }
        } else {
            console.log(colors.red('\n❌ Download gagal!'));
        }

        console.log(colors.gray('\n─────────────────────────────────────────────'));
        console.log(colors.magenta('✨ Tekan Ctrl+C untuk keluar'));
        
        rl.close();
    });
}

// Handle Ctrl+C
rl.on('SIGINT', () => {
    console.log(colors.yellow('\n\n👋 Sampai jumpa!'));
    process.exit(0);
});

// Start the application
main();