<template>
  <div class="common-layout">
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
    <!-- 表格 -->
    <!-- <n-scrollbar x-scrollable trigger="hover">
      <el-table :data="tableData" border style="width: 100%" row-key="id" id="out-table" height="727">
        <el-table-column prop="oplanPatientId" label="ART号" width="140" align="center"/>
        <el-table-column prop="opstimes" label="周期数" width="130" align="center"/>
        <el-table-column prop="operationDate" label="取卵日期" width="180" align="center"/>
        <el-table-column prop="nameW" label="女方姓名" width="180" align="center"/>
        <el-table-column prop="ageW" label="年龄(女)" width="80" align="center"/>
        <el-table-column prop="birthdayW" label="生日(女)" width="120" align="center"/>
        <el-table-column prop="nameM" label="男方姓名" width="180" align="center"/>
        <el-table-column prop="ageM" label="年龄(男)" width="80" align="center"/>
        <el-table-column prop="insemination" label="ART方式" width="120" align="center"/>
        <el-table-column prop="follicleNum" label="卵泡数" width="120" align="center"/>
        <el-table-column prop="sourceSemen" label="精液来源" width="120" align="center"/>
        <el-table-column prop="e2" label="扳机日E2" width="120" align="center"/>
        <el-table-column prop="address" label="传染病信息" width="180" align="center"/>
        <el-table-column prop="remark" label="备注" width="120" align="center"/>
      </el-table>
    </n-scrollbar> -->
    
    <a-table 
      :columns="myColumns" 
      :data="tableData" 
      column-resizable 
      :bordered="{cell:true}" 
      :loading="loading" 
      :stripe="true"
    >
    </a-table>

  </div>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import { getEggNotice } from '@/api/egg'
import { ElMessage } from 'element-plus'
import { NScrollbar } from 'naive-ui'
import { myColumns } from './myColumns'
export default {
  name: 'Egg',
  components: {
    NScrollbar
  },
  setup () {
    const formInline = reactive({
      searchDate: '',
      patientId: '',
      nameW: '',
      cardNo: ''
    })
    const tableData = ref([])
    const loading = ref(false)
    
    watch(() => formInline.searchDate, (val) => {
      if (val) {
        formInline.searchDate = val
      }
    }, {immediate: true})  

    function onSubmit() {
      loading.value = true
      getEggNotice({operationDate: formInline.searchDate}).then(data => {
        // console.log(data)
          // console.log(formInline.searchDate)
          // 判断 如果没有选择时间提示错误 
          loading.value = false
          if (formInline.searchDate == '') {
            ElMessage.error('请选择时间')
          } else {
            tableData.value = data
            ElMessage({ type: 'success', message: '查询成功'})
          }
      })
    }
    
    return { formInline, onSubmit, tableData, myColumns }
  }
}
</script>

<style lang="scss" scoped>

</style>