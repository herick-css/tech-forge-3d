@echo off
chcp 65001 >nul
title TechForge 3D - SENAC
cd /d "%~dp0"
echo ==================================================
echo         TECHFORGE 3D - SENAC
echo ==================================================
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo ERRO: Node.js nao foi encontrado.
  echo Instale o Node.js e execute este arquivo novamente.
  echo.
  pause
  exit /b 1
)
echo Node.js encontrado:
node --version
echo.
echo Iniciando o laboratorio virtual...
echo O navegador sera aberto automaticamente.
echo Nao feche esta janela enquanto estiver jogando.
echo.
node server.js
echo.
pause
