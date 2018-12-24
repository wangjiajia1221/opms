<template>
  <div id='deploy_view'>
    <el-main>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>部署视图</el-breadcrumb-item>
    </el-breadcrumb>
    </el-main>
    <el-main>
    </el-main>
  </div>
</template>

<script>
import DataProvider from '@bbfe/data-provider';

let service = new DataProvider();
export default {}
</script>

<style>
</style>
