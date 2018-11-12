function DBSQL(dbname, arguments) {
    var index = '';
    var value = '';
    this.list = `SELECT * from ${dbname};`; //列表查询
    this.arguments = arguments
    var that = this
    this.insert = function(args) {
        index = '';
        value = '';
        args = filter(that.arguments, args)
        for (let key in args) {
            index = `${index}${key},`
            var re = /^[0-9]+.?[0-9]*/;
            if (re.test(args[key])) {
                value = `${value}${args[key]},`
            } else {
                value = `${value}'${args[key]}',`
            }
        }
        index = index.substr(0, index.length - 1);
        value = value.substr(0, value.length - 1);

        return `INSERT INTO ${dbname} (${index}) VALUES(${value})`;
    }; //按需增加
    this.select = function(index, value) {
        return `SELECT * from ${dbname} where ${index}='${value}';` //按需查询
    };
    this.delete = function(index, value) {
        return `DELETE from ${dbname} where ${index}='${value}';` //按需删除
    };
    this.update = function(index, args) { //提交修改
        if (index in args) {
            value = '';
            args = filter(['id', 'task', 'name', 'created_at'], args)
            for (let key in args) {
                var re = /^[0-9]+.?[0-9]*/;
                if (re.test(args[key])) {
                    value = `${value}${key}=${args[key]},`
                } else {
                    value = `${value}${key}='${args[key]}',`
                }
            }
            value = value.substr(0, value.length - 1)
            return `UPDATE ${dbname} SET ${value} WHERE ${index}=${args[index]};`
        }
    };
};

function filter(arguments, obj) {
    let newObj = {}
    arguments.forEach(every => {
        if (every in obj) {
            newObj[every] = obj[every]
        }
    });
    return newObj;
};
module.exports = DBSQL;