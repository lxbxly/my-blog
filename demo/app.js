// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = 3000;

app.use(bodyParser.json());

let messages = [];

// 发送消息的路由
app.post('/send', (req, res) => {
    const { message, userType } = req.body;
    const timestamp = new Date().toLocaleString();

    // 将用户消息存储到消息数组
    messages.push({ message, userType, timestamp });
    
    if (userType === 'user') {
        // 自定义回复逻辑
        const customResponse = getCustomResponse(message);
        messages.push({ message: customResponse, userType: 'bot', timestamp });
    }

    res.sendStatus(200);
});

// 获取消息的路由
app.get('/messages', (req, res) => {
    res.json(messages);
});

// 清空消息的路由
app.post('/clear', (req, res) => {
    messages = []; // 清空消息
    res.sendStatus(200);
});

// 自定义回复逻辑
function getCustomResponse(userMessage) {
    userMessage = userMessage.toLowerCase(); // 将输入转为小写以简化匹配

    if (userMessage.includes('你好')) {
      return '你好！很高兴见到你！有什么我可以帮助你的吗？';
    } else if (userMessage.includes('你是谁')) {
        return '我是一个聊天机器人，专门用来帮助你。';
    } else if (userMessage.includes('天气')) {
        return '今天天气不错，适合出去走走！你打算去哪儿？';
    } else if (userMessage.includes('帮助')) {
        return '当然可以！我可以回答问题、提供建议，或者聊聊天！';
    } else if (userMessage.includes('爱好')) {
        return '我喜欢学习新事物，和你聊天！你有什么爱好呢？';
    } else if (userMessage.includes('你会做什么')) {
        return '我可以回答问题、提供信息，还可以和你聊天。';
    } else if (userMessage.includes('推荐')) {
        return '你喜欢什么类型的推荐？书籍、电影还是音乐？';
    } else if (userMessage.includes('音乐')) {
        return '我喜欢各种音乐！你有没有喜欢的歌手或乐队？';
    } else if (userMessage.includes('电影')) {
        return '最近有很多好电影，你最喜欢什么类型的电影呢？';
    } else if (userMessage.includes('再见')) {
        return '再见！希望很快再见到你！';
    } else if (userMessage.includes('怎么了')) {
        return '没什么，只是在等你问我问题！';
    } else {
        return '抱歉，我不太明白你的意思。可以试试问我别的事情吗？';
    }
}

app.use(express.static(path.join(__dirname,'public')))

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
