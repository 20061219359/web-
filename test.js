const db = require('./config/db.config.js');
const express = require('express');
const app = express();

app.use(express.json());

// 手动挂载酒店路由
const hotelRoutes = require('./routes/hotel.routes');
app.use('/api/hotel', hotelRoutes);

// 启动测试服务，端口 3101
const server = app.listen(3101, async () => {
  console.log('测试服务启动：http://localhost:3101');
  
  // 延迟 1 秒再发请求，确保服务器已经启动
  setTimeout(async () => {
    try {
      const res = await fetch('http://localhost:3101/api/hotel/update/1', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hotelName: '测试酒店',
          hotelAddress: '测试地址',
          hotelStar: '5星',
          hotelRoomType: '大床房',
          hotelPrice: 100,
          openTime: '2026-03-01'
        })
      });
      const data = await res.json();
      console.log('编辑接口测试结果：', data);
    } catch (err) {
      console.error('请求失败：', err.message);
    } finally {
      // 测试完关闭服务器
      server.close();
    }
  }, 1000);
});