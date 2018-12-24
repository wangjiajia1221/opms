<template>
  <div id='home'>
    <el-main>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的服务</el-breadcrumb-item>
    </el-breadcrumb>
    </el-main>
    <el-main>
    <el-row :gutter='8'>
      <el-col :span='12'>
        <el-card class="box-card" shadow='hover'>
          <div slot="header" class="clearfix">
            <span>我的服务</span>
          </div>
          <el-row :gutter='8' style="font-size: 12px">
            <el-col :span='12'>
              <el-input v-model="searchForm.search_value" placeholder="搜索：服务名称"  @keyup.enter.native="searchService"></el-input>
            </el-col>
            <el-col :span="7" >
              <el-button @click="searchService" type="default" icon="el-icon-search">搜 索</el-button>
            </el-col>
            <el-col :span="4" >
              <el-button @click="$router.push('/services/add')" type="success">新增服务</el-button>
            </el-col>
          </el-row>
          <el-table style="width: 100%" :data="serviceData" >
            <el-table-column label="服务名称">
              <template scope="scope">
                <el-button type="text" @click="$router.push('/services/' + scope.row.id)"> {{ scope.row.service_name }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="pmo_belong"      label="所属PMO"></el-table-column>
            <el-table-column prop="status"      label="服务状态">
              <template slot-scope="scope">
                <span :style="{color: scope.row.status[1]}">{{ scope.row.status[0] }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="operation"     label="操作">
              <template slot-scope="scope">
                <el-tooltip content="打开控制台" placement="top">
                  <i class="el-icon-rank"   @click="handleEdit(scope.row)"></i>
                </el-tooltip>
                <span>|</span>
                <el-tooltip content="创建任务" placement="top">
                  <i class="el-icon-edit-outline" @click="showLog(scope.row)"></i>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>

      <el-col :span='12'>
        <el-card class="box-card" shadow='hover'>
          <div slot="header" class="clearfix">
            <span>近期迭代任务</span>
          </div>
          <el-table style="width: 100%" :data="itertaskData" >
            <el-table-column label="迭代ID">
              <template scope="scope">
                <el-button type="text" @click="$router.push('/services/' + scope.row.id)"> {{ scope.row.iter_id }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="environment"      label="环境"></el-table-column>
            <el-table-column prop="status"      label="部署状态">
              <template slot-scope="scope">
                <span :style="{color: scope.row.status[1]}">{{ scope.row.status[0] }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="operation"     label="操作">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status[1] == 'black'" round size="mini" type="primary" @click="iterDeploy(scope.row)">一键部署</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <br>
        <el-card class="box-card" shadow='hover'>
          <div slot="header" class="clearfix">
            <span>今日任务</span>
          </div>
          <el-table style="width: 100%" :data="taskData" >
            <el-table-column label="任务ID">
              <template scope="scope">
                <el-button type="text" @click="$router.push('/services/' + scope.row.id)"> {{ scope.row.task_id }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="service_belong"      label="所属服务"></el-table-column>
            <el-table-column prop="environment"      label="环境"></el-table-column>
            <el-table-column prop="status"      label="任务状态">
              <template slot-scope="scope">
                <span :style="{color: scope.row.status[1]}">{{ scope.row.status[0] }}</span>
                <i v-if="scope.row.status[0] == '正在回滚'" class="el-icon-loading"></i>
                <i v-if="scope.row.status[0] == '正在部署'" class="el-icon-loading"></i>
              </template>
            </el-table-column>
            <el-table-column prop="operation"     label="操作">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status[0] == '待部署'" round size="mini" type="primary" @click="iterDeploy(scope.row)">部署</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>


      </el-col>

    </el-row>
    </el-main>
  </div>
</template>

<script>
import DataProvider from '@bbfe/data-provider';

let service = new DataProvider();
export default {
  data() {
    return {
      serviceData: [],
      taskData:[],
      itertaskData:[],
      mysearch: '',
      searchForm: {
        search_value: null,
      },
      action: 'add',
      dialogVisible: false,
      popUpDialog: false,
      popUpTitle: null,
      postConfig: {
        baseURL: '/proxy/api/v1',
        paramSerializerJQLikeEnabled: true,
        url: '/home',
        method: 'post',
        data: null,
      },
      logContent: {
        logs: null,
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
      //     this.tableData = data.data;
      //     let refresh = 0;
      //     for(let obj of this.tableData){
      //       if(obj.status[1] == 'orange'){
      //         refresh = 1;
      //         break;
      //       }
      //     };
      //     if(refresh == 1) {
      //       setTimeout(() => {this.getData()},10000);
      //     };
      //   }, err => {
      //   this.$alert(err.message);
      //   });
      this.serviceData = [
        {
          service_name: 'zkproxy',
          pmo_belong: 'infra',
          status: ['服务正常', 'green']
        },
        {
          service_name: 'app2',
          pmo_belong: 'mind',
          status: ['服务正常','green'],
        },
        {
          service_name: 'app3',
          pmo_belong: 'v5',
          status: ['有异常', 'red']
        },
        {
          service_name: 'app4',
          pmo_belong: 'mind',
          status: ['服务正常','green'],
        },
        {
          service_name: 'app5',
          pmo_belong: 'mind',
          status: ['服务正常','green'],
        },
        {
          service_name: 'app6',
          pmo_belong: 'mind',
          status: ['服务正常','green'],
        },
        {
          service_name: 'app7',
          pmo_belong: 'mind',
          status: ['服务正常','green'],
        },
        {
          service_name: 'app8',
          pmo_belong: 'mind',
          status: ['服务正常','green'],
        },
      ]
      this.itertaskData = [
        {
          "iter_id": "sprint-1819",
          "environment":"vpcprod",
          "status":["待部署", "black"]
        },
        {
          "iter_id": "sprint-1818",
          "environment":"vpcprod",
          "status":["正在部署", "black"]
        },
        {
          "iter_id": "sprint-1817",
          "environment":"gld",
          "status":["异常中止", "red"]
        },
        {
          "iter_id": "sprint-1816",
          "environment":"vpcprod",
          "status":["已完成","green"]
        },
      ]

      this.taskData = [
        // {
        //   "task_id": "zkproxy_3889",
        //   "environment":"vpcprod",
        //   "status":["部分完成", "green"]
        // },
        {
          "task_id": "task_3888",
          "service_belong": "zkproxy",
          "environment":"vpcprod",
          "status":["待部署", "black"]
        },
        {
          "task_id": "task_3887",
          "service_belong": "zkproxy",
          "environment":"vpcprod",
          "status":["部署完成", "green"]
        },
        {
          "task_id": "task_3885",
          "service_belong": "app2",
          "environment":"gld",
          "status":["待部署", "black"]
        },
        {
          "task_id": "task_3884",
          "service_belong": "app2",
          "environment":"gld",
          "status":["正在部署", "black"]
        },
        {
          "task_id": "task_3884",
          "service_belong": "app2",
          "environment":"gld",
          "status":["部署异常", "red"]
        },
      ]
    },

    searchService () {
      let params = {search_value: this.searchForm.search_value};
      let config = {
         baseURL: '/proxy/api/v1',
         paramSerializerJQLikeEnabled: true,
         url: '/home',
         method: 'get',
         params: params
      };
      service.request(config).then(data => {
         // console.log(data);
        this.serviceData = data.data;
        }, err => {
        this.$alert(err.message);
      });
    },

    createService () {
      let params = {search_value: this.searchForm.search_value};
      let config = {
        baseURL: '/proxy/api/v1',
        paramSerializerJQLikeEnabled: true,
        url: '/home',
        method: 'post',
        params: params
      };
      service.request(config).then(data => {
          // console.log(data);
        this.serviceData = data.data;
      }, err => {
        this.$alert(err.message);
      });
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

    iterDeploy(row){
      this.$alert("not finished!")
    }
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
    margin-bottom: 0;
    width: 50%;
  }
  .el-card__header {
    background-color: #4C87BC;
    color: #fff;
    padding: 6px 18px;
    font-size: 14px;
  }
  .el-card__body {
    padding: 15px;
  }
  .el-button {
    padding: 12px 10px;
  }
</style>
