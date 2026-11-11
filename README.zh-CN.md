# MySQL Studio

[English](README.en.md) | 简体中文

MySQL Studio 0.2.0 是一个 Windows MySQL 桌面客户端。它通过本机 `mysql.exe` 执行 SQL，连接成功后读取真实数据库元数据并把命令行表格渲染成可读的 UI 表格。

## 运行源码

第一步，进入项目目录并安装依赖（只需执行一次）：

```powershell
npm install
```

第二步，启动 MySQL Studio：

```powershell
npm run app
```

`npm run app` 只启动程序，不会自动执行 SQL。已有习惯的用户也可以使用兼容命令 `npm start`。

`npm start` 只负责启动应用，不会执行 SQL。配置连接后，SQL 会由本机 `mysql.exe` 执行。

## 使用 EXE

推荐下载 Release 中的 `MySQL-Studio-0.2.0-Setup.exe`。安装时可以选择是否创建桌面快捷方式；升级同一产品时安装程序会替换旧版本。也可以下载 `MySQL-Studio-0.2.0-win-x64.zip`，完整解压后运行 `MySQL Studio.exe`。

首次启动会打开“查找 MySQL”页面，自动搜索 PATH、MySQL Server、MariaDB、XAMPP 和 WAMP 中的 `mysql.exe`，也支持手动选择。然后在连接设置中填写主机、端口、用户名、密码和默认数据库，点击“保存并测试”。只有 `SELECT 1` 成功后，真实数据库对象和 SQL 执行才会启用。

## 打包

生成 Windows 安装包：

```powershell
npm run build:win
```

安装包会输出到 `dist/`。已有习惯的用户也可以使用兼容命令 `npm run dist`。

密码只通过进程环境变量传给 `mysql.exe`，不会写入 SQL 文本。连接失败时会弹出错误原因，不会用演示数据冒充真实数据库。

Windows 安装程序会询问是否创建桌面快捷方式。首次启动时会自动搜索 PATH、MySQL Server、MariaDB、XAMPP 和 WAMP 目录中的 `mysql.exe`，并自动填入客户端路径。

不要运行 `npm install mysqlstudio`。该命令会从 npm 公共仓库下载同名包；本项目当前通过 GitHub 源码或 Windows 安装包分发。

## 已包含的功能

- SQL 编辑器、快捷键执行、格式化、查询历史、收藏、结果消息和 CSV 导出。
- 真实连接测试、连接超时提示、MySQL 服务启动尝试、真实表/视图元数据刷新。
- 侧边栏数据库对象：Tables、Views、Procedures。
- ER 图预览、导入/导出 SQL 生成、数据库比较查询、模拟 `INSERT` 生成。
- 深色/浅色主题和 `中 / EN` 点击切换。

## 重要说明

`mysql.exe` 是客户端，真正提供数据库服务的是 `mysqld.exe` 或 Windows MySQL 服务。软件可以尝试启动常见的 `MySQL80`、`MySQL`、`MariaDB` 和 `MySQL90` 服务；如果找不到服务，需要先安装 MySQL Server。

在 Studio 中执行的 `CREATE`、`INSERT`、`UPDATE`、`DELETE` 会直接发送到你配置的服务器。使用同一主机、端口、数据库和账号从外部 `mysql.exe` 查询时，应能看到相同数据。
