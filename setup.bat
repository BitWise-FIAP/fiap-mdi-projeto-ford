@echo off
echo Instalando dependencias do Ford VINculo...
npm install --legacy-peer-deps
if errorlevel 1 (
  echo Falha ao instalar as dependencias.
  pause
  exit /b 1
)
echo.
echo Para usar a IA, copie .env.example para .env e configure a chave da Groq.
echo Dependencias instaladas. Execute 'npm start' para iniciar o projeto.
pause