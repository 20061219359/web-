const express = require('express');
const app = express();
const cors = require('cors');

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 导入酒店路由（只导入一次！）
const hotelRoutes = require('./routes/hotel.routes');
// 挂载路由
app.use('/api/hotel', hotelRoutes);

// 启动服务
const PORT = 3100;
app.listen(PORT, () => {
  console.log(`✅ 后端服务启动成功，访问地址：http://localhost:${PORT}`);
});