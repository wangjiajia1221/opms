<template>
  <div id='home'>
    <el-main>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>服务管理</el-breadcrumb-item>
    </el-breadcrumb>
    </el-main>
    <el-main>
    <el-row :gutter='8'>
      <el-col :span='10'>
        <el-input v-model="searchForm.search_value" placeholder="搜索服务名称、端口、域名、描述等"  @keyup.enter.native="searchData"></el-input>
      </el-col>
      <el-col :span="6" style="font-size: 14px">
        <el-button @click="searchData" type="primary" icon="el-icon-search" v-popover:searchHelp>搜 索</el-button>
      </el-col>
      <el-col :span="8" style="font-size: 14px; text-align: right;">
        <el-button type='success' round @click="$router.push('/services/add')">新增服务</router-link></span></el-button>
      </el-col>
    </el-row>

    <el-table style="width: 100%" :data="tableData" >
      <el-table-column label="服务名称" width="160px">
        <template scope="scope">
          <el-button type="text" @click="$router.push('/services/' + scope.row.id)"> {{ scope.row.service_name }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="pmo_belong"     label="所属业务线" width="120px"></el-table-column>
      <el-table-column prop="service_type"   label="服务类型" width="120px"></el-table-column>
      <el-table-column prop="service_port"   label="服务端口" width="120px"></el-table-column>
      <!-- <el-table-column prop="public_domain"  label="使用外网域名"></el-table-column> -->
      <el-table-column prop="description"  label="描述"></el-table-column>
      <el-table-column prop="status"         label="运行状态" width="120px">
        <template slot-scope="scope">
          <span :style="{color: scope.row.status[1]}">{{ scope.row.status[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation"     label="操作" width="120px">
        <template slot-scope="scope">
          <el-tooltip content="打开控制台" placement="top">
            <i class="el-icon-rank"   @click="handleEdit(scope.row)"></i>
          </el-tooltip>
          <span>|</span>
          <el-tooltip content="创建任务" placement="top">
            <i class="el-icon-edit-outline" @click="showLog(scope.row)"></i>
          </el-tooltip>
          <span>|</span>
          <el-tooltip content="删除" placement="top">
            <i class="el-icon-delete" @click="handleDelete(scope.row)"></i>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    </el-main>
  </div>
</template>

<script>
import DataProvider from '@bbfe/data-provider';

let service = new DataProvider();
export default {
  data() {
    return {
      tableData: [],
      searchForm: {
        search_value: null,
      },
      action: 'add',
      postConfig: {
        baseURL: '/proxy/api/v1',
        paramSerializerJQLikeEnabled: true,
        url: '/home',
        method: 'post',
        data: null,
      },
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData () {
      // let params = {};
      // let config = {
      //   // api请求的baseURL, 用于DataSourceGateWay
      //   baseURL: '/proxy/api/v1',
      //   // 请求参数以jquery.param方式进行序列化
      //   paramSerializerJQLikeEnabled: true,
      //   url: '/home',
      //   // to methods of that instance.
      //   method: 'get',
      //   // params仅用于get请求， 会拼接在url后面
      //   params: params
      // };
      // service.request(config).then(data => {
      //     // console.log(data);
        // this.tableData = data.data;
      //   let refresh = 0;
      //   for(let obj of this.tableData){
      //     if(obj.status[1] == 'orange'){
      //       refresh = 1;
      //       break;
      //     }
      //   };
      //   if(refresh == 1) {
      //     setTimeout(() => {this.getData()},10000);
      //   };
      // }, err => {
      //   this.$alert(err.message);
      // });
      this.tableData = [
        {
          id: '1',
          service_name: 'zkproxy',
          service_port: '8001',
          service_type: "微服务",
          pmo_belong: 'infra',
          status: ['服务正常', 'green']
        },
        {
          id: '2',
          service_name: 'app2',
          pmo_belong: 'mind',
          service_port: '8002',
          service_type: "微服务",
          status: ['服务正常','green'],
        },
        {
          id: '3',
          service_name: 'app3',
          service_port: '8003',
          service_type: "微服务",
          pmo_belong: 'v5',
          status: ['有异常', 'red']
        },
        {
          id: '4',
          service_name: 'app4',
          service_port: '8004',
          service_type: "tomcat前端",
          pmo_belong: 'mind',
          status: ['服务正常','green'],
        },
        {
          id: '5',
          service_name: 'app5',
          service_port: '8005',
          service_type: "微服务",
          pmo_belong: 'mind',
          status: ['服务正常','green'],
        },
        {
          id: '6',
          service_name: 'app6',
          service_port: '8006',
          service_type: "微服务",
          pmo_belong: 'mind',
          status: ['服务正常','green'],
        },
        {
          id: '7',
          service_name: 'app7',
          service_port: '8007',
          service_type: "tomcat后端",
          pmo_belong: 'mind',
          status: ['服务正常','green'],
        },
        {
          id: '8',
          service_name: 'app8',
          service_port: '8008',
          service_type: "微服务",
          pmo_belong: 'mind',
          status: ['服务正常','green'],
        },
      ];
    },

    searchData () {
      // let params = {search_value: this.searchForm.search_value};
      // let config = {
      //   baseURL: '/proxy/api/v1',
      //   paramSerializerJQLikeEnabled: true,
      //   url: '/home',
      //   method: 'get',
      //   params: params
      // };
      // service.request(config).then(data => {
      //   // console.log(data);
      //   this.tableData = data.data;
      // }, err => {
      //   this.$alert(err.message);
      // });
      this.tableData = [
        {
          service_name: 'zkproxy',
          service_port: '8001',
          pmo_belong: 'infra',
          private_domain: "zkproxy-private.keruyun.com",
          public_domain: "zkproxy.keruyun.com",
          status: ['服务正常', 'green']
        },
      ];
    },

    warningAndAction(row, confirmMessage, action, successMessage) {
      this.$confirm(confirmMessage,"警告",{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postConfig.data = {id: row.id, action: action};
        service.request(this.postConfig).then(data => {
          this.$message({message: successMessage, type: 'success'});
          this.getData();
        }, err => {
          this.$message({message: err.message, type: 'error'});
        });
      });
    },

    handleDelete(row){
        let confirmMessage = `删除七层代理：${row.proxy_domain_name}？`;
        let action = 'delete';
        let successMessage = '删除成功';
        this.warningAndAction(row, confirmMessage, action, successMessage);
    },
    showLog(row){
        this.postConfig.data = {id: row.id, action: 'getPushLog'};
        service.request(this.postConfig).then(data => {
          this.logContent.logs = data.logs;
          this.popUpTitle = `${row.proxy_domain_name}七层代理的saltstack推送日志`
          this.popUpDialog = true;
        }, err => {
          this.$message({message: err.message, type: 'error'});
        });
    },

  }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 100px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
