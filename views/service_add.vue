<template>
  <div id='service_add'>
    <el-main>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/services' }">服务管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增服务</el-breadcrumb-item>
    </el-breadcrumb>
    </el-main>
    <el-main>

    <el-form ref="formData" :model="formData" label-width="150px">
      <el-card class="box-card" shadow='hover'>
        <div slot="header" class="clearfix">
          <span><b>基础配置</b></span>
        </div>
        <el-form-item label="服务名称">
          <el-col :span="14">
            <el-input v-model="formData.service_name"
                      placeholder="只能使用小写字母、数字、下划线'_'、短横线'-'"
                      @change="serviceNameOnChange"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item  label="服务类型">
          <el-select  v-model="formData.service_type" placeholder="请选择服务类型">
            <el-option v-for="item in service_type_choices" :label="item.label" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务端口">
          <el-col :span="14">
            <el-input v-model="formData.service_port" placeholder="端口范围：3000 ~ 30000"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="内网域名">
          <el-col :span="14">
            <el-input v-model="formData.private_domain" readonly="true"  placeholder="内网域名自动生成"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="访问URI">
          <el-col :span="14">
            <el-input v-model="formData.pub_location" placeholder="用作nginx location， 需以'/'开头"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="健康检查URI">
          <el-col :span="14">
            <el-input v-model="formData.heath_check" placeholder="用作健康检查，需以'/'开头"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="使用反向代理">
          <el-switch v-model="formData.need_proxy"></el-switch>
        </el-form-item>
        <el-form-item label="所属业务线">
          <el-select v-model="formData.group_belong" placeholder="请选择业务线">
            <el-option v-for="item in project_groups" :label="item.label" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开发负责人">
          <el-select v-model="formData.owner" placeholder="请指定开发负责人">
            <el-option v-for="item in owners" :label="item.label" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述">
          <el-col :span="14">
            <el-input type="textarea" :rows="4" v-model="formData.desc" placeholder="请做简要说明"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="配置环境参数">
          <el-select v-model="formData.env" placeholder="请选择要配置的环境">
            <el-option v-for="item in environments" :label="item.label" :value="item.val"></el-option>
          </el-select>
          <el-button round type="success" @click="addEnvConfig">添加配置</el-button>
        </el-form-item>
      </el-card>

      <el-card v-if="envShow.gld_config_show" class="box-card" shadow='hover'>
        <div slot="header" class="clearfix">
          <span><b>GLD</b></span>
          <el-button style="float: right; padding: 3px 0; color: #fff;"
                     type="text"
                     @click="envShow.gld_config_show=false">X</el-button>
        </div>
        <el-form-item label="外网域名">
          <el-col :span="14">
            <el-input v-model="formData.public_domain_GLD" placeholder="请填写此服务在此环境下将使用的外网域名"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="ESC运行实例数">
          <el-select v-model="formData.instnum_in_ecs_GLD" placeholder="请选择运行实例数">
            <el-option v-for="i in 20" :label="i" :value="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="K8S运行实例数">
          <el-select v-model="formData.instnum_in_k8s_GLD" placeholder="请选择运行实例数">
            <el-option v-for="i in 20" :label="i" :value="i"></el-option>
          </el-select>
        </el-form-item>
      </el-card>

      <el-card v-if="envShow.gldexp_config_show" class="box-card" shadow='hover'>
        <div slot="header" class="clearfix">
          <span><b>GLDEXP</b></span>
          <el-button style="float: right; padding: 3px 0; color: #fff;"
                     type="text"
                     @click="envShow.gldexp_config_show=false">X</el-button>
        </div>
        <el-form-item label="外网域名">
          <el-col :span="14">
            <el-input v-model="formData.public_domain_GLDEXP" placeholder="请填写此服务在此环境下将使用的外网域名"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="ESC运行实例数">
          <el-select v-model="formData.instnum_in_ecs_GLDEXP" placeholder="请选择运行实例数">
            <el-option v-for="i in 20" :label="i" :value="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="K8S运行实例数">
          <el-select v-model="formData.instnum_in_k8s_GLDEXP" placeholder="请选择运行实例数">
            <el-option v-for="i in 20" :label="i" :value="i"></el-option>
          </el-select>
        </el-form-item>
      </el-card>

      <el-card class="box-card" shadow='never'>
        <el-button type="primary" style="float: right">提 交</el-button>
        <el-button>取 消</el-button>
      </el-card>

    </el-form>
    </el-main>
  </div>
</template>

<script>
import DataProvider from '@bbfe/data-provider';

let service = new DataProvider();
export default {
  data() {
    return {
      action: 'add',
      postConfig: {baseURL: '/proxy/api/v1',paramSerializerJQLikeEnabled: true,url: '/home',method: 'post',data: null},
      environments:[],
      project_groups: [],
      service_type_choices:[],
      owners:[],
      private_domain_suffix: '',
      formData:{
        "service_name": '',
        "service_port": '',
        "service_type": 'micro_service',
        "private_domain": '',
        "pub_location":'',
        "need_proxy": true,
        "health_check": '',
        "group_belong": '',
        "owner": '',
        "desciption": '',
        "env":'',
        "public_domain_GLD": '',
        "instnum_in_ecs_GLD":'',
        "instnum_in_k8s_GLD":'',
        "public_domain_GLDEXP": '',
        "instnum_in_ecs_GLDEXP":'',
        "instnum_in_k8s_gldEXP":'',
      },

      envShow: {
        "gld_config_show": true,
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
      this.environments = [
        {val:'gld',        label:"灰度环境（稳定区）"},
        {val:'gldexp',     label:"灰度环境（体验区）"},
      ];
      this.service_type_choices = [
        {val: 'micro_service',   label: "微服务"},
        {val: 'tomcat_frontend', label: "tomcat前端服务"},
        {val: 'tomcat_backend',  label: "tomcat后端服务"},
      ];
      this.private_domain_suffix = '-private.keruyun.com';
      this.project_groups = [
        {val:'mind',  label:"mind"},
        {val:'infra', label:"infra"},
        {val:'v5',    label:"v5"},
      ]
      this.owners = [
        {val:'leihailong_cd',  label:"雷海龙"},
        {val:'zhangsan_cd', label:"张三"},
        {val:'lisi_cd',    label:"李四"},
      ]
    },

    handleAdd(row){
      this.$alert("not finished!");
    },

    serviceNameOnChange(){
      if (this.formData.service_name) {
        this.formData.private_domain = this.formData.service_name + this.private_domain_suffix;
      } else {
        this.formData.private_domain = '';
      }
    },
    addEnvConfig(){
      let config_show = this.formData.env + '_config_show';
      this.envShow[config_show] = true;
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
</style>
