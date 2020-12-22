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
   <el-container>
        <!-- <el-aside width="40px"></el-aside> -->
        <el-container>
            <el-main>
            <el-scrollbar >
                <el-row >
     <div class="search">
      
       <span>
        <el-select v-model="value" placeholder="请选择学科类型" class="type">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </span>
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
       <el-button icon="el-icon-search" ></el-button>
      </span>
     </div>
      </el-row>
      <el-row class="searchtype">
       <el-button type="primary" plain @click="searchpaper()">论文</el-button>
       <el-button type="primary" plain >专家</el-button>
    </el-row>
      <el-row style="background: gree;height: 40px;" align="middle" type="flex" >
              <el-col span="2" v-for="item in sortList" :key="item.id" class="el-ranks-span" @click.native="titleNameClick(item.titleId)" >
                  <el-link :class="{ selectTitle: item.titleId === isActive}" :underline="false" >{{item.name}}</el-link>
              </el-col>
              </el-row>
              <el-row style="height: calc(80vh)">
                    <!--第一列明细信息-->
                    <el-col span="13">
                        <el-row ><span class="Title"></span></el-row>
                        <el-row class="rowLine" v-for="item in personContent">
                         <el-col span="4">
                            <a :href="item.detailUrl" target="_black">
                            <img :src="item.photoUrl" alt=""></a></el-col>
                            <el-col span="20">
                                <!--名称-->
                                <el-row ><strong>{{item.name}}</strong></el-row>
                                <!--数量-->
                                <el-row class="contentTdFont">
                                    <span class="contentTd"><em>h</em>-index:</span>
                                    <span>{{item.hIndex}}</span>
                                    <span class="contentSplit">|</span>
                                    <span class="contentTd">论文数:</span>
                                    <span>{{item.paperNum}}</span>
                                    <span class="contentSplit">|</span>
                                    <span class="contentTd">引用数:</span>
                                    <span>{{item.quoteNum}}</span>
                                </el-row>
                                <!--学位-->
                                <el-row class="contentTdFont">
                                    <span class="el-icon-s-finance">{{item.site}}</span>
                                </el-row>
                                <!--简介-->
                                <el-row class="contentTdFont">
                                    <span class="el-icon-location">
                                        {{item.exp}}
                                    </span>
                                </el-row>
                                <!--学科-->
                                <el-row class="contentTdFont">
                                    <span v-for="t in item.subject" :key="t"><span class="contentTdXk">{{t}}</span></span>
                                </el-row>
                            </el-col>
                        </el-row>

                    </el-col>
                    <!--第二列关注-->
                    <el-col span="2">
                          <el-row class="rowLine" v-for="item in personContent"> <el-button round>关注</el-button></el-row>
                    </el-col>
                 
                </el-row>
            </el-scrollbar>
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


