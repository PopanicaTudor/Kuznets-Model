const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Helper function to run commands
async function runCommand(command, args, cwd) {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args, { cwd, shell: true, stdio: 'inherit' });
        process.on('close', (code) => {
            if (code === 0) {
                resolve();
            } else {
                reject(new Error(`Command \"${command} ${args.join(' ')}\" failed with code ${code}`));
            }
        });
    });
}

// Main script
(async () => {
    try {
        // Project directories relative to the location of index.js
        const projectDir = `"${__dirname}"`; // Main project directory
        const projectBackendDir = `"${path.join(__dirname, 'backend')}"`; // Backend directory
        const projectFrontendDir = `"${path.join(__dirname, 'frontend')}"`; // Frontend directory

        console.log('Checking dependencies...');

        // 1. Install Node.js dependencies
        const frontendPackageJson = `"${path.join(__dirname, 'frontend', 'package.json')}"`;
        if (fs.existsSync(frontendPackageJson.replace(/"/g, ''))) {
            console.log('Installing Node.js dependencies...');
            await runCommand('npm', ['install'], projectFrontendDir.replace(/"/g, ''));
        } else {
            console.error(`package.json not found at ${frontendPackageJson}`);
        }

        // 2. Install Python dependencies
        const requirementsFile = `"${path.join(__dirname, 'backend', 'requirements.txt')}"`;
        if (fs.existsSync(requirementsFile.replace(/"/g, ''))) {
            console.log(`Found requirements.txt at: ${requirementsFile}`);
            await runCommand('pip', ['install', '-r', requirementsFile], projectBackendDir.replace(/"/g, ''));
        } else {
            console.error(`ERROR: requirements.txt not found at ${requirementsFile}`);
            process.exit(1);
        }

        // 3. Start Python backend
        console.log('Starting Python backend...');
        const backendProcess = spawn('python', ['scraping.py'], {
            cwd: projectBackendDir.replace(/"/g, ''),
            shell: true,
            stdio: 'inherit',
        });

        // 4. Start React frontend
        console.log('Starting React frontend...');
        const frontendProcess = spawn('npm', ['run', 'dev'], {
            cwd: projectFrontendDir.replace(/"/g, ''),
            shell: true,
            stdio: 'inherit',
        });

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
            console.log(`Python backend stopped with code ${code}`);
            cleanup();
        });

        frontendProcess.on('close', (code) => {
            console.log(`React frontend stopped with code ${code}`);
            cleanup();
        });
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
})();
