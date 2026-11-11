# MySQL Studio

[简体中文](README.zh-CN.md) | [English](README.en.md)

MySQL Studio is a modern desktop client shell for MySQL. It provides a clean SQL editor, object browser, query history, result table, Explain view, CSV export, light/dark theme, and an optional local bridge that executes the real `mysql.exe` client.

## Run

```powershell
npm install        # install Electron dependencies, once
npm start          # launch the desktop app for local development
```

The commands have separate purposes: `npm start` runs the app; `npm run dist` packages a Windows build into `dist/`. They do not execute SQL themselves. SQL is sent to `mysql.exe` after a connection is configured in the app.

Open the gear icon, set the path to `mysql.exe`, and save the connection. If the path is empty, the interface runs in demo mode with sample order data so the UI can be explored without a database.

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

## Packaging

The project intentionally uses a small Electron shell with no renderer dependencies. Add `electron-builder` or `@electron/packager` when a signed installer is needed. The next backend step for a multi-user product is a local service that uses `mysql2` with pooled connections, encrypted credential storage, metadata introspection, and streaming result sets.
