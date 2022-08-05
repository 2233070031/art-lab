<template>
	<!-- D1表格 -->
    <n-scrollbar x-scrollable trigger="hover">
      <el-table 
        :data="props.tableData1" 
        table-layout="auto" 
        border 
        stripe 
        style="width: 100%" 
        row-key="id" 
        height="calc(100vh - 460px)" 
        v-if="num==0" 
        highlight-current-row 
        @cell-click="edit=true"
      >
        <el-table-column type="index" label="序号" width="100" align="center"/>
        <el-table-column prop="oplanPatientId" label="ART号" width="180" align="center">
          <template #default="{row}">
            <el-input v-model="row.oplanPatientId" @blur="edit=false" autofocus></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="nameW" label="女方姓名" width="120" align="center"/>
        <el-table-column prop="nameM" label="男方姓名" width="120" align="center"/>
        <el-table-column prop="opsTypename" label="授精方式" width="140" align="center"/>
        <el-table-column prop="show_d1Operator" label="观察者" width="140" align="center">
          <template #default="{row}">
            <el-input v-if="edit" v-model="row.show_d1Operator" @blur="edit=false" autofocus></el-input>
            <span v-else>{{ row.show_d1Operator }}</span>
          </template> 
        </el-table-column>
        <el-table-column prop="show_d1Recorder" label="观察核对者" width="140" align="center">
          <template #default="{row}">
            <el-input v-if="edit" v-model="row.show_d1Recorder" @blur="edit=false" autofocus></el-input>
            <span v-else>{{ row.show_d1Recorder }}</span>
          </template> 
        </el-table-column>
        <el-table-column prop="" label="是否观察" width="140" align="center"/>
        <el-table-column label="拍照" width="80" align="center">
          <template #default="scope">
            <el-checkbox v-model="scope.row.photo" size="large" />
          </template>
        </el-table-column>
        <el-table-column prop="d0Disassemblyicsi" label="MII行ICSI" width="140" align="center"/>
        <el-table-column prop="d1Leavageliquid" label="D2观" width="140" align="center"/>
        <el-table-column prop="d1Cultivatebox" label="D3观" width="140" align="center"/>
        <el-table-column prop="d1D3Trans" label="D3移植" width="140" align="center"/>
        <el-table-column prop="optcltSpecialPreparation" label="特殊准备" width="140" align="center"/>
        <el-table-column prop="d1Hr" label="D1结束" width="140" align="center"/>
      </el-table>
    </n-scrollbar>
		<!-- D2表格 -->
		<a-table 
			:columns="myColumns2" 
			:data="props.tableData2" 
			column-resizable 
			:bordered="{cell:true}" 
			:stripe="true" 
			v-if="num==1"
		>
      <template #d2Operator="{ rowIndex }">
        <a-input v-model="tableData2[rowIndex].d2Operator" />
      </template>
      <template #d2Recorder="{ rowIndex }">
        <a-input v-model="tableData2[rowIndex].d2Recorder" />
      </template>
    </a-table>
    <!-- D3表格 -->
		<n-scrollbar x-scrollable trigger="hover">
      <el-table :data="props.tableData3" border stripe style="width: 100%" row-key="id" height="calc(100vh - 460px)" v-if="num==2">
        <el-table-column prop="no" label="序号" width="100" align="center"/>
        <el-table-column prop="oplanPatientId" label="ART号" width="180" align="center"/>
        <el-table-column prop="nameW" label="女方姓名" width="120" align="center"/>
        <el-table-column prop="nameM" label="男方姓名" width="120" align="center"/>
        <el-table-column prop="opsTypename" label="授精方式" width="140" align="center"/>
        <el-table-column prop="d3Operator" label="观察者" width="140" align="center"/>
        <el-table-column prop="d3Recorder" label="观察核对者" width="140" align="center"/>
        <el-table-column prop="" label="拍照" width="140" align="center"/>
        <el-table-column prop="d3Cultivatebox" label="实际冷冻数" width="140" align="center"/>
        <el-table-column prop="d3Cultivateliquid" label="D3医嘱冷冻" width="140" align="center"/>
        <el-table-column prop="d3FrezNum" label="D3实际冷冻" width="140" align="center"/>
        <el-table-column prop="d3TransRemark" label="D3医嘱移植" width="140" align="center"/>
        <el-table-column prop="d3Incubatorno" label="D3实际移植数" width="140" align="center"/>
        <el-table-column prop="d3Blastula" label="医嘱养囊" width="140" align="center"/>
        <el-table-column prop="d38cellFrez" label="养至8cell冻" width="140" align="center"/>
        <el-table-column prop="d3D4Obv" label="D4观" width="140" align="center"/>
        <el-table-column prop="d3AdviceSpecial" label="D3特殊医嘱" width="140" align="center"/>
        <el-table-column prop="optcltSpecialPreparation" label="特殊准备" width="140" align="center"/>
        <el-table-column prop="d3Hr" label="D3结束" width="140" align="center"/>
      </el-table>
    </n-scrollbar>
    <!-- D4表格 -->
		<n-scrollbar x-scrollable trigger="hover">
      <el-table :data="props.tableData4" border stripe style="width: 100%" row-key="id" height="calc(100vh - 460px)" v-if="num==3">
        <el-table-column prop="no" label="序号" width="100" align="center"/>
        <el-table-column prop="oplanPatientId" label="ART号" width="180" align="center"/>
        <el-table-column prop="nameW" label="女方姓名" width="120" align="center"/>
        <el-table-column prop="nameM" label="男方姓名" width="120" align="center"/>
        <el-table-column prop="opsTypename" label="授精方式" width="140" align="center"/>
        <el-table-column prop="d3Operator" label="观察者" width="140" align="center"/>
        <el-table-column prop="d3Recorder" label="观察核对者" width="140" align="center"/>
        <el-table-column prop="" label="是否观察" width="140" align="center"/>
        <el-table-column prop="d4FrezNum" label="实际冷冻数" width="140" align="center"/>
        <el-table-column prop="" label="D3下午冷冻" width="140" align="center"/>
        <el-table-column prop="bd4Cultivatebox" label="冷冻" width="140" align="center"/>
        <el-table-column prop="bd4Incubatorno" label="D4实际移植数" width="140" align="center"/>
        <el-table-column prop="bd4Trans" label="D4移植" width="140" align="center"/>
        <el-table-column prop="bd4Blastula" label="养囊" width="140" align="center"/>
        <el-table-column prop="d4AdviceSpecial" label="D4特殊医嘱" width="140" align="center"/>
        <el-table-column prop="optcltSpecialPreparation" label="特殊准备" width="140" align="center"/>
        <el-table-column prop="d4Hr" label="D4结束" width="140" align="center"/>
      </el-table>
    </n-scrollbar>
    <!-- D5表格 -->
    <n-scrollbar x-scrollable trigger="hover">
      <el-table :data="props.tableData5" border stripe style="width: 100%" row-key="id" height="calc(100vh - 460px)" v-if="num==4">
        <el-table-column prop="no" label="序号" width="130" align="center"/>
        <el-table-column prop="oplanPatientId" label="ART号" width="180" align="center"/>
        <el-table-column prop="nameW" label="女方姓名" width="120" align="center"/>
        <el-table-column prop="nameM" label="男方姓名" width="120" align="center"/>
        <el-table-column prop="opsTypename" label="授精方式" width="140" align="center"/>
        <el-table-column prop="d5Operator" label="观察者" width="140" align="center"/>
        <el-table-column prop="d5Recorder" label="观察核对者" width="140" align="center"/>
        <el-table-column prop="" label="拍照" width="140" align="center"/>
        <el-table-column prop="d567DoctorAdviceClinical" label="D567医嘱" width="140" align="center"/>
        <el-table-column prop="d567AdviceSpecial" label="D567特殊医嘱" width="140" align="center"/>
        <el-table-column prop="" label="是否观察" width="140" align="center"/>
        <el-table-column prop="optcltSpecialPreparation" label="特殊准备" width="140" align="center"/>
      </el-table>
    </n-scrollbar>
    <!-- D6表格 -->
		<n-scrollbar x-scrollable trigger="hover">
      <el-table :data="props.tableData6" border stripe style="width: 100%" row-key="id" height="calc(100vh - 460px)" v-if="num==5">
        <el-table-column prop="no" label="序号" width="130" align="center"/>
        <el-table-column prop="oplanPatientId" label="ART号" width="180" align="center"/>
        <el-table-column prop="nameW" label="女方姓名" width="120" align="center"/>
        <el-table-column prop="nameM" label="男方姓名" width="120" align="center"/>
        <el-table-column prop="opsTypename" label="授精方式" width="140" align="center"/>
        <el-table-column prop="d6Operator" label="观察者" width="140" align="center"/>
        <el-table-column prop="d6Recorder" label="观察核对者" width="140" align="center"/>
        <el-table-column prop="" label="是否观察" width="140" align="center"/>
        <el-table-column prop="" label="拍照" width="140" align="center"/>
        <el-table-column prop="d567DoctorAdviceClinical" label="D567医嘱" width="140" align="center"/>
        <el-table-column prop="d567AdviceSpecial" label="D567特殊医嘱" width="140" align="center"/>
        <el-table-column prop="optcltSpecialPreparation" label="特殊准备" width="140" align="center"/>
      </el-table>
    </n-scrollbar>
    <!-- D7表格 -->
		<n-scrollbar x-scrollable trigger="hover">
      <el-table :data="props.tableData7" border stripe style="width: 100%" row-key="id" height="calc(100vh - 460px)" v-if="num==6">
        <el-table-column prop="no" label="序号" width="130" align="center"/>
        <el-table-column prop="oplanPatientId" label="ART号" width="180" align="center"/>
        <el-table-column prop="nameW" label="女方姓名" width="120" align="center"/>
        <el-table-column prop="nameM" label="男方姓名" width="120" align="center"/>
        <el-table-column prop="opsTypename" label="授精方式" width="140" align="center"/>
        <el-table-column prop="d7Operator" label="观察者" width="140" align="center"/>
        <el-table-column prop="d7Recorder" label="观察核对者" width="140" align="center"/>
        <el-table-column prop="" label="是否观察" width="140" align="center"/>
        <el-table-column prop="" label="拍照" width="140" align="center"/>
        <el-table-column prop="d567DoctorAdviceClinical" label="D567医嘱" width="140" align="center"/>
        <el-table-column prop="d567AdviceSpecial" label="D567特殊医嘱" width="140" align="center"/>
        <el-table-column prop="optcltSpecialPreparation" label="特殊准备" width="140" align="center"/>
      </el-table>
    </n-scrollbar>
</template>

<script setup>
import { NScrollbar } from 'naive-ui'
import { myColumns2 } from './myColumns2'
import { ref } from 'vue'

const props = defineProps({
	tableData1: {
		type: Array,
		default: () => []
	},
	tableData2: {
		type: Array,
		default: () => []
	},
  tableData3: {
		type: Array,
		default: () => []
	},
  tableData4: {
		type: Array,
		default: () => []
	},
	tableData5: {
		type: Array,
		default: () => []
	},
  tableData6: {
		type: Array,
		default: () => []
	},
  tableData7: {
		type: Array,
		default: () => []
	},
	num: {
		type: Number,
		default: 0
	}
})

let edit = ref(false)

</script>

<style scope lang="scss">

</style>