const express = require('express');
const database = require('./mysql/database');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// 添加记录的API
app.post('/api/addRecords', async (req, res) => {
  try {
    // 检查请求体
    const record = req.body;
    console.log('请求的记录:', record);  // 打印请求的记录

    // 执行插入操作
    const insertedRecord = await database.insertWorkTimes(record);

    // 检查是否成功插入
    if (!insertedRecord) {
      return res.status(400).send({ message: '插入记录失败' });
    }

    // 如果插入成功，发送成功响应
    res.send({ message: '请求成功', data: insertedRecord });
  } catch (err) {
    console.error('插入记录失败:', err); // 打印错误信息
    // 发生错误时返回500状态码
    res.status(500).send({ message: '请求失败', error: err.message });
  }
});

// 获取所有记录的API
app.get('/api/getRecords', async (req, res) => {
  const queryMouth = req.query
  const record = await database.getWorkTimes(queryMouth);
  console.log(record);

  res.send(record);
});

// 删除记录的API
app.post('/api/deleteRecords', async (req, res) => {
  try {
    // 检查请求体
    const row = req.body;
    console.log('请求的记录:', req);  // 打印请求的记录

    // 执行插入操作
    const deleteWorkTime = await database.deleteWorkTimes(row);

    // 检查是否成功插入
    if (!deleteWorkTime) {
      return res.status(400).send({ message: '删除记录失败' });
    }

    // 如果插入成功，发送成功响应
    res.send({ message: '请求成功', data: deleteWorkTime });
  } catch (err) {
    console.error('插入记录失败:', err); // 打印错误信息
    // 发生错误时返回500状态码
    res.status(500).send({ message: '请求失败', error: err.message });
  }
});

// 添加文章
app.post('/api/addArticles', async (req, res) => {
  try {
    // 检查请求体
    const { article } = req.body;
    console.log('请求的记录文章:', article);  // 打印请求的记录

    // 执行插入操作
    const addArticle = await database.addArticles(article);

    // 检查是否成功插入
    if (!addArticle) {
      return res.status(400).send({ message: '添加记录失败' });
    }

    // 如果插入成功，发送成功响应
    res.send({ message: '文章已保存', data: addArticle, status: '200' });
  } catch (err) {
    console.error('插入记录失败:', err); // 打印错误信息
    // 发生错误时返回500状态码
    res.status(500).send({ message: '请求失败', error: err.message });
  }
});

// 获取所有文章的API
app.get('/api/getArticles', async (req, res) => {
  const { queryId } = req.query
  console.log('文章id', req.query);

  const articles = await database.getArticles(queryId);

  res.send({ message: 'success', data: articles, status: '200' });
});


// 删除文章的API
app.post('/api/deleteArticles', async (req, res) => {
  try {
    // 检查请求体
    const body = req.body;
    console.log('请求的记录:', req.body);  // 打印请求的记录

    // 执行插入操作
    const deleteArticle = await database.deleteArticles(body);

    // 检查是否成功插入
    if (!deleteArticle) {
      return res.status(400).send({ message: '删除文章失败', status:'201' });
    }

    // 如果插入成功，发送成功响应
    res.send({ message: '删除文章成功', data: deleteArticle, status: '200' });
  } catch (err) {
    console.error('删除记录失败:', err); // 打印错误信息
    // 发生错误时返回500状态码
    res.status(500).send({ message: '请求失败', error: err.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
