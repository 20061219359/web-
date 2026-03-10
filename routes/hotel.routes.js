const express = require('express');
const router = express.Router();
const db = require('../config/db.config.js'); // 导入项目里的 db.config.js

// 1. 获取酒店列表接口
router.get('/list', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM hotel');
    res.json({ code: 200, msg: '获取列表成功', data: rows });
  } catch (err) {
    res.json({ code: 500, msg: '获取列表失败：' + err.message });
  }
});

// 2. 新增酒店接口
router.post('/add', async (req, res) => {
  try {
    const { hotelName, hotelAddress, hotelStar, hotelRoomType, hotelPrice, openTime } = req.body;
    
    if (!hotelName || !hotelAddress) {
      return res.json({ code: 400, msg: '酒店名称和地址不能为空' });
    }

    const [result] = await db.query(
      'INSERT INTO hotel (hotelName, hotelAddress, hotelStar, hotelRoomType, hotelPrice, openTime, auditStatus) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [hotelName, hotelAddress, hotelStar, hotelRoomType, hotelPrice, openTime, '审核中']
    );

    res.json({ code: 200, msg: '新增酒店成功', data: { id: result.insertId } });
  } catch (err) {
    res.json({ code: 500, msg: '新增失败：' + err.message });
  }
});

// 3. 审核酒店接口（通过/拒绝）
router.post('/audit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { auditStatus, rejectReason } = req.body;

    if (!auditStatus || !['通过', '拒绝'].includes(auditStatus)) {
      return res.json({ code: 400, msg: '审核状态必须是"通过"或"拒绝"' });
    }

    if (auditStatus === '拒绝' && !rejectReason) {
      return res.json({ code: 400, msg: '拒绝审核必须填写原因' });
    }

    const [result] = await db.query(
      'UPDATE hotel SET auditStatus = ?, rejectReason = ? WHERE id = ?',
      [auditStatus, rejectReason || null, id]
    );

    if (result.affectedRows === 0) {
      return res.json({ code: 404, msg: '酒店不存在' });
    }

    res.json({ code: 200, msg: '审核成功' });
  } catch (err) {
    res.json({ code: 500, msg: '审核失败：' + err.message });
  }
});

// 4. 编辑酒店接口（解决404的核心）
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { hotelName, hotelAddress, hotelStar, hotelRoomType, hotelPrice, openTime } = req.body;

    if (!hotelName || !hotelAddress) {
      return res.json({ code: 400, msg: '酒店名称和地址不能为空' });
    }

    const [result] = await db.query(
      'UPDATE hotel SET hotelName = ?, hotelAddress = ?, hotelStar = ?, hotelRoomType = ?, hotelPrice = ?, openTime = ? WHERE id = ?',
      [hotelName, hotelAddress, hotelStar, hotelRoomType, hotelPrice, openTime, id]
    );

    if (result.affectedRows === 0) {
      return res.json({ code: 404, msg: '酒店不存在' });
    }

    res.json({ code: 200, msg: '编辑成功' });
  } catch (err) {
    res.json({ code: 500, msg: '编辑失败：' + err.message });
  }
});

// 5. 删除酒店接口
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM hotel WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.json({ code: 404, msg: '酒店不存在' });
    }

    res.json({ code: 200, msg: '删除成功' });
  } catch (err) {
    res.json({ code: 500, msg: '删除失败：' + err.message });
  }
});

module.exports = router;