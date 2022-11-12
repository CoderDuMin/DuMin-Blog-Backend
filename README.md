# DreamBook-BackEnd

一个简易的记梦本app服务端

## 使用技术栈

一个使用 KOA2 + TypeScript + Typeorm + mysql +jwt 搭建的记梦谷服务端

## 使用说明

#### **安装依赖**

进入项目然后安装依赖

在终端中输入

`cd DuMin-Bolg-Backend && npm install`

#### **配置sql连接**
在根目录创建ormconfig.json文件
并在ormconfig.json中配置你的数据库

```
{
  "type": "mysql",
  "host": "输入你的主机地址",
  "port": 3306,
  "username": "root",
  "password": "123456",
  "database": "数据库名",
  "synchronize": true,
  "entities": ["src/entity/*.ts"],
  "cli": {
    "entitiesDir": "src/entity"
  }
}
```

#### 创建对应数据库以及表

执行项目下的duminBlog.sql来安装数据库

#### 启动

使用npm或yarn来启动项目

在终端中输入 `npm start 或者yarn start`
