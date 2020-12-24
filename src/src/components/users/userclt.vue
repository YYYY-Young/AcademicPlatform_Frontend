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
           <div class="login"><a @click="logout()"><router-link to='/'>注销</router-link></a></div>
                <img src="images/user.png" alt="">
            </a>
        </div>
    </div>
        <div class="main" style="background-color:#f0f1f4">
            <div class="side">
                <div class="c1">
                    <div class="c11">主页管理</div>
                    <router-link to="/user">
                    <a href="#">
                        <div class="c12">个人账户</div>
                    </a >
                    </router-link>
                    <router-link to="/userac">
                    <a href="#">
                        <div class="c13">学术主页</div>
                    </a >
                    </router-link>
                </div>
                <div class="c2">
                    <div class="c21">学术中心</div>
                    <router-link to="/userfollow">
                    <a href="#">
                        <div class="c22">我的关注</div>
                    </a >
                    </router-link >
                    <router-link to="/userclt">
                    <a href="#">
                        <div class="c23">个人收藏</div>
                    </a >
                    </router-link >
                </div>
            </div>
            <div class="data">
                <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      label="标题"
      prop="title">
    </el-table-column>
    <el-table-column
      label="发表时间"
      prop="year">
    </el-table-column>
    <el-table-column
      label="引用数"
      prop="n_citation">
    </el-table-column>
    <el-table-column
      align="right">
    
      <template slot-scope="scope">
     
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">取消收藏</el-button>
      </template>
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
  name: 'userclt',
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
        tableData: [],
        search: ''
      }
      
    },
     mounted () {
      this.loadpaper()  
        },
    methods: {
       loadpaper(){
        //使用的阅读列表进行的测试
       var _this = this
       //console.log(this.$store.)
        this.$axios.get('/main-part/api/user/favorites/get/'+this.$store.state.user.id).then(resp => {
          if (resp && resp.data.code === 200) {
                _this.tableData=resp.data.result
               
          }
        })
        },
        rowStyle({row,rowIndex}){
          let colorstyle={}
          if(row.doc_recycle==true){
            colorstyle.color='red'
            return colorstyle
          }else{
            return ''
          }
        },
        
        viecollection(id){
            this.$router.push({
                path:'/articledetail',
                query:{
                    id: id
                }
            })

        },
     
      onSubmit() {
        console.log('submit!');
      },
     
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../assets/css/index.css';
@import '../../assets/css/userclt.css';
</style>
