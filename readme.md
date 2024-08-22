## 文件上传工具

## 开发环境

node@v14.17.0

## 使用

### 安装

```shell
npm install  yy_upload_util
```

### 指定配置文件 .serverrc.json

```json
{
  "host": "127.0.0.,1",
  "fileServerHost": "cdn域名前缀",
  "username": "服务器用户名",
  "password": "服务器用户密码",
  "destinationDir": "上传至服务器目录",
  "sourceDir": "本地文件目录",
  "defaultSourceFile": "本地文件名，如果不传空字符串，默认指定sourceDir中的最新文件"
}
```

