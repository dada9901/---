<template>
  <div>
    <el-table style="left: 10%;width: 80%;border-style: solid;border: 1px" height="400" :data="url_list">
      <el-table-column
          prop="method"
          label="爬取方式"
          width="180">
      </el-table-column>
      <el-table-column
          prop="url"
          label="网址"
          >
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="120">
        <template slot-scope="scope">
          <el-button
              @click.native.prevent="deleteRow(scope.$index, url_list)"
              type="text"
              size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
    <el-input style="width: 50%;right:5%;margin-top: 20px" placeholder="请输入网址" v-model="input_url" class="input-with-select">
      <el-select v-model="request_method" slot="prepend" placeholder="请选择">
        <el-option label="get" value="1"></el-option>
        <el-option label="post" value="2"></el-option>
      </el-select>
    </el-input>
    <el-button type="primary" style="" @click="add_url">添加网址</el-button>
    <el-upload
        style="margin-top: 20px"
        class="upload-demo"
        drag
        accept="xlsx"
        action="/"
        :show-file-list="false"
        :on-change="importExcel"
        ref="input"
        type="file"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将excel文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    </div>
    <div style="margin-top: 20px">
      <span style="margin-right: 20px">启用反爬虫</span>
      <el-select style="width: 10%" v-model="antiminer" placeholder="请选择">
        <el-option :value=true label="是"></el-option>
        <el-option :value=false label="否"></el-option>
      </el-select>
      <el-select style="margin-left: 20px" v-if="antiminer==true" v-model="antiminer_method" multiple>
        <el-option value="header" label="填充header"></el-option>
      </el-select>
      <el-button v-if="antiminer==true&&antiminer_method.indexOf('header')>=0" style="margin-left: 20px" @click="append_header" round icon="el-icon-plus"></el-button>
      <div v-if="antiminer==true&&header.length>0" style="border-style: solid">
        <!--eslint-disable-next-line-->
        <div v-for="(i,v) in header">
          <el-input style="width: 20%;margin-right: 20px;margin-top: 10px;margin-bottom: 10px" v-model=header[v].hkey placeholder="请输入key"></el-input>
          <el-input style="width: 20%;margin-right: 20px" v-model=header[v].hvalue placeholder="请输入value"></el-input>
          <el-button @click="delete_header(v)" round icon="el-icon-delete"></el-button>
        </div>
      </div>
    </div>
    <div style="margin-top: 20px">
      <span style="margin-right: 30px">采集方式</span>
      <el-select v-model="miner_method" placeholder="请选择">
        <el-option value="content" label="文本内容"></el-option>
        <el-option value="fuzzy" label="模糊匹配"></el-option>
        <el-option value="style" label="网页格式"></el-option>
      </el-select>
      <el-button v-if="miner_method.indexOf('content')>=0" @click="append_content" round icon="el-icon-plus"></el-button>
      <el-button v-if="miner_method.indexOf('style')>=0" @click="append_id" round icon="el-icon-plus"></el-button>
      <el-button v-if="miner_method.indexOf('fuzzy')>=0" @click="append_fuzzy" round icon="el-icon-plus"></el-button>
      <div v-if="fuzzy.length>0" style="border-style: solid;margin-top: 20px;alignment: center">
        <p>网页内容模糊匹配</p>
        <!--eslint-disable-next-line-->
        <div v-for="(i,v) in fuzzy">
          <el-input style="width: 10%;margin-right: 20px;margin-bottom: 10px;margin-top: 10px" v-model=fuzzy[v].fkey placeholder="采集标识"></el-input>
          <el-input style="width: 10%;margin-right: 20px;" v-model=fuzzy[v].ftype placeholder="数据类型"></el-input>
          <el-input style="width: 20%;margin-right: 20px;" v-model=fuzzy[v].flabel placeholder="采集关键字"></el-input>
          <el-button @click="delete_fuzzy" round icon="el-icon-delete"></el-button>
        </div>
      </div>
      <div v-if="content.length>0" style="border-style: solid;margin-top: 20px;alignment: center">
        <p>网页内容采集（支持正则表达式）</p>
        <!--eslint-disable-next-line-->
        <div v-for="(i,v) in content">
          <el-input style="width: 10%;margin-right: 20px;margin-bottom: 10px;margin-top: 10px" v-model=content[v].ckey placeholder="采集标识"></el-input>
          <el-input style="width: 20%;margin-right: 20px;" v-model=content[v].clabel placeholder="采集关键字"></el-input>
          <el-button @click="delete_content" round icon="el-icon-delete"></el-button>
        </div>
      </div>
      <div v-if="get_by_id.length>0" style="border-style: solid;margin-top: 20px;alignment: center">
        <p>网页格式采集</p>
        <!--eslint-disable-next-line-->
        <div v-for="(i,v) in get_by_id">
          <el-input v-model=get_by_id[v].idkey style="width: 10%;margin-right: 20px;margin-top: 10px;margin-bottom: 10px" placeholder="采集标识"></el-input>
          <el-input v-model=get_by_id[v].id style="width: 20%;margin-right: 20px;margin-top: 10px;margin-bottom: 10px" placeholder="请输入标签id"></el-input>
          <el-button @click="delete_id" round icon="el-icon-delete"></el-button>
        </div>
      </div>
    </div>
    <div style="margin-top: 20px">
      <template style="margin-top: 20px">
        <span style="margin-right: 30px">是否采集网页表格</span>
        <el-radio v-model="table" label="1">是</el-radio>
        <el-radio v-model="table" label="2">否</el-radio>
      </template>
      <p>采集时间</p>
      <el-select v-model="timing" placeholder="请选择">
        <el-option value="instant" label="即刻采集"></el-option>
        <el-option value="noinstant" label="定时采集"></el-option>
      </el-select>
          <el-date-picker style="margin-left: 20px" v-if="timing.indexOf('noinstant')>=0"
              v-model="start_time"
              type="datetime"
              placeholder="选择日期时间">
          </el-date-picker>
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
import XLSX from "xlsx";

