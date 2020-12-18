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
              <el-menu-item index="2-2">分析历史</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>账户管理</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">修改个人信息</el-menu-item>
              <el-menu-item index="3-2">个人操作历史</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>用户</span>
        </el-header>

        <el-main>
          <miner-config v-if="mode=='1-1'"></miner-config>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MinerConfig from "@/components/MinerConfig";
export default {
  name: 'Index',
  components: {MinerConfig},
  props: {
    msg: String
  },
  data(){
    return{
      selectIndex:'1',
      mode:'0'
    }
  },
  methods:{
    logout(){
      console.log("logout")
      document.cookie="account_id=";
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
