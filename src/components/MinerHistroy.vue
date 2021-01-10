<template>
  <div>
    <el-table style="left: 10%;width: 90%;border-style: solid;border: 1px" height="500" :data="res_list">

      <el-table-column
          prop="url"
          label="网址"
      >
      </el-table-column>
        <el-table-column
            prop="start_time"
            label="爬取时间"
            width="200"
        >
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="deleteRow(scope.$index, res_list)">移除筛选</el-button>
          <el-button type="text" size="small" @click="removeRow(scope.$index, res_list,scope.row)">删除条目</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px;">
      <div>
        <span style="float: left">请输入筛选的url：</span>
        <el-input style="width: 300px;float: left;left:10px" v-model="target_url">请输入筛选的url</el-input>
      </div>
      <el-date-picker
          style="left: -50px"
          v-model="datetime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
      </el-date-picker>
      <el-button type="primary" @click="searchres">筛选</el-button>
      <el-button v-if="res_list.length>0" type="primary" @click="exportexcel">导出csv文件</el-button>
      <el-button disabled v-if="res_list.length==0" type="primary" @click="exportexcel">导出csv文件</el-button>
    </div>
    <el-dialog
        title="数据详情"
        :visible.sync="dialogVisible"
        width="500px"
        >
      <span style="font-size: larger">目标url:</span><span style="font-weight: bolder">{{diatarget_url}}</span>
      <el-table :data="diatarget_data">
        <el-table-column
            prop="key"
            label="key"
        >
        </el-table-column>
        <el-table-column
            prop="value"
            label="value"
        >
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
name: "MinerHistroy",
  props:{
    res_list:{
      required:true
    }
  },
  data(){
    return {
      dialogVisible: false,
      datetime:"",
      showlist:[],
      diatarget_url:"",
      target_url:"",
      diatarget_data:[],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  methods:{
    handleClick(row){
      console.log(11111111)
      console.log(row)
      //console.log(this.trans(row.data))
      //this.diatarget_data=this.trans(row.data)
      this.diatarget_data.splice(0,this.diatarget_data.length)
      for(let key in row.data)
      {
        for(let i in row.data[key])
        {
          this.diatarget_data.push({key:i,value:transfer(row.data[key][i])})
        }
      }
      console.log(this.diatarget_data)
      this.diatarget_url=row.url
      this.dialogVisible=true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(()=> {
            done();
          })
          .catch(()=> {});
    },
    trans(str){
      return str.replace(/,/g,'，')
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    removeRow(index, rows,row){
      let param={user_id:this.getCookie("account_id"),url:row.url,start_time:row.start_time}
      console.log(param)
      this.$axios.post('/remove',param).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
      rows.splice(index, 1);
    },
    exportexcel(){

        //要导出的json数据
        let jsonData= this.res_list
        //列标题，逗号隔开，每一个逗号就是隔开一个单元格
      console.log("Json shuju")
      console.log(this.res_list)
        let str = `url,爬取时间,数据\n`;
        //增加\t为了不让表格显示科学计数法或者其他格式
        for(let i = 0 ; i < jsonData.length ; i++ ){
          str+=`${jsonData[i]['url'] + '\t'},`;
          str+=`${jsonData[i]['start_time'] + '\t'},`;
          console.log(JSON.stringify( jsonData[i].data))
          str+=`${this.trans(JSON.stringify( jsonData[i].data)) + '\t'},`;
          str+='\n';
        }
        //encodeURIComponent解决中文乱码
        let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
        //通过创建a标签实现
        let link = document.createElement("a");
        link.href = uri;
        //对下载的文件命名
        link.download =  "json数据表.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    },
    searchres(){
      let param={
        "start_time":this.datetime[0],
        "end_time":this.datetime[1],
        "user_id":this.getCookie("account_id"),
        "url":this.target_url
      }
      console.log(param)
      this.$axios.post('/search2',param).then((response) => {
        console.log(response)
        this.res_list.splice(0,this.res_list.length)
        console.log(response.data)
        this.showlist=response.data.data
        response.data.data.forEach(i=>{
          this.res_list.push(i)
        })
        this.res_list=this.res_list.reverse()
      }).catch((error) => {
        console.log(error)
      })
    },
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
  }


}
function transfer(a){
  if(a instanceof Array){
    let t=""
    a.forEach(i=>{
      t+=i
      t+=';'
    })
    return t
  }
  return a
}
</script>

<style scoped>

</style>