export default {
name: "MinerConfig",
  data(){
    return {
      t:0,
      input_url: '',
      request_method: '',
      antiminer: false,
      antiminer_method:[],
      miner_method:'',
      timing:'',
      header:[],
      content:[],
      fuzzy:[],
      get_by_id:[],
      url_list:[],
      uploadtime:0,
      table:"2",
      start_time:""
    }
  },
  watch:{
    antiminer(val){
      console.log(val)
      if(val==false)
      {
        this.header=[]
      }
    }
  },
  methods:{
    async beforeUpload(file) {
      let result = await readXLSX(file);  //读取到的内容
      console.log(result)  //此处为xlsx文件内容
    },
    handlePreview(file) {
      console.log(file);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    show(){
      console.log(this.header)
    },
    add_url(){
      var method='get';
      if(this.request_method==1)
      {
        method='get'
      }
      else {
        method='post'
      }

      let temp={"method":method,"url":this.input_url}
      this.url_list.push(temp)
    }
    ,
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
    submit_task(){
      let user_id=this.getCookie("account_id")
      let miner_param={}
      if(this.table==1)
      {
        miner_param.table={}
      }
      miner_param.content={}
      miner_param.id={}
      miner_param.num={}
      miner_param.fuzzy={}
      if(this.content.length>0)
      for(let i in this.content){
        miner_param.content[this.content[i].ckey]=this.content[i].clabel
      }
      if(this.fuzzy.length>0)
      for(let i in this.fuzzy){
        if(this.fuzzy[i].ftype!="num")
        miner_param.fuzzy[this.fuzzy[i].fkey]=this.fuzzy[i].flabel
        else
        {
          miner_param.num[this.fuzzy[i].fkey]=this.fuzzy[i].flabel
        }
      }

      for(let i in this.get_by_id){
        miner_param.id[this.get_by_id[i].idkey]=this.get_by_id[i].id
      }
      let headers={}
      for(let i in this.header){
        headers[this.header[i].hkey]=this.header[i].hvalue
      }
      let postdata={
        "user_id":user_id,
        "urls":this.url_list,
        "antiminer":this.antiminer,
        "header":headers,
        "miner_param":miner_param,
        "timing":this.timing,
        "start_time":this.start_time
      }
      console.log("postdata")
      console.log(postdata)
      this.$axios.post('/minerconfig',postdata).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },
    append_header(){
      this.header.push({hkey:"",hvalue:""})
    },
    delete_header(v){
      this.header.splice(v,1)
    },
    append_content(){
      this.content.push({ckey:"",ctype:"",clabel:""})
    },
    delete_content(v){
      this.content.splice(v,1)
    },
    append_fuzzy(){
      this.fuzzy.push({fkey:"",ftype:"",flabel:""})
    },
    delete_fuzzy(v){
      this.fuzzy.splice(v,1)
    },
    append_id(){
      this.get_by_id.push({idtype:"",idkey:"",id:""})
    },
    delete_id(v){
      this.get_by_id.splice(v,1)
    },
    //导入
    importExcel(file) {
      if(this.uploadtime==1)
      {
        this.uploadtime=0
        return
      }
      this.uploadtime++;
      const types = file.name.split(".")[1];
      const fileType = ["xlsx", "xlc", "xlm", "xls", "xlt"].some(
          item => item === types
      );
      if (!fileType) {
        alert("格式错误！请重新选择");
        return;
      }
      this.file2Xce(file).then(tabJson => {
        if (tabJson && tabJson.length > 0) {
          var data = {};
          var this_ = this;
          this_.card = JSON.stringify(tabJson[0].sheet);
          data.card = this_.card;            //中英文转化
          console.log(tabJson[0].sheet)
          for(let i in tabJson[0].sheet){
            this.url_list.push(tabJson[0].sheet[i])
          }
        }
      });
    },
    file2Xce(file) {
      return new Promise(function(resolve, ) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const data = e.target.result;
          this.wb = XLSX.read(data, {
            type: "binary"
          });
          const result = [];
          this.wb.SheetNames.forEach(sheetName => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            });
          });
          resolve(result);
        };
        reader.readAsBinaryString(file.raw);
      });
    },
  }
}
function readXLSX(file) {
  let nameSplit = file.name.split(".");
  let format = nameSplit[nameSplit.length - 1];
  if (!["xlsx", "csv"].includes(format)) {
    return false;
  }
  return new Promise((resolve, ) => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = evt => {
      let data = evt.target.result; // 读到的数据
      let workbook = XLSX.read(data, { type: "binary" });
      resolve(workbook);
    };
  });
}

</script>

<style scoped>

</style>