<template>
  <div id="register_card" :span=4>
    <p v-if="error_code.length>0" style="color: #ff2115;font-size: 2px;margin: 0">{{error_code}}</p>
    账号：<el-input v-model="account_id" placeholder="请输入账号"></el-input>
    <br>
    昵称：<el-input v-model="user_name" placeholder="请输入昵称"></el-input>
    <br>
    密码：<el-input v-model="password" placeholder="请输入密码" show-password></el-input>
    <br>
    重复密码：<el-input v-model="password2" placeholder="请再输入一遍密码" show-password></el-input>
    <br>
    邮箱：<el-input v-model="email" placeholder="请输入邮箱"></el-input>

    <br>
    <el-button type="primary" @click="register">注册</el-button>
    <br>
    <div id="bottom_button">
      <el-button type="text" @click="returnLogin" style="margin: 0">取消</el-button>
    </div>
  </div>
</template>

<script>


export default {
  name: "Register.vue",
  data(){
    return{
      account_id:'',
      user_name:'',
      password:'',
      password2:'',
      error_code:'',
      email:''
    }
  },
  methods:{
    returnLogin(){this.$router.push('/Login');},
    register: function () {
      console.log(12345)
      var postdata={}
      if(this.password!=this.password2)
        this.error_code="两次输入的密码不一致"
      // eslint-disable-next-line no-unreachable
      console.log(12346)
      postdata={account_id:this.account_id,user_name:this.user_name,email:this.email,password:this.password}
      console.log('ttttttttt')
      this.$axios.post('/register',postdata).then((response) => {
        console.log(response)
        if(response.data=="OK"){
          this.$router.push('/login');
        }
        else{
          this.error_code=response.data
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
  ,
  computed:{

  }
}
</script>

<style scoped>
#bottom_button{

}
#register_card{
  position: absolute;
  top: 25%;
  left: 30%;
  border: 5px solid;
  height: 50%;
  width: 40%;
  margin: auto;
}
.el-input{
  width: 50%;
  margin: 4px;
}
.el-button{
  margin: 10px;
}
</style>