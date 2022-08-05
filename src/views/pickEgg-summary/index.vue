<template>
	<div class="common-layout">
    <el-container>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="病历号:">
          <el-input v-model="formInline.patientId" disabled />
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="formInline.nameW" disabled />
        </el-form-item>
        <el-form-item label="身份证：">
          <el-input v-model="formInline.cardNo" disabled />
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
          <el-button type="primary" @click="saveFn" class="yysButton">
            <el-icon style="vertical-align: middle">
              <svg-icon icon="save" color="#fff" />
            </el-icon>
            <span style="vertical-align: middle"> 保存 </span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-container>
    <!-- 表格 -->
    <n-scrollbar x-scrollable trigger="hover">
      <el-table :data="tableData" border style="width: 100%" row-key="id" height="calc(100vh - 160px)" highlight-current-row @cell-click="edit=true">
        <el-table-column label="序号" width="100" align="center">
          <template #default="{row}">
            <el-input v-if="edit" v-model="row.incubatorNo" @blur="edit=false" autofocus></el-input>
            <span v-else>{{ row.incubatorNo }}</span>
          </template> 
        </el-table-column>
        <el-table-column label="箱号" width="180" align="center">
          <template #default="{row}">
            <el-input v-if="edit" v-model="row.incubatorNum" @blur="edit=false" autofocus></el-input>
            <span v-else>{{ row.incubatorNum }}</span>
          </template> 
        </el-table-column>
        <el-table-column prop="follicleNum" label="卵泡数" width="180" align="center"/>
        <el-table-column prop="oplanPatientId" label="ART号" width="180" align="center"/>
        <el-table-column prop="nameW" label="女方姓名" width="140" align="center"/>
        <el-table-column prop="ageW" label="女方年龄" width="140" align="center"/>
        <el-table-column prop="nameM" label="男方姓名" width="140" align="center"/>
        <el-table-column prop="opstimes" label="周期序号" width="140" align="center"/>
        <el-table-column prop="insemination" label="授精方式" width="140" align="center"/>
        <el-table-column prop="takephoto" label="拍照" width="140" align="center"></el-table-column>
        <el-table-column label="捡卵者" width="140" align="center">
          <template #default="{row}">
            <el-input v-if="edit" v-model="row.collectionNum" @blur="edit=false" autofocus></el-input>
            <span v-else>{{ row.collectionNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="IVF操作者" width="140" align="center">
          <template #default="{row}">
            <el-input v-if="edit" v-model="row.ivfOperator" @blur="edit=false" autofocus></el-input>
            <span v-else>{{ row.ivfOperator }}</span>
          </template>
        </el-table-column>
        <el-table-column label="IVF核对者" width="140" align="center">
          <template #default="{row}">
            <el-input v-if="edit" v-model="row.ivfAuditor" @blur="edit=false" autofocus></el-input>
            <span v-else>{{ row.ivfAuditor }}</span>
          </template>
        </el-table-column>
        <el-table-column label="IVF拆蛋者" width="140" align="center">
          <template #default="{row}">
            <el-input v-if="edit" v-model="row.ivfStripEggOperator" @blur="edit=false" autofocus></el-input>
            <span v-else>{{ row.ivfStripEggOperator }}</span>
          </template>
        </el-table-column>
        <el-table-column label="ICSI操作者" width="140" align="center">
          <template #default="{row}">
            <el-input v-if="edit" v-model="row.icsiOperator" @blur="edit=false" autofocus></el-input>
            <span v-else>{{ row.icsiOperator }}</span>
          </template>
        </el-table-column>
        <el-table-column label="ICSI核对者" width="140" align="center">
          <template #default="{ row }">
            <el-input v-if="edit" v-model="row.icsiAuditor" @blur="edit=false" autofocus></el-input>
            <span v-else>{{ row.icsiAuditor }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cycleResult" label="周期结局" width="140" align="center"/>
      </el-table>
    </n-scrollbar>
  </div>
</template>

<script setup>
import { getEmbryoCollect, batchSave } from '@/api/taskList.js'
import { reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { NScrollbar } from 'naive-ui'

let edit = ref(false)

const formInline = reactive({
	searchDate: '',
	patientId: '',
	nameW: '',
	cardNo: ''
})

const tableData = ref([])

watch(() => formInline.searchDate, (val) => {
	if (val) {
		formInline.searchDate = val
	}
}, {immediate: true}) 

// 检索的函数
function onSubmit() {
	getEmbryoCollect({queryDate: formInline.searchDate}).then(data => {
		// console.log(data)
		if (formInline.searchDate == '') {
			ElMessage.error('请选择时间')
		} else {
			tableData.value = data
			ElMessage.success('查询成功')
		}
	})
}

// 批量保存的函数
function saveFn() {
  let newData = []
  tableData.value.forEach(item => {
    let {oid, pid, incubatorNo, incubatorNum, takephoto, labPicker, ivfOperator, ivfAuditor, ivfStripEggOperator, icsiStripEggOperator, icsiOperator, icsiAuditor} = item
    newData.push({oid, pid, incubatorNo, incubatorNum, takephoto, labPicker, ivfOperator, ivfAuditor, ivfStripEggOperator, icsiStripEggOperator, icsiOperator, icsiAuditor})
  })
  batchSave(newData).then(data => {
    ElMessage.success('保存成功')
  }).catch(err => {
    ElMessage.error('保存失败')
  })
}

</script>

<style lang="scss" scoped>

</style>