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
            <div class="login"><a href=" javascript:showDialog();"><router-link to='/login'>登录</router-link></a></div>
            <a href="#" class="user_logo">
                <img src="images/user.png" alt="">
            </a>
        </div>
    </div>
<el-container style="height: min-800px;"> 
  <el-header class="title-un">
      <el-divider direction="vertical bold"></el-divider>
      专家分类:{{this.cata.title}}
      </el-header>
      
      <el-header  class="nobackground">
        <div style="text-align:left;">
      <el-input style="width:23%;" placeholder="查找" v-model="search"></el-input>
        </div>
      </el-header>
    <el-main>
      <el-header style="text-align: left;" @>该类专家信息</el-header>
      <div style="border-bottom: 1px solid gray; padding: 15px; text-align: left; min-height: 105px; min-width: 200px;" v-for="pro in filteredfilteredusers" :key="pro.id"> 
        <div>
          <img src= "https://i.redd.it/7tf73lkgw6i51.jpg" style="height: 105px; width: 105px; object-fit: contain; float: left; padding: 5px;">
        </div>
        <div style="">
        <span style=""><strong style="font-size: 120%;">{{ pro.name }}</strong></span>
        <div><span style="font-size: 80%;"><i class="el-icon-suitcase" style="padding-right: 5px;"></i>   {{ pro.company.name }}</span></div>
        <div><span style="font-size: 80%;"><i class="el-icon-school" style="padding-right: 5px;"></i>   {{ pro.company.catchPhrase }}</span></div>
        <div><span style="font-size: 80%;"><i class="el-icon-s-flag" style="padding-right: 5px;"></i>   {{ pro.company.bs }}</span></div>
        </div>
      </div>
    </el-main>
  </el-container>
</el-container>
<div class="footer">
        <a href="#" class="f1">联系我们</a>
        <a href="#" class="f2">帮助</a>
        <a href="#" class="f3">条款</a>
        <a href="#" class="f4">隐私权</a>
    </div>
</div>
</template>

<style scoped>
@import '../../assets/css/index.css';
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
  .nobackground {
    background-color:transparent;
  }
  .title-un {
  background-color: transparent;
  border-bottom: #909399 1px solid;
  text-align: left;
  font-size: 150%;
  padding: 5px;
}
</style>

<script>
import axios from "axios";
import App from '../../App.vue';
  export default {
  components: { App },
    data() {
      return {
        users: [],
        cata:'',
        search:'',
        pics:[]
      }
    },
    methods: {
      filter () {
        this.filtereduser = 12;
      }
    },
    created() {
      axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => this.users = res.data)
      .catch(err => console.log(err));
      this.cata = this.$route.query.cata;
      axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(res => this.pics = res.data)
      .catch(err => console.log(err));
    },
    computed: {
      filteredusers:function() {
      return this.users.filter((user)=> this.cata.userId.includes(user.id));
    },
    filteredfilteredusers:function() {
      return this.filteredusers.filter((filteruser)=> {
        return filteruser.name.toLowerCase().match(this.search.toLowerCase()) || filteruser.company.name.toLowerCase().match(this.search.toLowerCase()) || filteruser.email.toLowerCase().match(this.search.toLowerCase()) || filteruser.company.bs.toLowerCase().match(this.search.toLowerCase());
      });
    }
    }
  };
</script>|