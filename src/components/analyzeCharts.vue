<template>
  <div>
    <div style="float: left;margin-top: 20px;margin-left: 20px">
      <el-radio v-model="linetype" label="line">折线图</el-radio>
      <el-radio v-model="linetype" label="bar">直方图</el-radio>
    </div>
    <div style="border-style: solid;height: 120px;width: 1000px">
      <div style="margin-top: 60px;margin-left: 20px">
        <span style="float: left">请选择x轴key：</span>
        <el-select style="width: 200px;float: left;height: 20px" v-model="xtag">
          <el-option label="爬取时间" value="1"></el-option>
          <el-option label="爬取网址" value="2"></el-option>
          <el-option label="爬取网址+时间" value="3"></el-option>
        </el-select>
      </div>
      <div style="float:left;margin-left: 80px">
        <span style="float: left;left: 20px">请输入y轴key：</span>
        <el-input v-model="ytag" style="width: 200px;float: left;left:10px" >请输入y轴key</el-input>
      </div>
      <el-button type="primary" @click="drawpic">开始做图</el-button>
      <span style="margin-left: 20px">数量总计:</span><span v-if="total>0">{{this.total}}</span>
    </div>
    <div v-if="this.ready==true" id="myChart" :style="{width: '100%', height: '400px'}" ref="chart"></div>
  </div>
</template>

<script>
export default {
name: "analyzeCharts",
  props:{
    res_list:{
      required:true
    }
  },
  data () {
    return {
      showxlist:[],
      showylist:[],
      xtag:'',
      ytag:'',
      linetype:'bar',
      ready:false,
      total:0,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    console.log(this.res_list)
    this.ready=false;
  },
  methods: {
    drawpic(){
      this.showylist=[]
      this.showxlist=[]
      if(this.xtag=='1')
      {
        this.res_list.forEach(i=>{
          let flag=0
          this.showxlist.push(i.start_time)
          if('num' in i.data&&this.ytag in i.data.num)
          {
            this.showylist.push(i.data.num[this.ytag][0])
            flag=1
          }
          if('content' in i.data&&this.ytag in i.data.content)
          {
            this.showylist.push(i.data.content[this.ytag][0])
            flag=1
          }
          if(flag==0)
          {
            this.showylist.push("")
          }
      })
      }
      else if(this.xtag=='2')
      {
        this.res_list.forEach(i=>{
          let flag=0
          this.showxlist.push(i.url)
          if('num' in i.data&&this.ytag in i.data.num)
          {
            this.showylist.push(i.data.num[this.ytag][0])
            flag=1
          }
          if('content' in i.data&&this.ytag in i.data.content)
          {
            this.showylist.push(i.data.content[this.ytag][0])
            flag=1
          }
          if(flag==0)
          {
            this.showylist.push("")
          }
        })
      }
      else
      {
        this.res_list.forEach(i=>{
          let flag=0
          this.showxlist.push(i.url+i.start_time)
          if('num' in i.data&&this.ytag in i.data.num)
          {
            this.showylist.push(i.data.num[this.ytag][0])
            flag=1
          }
          if('content' in i.data&&this.ytag in i.data.content)
          {
            this.showylist.push(i.data.content[this.ytag][0])
            flag=1
          }
          if(flag==0)
          {
            this.showylist.push("")
          }
        })
      }
      console.log(this.showxlist)
      console.log(this.showylist)
      this.total=0
      this.showylist.forEach(i=>{
        this.total+=Number(i)
      })
      console.log(this.total)
      this.ready=true;
      this.$nextTick(function () {
        this.drawLine();
      });
    },
    drawLine () {
      var echarts = require('echarts');
      var myChart = echarts.init(this.$refs.chart);
      myChart.setOption({
        title: {
          text: '数据图表'
        },
        tooltip: {},
        legend: {
          data:['数据']
        },
        xAxis: {data:this.showxlist.reverse()},
        yAxis:{},
        series: [{
          name: '数量',
          type: this.linetype,
          data: this.showylist.reverse()
        }],
        grid:{
          width: "820px",
          height: "300px",
        }
      });
    }
  }
}
</script>

<style scoped>

</style>