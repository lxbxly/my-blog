import sendRequest from '../tool/request';


export const getWorkTImes = async (month) => {
    try {
        const data = await sendRequest({
            url: '/getRecords',
            method: 'GET',
            params: { month },
        });
        // console.log('GET 请求返回的数据:', data);
        return data
    } catch (error) {
        console.error('GET 请求失败:', error);
    }
}

export const insertWorkTimes = async (workTIme) => {
    try {
        const data = await sendRequest({
            url: '/addRecords',
            method: 'POST',
            data: workTIme,
        });
        // console.log('POST 请求返回的数据:', data);
    } catch (error) {
        console.error('POST 请求失败:', error);
    }
}

export const deleteWorkTimes = async (date) => {
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