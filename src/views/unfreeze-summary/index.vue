<template>
	<div class="common-layout">
    <el-container>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="病历号:">
          <el-input v-model="formInline.patientId"/>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="formInline.nameW" />
        </el-form-item>
        <el-form-item label="身份证：">
          <el-input v-model="formInline.cardNo" />
        </el-form-item>
        <!-- 查询时间 -->
        <el-form-item label="查询时间：">
          <el-date-picker
            v-model="formInline.searchDate"
            type="date"
            placeholder="请选择日期"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" @click="onSubmit" class="yysButton">
            <el-icon style="vertical-align: middle">
              <svg-icon
                class="search"
                icon="search"
                color="#fff"
              />
            </el-icon>
            <span style="vertical-align: middle"> 检索 </span>
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleExport" class="yysButton">
            <el-icon style="vertical-align: middle">
              <svg-icon icon="deduced" color="#fff" />
            </el-icon>
            <span style="vertical-align: middle"> 导出 </span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <!-- 表格 -->
    <n-scrollbar x-scrollable trigger="hover">
      <el-table :data="tableData" border style="width: 100%" row-key="id" height="770">
        <el-table-column prop="oplanPatientId" label="ART号" width="180" align="center"/>
        <el-table-column prop="nameW" label="女方姓名" width="140" align="center"/>
        <el-table-column prop="nameM" label="男方姓名" width="140" align="center"/>
        <el-table-column prop="freezeDate" label="冷冻周期" width="100" align="center"/>
        <el-table-column prop="freezeDay" label="胚龄" width="100" align="center"/>
        <el-table-column prop="freezeNum" label="序号" width="100" align="center"/>
        <el-table-column prop="freezeEvaluate" label="冷冻评价" width="100" align="center"/>
        <el-table-column prop="freezePlace" label="冷冻位置" width="170" align="center"/>
        <el-table-column prop="" label="冷冻备注" width="140" align="center"/>
        <el-table-column prop="remark" label="备注" width="140" align="center"/>
        <el-table-column prop="transDate" label="移植日" width="180" align="center"/>
        <el-table-column prop="revivalDate" label="解冻日" width="180" align="center"/>
        <el-table-column prop="freezeSum" label="移植数" width="100" align="center"/>
        <el-table-column prop="" label="解冻数" width="100" align="center"/>
        <el-table-column prop="revivalOperator" label="解冻者" width="100" align="center"/>
        <el-table-column prop="revivalAuditor" label="解冻核对" width="100" align="center"/>
        <el-table-column prop="incubateOperator" label="装胚者" width="100" align="center"/>
        <el-table-column prop="incubateAuditor" label="装胚核对" width="100" align="center"/>
      </el-table>
    </n-scrollbar>
  </div>
</template>

<script setup>
import { getUnfreezeEmbryo } from '@/api/taskList.js'
import { reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { NScrollbar } from 'naive-ui'

const formInline = reactive({
	searchDate: '',
	patientId: '',
	nameW: '',
	cardNo: ''
})

watch(() => formInline.searchDate, (val) => {
	if (val) {
		formInline.searchDate = val
	}
}, {immediate: true}) 

const tableData = ref([])

// 检索的函数
function onSubmit() {
	getUnfreezeEmbryo({queryDate: formInline.searchDate}).then(data => {
		console.log(data)
		// console.log(formInline.searchDate)
		// 判断 如果没有选择时间提示错误 
		if (formInline.searchDate == '') {
			ElMessage.error('请选择时间')
		} else {
			tableData.value = data
			ElMessage.success('查询成功')
		}
	})
}
</script>

<style lang="scss" scoped>

</style>