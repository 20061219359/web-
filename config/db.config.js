// db.config.js - 适配 Supabase PostgreSQL + Render 环境变量
const mysql = require('mysql2/promise');

// 创建数据库连接池（适配 PostgreSQL + SSL）
const pool = mysql.createPool({
  // 从 Render 环境变量读取核心配置
  host: process.env.DB_HOST || 'db.kjfyyyoizrfbhpeumir.supabase.co', // 你的 Supabase Host
  user: process.env.DB_USER || 'postgres', // Supabase 默认用户名
 password: process.env.DB_PASSWORD || 'u1yHAIduQzen88xD',
  database: process.env.DB_NAME || 'postgres', // Supabase 默认数据库名
  port: process.env.DB_PORT || 5432, // Supabase 默认端口
  // 关键：Supabase 必须开启 SSL 连接
  ssl: {
    rejectUnauthorized: false
  },
  // 连接池配置（提升性能）
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 测试数据库连接（可选，方便排查问题）
async function testDbConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 as test');
    console.log('✅ 数据库连接成功！');
  } catch (error) {
    console.error('❌ 数据库连接失败：', error.message);
  }
}

// 启动时执行连接测试
testDbConnection();

// 导出连接池供其他文件使用
module.exports = pool;