import { defineStore } from 'pinia';
import {calculateMonthlyWorkHours} from '../tool/index'

// import { addData, getData } from '../firestoreDataBase/index'
import { getWorkTImes, insertWorkTimes, deleteWorkTimes } from '../common/workTimesControl';

export const useWorkTimeStore = defineStore('workTime', {
  state: () => ({
    records: [],
    recordLoding: false,
    mouthSummary: ''
  }),
  actions: {
    async addRecord(record) {
      this.recordLoding = true;
      const index = this.records.findIndex(item => item.date === record.date)
      index === -1 ? this.records.push(record) : (this.records[index] = record);
      await insertWorkTimes(record);
      this.recordLoding = false;
    },
    calculateMouthSummary() {
      // 计算每月工时汇总逻辑
      // 这里可以根据具体需求进行实现

      this.mouthSummary = calculateMonthlyWorkHours(this.records)
    },
    async deleteWorkTime(row){
      this.recordLoding = true;
      const index = this.records.findIndex(item => item.date === row.date)
      this.records.splice(index, 1);
      this.calculateMouthSummary();
      await deleteWorkTimes(row);
      this.recordLoding = false;
    },
    async getRecord(mouth) {
      this.recordLoding = true;
      let records = await getWorkTImes(mouth) || []
      
      this.records = records;
      this.calculateMouthSummary();
      this.recordLoding = false;
    },
  }
});
