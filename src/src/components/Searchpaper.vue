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
            <a href="#" class="user_logo">
                <img src="images/user.png" alt="">
            </a>
        </div>
    </div>
    <el-container>
    <el-aside width="40px"></el-aside>
    <el-container>
      <el-main>
        <el-scrollbar>
          <el-row :gutter="2">
           
              
                 <el-col :span="8">
                <el-input
                  placeholder="请输入关键词"
                  v-model="input"
                  clearable 
                  autosize                 
                >
                </el-input>
                 </el-col>
                  <el-col :span="1">
                <el-button  @click="search(0,0)" style="width:50px" icon="el-icon-search" type="primary"></el-button>      
                  </el-col>
                   <el-col :span="4">
                <el-select v-model="way" placeholder="请选择" >
                 <el-option
                   v-for="item in options"
                   :key="item.way"
                   :label="item.label"
                   :value="item.way">
                 </el-option>
               </el-select> 
                   </el-col>           
            
          </el-row>
          <el-row class="searchtype">
            <el-button type="primary" plain >论文</el-button>
            <el-button type="primary" plain @click="searchpeople()">专家</el-button
            >
          </el-row>
          <el-row
            style="background: #f7f7f7;height: 40px;"
            align="middle"
            type="flex"
          >
            <el-col
              span="2"
              v-for="item in rankTitleList"
              :key="item.titleId"
              class="el-ranks-span"
              @click.native="titleNameClick(item.titleId)"
            >
              <el-link
                :class="{ selectTitle: item.titleId === isActive }"
                :underline="false"
                >{{ item.titleName }}</el-link
              >
            </el-col>
          </el-row>
          <el-row style="height: calc(80vh)">
            <!--第一列明细信息-->
            <el-col span="27">
              <el-row class="rowLine" v-for="item in paperContent">
                <el-col span="20">
                  <!--名称-->
                  <el-row
                    ><strong>{{ item.title }}</strong></el-row
                  >
                  <!--数量-->
                  <el-row class="contentTdFont">
                    <span class="contentTd"><em></em>作者:</span>
                  <span v-for="(au,index) in JSON.parse(item.authors)" v-if="index < 5" :key='index'>
                  <span>{{au.name}} </span>
                  </span>
                     
                   

                   <div>
                    <span class="contentTd">引用数:</span>
                    <span>{{ item.n_citation }}</span>
                   </div>
                   <div>
                    <span class="contentTd">发表年份:</span>
                    <span>{{ item.year }}</span>
                   </div>
                   
                  </el-row>
                  <!--学位-->
                  <el-row class="contentdes">
                    <span >{{ item.p_abstract }}</span>
                  </el-row>
                  <!--简介-->
                  <el-row class="contentTdFont" >
                    <div   v-for="(ur,index) in JSON.parse(item.url)" v-if="index < 2" :key='index' >
                    <a  :href="ur" >
                    {{ur}}
                    </a> 
                    </div>
                  </el-row>
                  <!--学科-->
                  <el-row class="contentTdFont">
                   <el-button round @click="fav(item.id)">收藏</el-button>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
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
    <el-aside width="100px"></el-aside>
  </el-container>
</div>
  
</template>


<script>
export default {
  name: "Editor",

  data() {
    return {
      options: [{
          way: '1',
          label: '普通搜索'
        }, {
          way: '2',
          label: '关键词搜索'
        }, {
          way: '3',
          label: '作者搜索'
        }, {
          way: '4',
          label: '文章名'
        }],
      way: '1',
      input: this.$route.query.sea,
      page:" ",
      
      value: "",
      radio: "1",
      sortoption: "引用数",
      isActive: 1,
      time: [0, 3],
      /*第一排标题栏目中的信息*/
      rankTitleList: [
        { titleId: 0, titleName: "综合" },
        { titleId: 1, titleName: "最新" },
        { titleId: 3, titleName: "引用数" }
      ],
      /*全部信息*/
      paperContent:[],
      ur:"",
      currentPage:2,
      isActive: 1,
      sort:0
    };
  },
  mounted() {},
  methods: {
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
    searchpeople() {
      this.$router.push("/searchpeople");
    },
    titleNameClick: function(val) {
      //点击任意一个title 变蓝色
      this.isActive = val;
    },
    fav(id){
        var _this = this
       
        this.$axios.post('/main-part/api/user/favorites/add', {
            userid: _this.$store.state.user.id,
           paperid: id

          })
          .then(resp => {
            if (resp.data.code === 200) {
              var data = resp.data.result
              //console.log(_this.$store.state.user.id)
              this.$alert("收藏成功")
      
            } else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
          .catch(failResponse => {})
      
    },  handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.search(this.isActive,val)
      
    },
     titleNameClick: function (val) {
                //点击任意一个title 变蓝色
                this.isActive=val;
                
                this.search(val,0)
            },
    search(sort,page){
      
        //使用的阅读列表进行的测试
       var _this = this
       //console.log(this.$store.)
       if (_this.way == 1){
        this.$axios.get('/search-part/api/paper/search/keyword/'+this.input+'/'+page+'/20/'+sort).then(resp => {
          if (resp && resp.data.code === 200) {
                _this.paperContent=resp.data.result
               
          }
        })
       }else if (_this.way == 2){
          console.log("2")
          this.$axios.get('/search-part/api/paper/search/kewordonly/'+this.input+'/'+page+'/20/'+sort).then(resp => {
          if (resp && resp.data.code === 200) {
                _this.paperContent=resp.data.result
               
          }
        })
       }else if (_this.way == 3){
          console.log("3")
          this.$axios.get('/search-part/api/paper/search/author/'+this.input+'/'+page+'/20/'+sort).then(resp => {
          if (resp && resp.data.code === 200) {
                _this.paperContent=resp.data.result
               
          }
        })
       }else if (_this.way == 4){
          console.log("4")
          this.$axios.get('/search-part/api/paper/search/title/'+this.input+'/'+page+'/20/'+sort).then(resp => {
          if (resp && resp.data.code === 200) {
                _this.paperContent=resp.data.result
               
          }
        })
       }
        },
        rowStyle({row,rowIndex}){
          let colorstyle={}
          if(row.doc_recycle==true){
            colorstyle.color='red'
            return colorstyle
          }else{
            return ''
          }
        }
    }
  }

</script>
<style >
@import '../assets/css/index.css';
.search span {
  float: left;
}
.selectTitle{
        color: #3c80bc;
    }
.searchtype {
  position: relative;
  left: 2%;
}
.el-row {
  margin-top: 10px;
}
.el-ranks-span {
  margin-left: 20px;
}
.selectTitle {
  color: #3c80bc;
}
.contentTitle {
  font-size: 20px;
  line-height: 27px;
  border-bottom: 2px solid #428bca;
}
.contentdes{
  overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
}
.contentSplit {
  margin: 0 5px;
}
.contentTd {
  color: #a94442;
  font-weight: 700;
}
.contentTdFont {
  font-size: 14px;
  margin-top: 6px;
}
.contentTdXk {
  border: 1px solid #f4f5f1;
  border-radius: 4px;
  margin: 0 5px 4px 0;
  padding: 1px 5px;
  font-weight: 200;
  font-size: 12px;
  line-height: 18px;
}
.demonstration{
  position: abuslute;
  top:90%;
}，
.rowLine {
 
  padding: 5px 0;
 
}
.indexNum {
  font-size: 24px;
  line-height: 33px;
  font-family: "Open Sans", Arial, Helvetica, Sans-Serif;
  font-weight: 300;
}
</style> 