<script>
export default {
  name: "people",

  data() {
    return {
      input: "",
      options: [
        {
          value: "选项1",
          label: "计算机科学"
        },
        {
          value: "选项2",
          label: "数学"
        },
        {
          value: "选项3",
          label: "物理"
        },
        {
          value: "选项4",
          label: "生物"
        },
        {
          value: "选项5",
          label: "化学"
        }
      ],
      value: "",
      radio: "1",
      sortoption: "引用数",
      isActive: 1,
                /*第一排标题栏目中的信息*/
                sortList:[
                    {'id':1,'name':'综合'},
                    {'id':2,'name':'h指数'},
                    {'id':3,'name':'学术活跃度'},
                    {'id':4,'name':'领域'},
                    {'id':5,'name':'引用数'},
                    {'id':6,'name':'论文数'}
                  
                ],
                /*全部信息*/
                personContent: [
                   {
                        name: "G. Boudoul",
                        photoUrl: "https://avatarcdn.aminer.cn/default/default.jpg!90",
                        detailUrl: "https://www.aminer.cn/profile/53f4474cdabfaee43ec81506",
                        hIndex: 249,
                        paperNum: 100,
                        quoteNum: 102,
                        site: "Bachelor",
                        exp: "Université de Lyon, Université Claude Bernard Lyon 1, CNRS-IN2P3, Institut de Physique Nucléaire de Lyon, Villeurbanne, France",
                        subject: ["Search For", "Cross Sections", "Light On"],
                        hIndexOrder: 1,
                        order: 1
                    },
                    {
                        name: "Carlo Maria Croce", photoUrl: "https://avatarcdn.aminer.cn/default/default.jpg!90",
                        detailUrl: "https://www.aminer.cn/profile/53f4474cdabfaee43ec81506", hIndex: 249,
                        paperNum: 150, quoteNum: 132, site: "Bachelor", exp: "School of Medicine, The Ohio State University",
                        subject: ["Cross Sections", "Light On"], hIndexOrder: 2, order: 3
                    },
                    {
                        name: "B. A. Barnett", photoUrl: "https://avatarcdn.aminer.cn/default/default.jpg!90",
                        detailUrl: "https://www.aminer.cn/profile/53f4474cdabfaee43ec81506", hIndex: 249,
                        paperNum: 50, quoteNum: 72, site: "Bachelor", exp: "Johns Hopkins University, Baltimore, USA",
                        subject: ["Cross Sections", "Light On", "Top And Bottom"], hIndexOrder: 3, order: 4
                    },
                    {
                        name: "B. A. Barnett", photoUrl: "https://avatarcdn.aminer.cn/default/default.jpg!90",
                        detailUrl: "https://www.aminer.cn/profile/53f4474cdabfaee43ec81506", hIndex: 249,
                        paperNum: 50, quoteNum: 72, site: "Bachelor", exp: "Johns Hopkins University, Baltimore, USA",
                        subject: ["Cross Sections", "Light On", "Top And Bottom"], hIndexOrder: 3, order: 4
                    },
                    {
                        name: "B. A. Barnett", photoUrl: "https://avatarcdn.aminer.cn/default/default.jpg!90",
                        detailUrl: "https://www.aminer.cn/profile/53f4474cdabfaee43ec81506", hIndex: 249,
                        paperNum: 50, quoteNum: 72, site: "Bachelor", exp: "Johns Hopkins University, Baltimore, USA",
                        subject: ["Cross Sections", "Light On", "Top And Bottom"], hIndexOrder: 3, order: 4
                    },
                    {
                        name: "B. A. Barnett", photoUrl: "https://avatarcdn.aminer.cn/default/default.jpg!90",
                        detailUrl: "https://www.aminer.cn/profile/53f4474cdabfaee43ec81506", hIndex: 249,
                        paperNum: 50, quoteNum: 72, site: "Bachelor", exp: "Johns Hopkins University, Baltimore, USA",
                        subject: ["Cross Sections", "Light On", "Top And Bottom"], hIndexOrder: 3, order: 4
                    },
                    {
                        name: "B. A. Barnett", photoUrl: "https://avatarcdn.aminer.cn/default/default.jpg!90",
                        detailUrl: "https://www.aminer.cn/profile/53f4474cdabfaee43ec81506", hIndex: 249,
                        paperNum: 50, quoteNum: 72, site: "Bachelor", exp: "Johns Hopkins University, Baltimore, USA",
                        subject: ["Cross Sections", "Light On", "Top And Bottom"], hIndexOrder: 3, order: 4
                    },
                    {
                        name: "B. A. Barnett", photoUrl: "https://avatarcdn.aminer.cn/default/default.jpg!90",
                        detailUrl: "https://www.aminer.cn/profile/53f4474cdabfaee43ec81506", hIndex: 249,
                        paperNum: 50, quoteNum: 72, site: "Bachelor", exp: "Johns Hopkins University, Baltimore, USA",
                        subject: ["Cross Sections", "Light On", "Top And Bottom"], hIndexOrder: 3, order: 4
                    },
                    {
                        name: "B. A. Barnett", photoUrl: "https://avatarcdn.aminer.cn/default/default.jpg!90",
                        detailUrl: "https://www.aminer.cn/profile/53f4474cdabfaee43ec81506", hIndex: 249,
                        paperNum: 50, quoteNum: 72, site: "Bachelor", exp: "Johns Hopkins University, Baltimore, USA",
                        subject: ["Cross Sections", "Light On", "Top And Bottom"], hIndexOrder: 3, order: 4
                    }
                ]
            
    };
  },
  mounted() {},
  methods: {
    searchpaper() {
      this.$router.push("/paper");
    },
     titleNameClick: function (val) {
                //点击任意一个title 变蓝色
                this.isActive=val;
            }
  }
};
</script>
<style scoped>
@import '../../assets/css/index.css';
.search span {
  float: left;
}
.search {

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
        border-bottom: 1px dashed #eee;
        padding: 5px 0;
        height: 157px;
    }
    .indexNum{
        font-size: 24px;
        line-height: 33px;
        font-family: "Open Sans",Arial,Helvetica,Sans-Serif;
        font-weight: 300;
    }
</style> 

