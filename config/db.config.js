// 导入 mysql2（适配 MySQL 8.0+ 认证协议）
const mysql = require('mysql2/promise');

// 创建数据库连接池（性能更优）
const pool = mysql.createPool({
  host: 'localhost',         // 数据库地址（无需修改）
  user: 'root',              // 数据库用户名（无需修改）
  password: '123456',  // 替换成你自己的MySQL密码（必填！）
  database: 'test_db',       // 数据库名（已确认是test_db，无需修改）
  waitForConnections: true,
  connectionLimit: 10,       // 最大连接数
  queueLimit: 0,
  // 解决认证协议问题的关键配置
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from('你的MySQL密码' + '\0') // 替换成你的密码
  }
});

// 测试数据库连接
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ 数据库连接成功（test_db）');
    connection.release();
  } catch (err) {
    console.error('❌ 数据库连接失败：', err.message);
  }
})();

// 导出连接池
module.exports = pool;