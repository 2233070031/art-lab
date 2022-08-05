<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
      <span class="no-redirect" v-if="index === breadcrumbList.length - 1">{{ $t(`menuList.${item.name}`) }}</span>
      <!-- <span class="redirect" v-else @click="handleRedirect(item.path)">{{$t(item.meta.title)}}</span> -->
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { menuList } from '@/api/menu'
// import { setMenu } from '@/layout/Menu/menu'
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

// 导出菜单列表
// const menuListRef= ref([])
// menuListRef.value = setMenu()

const breadcrumbList = ref([])

const initBreadcrumbList = () => {
  breadcrumbList.value = route.matched
  // console.log(route.matched)
}

watch(
  route,
  () => {
    initBreadcrumbList()
  },
  { deep: true, immediate: true }
)

// const handleRedirect = (path) => {
//   router.push(path)
// }
</script>

<style lang="scss" scoped>
.no-redirect {
  color: #97a8be;
  cursor: text;
  &:hover {
    color: $menuBg;
  }
}
// .redirect {
//   color: #666;
//   font-weight: 600;
//   cursor: pointer;
//   &:hover {
//     color: $menuBg;
//   }
// }
</style>
