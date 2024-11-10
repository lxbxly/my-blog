export function calculateMonthlyWorkHours(data) {
  
  // 用于累加工时的总分钟数
  let totalMinutes = 0;

  // 遍历数据数组
  data.forEach(item => {
    // 获取工时字符串（例如 -7:59 或 +8:0 或 3:37）
    const workHours = item.workHours.trim();

    // 处理没有符号的情况，默认为加班
    let sign = '+';
    let time = workHours;

    // 如果工时字符串以 '-' 或 '+' 开头，提取符号和时间
    if (workHours[0] === '-' || workHours[0] === '+') {
      sign = workHours[0];
      time = workHours.substring(1); // 去掉符号后的时间部分
    }

    // 提取小时和分钟并转换为数字
    const [hours, minutes] = time.split(':').map(Number);

    // 计算总分钟数，符号决定了工时是多余还是欠缺
    const totalWorkMinutes = (hours * 60) + minutes;
    totalMinutes += (sign === '-' ? -totalWorkMinutes : totalWorkMinutes);
  });

  // 计算总的小时数和分钟数
  const totalHours = Math.floor(Math.abs(totalMinutes) / 60);
  const totalRemainingMinutes = Math.abs(totalMinutes) % 60;

  // 如果总分钟数是负数，表示欠工时
  const result = totalMinutes < 0
    ? `欠工时 ${totalHours}小时${totalRemainingMinutes}分钟`
    : `多余工时 ${totalHours}小时${totalRemainingMinutes}分钟`;

  return result;
}


export const formatDate = (data) => {
  const date = new Date(data);
  const formattedDate = date.getFullYear() + '-'
    + String(date.getMonth() + 1).padStart(2, '0') + '-'
    + String(date.getDate()).padStart(2, '0');
  // console.log(formattedDate);  // 输出: 2024-11-06
  return formattedDate;
};

export const formatDateTime = (clockDate, date) => {
  
  const d = new Date(date);
  const cd = new Date(clockDate);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需加 1
  const day = String(cd.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};


export const calculateStatus = (checkIn, checkOut) => {
  // console.log("检查打卡时间:", { checkIn, checkOut });

  // 将字符串转为日期对象
  const start = new Date(checkIn);
  const end = new Date(checkOut);

  // 检查时间是否有效
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    console.error('时间格式错误:', { start, end });
    return { statusMessage: '时间格式错误', times: '' };
  }

  // 设置下班时间超过 5:30 且不超过 6:00 时，真实下班时间为 5:30
  const adjustedEnd = new Date(end);

  // 设置 5:30PM 和 6:00PM 时间点
  const fiveThirtyPM = new Date(adjustedEnd);
  fiveThirtyPM.setHours(17, 30, 0, 0); // 17:30

  const sixPM = new Date(adjustedEnd);
  sixPM.setHours(18, 0, 0, 0); // 18:00

  // 如果下班时间超过 5:30 但不超过 6:00，则真实下班时间为 5:30
  if (adjustedEnd > fiveThirtyPM && adjustedEnd <= sixPM) {
    adjustedEnd.setHours(17, 30, 0, 0); // 设置为 17:30
  }

  // 计算总的工作时长（单位为分钟）
  let totalMinutesWorked = Math.floor((adjustedEnd - start) / (1000 * 60));

  // 计算工作时间减去中午 1.5 小时的休息时间
  totalMinutesWorked -= 90; // 中午休息时间 90 分钟

  // 如果下班时间超过 6:00，减去半小时
  if (adjustedEnd > sixPM) {
    totalMinutesWorked -= 30; // 减去 30 分钟的休息时间
  }

  // 计算工时（小时和分钟）
  const hoursWorked = Math.floor(totalMinutesWorked / 60);
  const minutesWorked = totalMinutesWorked % 60;

  let statusMessage = '';
  let times = '';

  // 判断工时状态
  if (totalMinutesWorked < 8 * 60) {
    // 欠工时
    const deficitMinutes = (8 * 60) - totalMinutesWorked; // 欠缺工时（分钟）
    const deficitHours = Math.floor(deficitMinutes / 60);
    const deficitRemainingMinutes = deficitMinutes % 60;
    times = `-${deficitHours}:${deficitRemainingMinutes}`;
    statusMessage = `欠工时 (${deficitHours}小时${deficitRemainingMinutes}分钟)`;
  } else if (totalMinutesWorked > 8 * 60) {
    // 加班
    const overtimeMinutes = totalMinutesWorked - (8 * 60); // 加班时间（分钟）
    const overtimeHours = Math.floor(overtimeMinutes / 60);
    const overtimeRemainingMinutes = overtimeMinutes % 60;
    times = `${overtimeHours}:${overtimeRemainingMinutes}`;
    statusMessage = `加班 (${overtimeHours}小时${overtimeRemainingMinutes}分钟)`;
  } else {
    // 正常工时
    statusMessage = '正常';
    times = '8:00';
  }

  // 返回状态和工时信息
  return { statusMessage, times };
};
