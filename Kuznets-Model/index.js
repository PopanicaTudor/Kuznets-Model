const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Helper function to run commands
async function runCommand(command, args, cwd, silent = false) {
    return new Promise((resolve, reject) => {
        const options = { cwd, shell: true, stdio: silent ? 'pipe' : 'inherit' };
        const process = spawn(command, args, options);
        let output = '';

        if (silent) {
            process.stdout.on('data', (data) => {
                output += data.toString();
            });
        }

        process.on('close', (code) => {
            if (code === 0) {
                resolve(output);
            } else {
                reject(new Error(`Command \"${command} ${args.join(' ')}\" failed with code ${code}`));
            }
        });
    });
}

// Helper function to wait for a process to be ready
async function waitForProcessToStart(process, timeout = 10000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Process start timeout exceeded'));
        }, timeout);

        process.stdout.on('data', (data) => {
            clearTimeout(timer);
            resolve();
        });

        process.stderr.on('data', (data) => {
            clearTimeout(timer);
            reject(new Error(`Process error: ${data.toString()}`));
        });

        process.on('close', (code) => {
            clearTimeout(timer);
            if (code !== 0) {
                reject(new Error(`Process exited with code ${code}`));
            }
        });
    });
}

// Main script
(async () => {
    try {
        // Ensure "open" module is installed
        console.log('Checking dependencies. This may take a few minutes...');
        await runCommand('npm', ['install', 'open'], __dirname, true);

        // Dynamically import 'open' to handle ESM
        const { default: open } = await import('open');

        // Project directories relative to the location of index.js
        const projectDir = `"${__dirname}"`; // Main project directory
        const projectBackendDir = `"${path.join(__dirname, 'backend')}"`; // Backend directory
        const projectFrontendDir = `"${path.join(__dirname, 'frontend')}"`; // Frontend directory

        // 1. Install Node.js dependencies
        const frontendPackageJson = `"${path.join(__dirname, 'frontend', 'package.json')}"`;
        if (fs.existsSync(frontendPackageJson.replace(/"/g, ''))) {
            await runCommand('npm', ['install'], projectFrontendDir.replace(/"/g, ''), true);
            await runCommand('npm', ['audit', 'fix'], projectFrontendDir.replace(/"/g, ''), true);
        } else {
            console.error(`Dependencies couldn't be installed.`);
            process.exit(1);
        }

        // 2. Install Python dependencies
        const requirementsFile = `"${path.join(__dirname, 'backend', 'requirements.txt')}"`;
        if (fs.existsSync(requirementsFile.replace(/"/g, ''))) {
            await runCommand('pip', ['install', '-r', requirementsFile], projectBackendDir.replace(/"/g, ''), true);
        } else {
            console.error(`Dependencies couldn't be installed.`);
            process.exit(1);
        }

        console.log('Dependencies successfully installed.');
        console.log('Starting the application...');

        // 3. Start Python backend
        const backendProcess = spawn('python', ['scraping.py'], {
            cwd: projectBackendDir.replace(/"/g, ''),
            shell: true,
            stdio: 'pipe',
        });

        // 4. Start React frontend
        const frontendProcess = spawn('npm', ['run', 'dev'], {
            cwd: projectFrontendDir.replace(/"/g, ''),
            shell: true,
            stdio: 'pipe',
        });

        // Wait for both backend and frontend to be ready
        await waitForProcessToStart(backendProcess);
        await waitForProcessToStart(frontendProcess);

        // Force open the default URL
        const defaultUrl = 'http://localhost:3000';
        console.log(`Opening URL...`);
        open(defaultUrl);
        console.log(`URL opened: ${defaultUrl}`);

        // Handle processes on script termination
        const cleanup = () => {
            console.log('Stopping processes...');
            backendProcess.kill();
            frontendProcess.kill();
            process.exit();
        };

        process.on('SIGINT', cleanup);
        process.on('SIGTERM', cleanup);

        // Wait for processes to close
        backendProcess.on('close', (code) => {
            cleanup();
        });

        frontendProcess.on('close', (code) => {
            cleanup();
        });
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
})();
