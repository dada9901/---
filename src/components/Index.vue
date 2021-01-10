<template>
  <div class="hello">
    <el-container style="height: 80%; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1','2','3']" :default-active=this.selectIndex @select="handleSelect">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>数据爬取</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">新建爬取任务</el-menu-item>
              <el-menu-item index="1-2">爬取历史</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>数据分析</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">新建分析任务</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>账户管理</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 15px">
          <span style="font-size: larger">欢迎用户：{{user_name}}</span>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main v-if="mode=='1-1'">
          <miner-config></miner-config>
        </el-main>
        <el-main v-if="mode=='1-2'">
          <miner-histroy :res_list="reslist"></miner-histroy>
        </el-main>
        <el-main v-if="mode=='2-1'">
          <analyze-charts :res_list="reslist"></analyze-charts>
        </el-main>
        <el-main v-if="mode=='3-1'">
          <passwordreset2></passwordreset2>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import analyzeCharts from "@/components/analyzeCharts";
import MinerConfig from "@/components/MinerConfig";
import MinerHistroy from "@/components/MinerHistroy";
import passwordreset2 from "@/components/passwordreset2";
export default {
  name: 'Index',
  components: {MinerConfig,MinerHistroy,analyzeCharts,passwordreset2},
  props: {
    msg: String
  },
  data(){
    return{
      reslist:[],
      selectIndex:'1',
      mode:'0',
      user_name:""
    }
  },
  mounted() {

    this.user_name=this.getCookie('user_name')
  },
  methods:{
    getCookie: function (cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        console.log(c)
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1){
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },
    logout(){
      console.log("logout")
      document.cookie="account_id=";
      document.cookie="user_name=";
      this.$router.push('/Login')
    },
    handleSelect(key, keyPath) {
      this.mode=keyPath[1]
    },
    show1()
    {
      console.log(this.mode)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
