<template>
	<div class="common-layout">
    <el-container>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="病历号:">
          <el-input v-model="formInline.patientId" disabled/>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input v-model="formInline.nameW" disabled/>
        </el-form-item>
        <el-form-item label="身份证：">
          <el-input v-model="formInline.cardNo" disabled/>
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
              <svg-icon icon="save" color="#fff" />
            </el-icon>
            <span style="vertical-align: middle"> 保存 </span>
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
    <!-- 卡片 -->

    <el-card class="box-card" shadow="always">
      <template #header>
        <div class="card-header">
          <span> 信息汇总 </span>
        </div>
      </template>
      <el-row :gutter="12">
        <!-- 捡卵信息 -->
        <el-col :span="3">
          <el-card shadow="hover">
            <div class="card-common">
              <span>获卵数</span>
              <span>0</span>
            </div>
            <div class="card-common">
              <span>已受精</span>
              <span>0</span>
            </div>
            <div class="card-common">
              <span>未受精</span>
              <span>0</span>
            </div>
            <div class="card-common">
              <span>未获卵</span>
              <span>0</span>
            </div>
            <div class="card-common">
              <span style="font-size: 20px">捡卵信息</span>
              <span>0</span>
            </div>
          </el-card>
        </el-col>
        <!-- 前面4个框 -->
        <el-col 
          :span="3" 
          v-for="(num, i) in 7" 
          :key="i" 
          @click="selectFn(i)" 
          class="every-card"
        >
          <el-card shadow="hover" :class="active==i ? 'activeClass' : ''">
            <div class="card-common">
              <span>已观察</span>
              <span>{{ infoSum["d" + num].observed || "0" }}</span>
            </div>
            <div class="card-common">
              <span>未观察</span>
              <span>{{ infoSum["d" + num].notObserved || "0" }}</span>
            </div>
            <!-- 后3个框 -->
            <div v-if="num != 5 && num != 6 && num != 7">
              <div class="card-common" >
                <span>已下医嘱</span>
                <span >{{ infoSum["d" + num].ordered || "0" }}</span>
              </div>
              <div class="card-common">
                <span>未下医嘱</span>
                <span>{{ infoSum["d" + num].notOrdered || "0" }}</span>
              </div>
            </div>
            <div v-else>
              <div class="card-common" >
                <div>&nbsp;</div>
                <div>&nbsp;</div>
              </div>
              <div class="card-common">
                <div>&nbsp;</div>
                <div>&nbsp;</div>
              </div>
            </div>
            <div class="card-common">
              <span style="font-size: 20px">{{ "D" + num }}</span>
              <span>{{ infoSum["d" + num].sum || "0" }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <br />
    <!-- 表格 -->
    <ArtTable 
      :tableData1="tableData1" 
      :tableData2="tableData2"
      :tableData3="tableData3"
      :tableData4="tableData4"
      :tableData5="tableData5"
      :tableData6="tableData6"
      :tableData7="tableData7" 
      :num="num"
    />
  </div>
</template>

<script setup>
import { getTaskList } from '@/api/taskList'
import { reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import ArtTable from './components/art-table'

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

const tableData1 = ref([])
const tableData2 = ref([])
const tableData3 = ref([])
const tableData4 = ref([])
const tableData5 = ref([])
const tableData6 = ref([])
const tableData7 = ref([])

// 信息汇总
const infoSum = ref({})
const active = ref(0)
const photo = ref(false)

// 循环信息汇总，如果没有数据，则设置为{}
for (let i = 1; i <= 7; i++) {
  infoSum.value['d'+i] = infoSum.value['d'+i] || {}
}

const num = ref(0)
// 切换选择框的函数
function selectFn(index) {
  active.value = index
  num.value = index
}

// 检索的函数
function onSubmit() {
	getTaskList({queryDate: formInline.searchDate}).then(data => {
		// console.log(data.cultivationInfo.d5)
		if (formInline.searchDate == '') {
			ElMessage.error('请选择时间')
		} else {
      tableData1.value = data.cultivationInfo.d1.cultivationList
      tableData2.value = data.cultivationInfo.d2.cultivationList
      tableData3.value = data.cultivationInfo.d3.cultivationList
      tableData4.value = data.cultivationInfo.d4.cultivationList
			tableData5.value = data.cultivationInfo.d5.cultivationList
      tableData6.value = data.cultivationInfo.d6.cultivationList
      tableData7.value = data.cultivationInfo.d7.cultivationList
      infoSum.value = data.cultivationInfo
			ElMessage.success('查询成功')
		}
	}).catch(err => {
    ElMessage.error('数据获取失败')
  })
}

</script>

<style lang="scss" scoped>
.box-card {
  .card-header span {
    font-size: 18px;
  }
}

.card-common {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.common-layout {
  .every-card {
      .activeClass {
        border: 2px solid grey;
      }
  }
}

:deep(.el-table th.el-table__cell) {
  background-color: #f5f5f5;
}

:deep(.el-table th.el-table__cell>.cell) {
  color: #000;
  font-weight: normal;
}
</style>