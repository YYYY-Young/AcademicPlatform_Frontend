<template>

  <div >
     <!-- 首页模块开始 -->
      <div class="header">
        <!-- <div class="logo"></div> -->
        <div class="nav">
            <ul>
                <li><a href="#"><router-link to='/'>首页</router-link></a></li>
                <li><a href="#"><router-link to='/'>学科</router-link></a></li>
                <li><a href="#"><router-link to='/experts'>排行榜</router-link></a></li>
                <li><a href="#"><router-link to='/catagories'>专家网络</router-link></a></li>
                <li><a href="#"><router-link to='/conf'>推荐论文</router-link></a></li>
            </ul>
        </div>
        <div class="user">
            <div class="login"><a href=" javascript:showDialog();"><router-link to='/login'>登录</router-link></a></div>
            <a href="#" class="user_logo">
                <img src="images/user.png" alt="">
            </a>
        </div>
    </div>

    <div class="w1">
        <div class="w2">注册账号</div>

        <div class="col">
            <span> </span>
            <input type="text" name="" id="" v-model="loginForm.name" class="input" placeholder=" 请设置用户名">
        </div>
        <div class="col">
            <span> </span>
            <input type="text" class="input" id="telephone" v-model="loginForm.email" placeholder="请输入邮箱">
        </div>
        <div class="col">
            <span> </span>
            <input type="text" name="" id="password" v-model="loginForm.password" class="input" placeholder="请设置登录密码">
        </div>
        <div class="col3 col">
            <span> </span>
            <input type="text" name="" id="password_id" class="input" placeholder="请输入验证码">
            <input type="button" value="获取邮箱验证码" class="button" id="getId">
        </div>
        <div class="col4">
            <input type="checkbox" name="" id="" class="right">
            <span style="display:inline;">阅读并接受<a href="#" id="one">《用户条例》</a>和<a href="#" id="two">《隐私保护声明》</a></span>
        </div>
        <div>
            <button id="submit" class="submit">注册</button>
        </div>
    </div>


    <!-- 注册模块结束 -->


    <div class="footer">
        <a href="#" class="f1">联系我们</a>
        <a href="#" class="f2">帮助</a>
        <a href="#" class="f3">条款</a>
        <a href="#" class="f4">隐私权</a>
    </div>

    <!-- 首页模块结束 -->

  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/css/index.css';
@import '../assets/css/register.css';

</style>
