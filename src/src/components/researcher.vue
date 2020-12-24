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
    <!-- === ======================================================================================================================-->
    <div>
    <el-row>
    <el-col :span="8">
    <el-card class="box-card">
       <h2>{{role.name}}</h2>
       <p style="margin-top:10px">引用数: {{role.n_citation}}</p>
       <p style="margin-top:10px">H因子: {{role.h_index}}</p>
       <p style="margin-top:10px">总文章数:{{role.n_pubs}}</p>
       <!-- <p style="margin-top:10px" v-for="(org,index) in JSON.parse(role.orgs)"><span>组织:{{org}}</span></p> -->
    </el-card>
    </el-col>
    <el-col :span="8">
        <el-card class="box-card">
             <div class="charts">
  <div id="pieGraph" style="height: 150px;"></div>
 </div>
         </el-card>
    </el-col>
    <el-col :span="8">
        <el-card class="box-card">
            <div class="charts">
  
 </div>
         </el-card>
    </el-col>
    </el-row>
    </div>
    <div id="pieGraph" style="height: 150px;"></div>
    <!-- =======================================================================================================================-->
    <div>
         <el-row style="weight: 80%">
                 <el-col span="2">
                     <el-row class="rowLine" v-for="item in paperContent">
                         <el-col span="20">
                             <el-row
                    ><strong>{{ item.title }}</strong></el-row
                  >
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
    </div>
   
    </div>
</template>

<script>
 let echarts = require('echarts/lib/echarts');
 // 引入柱状图
 require('echarts/lib/chart/bar');
 // 引入柱状图
 require('echarts/lib/chart/pie');
 require('echarts/lib/component/tooltip');
 require('echarts/lib/component/title');
export default {
    name: "Editor",
  
    data() {
        return {
              page:" ",
      
      value: "",
      radio: "1",
      sortoption: "引用数",
      isActive: 1,
      time: [0, 3],
      /*第一排标题栏目中的信息*/
      /*全部信息*/
      paperContent:[],
      ur:"",
      currentPage:2,
      isActive: 1,
      sort:0,
    //   ================================================================
            role:{},
            expers:[],
            test1:['11','22','33','44','55'],
            test2:[   
                 {value:335, name:'11'},
                 {value:310, name:'22'},
                 {value:234, name:'33'},
                {value:135, name:'44'},
                {value:1548, name:'55'}],
            gra1:['aa','bb','cc','dd','ee'],
            gra2:[1,2,1,3,4]
        }
        
    },
    
  mounted() {
      this.loadpaper();
       this.getinformation();
       this.getexperts();
       this.getweight();
       this.getarticle();
         this.drawPie();
         this.drawBar();
         
  },
   methods: {
       //获取信息初始化
    loadpaper(){
        var _this = this
         //this.$alert(this.$route.query.id)
        this.$axios.get('/search-part/api/author/listmypaper/'+this.$route.query.id)
          .then(resp => {
            if (resp.data.code === 200) {
               _this.paperContent = resp.data.result
              //console.log(_this.$store.state.user.id)
             
      
            } else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
          .catch(failResponse => {})
      
    }, 
     getinformation(){
this.role=this.$route.query.au
      },
      getexperts(){
        var _this = this
        this.$axios.get('/main-part/api/expernetwork/'+this.$route.query.id)
          .then(resp => {
              
            if (resp.data.code === 200) {
              _this.expers = resp.data.result
              //console.log(_this.$store.state.user.id)
             this.$alert(_this.expers)
      
            } else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
          .catch(failResponse => {})

      },
      getweight(){

      },
      getarticle(){

      },
      drawBar(){
  let barGraph = echarts.init(document.getElementById('barGraph'));
  // 绘制图表
  barGraph.setOption({
  title: {
   text: '研究领域权重图',
   left: 'center'
  },
  tooltip: {
   trigger: 'item',
   formatter: '{a} <br/>{b} : {c}'
  },
  legend: {
   left: 'center',
   data: ['权重'],
   bottom:0
  },
  xAxis: {
   type: 'category',
   name: 'x',
   splitLine: {show: false},
   data: this.gra1
  },
  grid: {
   left: '1%',
   right: '2%',
   bottom: '8%',
   containLabel: true
  },
  yAxis: {
   type: 'category',
   name: 'y',
   splitLine: {show: true},
   data:['1','2','3','4','5']
  },
  series: [
   {
   name: '权重',
   type: 'line',
   data: this.gra2
   },
  ]
  })
      },
       drawPie(){
  let pieGraph = echarts.init(document.getElementById('pieGraph'));
  pieGraph.setOption({
  title : {
   text: '合作专家网络',
   x:'center'
  },
  tooltip : {
   trigger: 'item',
   formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
         type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,

   data: this.test1
  },
  series : [
   {
   name: '专家合作次数',
   type: 'pie',
   radius : '55%',
   center: ['50%', '60%'],
   data:this.test2,
   itemStyle: {
    emphasis: {
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowColor: 'rgba(0, 0, 0, 0.5)'
    }
   }
   }
  ]
  })
 }

   }
}
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
        height: 157px;
    }
    .indexNum{
        font-size: 24px;
        line-height: 33px;
        font-family: "Open Sans",Arial,Helvetica,Sans-Serif;
        font-weight: 300;
    }
    .box-card {
    width: 95%;
    margin-left: 10px;
    margin-top: 20px;
    height: 200px;
  }
.echarts {
  width: 100%;
  height: 100%;
}

 
</style> 
