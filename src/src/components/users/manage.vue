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
           
                <img src="images/user.png" alt="">
            </a>
        </div>
    </div>
        <div class="main" style="background-color:#f0f1f4">
            <div class="side">
                <div class="s1">
                    <div class="s11">管理员</div>
                    <router-link to="/manage">
                    <a href="#">
                        <div class="s12">处理申请</div>
                    </a >
                    </router-link>
                   
                </div>
               
            </div>
            <div class="data">
                <el-form class="f" ref="form" :model="form" label-width="80px">
  <el-form-item label="搜索">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  
    
  
</el-form>
<el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="apptime"
        label="申请日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userid"
        label="uid"
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        label="申请内容">
      </el-table-column>
  
       <el-table-column
      align="right">
    
      <template slot-scope="scope">
     
        <el-button
          size="mini"
          type="danger"
          @click="handleaprove(scope.$index, scope.row)">通过</el-button>
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
  name: 'manage',
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
        tableData: []
      }
    },
      mounted () {
      this.loadreq()  
        },
    methods: {
        loadreq(){
        //使用的阅读列表进行的测试
       var _this = this
       //console.log(this.$store.)
        this.$axios.get('/main-part/api/admin/app').then(resp => {
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
      },
    
       handleaprove(index, row) {
        console.log(index, row);
        var _this = this
        this.$axios.post('/main-part/api/authorapp/reply', {
            
            reviewerid: row.reviewerid,
            id: row.id

          })
          .then(resp => {
            if (resp.data.code === 200) {
              var data = resp.data.result
               this.loadreq()  
              alert("已通过")
              //alert("ok")
            
            }
          })
          .catch(failResponse => {})
      }
      }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../assets/css/index.css';
@import '../../assets/css/user.css';
</style>
