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


export default { getUrlPathName, formatDate }