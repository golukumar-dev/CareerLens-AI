@echo off
:: Backend ko alag CMD window mein start karta hai
start "ResumeAI Backend" cmd /k "cd /d D:\AI-Resume-Analyzer\backend && node server.js"

:: Backend ko start hone ke liye 2 seconds deta hai
timeout /t 2 /nobreak >nul

:: Frontend ko alag CMD window mein start karta hai aur browser kholta hai
start "ResumeAI Frontend" cmd /k "cd /d D:\AI-Resume-Analyzer\frontend && call C:\PROGRA~1\nodejs\npm.cmd run dev -- --open"