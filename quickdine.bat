@echo off

if "%1"=="" (
  echo "Please specify an action"
  pause
)

if "%2"=="" (
  echo "Please specify an environment"
  pause
)

set action=%1
set env=%2

if /i "%action%"=="deploy" (

  goto :deploy

) else (

  echo "Other actions have not been setup yet"
  pause

)

:deploy
if /i "%env%"=="dev" (

  call npm run build

  copy dist\index.html dist\200.html

  surge dist quickdine.surge.sh

) else (

  echo "Other environments have not been setup yet"
  pause

)
