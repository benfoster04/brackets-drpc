@echo off
del deploy.zip
zip -0 -r deploy * -x *.cmd @
set OUTPUT_PATH=C:\Users\%USERNAME%\AppData\Roaming\Brackets\extensions\user\brackets-drpc\
if not exist %OUTPUT_PATH% (
    mkdir %OUTPUT_PATH%
)
unzip -o deploy.zip -d %OUTPUT_PATH%
echo [101mPlease press 'F5' to reload brackets to apply changes[37;0m  