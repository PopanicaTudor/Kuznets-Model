const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Helper pentru rularea comenzilor
async function runCommand(command, args, cwd) {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args, { cwd, shell: true, stdio: 'inherit' });
        process.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command "${command} ${args.join(' ')}" failed with code ${code}`));
            }
        });
    });
}

// Script principal
(async () => {
    try {
        // Directorii proiectului relativ la locația lui index.js
        const projectDir = `"${__dirname}"`; // Directorul principal Kuznets-Model
        const projectBackendDir = `"${path.join(__dirname, 'backend')}"`; // Directorul backend
        const projectFrontendDir = `"${path.join(__dirname, 'frontend')}"`; // Directorul frontend

        console.log('Verific dependențele...');

        // 1. Instalează dependențele Node.js
        const frontendPackageJson = `"${path.join(__dirname, 'frontend', 'package.json')}"`;
        if (fs.existsSync(frontendPackageJson.replace(/"/g, ''))) {
            console.log('Instalez dependențele Node.js...');
            await runCommand('npm', ['install'], projectFrontendDir.replace(/"/g, ''));
        } else {
            console.error(`Nu am găsit package.json la ${frontendPackageJson}`);
        }

        // 2. Instalează dependențele Python
        const requirementsFile = `"${path.join(__dirname, 'backend', 'requirements.txt')}"`;
        if (fs.existsSync(requirementsFile.replace(/"/g, ''))) {
            console.log(`Found requirements.txt at: ${requirementsFile}`);
            await runCommand('pip', ['install', '-r', requirementsFile], projectBackendDir.replace(/"/g, ''));
        } else {
            console.error(`ERROR: Nu am găsit requirements.txt la ${requirementsFile}`);
            process.exit(1);
        }

        // 3. Pornește backend-ul Python
        console.log('Pornesc backend-ul Python...');
        const backendProcess = spawn('python', ['scraping.py'], {
            cwd: projectBackendDir.replace(/"/g, ''),
            shell: true,
            stdio: 'inherit',
        });

        // 4. Pornește frontend-ul React
        console.log('Pornesc frontend-ul React...');
        const frontendProcess = spawn('npm', ['run', 'dev'], {
            cwd: projectFrontendDir.replace(/"/g, ''),
            shell: true,
            stdio: 'inherit',
        });

        // Gestiunea proceselor la terminarea scriptului
        const cleanup = () => {
            console.log('Oprire procese...');
            backendProcess.kill();
            frontendProcess.kill();
            process.exit();
        };

        process.on('SIGINT', cleanup);
        process.on('SIGTERM', cleanup);

        // Așteaptă închiderea proceselor
        backendProcess.on('close', (code) => {
            console.log(`Backend Python s-a oprit cu codul ${code}`);
            cleanup();
        });

        frontendProcess.on('close', (code) => {
            console.log(`Frontend React s-a oprit cu codul ${code}`);
            cleanup();
        });
    } catch (error) {
        console.error('A apărut o eroare:', error.message);
    }
})();
