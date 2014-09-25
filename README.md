# 笔戈招聘 #

笔戈招聘站

## 配置 ##

### 数据库 ###

先修改`/config/config.js`中的数据库配置。

### 用户 ###

```
user: {
    username: 'username',
    password: 'password'
}
```

### 幻灯片数量 ###

```
flash: {
    number: 4
}
```

## 运行 ##

```
// 安装依赖
npm install

// 运行项目
node index.js

// 初始化数据库
node database.js --install

// 访问后台
localhost:port/admin/
```

## 其他 ##

### 重置数据 ###

```
node database.js --reset
```
