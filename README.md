# headlines
适配PC端的新闻平台，真实API调用获取数据，包含登陆注册、首页列表详情、评论收藏、个人中心等模块

## Project setup
- Project setup
```
npm install
```
- Compiles and hot-reloads for development
```
npm run dev
```
- Compiles and minifies for production
```
npm run build
```

## 技术概述
使用React框架配合Ant Design组件库开发项目，通过React Router管理URL。项目的部分模块在PC端和移动端样式不同，通过使用react-responsive来实现媒体查询时组件的选择。后期通过webpack来进行组件懒加载、代码分离等项目优化。

## 页面展示
### 新闻平台首页
![主页][主页] 

### 新闻详情
![详情][详情] 

### 评论收藏
![评论][评论] 

### 个人中心
![个人中心][个人中心] 

--------------------------------
[主页]:/readme-img/index.png 
[详情]:/readme-img/details.png 
[评论]:/readme-img/comments.png 
[个人中心]:/readme-img/usercenter.png 