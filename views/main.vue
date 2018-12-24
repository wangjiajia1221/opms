<template>
  <el-container style="border: 1px solid #eee">

    <el-aside :width='asidewidth'>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :router='true'>
      <router-link :to="{ path: '/home' }"><img src='../assets/logo.png' height='60px' width='200px' style='background-color: #4C87BC;'/></router-link>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i><span>服务管理</span></template>
          <el-menu-item index="/services">服务列表</el-menu-item>
          <el-menu-item index="/tasks">任务管理</el-menu-item>
          <el-menu-item index="/taskgroups">迭代任务组</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-share"></i><span>编排视图</span></template>
          <el-menu-item index="/deployview">部署视图</el-menu-item>
          <el-menu-item index="/monitorview">监控视图</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-bell"></i><span>中间件部署</span></template>
          <el-menu-item index="/kafka">kafka</el-menu-item>
          <el-menu-item index="/zookeeper">zookeeper</el-menu-item>
          <el-menu-item index="/elasticsearch">elasticsearch</el-menu-item>
          <el-menu-item index="/activemq">activemq</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-service"></i><span>用户与权限</span></template>
          <el-menu-item index="/users">用户管理</el-menu-item>
          <el-menu-item index="/groups">用户分组</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
      <el-row>
        <el-col :span='24' style="text-align: right; font-size: 16px;">
          <span>欢迎您，{{ currentUser }} </span>

          <el-dropdown @command="handleCommand" trigger="click">
            <span class="el-dropdown-link" style='color: #fff;'>
              <i class="el-icon-setting"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item command="changePasswd">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-col>
      </el-row>

      <el-dialog title="修改密码" :visible.sync="popUpDialog">
        <el-form :model="passwdData" ref="passwdData" label-width="100px">
          <el-form-item label="旧密码" prop="old_password" :rules="[{ required: true, message: '请输入旧密码'}]">
            <el-input v-model="passwdData.old_password"  placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_password" :rules="[{ required: true, message: '请输入一个新的密码'}]">
            <el-input v-model="passwdData.new_password"  placeholder="请输入一个新的密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码确认" prop="confirm_password" :rules="[{ required: true, message: '请重复输入新的密码'}]">
            <el-input v-model="passwdData.confirm_password"  placeholder="请重复输入新的密码"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="popUpDialog = false">取 消</el-button>
          <el-button type="primary" @click="formSubmit">确 定</el-button>
        </div>
      </el-dialog>

      </el-header>

      <router-view></router-view>

      <!--
      <el-footer >
        <span><strong>Copyright &copy; 2016 <a href="http://www.keruyun.com/">客如云</a>.</strong> All rights reserved.</span>
      </el-footer>
      -->
    </el-container>
  </el-container>
</template>

<script>
import DataProvider from '@bbfe/data-provider';
let service = new DataProvider();

export default {
  data() {
    return {
      isCollapse: false,
      asidewidth: '200px',
      currentUser: '',
      popUpDialog: false,
      passwdData: {
        old_password: null,
        new_password: null,
        confirm_password: null,
      },
    }
  },
  mounted(){
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
    this.currentUser = "雷海龙";
      //let config = {
    //    baseURL: '/proxy/api/v1',
    //    paramSerializerJQLikeEnabled: true,
    //    url: '/userinfo',
    //    method: 'get',
    //  };
    //  service.request(config)
    //  .then(data => {
    //    console.log(data);
    //    if (data.result == 'SUCCESS') {
    //      this.currentUser = data.realname;
    //    }
    //  }, err => {
    //    this.currentUser = '';
    //  });
    },
    handleCommand(command) {
      if (command == "logout"){
        window.location.href="/logout";
      } else if (command == "changePasswd") {
        this.resetForm();
        this.popUpDialog = true;
      }
    },

    resetForm(){
      Object.keys(this.passwdData).forEach(k => {
        this.passwdData[k] = null;
      });
    },
    formSubmit(){
      let data = this.passwdData;
      data.action = "changePasswd";
      let config = {
        baseURL: '/proxy/api/v1',
        paramSerializerJQLikeEnabled: true,
        url: '/httpproxy',
        method: 'post',
        data: data
      };
      service.request(config)
      .then(data => {
        console.log(data);
        if (data.result == 'SUCCESS') {
          this.$message({
            message: '密码修改成功',
            type: 'success'
          });
          this.popUpDialog = false;
        } else {
          this.$message({
            message: '密码修改失败：' + data.message,
            type: 'error'
          });
        }
      }, err => {
        this.$alert(err.message);
      });
    },
  }

}
</script>

<style>
.el-header {
  //background-color: #3c8dbc;
  background-color: #4C87BC;
  color: #fff;
  line-height: 60px;
}

.el-menu {
}

.el-menu--collapse {
  width: 64px;
}

.el-footer {
    //background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}
</style>
