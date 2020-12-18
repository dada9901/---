<template>
  <div>
    <h1>minerConfig</h1>
    <el-input style="width: 80%" placeholder="请输入网址" v-model="input_url" class="input-with-select">
      <el-select v-model="request_method" slot="prepend" placeholder="请选择">
        <el-option label="get" value="1"></el-option>
        <el-option label="post" value="2"></el-option>
      </el-select>
    </el-input>
    <div>
      <p>启用反爬虫</p>
      <el-select style="width: 10%" v-model="antiminer" placeholder="请选择">
        <el-option value="true" label="是"></el-option>
        <el-option value="false" label="否"></el-option>
      </el-select>
      <el-select style="margin-left: 20px" v-if="antiminer=='true'" v-model="antiminer_method" multiple>
        <el-option value="header" label="填充header"></el-option>
      </el-select>
      <el-button v-if="antiminer_method.indexOf('header')>=0" style="margin-left: 20px" @click="append_header" round icon="el-icon-plus"></el-button>
      <div v-if="antiminer_method.indexOf('header')>=0">
        <!--eslint-disable-next-line-->
        <div v-for="(i,v) in header">
          <el-input style="width: 20%;margin-right: 20px;margin-top: 20px" v-model=header[v].hkey placeholder="请输入key"></el-input>
          <el-input style="width: 20%;margin-right: 20px" v-model=header[v].hvalue placeholder="请输入value"></el-input>
          <el-button @click="delete_header" round icon="el-icon-delete"></el-button>
        </div>
      </div>
    </div>
    <div>
      <p>采集方式</p>
      <el-select v-model="miner_method" placeholder="请选择">
        <el-option value="content" label="文本内容(可能不精确)"></el-option>
        <el-option value="style" label="网页格式"></el-option>
      </el-select>
      <div v-if="miner_method.indexOf('content')>=0">
        <!--eslint-disable-next-line-->
        <div v-for="(i,v) in content">
          <el-input style="width: 20%;margin-right: 20px;margin-top: 20px" v-model=content[v].ckey placeholder="请输入采集标识"></el-input>
          <el-input style="width: 20%;margin-right: 20px;" v-model=content[v].clabel placeholder="请输入采集关键字"></el-input>
          <el-button @click="delete_content" round icon="el-icon-delete"></el-button>
        </div>
        <el-button @click="append_content" round icon="el-icon-plus"></el-button>
      </div>
      <div v-if="miner_method.indexOf('style')>=0">
        <!--eslint-disable-next-line-->
        <div v-for="(i,v) in get_by_id">
          <el-input v-model=get_by_id[v].id style="width: 20%;margin-right: 20px;margin-top: 20px" placeholder="请输入id"></el-input>
          <el-button @click="delete_id" round icon="el-icon-delete"></el-button>
        </div>
        <el-button @click="append_id" round icon="el-icon-plus"></el-button>
      </div>
    </div>
    <div>
      <p>采集时间</p>
      <el-select v-model="timing" placeholder="请选择">
        <el-option value="instant" label="即刻采集"></el-option>
        <el-option value="alarm" label="定时采集"></el-option>
      </el-select>
      <div v-if="timing.indexOf('alarm')>=0">
        输入开始时间和interval
      </div>
    </div>
    <el-button @click="submit_task" style="margin-top: 20px">配置完成</el-button>
  </div>
</template>
<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
<script>
export default {
name: "MinerConfig",
  data(){
    return {
      t:0,
      input_url: '',
      request_method: '',
      antiminer: '',
      antiminer_method:[],
      miner_method:'',
      timing:'',
      header:[{hkey:"",hvalue:""}],
      content:[{ckey:"",clabel:""}],
      get_by_id:[{id:""}]
    }
  },
  methods:{
    show(){
      console.log(this.header)
    },
    submit_task(){
      if(this.t<3)
        this.$message.success("配置完成")
      else
        this.$message.warning("发生未知错误")
      let postdata={'time':this.t}
      console.log(postdata)
      this.$axios.post('/minerconfig',postdata).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
      this.t=this.t+1
    },
    append_header(){
      this.header.push({key:"",value:""})
    },
    delete_header(){

    },
    append_content(){
      this.content.push({key:"",label:""})
    },
    delete_content(){

    },
    append_id(){
      this.get_by_id.push({id:""})
    },
    delete_id(){

    }
  }
}
</script>

<style scoped>

</style>