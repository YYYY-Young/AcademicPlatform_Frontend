<template>

  <div>
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

        <!-- 登录模块开始 -->
    
    <div class="ui-dialog" id="dialogMove">
        <div class="ui-dialog-title" id="dialogDrag" onselectstart="return false">

            登录账号

            <a class="ui-dialog-closebutton" href="javascript:hideDialog();"></a>

        </div>
        <div class="ui-dialog-content">
            <div class="ui-dialog-l40 ui-dialog-pt15">
                <input class="ui-dialog-input ui-dialog-input-username" v-model="loginForm.username" type="input" placeholder="手机/邮箱/用户名" />
            </div>
            <div class="ui-dialog-l40 ui-dialog-pt15">
                <input class="ui-dialog-input ui-dialog-input-password" v-model="loginForm.password" type="input" placeholder="密码" />
            </div>
            <div class="ui-dialog-l40">
                <a href="#"><router-link to='/psd'>忘记密码</router-link></a>
            </div>
            <div>
                <a class="ui-dialog-submit" @click="login">登录</a>
            </div>
            <div class="ui-dialog-l40">
                <a href="register.html"><router-link to='/register'>立即注册</router-link></a>
            </div>
        </div>
    </div>
    
    <!-- 登录模块结束 -->


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
  name: 'login',
  data () {
    return {
      loginForm: {
        username: 'ul',
        password: '1234'
      },

    }
  },
 
  methods:{
       login () {
        var _this = this
       
        this.$axios.post('/main-part/api/login', {
            name: this.loginForm.username,
            password: this.loginForm.password

          })
          .then(resp => {
            if (resp.data.code === 200) {
              var data = resp.data.result
              alert("ok")
              _this.$store.commit('login', data)
              //console.log(_this.$store.state.user.id)
              var path = _this.$route.query.redirect
    
              _this.$router.replace({path: path === '/' || path === undefined ? '/' : path})
            } else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
          .catch(failResponse => {})
      }
      }
    }
  

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/css/index.css';
@import '../assets/css/login.css';

</style>
