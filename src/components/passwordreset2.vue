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
name: "passwordreset2"
}
</script>

<style scoped>

</style>