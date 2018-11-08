mysql = {

        host: "39.107.233.105", //这是数据库的地址

        user: "lihao", //需要用户的名字

        password: "123", //用户密码 ，如果你没有密码，直接双引号就是

        database: "node" //数据库名字

    } //好了，这样我们就能连接数据库了



module.exports = mysql; //用module.exports暴露出这个接口，