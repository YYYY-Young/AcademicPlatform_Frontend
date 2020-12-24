<template>

 <div>
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
            <div class="login"><a @click="logout()"><router-link to='/'>注销</router-link></a></div>
            <a href="#" class="user_logo">
                <img src="images/user.png" alt="">
            </a>
        </div>
    </div>
        <div class="main" style="background-color:#f0f1f4">
            <div class="side">
                <div class="s1">
                    <div class="s11">主页管理</div>
                    <router-link to="/user">
                    <a href="#">
                        <div class="s12">个人账户</div>
                    </a >
                    </router-link>
                    <router-link to="/userac">
                    <a href="#">
                        <div class="s13">学术主页</div>
                    </a >
                    </router-link>
                </div>
                <div class="s2">
                    <div class="s21">学术中心</div>
                    <router-link to="/userfollow">
                    <a href="#">
                        <div class="s23">我的关注</div>
                    </a >
                    </router-link to='/userclt'>
                     <router-link to="/userclt">
                    <a href="#">
                        <div class="s23">个人收藏</div>
                    </a >
                    </router-link >
                </div>
            </div>
            
            <div class="data">
                <el-form class="f" ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
   <el-form-item label="邮箱">
    <el-input v-model="form.email"></el-input>
  </el-form-item>
  <el-form-item label="生日">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">保存</el-button>
  </el-form-item>
</el-form>
            </div>
        </div>
      <div class="footer">
        <a href="#" class="f1">联系我们</a>
        <a href="#" class="f2">帮助</a>
        <a href="#" class="f3">条款</a>
        <a href="#" class="f4">隐私权</a>
    </div>




    </div>

</template>

<script>
export default {
  name: "user",
  data() {
    return {
      form: {
        name: "",
        email: "",
        date1: ""
      }
    };
  },
  methods: {
    logout() {
      this.$confirm("是否确认注销登录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "info",
            message: "成功注销"
          });
          this.$store.commit("logout");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    onSubmit() {
      console.log("submit!");
      var _this = this;
      this.$axios
        .post("/main-part/api/user", {
          name: this.form.date1
        })
        .then(resp => {
          if (resp.data.code === 200) {
            var data = resp.data.result;
            //_this.$store.commit('login', data)
            this.$message.success("提交成功");
          }
        })
        .catch(failResponse => {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/index.css";
@import "../../assets/css/user.css";
</style>
