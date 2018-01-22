# toolkit
js toolkit


├── LICENSE                  开源协议
├── README-zh_en.md          英文说明文档
├── README.md                中文说明文档
├── coverage                 代码覆盖率文件
├── docs                     文档目录
│   └── static-parts
│       ├── index-end.html   静态文档目录结尾文件
│       └── index-start.html 静态文档目录开头文件
├── karma.conf.js            karma 配置文件
├── lib
│   ├── diana.back.js        服务端引用入口
│   └── diana.js             浏览器引用入口
├── package.json
├── script
│   ├── build.js             构建文件
│   ├── check.js             结合 pre-commit 进行 eslint 校验
│   ├── tag-script.js        自动生成文档的标签
│   ├── web-script.js        自动生成文档
│   ├── webpack.browser.js   浏览器端 webpack 配置文件
│   └── webpack.node.js      服务器端 webpack 配置文件
├── snippets
├── src
│   ├── browser              浏览器端方法
│   ├── common               共用方法
│   ├── node                 node 端方法
│   └── util.js              库内通用方法
├── tag_database             文档标签
└── test                     测试文件
    ├── browserTest
    ├── commonTest
    ├── index.js
    └── nodeTest