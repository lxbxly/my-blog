import sendRequest from '../tool/request';


export const getArticles = async (queryId) => {
    try {
        const data = await sendRequest({
            url: '/getArticles',
            method: 'GET',
            params: { queryId: queryId },
        });
        // console.log('GET 请求返回的数据:', data);
        return data
    } catch (error) {
        console.error('GET 请求失败:', error);
    }
}

export const addArticles = (article) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await sendRequest({
                url: '/addArticles',
                method: 'POST',
                data: JSON.stringify({ article }),
            });

            if (response.status === '200') {
                resolve(response);  // 返回成功结果
            } else {
                reject(new Error("上传失败"));  // 返回失败错误
            }
        } catch (error) {
            console.error('POST 请求失败:', error);
            reject(error);  // 返回捕获的错误
        }
    });
}

export const deleteArticles = async (date) => {
    try {
        const data = await sendRequest({
            url: '/deleteRecords',
            method: 'POST',
            data: date,
        });
        // console.log('POST 请求返回的数据:', data);
    } catch (error) {
        console.error('POST 请求失败:', error);
    }
}

export const updataArticles = (article) => {

    return new Promise(async (resolve, reject) => {
        try {
            const response = await sendRequest({
                url: '/addArticles',
                method: 'POST',
                data: JSON.stringify({ article }),
            });

            if (response.status === '200') {
                resolve(response);  // 返回成功结果
            } else {
                reject(new Error("更新失败"));  // 返回失败错误
            }
        } catch (error) {
            console.error('POST 请求失败:', error);
            reject(error);  // 返回捕获的错误
        }
    });
}