# MySQL Studio

[简体中文](README.zh-CN.md) | [English](README.en.md)

MySQL Studio 0.2.0 is a modern Windows desktop client that executes SQL through the local `mysql.exe` client and renders real MySQL metadata and results.

## Run

```powershell
npm install
```

Then start the app with:

```powershell
npm run app
```

`npm run app` launches the desktop client. It does not execute SQL by itself. Use `npm run build:win` to create Windows installers in `dist/`. `npm start` and `npm run dist` remain compatibility aliases.

Open the connection finder, select `mysql.exe`, enter the server credentials, and save/test the connection. The object tree and query execution are enabled only after `SELECT 1` succeeds.

## Upload to GitHub

The local repository is already configured with `origin` pointing to `https://github.com/consider27/mysql-studio.git`. Create that empty repository under the `consider27` account (or authenticate GitHub CLI), then run:

```powershell
git push -u origin main
```

The bridge starts the client with `--batch --raw --column-names`, writes SQL to stdin, and parses tab-separated stdout into the result table. The password is supplied through `MYSQL_PWD` for that process and is not written into the SQL text. For production use, add OS keychain storage and a dedicated query allow-list before distributing the app to other users.

The Windows setup program asks whether to create a desktop shortcut. On first launch it searches PATH, MySQL Server folders, MariaDB, XAMPP, and WAMP for `mysql.exe` and fills the client path automatically.

## Features in this prototype

- Execute arbitrary SQL through a local `mysql.exe` process.
- Rich table rendering with NULL, number, and status styling.
- Query tabs, formatting, keyboard shortcut, history, favorites, Explain preview, messages, CSV export, and responsive layout.
- Connection settings for host, port, user, password, database, and client path.
- Demo mode for first-run exploration and UI review.
- Real database mode: the object tree and query results stay unavailable until `SELECT 1` succeeds against the configured MySQL server.
- Design tools for ER preview, import/export SQL generation, database comparison queries, and safe mock `INSERT` generation.

## Packaging

The project intentionally uses a small Electron shell with no renderer dependencies. Add `electron-builder` or `@electron/packager` when a signed installer is needed. The next backend step for a multi-user product is a local service that uses `mysql2` with pooled connections, encrypted credential storage, metadata introspection, and streaming result sets.
