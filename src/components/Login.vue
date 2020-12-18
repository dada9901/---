<template>
    <div id="login_card" :span=4>
        <h1>云数据采集平台</h1>
      <p v-if="error_code.length>0" style="color: #ff2115;font-size: 2px;margin: 0">{{error_code}}</p>
        账号：<el-input v-model="account_id" placeholder="请输入账号"></el-input>
        <br>
        密码：<el-input v-model="password" placeholder="请输入密码" show-password></el-input>

        <br>
        <el-button type="primary" @click="login">登录</el-button>
        <br>
        <div id="bottom_button">
          <el-button type="text" @click="resetPassword">忘记密码</el-button>
          <el-button type="text" @click="register">注册新账户</el-button>
        </div>
    </div>
</template>

<script>


export default {
  name: "Login.vue",
  data(){
    return{
      account_id:'',
      password:'',
      error_code:''
    }
  },
  methods:{
    register(){
      this.$router.push('/Register');
    },
    login: function () {
      let postdata={account_id:this.account_id,password:this.password}
      this.$axios.post('/login',postdata).then((response) => {
        console.log(response)
        if(response.data=="OK"){
          document.cookie="account_id="+this.account_id;
          this.$router.push('/Index');
        }
        else{
          this.error_code=response.data
        }
      }).catch((error) => {
          console.log(error)
      })
    },
    resetPassword(){
      this.$router.push('/ResetPassword');
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
#login_card{
  position: absolute;
  top: 25%;
  left: 35%;
  border: 5px solid;
  height: 50%;
  width: 30%;
  margin: auto;
}
.el-input{
  width: 50%;
  margin: 4px;
}
.el-button{
  margin: 10px;
}
.h1{
  margin-bottom: 1%;
}
</style>