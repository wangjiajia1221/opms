<template>
  <div id='service_add'>
    <el-main>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/services' }">服务管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ formData.service_name }}</el-breadcrumb-item>
    </el-breadcrumb>
    </el-main>
    <el-main>

      <el-card class="box-card" shadow='hover' >
        <div slot="header" class="clearfix">
          <span><b>基础信息</b></span>
        </div>
        <el-form label-position="right" inline class="demo-table-expand">
          <el-form-item label="服务名称：">
            <span>{{ formData.service_name }}</span>
          </el-form-item>
          <el-form-item label="服务类型：">
            <span>{{ formData.service_type }}</span>
          </el-form-item>
          <el-form-item label="内网域名：">
            <span>{{ formData.private_domain }}</span>
          </el-form-item>
          <el-form-item label="服务端口：">
            <span>{{ formData.service_port }}</span>
          </el-form-item>
          <el-form-item label="访问URI：">
            <span>{{ formData.pub_location }}</span>
          </el-form-item>
          <el-form-item label="健康检查URI：">
            <span>{{ formData.health_check }}</span>
          </el-form-item>
          <el-form-item label="nginx反向代理：">
            <span>{{ formData.need_proxy }}</span>
          </el-form-item>
          <el-form-item label="所属业务线：">
            <span>{{ formData.group_belong}}</span>
          </el-form-item>
          <el-form-item label="添加时间：">
            <span>{{ formData.add_time }}</span>
          </el-form-item>
          <el-form-item label="开发负责人：">
            <span>{{ formData.owner }}</span>
          </el-form-item>
          <el-form-item label="添加用户：">
            <span>{{ formData.add_user }}</span>
          </el-form-item>
          <el-form-item label="描述：">
            <span>{{ formData.description }}</span>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="box-card" shadow='hover' >
        <div slot="header" class="clearfix">
          <span><b>GLD配置、部署信息</b></span>
        </div>
        <el-form label-position="right" inline class="demo-table-expand">
          <el-form-item label="ECS实例个数：">
            <span>{{ formData.env.gld.instnum_in_ecs }}</span>
          </el-form-item>
          <el-form-item label="K8S实例个数：">
            <span>{{ formData.env.gld.instnum_in_k8s }}</span>
          </el-form-item>
          <el-form-item label="ECS运行软件包：">
            <span>{{ formData.env.gld.package_path}}</span>
          </el-form-item>
          <el-form-item label="K8S运行image：">
            <span>{{ formData.env.gld.k8s_image}}</span>
          </el-form-item>
          <el-form-item label="ESC部署机器：">
            <span>
              <p v-for="server in formData.env.gld.ecs_server_list" style="line-height: 8px;">{{ server }}</p>
            </span>
          </el-form-item>
          <el-form-item label="使用外网域名：">
            <span>{{ formData.env.gld.public_domain}}</span>
          </el-form-item>
          <el-form-item label="关联迭代发版：">
            <span>{{ formData.env.gld.sprint_version}}</span>
          </el-form-item>
          <el-form-item label="关联部署任务：">
            <span>{{ formData.env.gld.related_task}}</span>
          </el-form-item>
          <el-form-item label="服务状态：">
            <span v-if="formData.env.gld.status == '服务正常'" style="color: green">{{ formData.env.gld.status}}</span>
            <span v-if="formData.env.gld.status == '有异常'" style="color: red">{{ formData.env.gld.status}}</span>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card class="box-card" shadow='hover' >
        <div slot="header" class="clearfix">
          <span><b>GLDEXP配置、部署信息</b></span>
        </div>
        <el-form label-position="right" inline class="demo-table-expand">
          <el-form-item label="ECS实例个数：">
            <span>{{ formData.env.gldexp.instnum_in_ecs }}</span>
          </el-form-item>
          <el-form-item label="K8S实例个数：">
            <span>{{ formData.env.gldexp.instnum_in_k8s }}</span>
          </el-form-item>
          <el-form-item label="ECS运行软件包：">
            <span>{{ formData.env.gldexp.package_path}}</span>
          </el-form-item>
          <el-form-item label="K8S运行image：">
            <span>{{ formData.env.gldexp.k8s_image}}</span>
          </el-form-item>
          <el-form-item label="ESC部署机器：">
            <span>
              <p v-for="server in formData.env.gldexp.ecs_server_list" style="line-height: 8px;">{{ server }}</p>
            </span>
          </el-form-item>
          <el-form-item label="使用外网域名：">
            <span>{{ formData.env.gldexp.public_domain}}</span>
          </el-form-item>
          <el-form-item label="关联迭代发版：">
            <span>{{ formData.env.gldexp.sprint_version}}</span>
          </el-form-item>
          <el-form-item label="关联部署任务：">
            <span>{{ formData.env.gldexp.related_task}}</span>
          </el-form-item>
          <el-form-item label="服务状态：">
            <span v-if="formData.env.gldexp.status == '服务正常'" style="color: green">{{ formData.env.gldexp.status}}</span>
            <span v-if="formData.env.gldexp.status == '有异常'" style="color: red">{{ formData.env.gldexp.status}}</span>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="box-card" shadow='never'>
        <el-button>打开控制台</el-button>
        <el-button type="info">修改服务配置</el-button>
        <el-button type="success" style="float: right">创建部署任务</el-button>
        <el-button type="primary" style="float: right">查看历史发版</el-button>
      </el-card>

    </el-main>
  </div>
