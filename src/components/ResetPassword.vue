<template>
  <div id="register_card" :span=4>
    账号：<el-input v-model="account_id" placeholder="请输入账号"></el-input>
    <br>
    密码：<el-input v-model="password" placeholder="请输入新密码" show-password></el-input>
    <br>
    <el-button type="primary" @click="resetPassword">重置密码</el-button>
    <br>
    <div id="bottom_button">
      <el-button type="text" @click="returnLogin" style="margin: 0">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResetPassword",
  data(){
    return {
      account_id: "",
      password: ""
    }
  },
  methods:{
    returnLogin(){
      this.$router.push('/Login');
    },
    resetPassword(){
      let postdata={}
      postdata={account_id:this.account_id,new_password:this.password}
      this.$axios.post('/resetpassword',postdata).then((response) => {
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
  height: 30%;
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