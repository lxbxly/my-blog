<template>
  <el-card class="calendar-card" v-loading="recordLoding" shadow="hover">
    <h2>
      打卡记录日历:
      <span
        :class="
          workHoursStatus().includes('欠') ? 'red-status' : 'green-status'
        "
        >{{ workHoursStatus() }}</span
      >
    </h2>
    <el-button
      type="primary"
      @click="openPunchCardDialog"
      style="margin-top: 20px"
      >打卡</el-button
    >
    <el-calendar v-model="currentDate" @change="handleDateChange">
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split("-").slice(2).join("-") }}
          {{ isClock(data) ? "✔️" : "" }}
        </p>
      </template>
    </el-calendar>

    <el-dialog
      v-loading="recordLoding"
      title="打卡"
      width="500"
      v-model="dialogVisible"
    >
      <TimeRecord @success="handleSuccess" @close="closePunchCardDialog" />
    </el-dialog>

    <el-table
      v-loading="recordLoding"
      :data="dailyRecords"
      v-if="dailyRecords?.length"
      style="margin-top: 20px"
    >
      <el-table-column prop="checkIn" label="上班时间" />
      <el-table-column prop="checkOut" label="下班时间" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            :icon="Delete"
            circle
            @click="handleDelete(scope.$index, scope.row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <el-alert
      v-else
      title="该日期没有打卡记录"
      type="info"
      style="margin-top: 20px"
    />
  </el-card>
</template>

<script>
import { ref, computed } from "vue";
import { useWorkTimeStore } from "../stores/useWorkTime";
import TimeRecord from "./TimeRecord.vue"; // 确保正确导入
import { formatDate } from "../tool/index";
import {
  Delete,
} from '@element-plus/icons-vue'

export default {
  components: {
    TimeRecord, // 注册 TimeRecord 组件
  },
  setup() {
    const workTimeStore = useWorkTimeStore();
    const currentDate = ref(new Date());
    const dialogVisible = ref(false);

    const recordLoding = computed(() => {
      return workTimeStore.recordLoding;
    });

    const workHoursStatus = () => workTimeStore.mouthSummary;

    const dailyRecords = computed(() => {
      // console.log(currentDate.value);

      const dateStr = formatDate(currentDate.value);
      return workTimeStore.records?.filter((record) => record.date === dateStr);
    });

    const isClock = (data) => {
      return workTimeStore.records?.filter((record) => record.date === data.day)
        .length;
    };

    const openPunchCardDialog = () => {
      // console.log("打开打卡弹框"); // 调试用
      dialogVisible.value = true; // 打开弹框
    };

    const closePunchCardDialog = () => {
      dialogVisible.value = false; // 关闭弹框
    };

    const handleSuccess = () => {
      closePunchCardDialog(); // 打卡成功后关闭弹框
      workTimeStore.calculateMouthSummary();
    };

    const handleDateChange = (date) => {
      // 获取打卡数据
      // console.log(date);
      currentDate.value = date;
    };

    const handleDelete = (index, row) =>{
        console.log(row);
        
        workTimeStore.deleteWorkTime(row);
    }

    const disabledDate = (date) => {
      return false; // 根据需要禁用某些日期
    };

    return {
      currentDate,
      dialogVisible,
      dailyRecords,
      recordLoding,
      workHoursStatus,
      openPunchCardDialog,
      closePunchCardDialog,
      handleSuccess,
      handleDateChange,
      disabledDate,
      isClock,
      handleDelete,
      Delete,
    };
  },
  mounted() {
    useWorkTimeStore().getRecord(formatDate(new Date()));
  },
};
</script>

<style scoped>
.calendar-card {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}

.red-status {
  color: red;
  margin-left: 10px;
}

.green-status {
  color: green;
  margin-left: 10px;
}
</style>