// routes/user.routes.js
const express = require('express');
const router = express.Router();
// 关键：从上级目录引入db.js里的连接池
const pool = require('../db.js');

router.get('/data', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM user');
    res.json({ code: 200, data: rows });
  } catch (err) {
    res.json({ code: 500, msg: err.message });
  }
});

module.exports = router;