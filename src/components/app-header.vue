<template>
	<el-container>
      <!-- 头部 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="病历号:">
          <el-input v-model="formInline.patientId" />
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
						:default-value="new Date()"
            style="width: 100%"
          />
        </el-form-item>
				<el-form-item>
          <el-button type="primary" size="large" @click="onSubmit" class="yysButton">
            <el-icon style="vertical-align: middle">
              <svg-icon class="search" icon="search" color="#fff" />
            </el-icon>
            <span style="vertical-align: middle"> 检索 </span>
          </el-button>
        </el-form-item>
				<!-- 导出按钮插槽 -->
				<slot name="exportBtn" />
				<el-form-item>
          <el-button type="primary" class="yysButton">
            <el-icon style="vertical-align: middle">
              <svg-icon icon="medicalMaterials" color="#fff" />
            </el-icon>
            <span style="vertical-align: middle"> 批量添加耗材备液 </span>
          </el-button>
        </el-form-item>
				<el-form-item>
          <el-button type="primary" class="yysButton">
            <el-icon style="vertical-align: middle">
              <svg-icon icon="patientConsumables" color="#fff" />
            </el-icon>
            <span style="vertical-align: middle"> 患者耗材及备液 </span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-container>
</template>

<script setup>
import { getIui } from '@/api/egg'
import { reactive, watch, defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'

const formInline = reactive({
	searchDate: '',
	patientId: '',
	nameW: '',
	cardNo: ''
})
const emit = defineEmits(['search'])

// 检索的函数
function onSubmit() {
	getIui({operationDate: formInline.searchDate}).then(data => {
		// console.log(data)
		console.log(formInline.searchDate)
		// 判断 如果没有选择时间提示错误 
		if (formInline.searchDate == '') {
			ElMessage.error('请选择时间')
		} else {
			tableData.value = data
			ElMessage({ type: 'success', message: '查询成功'})
		}
		emit('search', formInline.searchDate)
	})
}

</script>

<style lang="scss" scoped></style>