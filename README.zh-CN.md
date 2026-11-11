# MySQL Studio

[English](README.en.md) | 简体中文

MySQL Studio 是一个现代化 Windows MySQL 桌面客户端，支持 SQL 编辑器、数据库对象浏览、查询历史、Explain、结果表格、CSV 导出和中英文界面切换。

## 运行源码

```powershell
npm install        # 只需执行一次，安装 Electron 依赖
npm start          # 启动桌面开发版
```

`npm start` 只负责启动应用，不会执行 SQL。配置连接后，SQL 会由本机 `mysql.exe` 执行。

## 使用 EXE

下载 Release 中的 `MySQL-Studio-0.1.0-win-x64.zip`，完整解压后运行 `MySQL Studio.exe`。在右上角齿轮中填写主机、端口、用户名、密码、数据库和 `mysql.exe` 路径。

## 打包

```powershell
npm run dist       # 生成 Windows 打包文件到 dist/
```

密码只通过进程环境变量传给 `mysql.exe`，不会写入 SQL 文本。首次没有配置客户端路径时，应用会显示演示数据。

Windows 安装程序会询问是否创建桌面快捷方式。首次启动时会自动搜索 PATH、MySQL Server、MariaDB、XAMPP 和 WAMP 目录中的 `mysql.exe`，并自动填入客户端路径。
