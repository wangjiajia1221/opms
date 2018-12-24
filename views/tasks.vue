<template>
  <div id='tasks'>
    <el-main>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>任务管理</el-breadcrumb-item>
    </el-breadcrumb>
    </el-main>
    <el-main>
    <el-row :gutter='8'>
      <el-col :span='10'>
        <el-input v-model="searchForm.search_value" placeholder="搜索：任务ID、服务名称、包路径、操作人等"  @keyup.enter.native="searchData"></el-input>
      </el-col>
      <el-col :span="6" style="font-size: 14px">
        <el-button @click="searchData" type="primary" icon="el-icon-search" v-popover:searchHelp>搜 索</el-button>
      </el-col>
    </el-row>

    <el-table style="width: 100%" :data="tableData" >
      <el-table-column label="task_id" width="100px">
        <template scope="scope">
          <el-button type='text' @click="$router.push('/tasks/' + scope.row.task_id)"> {{ scope.row.task_id }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="service_belong"     label="所属服务" width="120px"></el-table-column>
      <el-table-column prop="group_belong"   label="所属业务线" width="120px"></el-table-column>
      <el-table-column prop="current_version"   label="当前运行版本" ></el-table-column>
      <el-table-column prop="new_version"   label="部署的新版本" ></el-table-column>
      <!-- <el-table-column prop="operate_time"  label="操作时间"></el-table-column>
      <el-table-column prop="operate_user"  label="操作人员"></el-table-column> -->
      <el-table-column prop="status"         label="部署状态" width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.status == '部署异常'" style="color: red">{{ scope.row.status }}</span>
          <span v-if="scope.row.status == '回滚异常'" style="color: red">{{ scope.row.status }}</span>
          <span v-if="scope.row.status == '部署成功'" style="color: green">{{ scope.row.status }}</span>
          <span v-if="scope.row.status == '回滚成功'" style="color: orange">{{ scope.row.status }}</span>
          <span v-if="scope.row.status == '正在回滚'" style="color: orange">{{ scope.row.status }}</span>
          <span v-if="scope.row.status == '正在部署'" style="color: black">{{ scope.row.status }}</span>
          <span v-if="scope.row.status == '待部署'" style="color: black">{{ scope.row.status }}</span>
          <span v-if="scope.row.status == '已废弃'" style="color: gray">{{ scope.row.status }}</span>
          <span v-if="scope.row.status == '部分完成'">部分<span style="color: green">完成</span></span>
          <i v-if="scope.row.status == '正在回滚'" class="el-icon-loading"></i>
          <i v-if="scope.row.status == '正在部署'" class="el-icon-loading"></i>
        </template>
      </el-table-column>
      <el-table-column prop="operation"     label="操作" width="200px">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == '待部署'" type="primary" round>开始部署</el-button>
          <el-button v-if="scope.row.status == '待部署'" type="info" round>废弃任务</el-button>
          <el-button v-if="scope.row.status == '部署异常'" type="primary" round>重新部署</el-button>
          <el-button v-if="scope.row.status == '部分完成'" type="primary" round>继续部署</el-button>
          <el-button v-if="scope.row.status == '部署成功'" type="warning" round>快速回滚</el-button>
          <el-button v-if="scope.row.status == '部署异常'" type="warning" round>快速回滚</el-button>
          <el-button v-if="scope.row.status == '回滚异常'" type="warning" round>快速回滚</el-button>
          <el-button v-if="scope.row.status == '部分完成'" type="warning" round>快速回滚</el-button>
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
          task_id: 'task_3888',
          service_belong: 'zkproxy',
          group_belong: 'infra',
          current_version: "oss://path/to/2018.10.12.15.23.24/package.jar",
          new_version: "oss://path/to/2018.12.06.12.10.45/package.jar",
          operate_time:"",
          operate_user:"",
          status: '待部署',
        },
        {
          task_id: 'task_3888',
          service_belong: 'zkproxy',
          group_belong: 'infra',
          current_version: "oss://path/to/2018.10.12.15.23.24/package.jar",
          new_version: "oss://path/to/2018.12.06.12.10.45/package.jar",
          operate_time:"2018-11-12 15:30:20",
          operate_user:"leihailong_cd",
          status: '正在部署',
        },
        {
          task_id: 'task_3888',
          service_belong: 'zkproxy',
          group_belong: 'infra',
          current_version: "oss://path/to/2018.10.12.15.23.24/package.jar",
          new_version: "oss://path/to/2018.12.06.12.10.45/package.jar",
          operate_time:"2018-11-12 15:30:20",
          operate_user:"leihailong_cd",
          status: '正在回滚',
        },
        {
          task_id: 'task_3888',
          service_belong: 'zkproxy',
          group_belong: 'infra',
          current_version: "oss://path/to/2018.10.12.15.23.24/package.jar",
          new_version: "oss://path/to/2018.12.06.12.10.45/package.jar",
          operate_time:"2018-11-12 15:30:20",
          operate_user:"leihailong_cd",
          status: '部署成功',
        },
        {
          task_id: 'task_3888',
          service_belong: 'zkproxy',
          group_belong: 'infra',
          current_version: "oss://path/to/2018.10.12.15.23.24/package.jar",
          new_version: "oss://path/to/2018.12.06.12.10.45/package.jar",
          operate_time:"2018-11-12 15:30:20",
          operate_user:"leihailong_cd",
          status: '部署异常',
        },
        {
          task_id: 'task_3888',
          service_belong: 'zkproxy',
          group_belong: 'infra',
          current_version: "oss://path/to/2018.10.12.15.23.24/package.jar",
          new_version: "oss://path/to/2018.12.06.12.10.45/package.jar",
          operate_time:"2018-11-12 15:30:20",
          operate_user:"leihailong_cd",
          status: '回滚异常',
        },
        {
          task_id: 'task_3888',
          service_belong: 'zkproxy',
          group_belong: 'infra',
          current_version: "oss://path/to/2018.10.12.15.23.24/package.jar",
          new_version: "oss://path/to/2018.12.06.12.10.45/package.jar",
          operate_time:"2018-11-12 15:30:20",
          operate_user:"leihailong_cd",
          status: '回滚成功',
        },
        {
          task_id: 'task_3888',
          service_belong: 'zkproxy',
          group_belong: 'infra',
          current_version: "oss://path/to/2018.10.12.15.23.24/package.jar",
          new_version: "oss://path/to/2018.12.06.12.10.45/package.jar",
          operate_time:"2018-11-12 15:30:20",
          operate_user:"leihailong_cd",
          status: '部分完成',
        },
        {
          task_id: 'task_3888',
          service_belong: 'zkproxy',
          group_belong: 'infra',
          current_version: "oss://path/to/2018.10.12.15.23.24/package.jar",
          new_version: "oss://path/to/2018.12.06.12.10.45/package.jar",
          operate_time:"2018-11-12 15:30:20",
          operate_user:"leihailong_cd",
          status: '已废弃',
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
  .el-button.is-round {
    padding: 8px 10px;
    margin-left: 0;
    margin-right: 0;
  }
</style>
