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
             <div class="login"><a @click="jumpuser()"><router-link to=''>个人中心</router-link></a></div>
        </div>
    </div>

       <el-container>
        <el-aside width="40px"></el-aside>
        <el-container>
            <el-main>
            <el-scrollbar>
                <el-row >
     <div class="search">
      <span>
        <el-input
          placeholder="请输入关键词"
          v-model="input"
          clearable
          size="max"
          suffix-icon="el-icon-s-operation"
        >
        </el-input>
      </span>
      <span>
       <el-button  @click="search(4,0)" ></el-button>
      </span>
     </div>
      </el-row>
      <el-row class="searchtype">
       <el-button type="primary" plain @click="searchpaper()">论文</el-button>
       <el-button type="primary" plain >专家</el-button>
    </el-row>
       <el-row style="background: #f7f7f7;height: 40px;" align="middle" type="flex">
                    <el-col span="2" v-for="item in sortList" :key="item.id" class="el-ranks-span" @click.native="titleNameClick(item.id)">
                        <el-link :class="{ selectTitle: item.id === isActive}" :underline="false" >{{item.name}}</el-link>
                    </el-col>
                </el-row>
              <el-row style="height: calc(80vh)">
                    <!--第一列明细信息-->
                  
                        <el-row class="rowLine" v-for="item in personContent">
          
                            <el-col span="20">
                                <!--名称-->
                                <el-row ><strong>  {{item.name}}</strong>
                                 <el-button  @click="jumpau(item)" type="primary" style="height:30px">查看</el-button>
                                </el-row>
                                <!--数量-->
                                <el-row class="contentTdFont">
                                    <span class="contentTd"><em>h</em>-index:</span>
                                    <span>{{item.h_index}}</span>
                                    <span class="contentSplit">|</span>
                                    <span class="contentTd">论文数:</span>
                                    <span>{{item.n_pubs}}</span>
                                    <span class="contentSplit">|</span>
                                    <span class="contentTd">引用数:</span>
                                    <span>{{item.n_citation}}</span>
                                </el-row>
                                <!--学位-->
                                <el-row class="contentTdFont" v-for="(org,index) in JSON.parse(item.orgs)">
                                    <span class="el-icon-s-finance">{{org}}</span>
                                </el-row>
                                <!--简介-->
                                <el-row class="contentTdFont" v-for="(tag,index) in JSON.parse(item.tags)" v-if="index < 5" :key='index'>
                                    <span >
                                        {{tag.t}}
                                    </span>
                                </el-row>
                                <!--学科-->
                                <el-row class="contentTdFont">
                                    <span v-for="t in item.subject" :key="t"><span class="contentTdXk">{{t}}</span></span>
                                </el-row>
                                 <el-row> <el-button round @click="focus(item.id)">关注</el-button></el-row>
                            </el-col>
                        </el-row> 

                    </el-col>
                    <!--第二列关注-->
               
                 
                </el-row>
            </el-scrollbar>
               <div class="block">
    <span class="demonstration"></span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="20"
      layout="prev, pager, next, jumper"
      :total=this.total>
    </el-pagination>
  </div>
            </el-main>
        </el-container>
        
    </el-container>
</div>
  
</template>


<script>
export default {
  name: "Editor",

  data() {
    return {
      input: this.$route.query.sea,
      value: "",
      radio: "1",
      sortoption: "引用数",
      isActive: 1,
                /*第一排标题栏目中的信息*/
                sortList:[
                    {'id':4,'name':'综合'},
                    {'id':2,'name':'h指数'},
                    {'id':1,'name':'总引用数'},
                    {'id':0,'name':'论文数'}
                  
                ],
                /*全部信息*/
                personContent: []
            
    };
  },
  mounted() {},

  methods: {
    jumpau(item){
        this.$router.push({
            path:"/researcher",
             query:{
                 au:item,
                 id:item.id
             }
        })
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
    searchpaper() {
      this.$router.push("/searchpaper");
    },
       focus(id){
        var _this = this
       
        this.$axios.post('/main-part/api/user/attention/add', {
            userid: _this.$store.state.user.id,
            authorid: id

          })
          .then(resp => {
            if (resp.data.code === 200) {
              var data = resp.data.result
              //console.log(_this.$store.state.user.id)
              this.$alert("关注成功")
      
            } else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
          .catch(failResponse => {})
      
    },
     titleNameClick: function (val) {
               
                this.isActive=val;
                this.search(val,1)
            },
             handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.search(this.isActive,val)
      
    },

    search(sort,page){
      
        //使用的阅读列表进行的测试
       var _this = this
       //console.log(this.$store.)
        this.$axios.get('/search-part/api/author/search/name/'+this.input+'/'+page+'/20/'+sort).then(resp => {
          if (resp && resp.data.code === 200) {
                _this.personContent=resp.data.result.content
               
          }
        })
        }
  }
};
</script>
<style >
@import '../assets/css/index.css';
.search span {
  float: left;
}

.searchtype  {
 position: relative;
 left: 2%;
}
   .el-row{
        margin-top: 10px;
    }
    .el-ranks-span{
        margin-left: 20px;
    }
    .selectTitle{
        color: #3c80bc;
    }
    .Title{
        font-size: 30px;
        line-height: 29px;
        border-bottom: 2px solid #428bca;
    }
    .contentSplit{
        margin: 0 5px;
    }
    .contentTd{
        color: #a94442;
        font-weight: 700;
    }
    .selectTitle{
        color: #3c80bc;
    }
    .contentTdFont{
        font-size: 14px;
        margin-top: 6px;
    }
    .contentTdXk{
        border: 1px solid #f4f5f1;
        border-radius: 4px;
        margin: 0 5px 4px 0;
        padding: 1px 5px;
        font-weight: 200;
        font-size: 12px;
        line-height: 18px;
    }
    .rowLine{
        
        padding: 5px 0;
      
    }
    .indexNum{
        font-size: 24px;
        line-height: 33px;
        font-family: "Open Sans",Arial,Helvetica,Sans-Serif;
        font-weight: 300;
    }
</style> 

