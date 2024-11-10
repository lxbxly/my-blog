const mysql = require('mysql2/promise');

// 创建数据库连接池
const pool = mysql.createPool({
    host: 'localhost',       // 数据库地址
    user: 'root',            // 用户名
    password: 'rrjhllxb177', // 密码
    database: 'myblog', // 数据库名称
    waitForConnections: true,
    connectionLimit: 10,     // 最大连接数
    queueLimit: 0
});

// 封装查询方法
const query = (sql, params) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// 创建用户表
const createWorkTable = async () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS records (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- 主键，自增ID
    date VARCHAR(255) NOT NULL PRIMARY KEY,                            -- 日期，格式为 YYYY-MM-DD
    checkIn VARCHAR(255) NOT NULL,                     -- 签到时间，格式为 YYYY-MM-DD HH:MM:SS
    checkOut VARCHAR(255) NOT NULL,                    -- 签退时间，格式为 YYYY-MM-DD HH:MM:SS
    status VARCHAR(255) NOT NULL,               -- 状态信息，存储签到签退状态
    workHours VARCHAR(255) NOT NULL            -- 工作小时数，以小数形式存储（例如：8.50 表示8小时30分钟）
    );
  `;
    try {
        const result = await query(sql);
        console.log('签到表创建成功:', result);
    } catch (err) {
        console.error('创建签到表失败:', err);
    }
};

const createAtriclesTable = async () => {
    const sql = `
    CREATE TABLE documents (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- 文档唯一标识，自动递增
    title VARCHAR(255) NOT NULL,         -- 文档标题
    content TEXT,                        -- 文档内容（大文本）
    author VARCHAR(100),                 -- 作者
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- 更新时间，自动更新
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft'  -- 文档状态（草稿、已发布、已归档）
);
  `;
    try {
        const result = await query(sql);
        console.log('签到表创建成功:', result);
    } catch (err) {
        console.error('创建签到表失败:', err);
    }
};

// 插入签到时间
const insertWorkTimes = async (record) => {
    try {
        // const sql = 'INSERT INTO records (date, checkIn, checkOut, status, workHours) VALUES (?, ?, ?, ?, ?)';
        const sql = `
            INSERT INTO records (date, checkIn, checkOut, status, workHours)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                checkIn = VALUES(checkIn),
                checkOut = VALUES(checkOut),
                status = VALUES(status),
                workHours = VALUES(workHours)
            `;

        const [result] = await pool.query(sql, [
            record.date,
            record.checkIn,
            record.checkOut,
            record.status,
            record.workHours,
        ]);

        // 如果插入成功，返回插入的记录
        return {
            id: result.insertId,
            ...record, // 返回插入的记录数据
        };
    } catch (err) {
        console.error('插入数据时出错:', err);
        throw err; // 抛出错误以便捕获
    }
};


// 查询时间
const getWorkTimes = async ({ month }) => {
    createWorkTable();
    // const sql = 'SELECT * FROM records WHERE date = ?';  // 使用 = 运算符进行精确匹配
    const sql = 'SELECT * FROM records';  // 使用 = 运算符进行精确匹配

    try {
        console.log('查询的日期:', month);  // 打印传入的日期，调试用

        // 执行查询
        const [rows] = await pool.query(sql, [month]);
        console.log('查询结果:', rows);  // 打印查询返回的结果
        return rows;
    } catch (err) {
        console.error('查询数据失败:', err);
        return [];
    }
};

// 删除时间
const deleteWorkTimes = async ({ date }) => {
    const sql = 'DELETE FROM records WHERE date = ?';  // 使用 = 运算符进行精确匹配

    try {
        console.log('查询的日期:', date);  // 打印传入的日期，调试用
        // 执行查询
        const [rows] = await pool.query(sql, [date]);
        console.log('查询结果:', rows);  // 打印查询返回的结果
        return rows;
    } catch (err) {
        console.error('查询数据失败:', err);
        return [];
    }
};


// 添加和更新文章
const addArticles = async (article) => {
    // createAtriclesTable();
    const sql = article.id ? `
            UPDATE documents
            SET title = ?, content = ?, author = ?, status = ?
            WHERE id = ?;
            `: `
            INSERT INTO documents (title, content, author, status)
                VALUES (?, ?, ?, ?);
            ` ;

    try {
        // 执行查询
        const [result] = await pool.query(sql, [
            article.title,
            article.content,
            article.author,
            article.status,
            article.id,
        ]);
        console.log('查询结果:', result);  // 打印查询返回的结果
        return result;
    } catch (err) {
        console.error('查询数据失败:', err);
        return [];
    }
};

// 添加文章
const getArticles = async (id) => {
    // createAtriclesTable();
    const sql = `SELECT * FROM documents WHERE id = IFNULL(?, id);`;
    try {
        // 执行查询
        const [rows] = await pool.query(sql, [id]);
        return rows;
    } catch (err) {
        console.error('查询数据失败:', err);
        return [];
    }
};

// 删除文章
const deleteArticles = async ({ id }) => {
    const sql = 'DELETE FROM documents WHERE id = ?';  // 使用 = 运算符进行精确匹配

    try {
        console.log('查询的文章:', id);  // 打印传入的日期，调试用
        // 执行查询
        const [rows] = await pool.query(sql, [id]);
        console.log('查询结果:', rows);  // 打印查询返回的结果
        return rows;
    } catch (err) {
        console.error('查询数据失败:', err);
        return [];
    }
};

// 导出方法
module.exports = {
    createWorkTable,
    insertWorkTimes,
    getWorkTimes,
    deleteWorkTimes,
    addArticles,
    getArticles,
    deleteArticles,
};
