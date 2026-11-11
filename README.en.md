# MySQL Studio

English | [简体中文](README.zh-CN.md)

MySQL Studio is a modern Windows MySQL desktop client with a SQL editor, database object browser, query history, Explain, formatted result tables, CSV export, and a clickable Chinese/English UI switcher.

## Run from source

```powershell
npm install        # install Electron dependencies once
npm start          # launch the desktop development build
```

`npm start` only launches the app. It does not execute SQL. After a connection is configured, SQL is executed by the local `mysql.exe` client.

## Use the EXE

Download `MySQL-Studio-0.1.0-win-x64.zip` from Releases, extract the complete folder, and run `MySQL Studio.exe`. Use the gear icon to set the host, port, user, password, database, and `mysql.exe` path.

## Package

```powershell
npm run dist       # create Windows build artifacts in dist/
```

The password is passed to `mysql.exe` through the process environment and is not written into SQL text. Without a configured client path, the app uses demo data.
