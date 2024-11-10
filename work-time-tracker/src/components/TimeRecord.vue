<template>
  <el-card class="time-record-card" shadow="hover">
    <el-form :model="form" ref="formRef" label-width="100px" :rules="rules" status-icon>
      <el-form-item label="日期" prop="date">
        <el-date-picker v-model="form.date" type="date" placeholder="选择日期" />
      </el-form-item>
      <el-form-item label="上班时间" prop="checkIn">
        <el-time-picker v-model="form.checkIn" placeholder="选择上班时间" />
      </el-form-item>
      <el-form-item label="下班时间" prop="checkOut">
        <el-time-picker v-model="form.checkOut" placeholder="选择下班时间" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="recordTime" :loading="loading">记录时间</el-button>
        <el-button @click="$emit('close')">取消</el-button>
      </el-form-item>
      <el-form-item v-if="status">
        <el-alert :title="status" type="info" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { ref } from 'vue';
import { useWorkTimeStore } from '../stores/useWorkTime';
import { formatDate, formatDateTime, calculateStatus } from '../tool/index'

export default {
  props: {
    defaultDate: {
      type: Date,
      required: true,
    },
  },
  setup(props, { emit }) {
    const form = ref({
      date: '', // 默认日期为传入的日期
      checkIn: '',
      checkOut: '',
    });

    const validateCheckOut = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请选择下班时间'));
      }
      if (form.value.checkIn && value < form.value.checkIn) {
        return callback(new Error('下班时间不能早于上班时间'));
      }
      callback(); // 验证通过
    };

    const status = ref('');
    const formRef = ref(null); // 定义 formRef
    const loading = ref(false);
    const workTimeStore = useWorkTimeStore();

    const rules = {
      date: [{ required: true, message: '请选择日期', trigger: 'change' }],
      checkIn: [{ required: true, message: '请选择上班时间', trigger: 'change' }],
      checkOut: [{ required: true, validator: validateCheckOut, trigger: 'change' }],
    };


    const recordTime = async () => {

      const isValid = await formRef.value.validate();

      if (!isValid) return;

      loading.value = true;

      const record = {
        date: formatDate(form.value.date),
        checkIn: formatDateTime(form.value.date, form.value.checkIn),
        checkOut: formatDateTime(form.value.date, form.value.checkOut),
        status: calculateStatus(form.value.checkIn, form.value.checkOut).statusMessage,
        workHours: calculateStatus(form.value.checkIn, form.value.checkOut).times,
      };

      workTimeStore.addRecord(record);
      status.value = '打卡成功';
      emit('success'); // 向父组件发送成功事件
      resetForm();
      loading.value = false;
    };


    const resetForm = () => {
      form.value.date = '';
      form.value.checkIn = '';
      form.value.checkOut = '';
    };

    return { form, status, loading, recordTime, rules, formRef };
  },
};
</script>

<style scoped>
.time-record-card {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
}
</style>