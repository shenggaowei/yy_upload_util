#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const client = require("scp2");

const serverConfigPath = path.join(process.cwd(), ".serverrc.json");
const serverConfig = require(serverConfigPath);
const sourceDir = path.join(process.cwd(), serverConfig.sourceDir);

// 根据文件 mtime 获取最新文件
const getLatestFilePath = (files) => {
  const filteredFiles = files.filter((file) => {
    return file.endsWith(".exe") || file.endsWith(".dmg");
  });
  const sortedFiles = filteredFiles.sort((a, b) => {
    return fs.statSync(path.join(sourceDir, a)).mtime.getTime() - fs.statSync(path.join(sourceDir, b)).mtime.getTime();
  });
  return sortedFiles[sortedFiles.length - 1];
};

fs.readdir(sourceDir, (err, files) => {
  if (err) throw err;
  const latestFileNme = serverConfig.defaultSourceFile || getLatestFilePath(files);
  const filePath = path.join(sourceDir, latestFileNme);
  console.log("开始上传：", filePath);

  client.scp(
    filePath,
    {
      host: serverConfig.host,
      port: 22,
      username: serverConfig.username,
      password: serverConfig.password,
      path: serverConfig.destinationDir + "/" + latestFileNme,
    },
    function (err) {
      if (err) {
        console.log("上传失败", err);
        return;
      }
      const serverFileName = serverConfig.fileServerHost + serverConfig.destinationDir + "/" + latestFileNme;
      console.log("上传成功=>", serverFileName);
    }
  );
});
