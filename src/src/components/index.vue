<template>

  <div >
     <!-- 首页模块开始 -->
    <div class="header">
        <!-- <div class="logo"></div> -->
        <div class="nav">
            <ul>
                <li><a href="#"><router-link to='/'>首页</router-link></a></li>
                <li><a href="#"><router-link to='/classification'>学科</router-link></a></li>
                <li><a href="#"><router-link to='/experts'>排行榜</router-link></a></li>
                <li><a href="#"><router-link to='/catagories'>专家网络</router-link></a></li>
                <li><a href="#"><router-link to='/conf'>推荐论文</router-link></a></li>
            </ul>
        </div>
        <div class="user">
            <div class="login"><a href=" javascript:showDialog();"><router-link to='/login'>登录</router-link></a></div>
                <div class="login"><a @click="jumpuser()"><router-link to=''>个人中心</router-link></a></div>
            <a href="#" class="user_logo">
                <img src="images/user.png" alt="">
            </a>
        </div>
    </div>
    <div class="top_image w">
        <img src="../assets/images/top_image.gif" alt="">
    </div>
    <div class="search w">
        <input type="text" v-model="search" value="">
        <router-link :to="{path:this.path,query:{sea: this.search}}"><button></button></router-link>
    </div>
    <div class="banner w">
        <form>
            <input type="radio" name="la" value="1" @click="setpeople()" >专家
            <input type="radio" name="la" value="2" @click="setpaper()">论文
        </form>
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
      search: '',
      path:""
    }
  },
   methods: {
       setpeople(){
           this.path="/searchpeople"

       },
        setpaper(){
           this.path="/searchpaper"

       },
        jumpuser(){
        if(this.$store.state.user.id!=null){
           if(this.$store.state.user.isadmin==1){
               this.$router.push("/manage");
           }else{
            this.$router.push("/user");
           }
        }
        else{
           
            this.$alert('未登录请登陆', '提示', {
                confirmButtonText: '确定'
              })
        }
       
    },
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/css/index.css';
@import '../assets/css/login.css';
</style>
