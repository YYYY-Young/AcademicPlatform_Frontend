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
                <!-- <img src="../assets/images/user.png" alt=""> -->
            </a>
        </div>
    </div>
    <div class="top_image w">
        <img src="../assets/images/top_image.gif" alt="">
    </div>
    <div class="search w">
        <input type="text" value="">
        <router-link to="/paper"><button></button></router-link>
        
    </div>
    <div class="banner w">
        <form>
            <input type="radio" name="la" value="all" checked >不限语言
            <input type="radio" name="la" value="cn">中文
            <input type="radio" name="la" value="en">英文
        </form>
    </div>
    <div class="words w">
        <div class="words1">关键词</div>
        <table>
            <tr>
                <td><a href="#">CDC</a></td>
                <td><a href="#">NEJM</a></td>
                <td><a href="#">JAMA</a></td>
                <td><a href="#">Lancet</a></td>
                <td><a href="#">Cell</a></td>
                <td><a href="#">BMJ</a></td>
            </tr>
            <tr>
                <td><a href="#">Nature</a></td>
                <td><a href="#">Science</a></td>
                <td><a href="#">Elsevier</a></td>
                <td><a href="#">Oxford</a></td>
                <td><a href="#">Wiley</a></td>
                <td><a href="#">medRxiv</a></td>
            </tr>
        </table>
    </div>
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
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
   methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/css/index.css';
@import '../assets/css/login.css';
</style>
