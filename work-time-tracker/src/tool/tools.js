const getUrlPathName = () => {
    const path = window.location.pathname; // 获取路径部分，例如：/workTimeTracker
    const pathParts = path.split("/"); // 根据斜杠分割路径
    const targetPart = pathParts[pathParts.length - 1]; // 获取最后一个部分
    return targetPart
}

/**
 * 格式化 ISO 日期字符串
 * @param {string} isoDateStr - ISO 日期字符串，例如："2024-11-10T06:01:51.000Z"
 * @param {string} format - 目标格式字符串，例如："YYYY-MM-DD HH:mm:ss"
 * @returns {string} - 格式化后的日期字符串
 */
function formatDate(isoDateStr, format = "YYYY-MM-DD HH:mm:ss") {
    if (!isoDateStr) return "";

    const date = new Date(isoDateStr);

    const map = {
        YYYY: date.getFullYear(),
        MM: String(date.getMonth() + 1).padStart(2, "0"), // 月份从0开始，需要+1
        DD: String(date.getDate()).padStart(2, "0"),
        HH: String(date.getHours()).padStart(2, "0"),
        mm: String(date.getMinutes()).padStart(2, "0"),
        ss: String(date.getSeconds()).padStart(2, "0"),
    };

    // 使用正则替换格式字符串中的占位符
    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (key) => map[key]);
}

// 图片转换
// convertAndDownloadImage(imageURL, 'jpg', 0.9, 'downloaded-image');
function convertAndDownloadImage(image, format = 'png', quality = 1, filename = 'image') {
    return new Promise((resolve, reject) => {
        let dataURL;

        // 判断输入是否为 base64 字符串
        if (image.startsWith('data:image')) {
            // 如果是 Base64 字符串，直接返回或下载
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;

                // 绘制到 Canvas 上
                ctx.drawImage(img, 0, 0, img.width, img.height);

                if (format === 'jpg' || format === 'jpeg') {
                    // 转换为 JPEG 格式
                    dataURL = canvas.toDataURL('image/jpeg', quality);
                } else if (format === 'base64') {
                    // Base64 格式直接返回
                    dataURL = canvas.toDataURL();
                } else {
                    // 默认转换为 PNG 格式
                    dataURL = canvas.toDataURL('image/png');
                }

                if (format !== 'base64') {
                    // 创建下载链接并触发下载
                    const link = document.createElement('a');
                    link.href = dataURL;
                    link.download = filename + '.' + format;
                    link.click();
                }

                resolve(dataURL); // 成功时返回数据
            };

            img.onerror = function () {
                reject(new Error('Image loading failed'));
            };

            img.src = image;
        } else {
            // 如果是其他类型的图像源（如 URL），则按原方法转换
            const img = new Image();
            img.crossOrigin = 'Anonymous'; // 设置跨域
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0, img.width, img.height);

                if (format === 'jpg' || format === 'jpeg') {
                    dataURL = canvas.toDataURL('image/jpeg', quality);
                } else if (format === 'base64') {
                    dataURL = canvas.toDataURL();
                    resolve(dataURL); // 成功时返回 Base64 编码
                } else {
                    dataURL = canvas.toDataURL('image/png');
                }

                if (format !== 'base64') {
                    // 创建下载链接并触发下载
                    const link = document.createElement('a');
                    link.href = dataURL;
                    link.download = filename + '.' + format;
                    link.click();
                }

                resolve(dataURL); // 成功时返回数据
            };

            img.onerror = function () {
                reject(new Error('Image loading failed'));
            };

            img.src = image;
        }
    });
}




export default { getUrlPathName, formatDate, convertAndDownloadImage }