</template>

<script>
import DataProvider from '@bbfe/data-provider';

let service = new DataProvider();
export default {
  data() {
    return {
      action: '',
      postConfig: {baseURL: '/proxy/api/v1', paramSerializerJQLikeEnabled: true, url: '/home',method: 'post',data: null},
      formData:{
        "service_name": '',
        "service_port": '',
        "service_type": '',
        "private_domain": '',
        "need_proxy": true,
        "pub_location":'',
        "health_check": '',
        "group_belong": '',
        "owner": '',
        "add_time": '',
        "add_user": '',
        "desciption": '',
        "env":[],
      },

      envShow: {
        "gld_config_show": false,
        "gldexp_config_show": false,
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
      this.formData = {
        "id":'1',
        "service_name": 'zkproxy',
        "service_port": '8001',
        "service_type": '微服务',
        "private_domain": 'zkproxy-private.keruyun.com',
        "need_proxy": "已启用",
        "pub_location":'/zkproxy',
        "health_check": '/zkproxy/health',
        "group_belong": 'infra',
        "owner": '李乐',
        "add_time": '2018-11-20 16:32:15',
        "add_user": '雷海龙',
        "desciption": '仅用作UI demo展示',
        "env": {
          "gld":{
            "public_domain": "zkproxy.keruyun.com",
            "instnum_in_ecs": 3,
            "instnum_in_k8s": 5,
            "ecs_server_list": [
              "172.16.10.36",
              "172.16.10.10",
              "172.16.10.128",
            ],
            "package_path":"oss://path/to/package/master/20181123170011/package-name.jar",
            "k8s_image":"keruyun.com/image-name:v1.2.0",
            "sprint_version":"sprint-1820",
            "related_task":"zkproxy_3670",
            "status":"服务正常",
            "package_status":"已删除",
          },
          "gldexp": {
            "public_domain": "zkproxy.keruyun.com",
            "instnum_in_ecs": 0,
            "instnum_in_k8s": 5,
            "ecs_server_list": [],
            "package_path":"oss://path/to/package/master/20181121123456/package-name.jar",
            "k8s_image":"keruyun.com/image-name:v1.2.3",
            "sprint_version":"",
            "related_task":"zkproxy_3555",
            "package_status":"正常",
            "status":"有异常"
          },
        },
      };

      if ( 'gld' in this.formData.env ){
        this.envShow.gld_config_show = true;
      };
      if ( 'gldexp' in this.formData.env ){
        this.envShow.gldexp_config_show = true;
      }
    },
  }
}
</script>

<style>
.el-card {
  margin-bottom: 10px;
}
.el-card__header {
  background-color: #4C87BC;
  color: #fff;
  padding: 6px 18px;
  font-size: 14px;
}
.el-card__body {
  padding: 20px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 140px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-button--info {
  background-color: #DCDCDC;
  color: #696969;
}
</style>
