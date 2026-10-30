@echo off
chcp 65001 >nul
title Verificar Node.js - TechForge
where node >nul 2>nul
if errorlevel 1 (
 echo Node.js NAO foi encontrado no PATH.
) else (
 echo Node.js encontrado com sucesso:
 node --version
 echo.
 echo O computador esta pronto para iniciar o TechForge 3D.
)
echo.
pause
