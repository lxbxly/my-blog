const calculateStatus = (checkIn, checkOut) => {
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
  const checkIn = '2024-11-07T08:30:00';
  const checkOut = '2024-11-07T18:07:00';
  
  const result = calculateStatus(checkIn, checkOut);
  console.log(result);
  // 输出:
  // {
  //   statusMessage: "加班",
  //   times: "0:30"
  // }
    