## node.js环境下express+mysql的服务端项目示例




## 进入项目根目录


`npm install`





## 进入/config/mysql.js，配置数据库设置


```
mysql = {

        host: "xx.xxx.xxx.xxx", //这是数据库的地址

        user: "xxx", //需要用户的名字

        password: "xxx", //用户密码 ，如果你没有密码，直接双引号就是

        database: "xxx" //数据库名字

    } //好了，这样我们就能连接数据库了



module.exports = mysql; //用module.exports暴露出这个接口，
```

## 运行项目
`npm start`
