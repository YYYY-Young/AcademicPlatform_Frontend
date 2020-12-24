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
            <a href="#" class="user_logo">
                <img src="images/user.png" alt="">
            </a>
        </div>
    </div>

    <div class="w1">
        <div class="w2">重置密码</div>

        <div class="col">
            <span> </span>
            <input type="text" name="" id="" class="input" placeholder=" 请输入绑定邮箱">
        </div>
        <div class="col">
            <span> </span>
            <input type="text" name="" id="" class="input" placeholder=" 请输入用户名" v-model="name">
        </div>
        <div class="col">
            <span> </span>
            <input type="text" class="input" id="password" placeholder="请输入新密码" v-model="newpass">
        </div>
        <div class="col">
            <span> </span>
            <input type="text" name="" id="password" class="input" placeholder="请再次输入密码">
        </div>
        
        <br>
        <div>
            <button id="submit" class="submit">确定</button>
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
  name: 'psd',
  data () {
    return {
     name:"",
     newpass:""
    }
  },
  methods:{
    register() {
     
       
        var _this = this
        this.$axios.post('/main-part/api/register', {
            name: this.name,
            password: this.newpass
            
          })
          .then(resp => {
            if (resp.data.code === 200) {
              var data = resp.data.result
              //_this.$store.commit('login', data)
              this.$message.success('修改成功，请登录')
              this.$router.push('/login')
            } else {
              this.$alert(resp.data.message, '用户已存在', {
                confirmButtonText: '确定'
              })
            }
          }
          )
          .catch(failResponse => {})
    
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/css/index.css';
@import '../assets/css/register.css';

</style>
