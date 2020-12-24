<template>

 <div>
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
        <div class="main" style="background-color:#f0f1f4">
            <div class="side">
                <div class="h1">
                    <div class="h11">管理员</div>
                    <router-link to="/manage">
                    <a href="#">
                        <div class="h12" >处理申请</div>
                    </a >
                    </router-link>
                    <router-link to="/manageuser">
                    <a href="#">
                        <div class="h13">管理门户</div>
                    </a >
                    </router-link>
                </div>
               
            </div>
            
            <div class="data">
                <el-form class="f" ref="form" :model="form" label-width="80px">

</el-form>
<el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
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
  name: 'manageuser',
  data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
      }
    },
    methods: {
       jumpuser(){
        if(this.$store.state.user.id!=null){
           
           this.$router.push("/user");
        }
        else{
           
            this.$alert('未登录请登陆', '提示', {
                confirmButtonText: '确定'
              })
        }
       
    },
      onSubmit() {
        console.log('submit!');
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../assets/css/index.css';
@import '../../assets/css/userac.css';
</style>
