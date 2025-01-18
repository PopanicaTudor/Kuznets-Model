@echo off
REM Navighează în directorul unde se află fișierul .bat
cd /d "%~dp0"

REM Intră în subdirectorul Kuznets-Model
cd Kuznets-Model

REM Pornește scriptul Node.js
node index.js

REM Așteaptă ca utilizatorul să apese o tastă pentru a închide fereastra
pause
