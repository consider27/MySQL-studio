# MySQL Studio

English | [简体中文](README.zh-CN.md)

MySQL Studio is a modern Windows MySQL desktop client with a SQL editor, database object browser, query history, Explain, formatted result tables, CSV export, and a clickable Chinese/English UI switcher.

## Run from source

Install dependencies once:

```powershell
npm install
```

Launch MySQL Studio:

```powershell
npm run app
```

`npm run app` only launches the app. It does not execute SQL. Use `npm run build:win` to create Windows installers in `dist/`. `npm start` and `npm run dist` remain compatibility aliases.

## Use the EXE

Download `MySQL-Studio-0.1.0-win-x64.zip` from Releases, extract the complete folder, and run `MySQL Studio.exe`. Use the gear icon to set the host, port, user, password, database, and `mysql.exe` path.

## Package

```powershell
npm run dist       # create Windows build artifacts in dist/
```

The password is passed to `mysql.exe` through the process environment and is not written into SQL text. Without a configured client path, the app uses demo data.

The Windows setup asks whether to create a desktop shortcut. On first launch it searches PATH, MySQL Server, MariaDB, XAMPP, and WAMP folders for `mysql.exe` and fills the client path automatically.
