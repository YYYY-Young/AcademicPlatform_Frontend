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
    <el-aside width="40px"></el-aside>
    <el-container>
      <el-main>
        <el-scrollbar>
          <el-row>
            <div class="search">
              <span>
                <el-select
                  v-model="value"
                  placeholder="请选择学科类型"
                  class="type"
                >
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
                <el-button icon="el-icon-search" @click="search()"></el-button>
              </span>
            </div>
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
            <el-col span="13">
              <el-row class="rowLine" v-for="item in paperContent">
                <el-col span="20">
                  <!--名称-->
                  <el-row
                    ><strong>{{ item.title }}</strong></el-row
                  >
                  <!--数量-->
                  <el-row class="contentTdFont">
                    <span class="contentTd"><em></em>作者:</span>
                  
                     <span>{{item.authors.name}}</span>
                   

                    <span class="contentSplit">|</span>
                    <span class="contentTd">引用数:</span>
                    <span>{{ item.n_citation }}</span>
                  </el-row>
                  <!--学位-->
                  <el-row class="contentTdFont">
                    <span class="el-icon-s-finance">{{ item.p_abstract }}</span>
                  </el-row>
                  <!--简介-->
                  <el-row class="contentTdFont">
                    <span class="el-icon-location">
                      {{ item._score }}
                    </span>
                  </el-row>
                  <!--学科-->
                  <el-row class="contentTdFont">
                    <span v-for="t in item.subject" :key="t"
                      ><span class="contentTdXk">{{ t }}</span></span
                    >
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
            <!--第二列指数-->

            <el-col span="2">
              <el-row class="rowLine" v-for="item in paperContent">
                <el-button round>收藏</el-button></el-row
              >
            </el-col>
            <!--右边固定小卡片-->
            <el-col span="7">
              <el-card>
                <div slot="header" style=":before">
                  <span style="font-size: 20px;">发表时间</span>
                </div>
                <div>时间近几年</div>
                <div class="block">
                  <el-slider v-model="time" range show-stops :max="10">
                  </el-slider>
                </div>
              </el-card>
            </el-col>
          </el-row>
        
        </el-scrollbar>
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
      time: [0, 3],
      /*第一排标题栏目中的信息*/
      rankTitleList: [
        { titleId: 1, titleName: "综合" },
        { titleId: 2, titleName: "最新" },
        { titleId: 3, titleName: "引用数" }
      ],
      /*全部信息*/
      paperContent:[],
      personContent: [
        {
          title: "Data mining: concepts and techniques",
          first_author: "Mark Hall",
          second_author: "Eibe Frank",
          quoteNum: 20837,
          des:
            "More than twelve years have elapsed since the first public release of WEKA. In that time, the software has been rewritten entirely from scratch, evolved substantially and now accompanies a text on data mining [35]. These days, WEKA enjoys widespread acceptance in both academia and business, has an active community, and has been downloaded more than 1.4 million times since being placed on Source-Forge in April 2000. This paper provides an introduction to the WEKA workbench, reviews the history of the project, and, in light of the recent 3.6 stable release, briefly discusses what has been added since the last stable version (Weka 3.4) released in 200",
          source: "SIGKDD Explorations, pp. 10-18, 2009.",
          subject: ["Search For", "Cross Sections", "Light On"],
          hIndexOrder: 1,
          order: 1
        },
        {
          title: "Data mining: concepts and techniques",
          first_author: "Mark Hall",
          second_author: "Eibe Frank",
          quoteNum: 20837,
          des:
            "More than twelve years have elapsed since the first public release of WEKA. In that time, the software has been rewritten entirely from scratch, evolved substantially and now accompanies a text on data mining [35]. These days, WEKA enjoys widespread acceptance in both academia and business, has an active community, and has been downloaded more than 1.4 million times since being placed on Source-Forge in April 2000. This paper provides an introduction to the WEKA workbench, reviews the history of the project, and, in light of the recent 3.6 stable release, briefly discusses what has been added since the last stable version (Weka 3.4) released in 200",
          source: "SIGKDD Explorations, pp. 10-18, 2009.",
          subject: ["Search For", "Cross Sections", "Light On"],
          hIndexOrder: 1,
          order: 1
        },
        {
          title: "Data mining: concepts and techniques",
          first_author: "Mark Hall",
          second_author: "Eibe Frank",
          quoteNum: 20837,
          des:
            "More than twelve years have elapsed since the first public release of WEKA. In that time, the software has been rewritten entirely from scratch, evolved substantially and now accompanies a text on data mining [35]. These days, WEKA enjoys widespread acceptance in both academia and business, has an active community, and has been downloaded more than 1.4 million times since being placed on Source-Forge in April 2000. This paper provides an introduction to the WEKA workbench, reviews the history of the project, and, in light of the recent 3.6 stable release, briefly discusses what has been added since the last stable version (Weka 3.4) released in 200",
          source: "SIGKDD Explorations, pp. 10-18, 2009.",
          subject: ["Search For", "Cross Sections", "Light On"],
          hIndexOrder: 1,
          order: 1
        }
      ]

    };
  },
  mounted() {},
  methods: {
    searchpeople() {
      this.$router.push("/searchpeople");
    },
    titleNameClick: function(val) {
      //点击任意一个title 变蓝色
      this.isActive = val;
    },
    search(){
      
        //使用的阅读列表进行的测试
       var _this = this
       //console.log(this.$store.)
        this.$axios.get('/search-part/api/paper/search/keyword/'+this.input+'/0/8/0').then(resp => {
          if (resp && resp.data.code === 200) {
                _this.paperContent=resp.data.result
               
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
        }
    }
  }

</script>
<style >
.search span {
  float: left;
}
.search {
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
.rowLine {
  border-bottom: 1px dashed #eee;
  padding: 5px 0;
  height: 200px;
}
.indexNum {
  font-size: 24px;
  line-height: 33px;
  font-family: "Open Sans", Arial, Helvetica, Sans-Serif;
  font-weight: 300;
}
</style> 
