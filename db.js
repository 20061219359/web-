// db.js
const mysql = require('mysql2');

// 创建数据库连接（替换成你的MySQL配置）
const connection = mysql.createConnection({
  host: 'localhost',        // MySQL地址（本地默认localhost）
  user: 'root',             // MySQL用户名（默认root）
  password: '123456', // 替换成你的MySQL密码（比如123456）
  database: 'test_db',      // 数据库名（你创建hotel表的库）
  charset: 'utf8mb4'        // 字符集（支持中文）
});

// 测试数据库连接
connection.connect((err) => {
  if (err) {
    console.error('❌ 数据库连接失败：', err.message);
    return;
  }
  console.log('✅ 数据库连接成功！');
});

// 导出连接（供路由文件使用）
module.exports = connection;