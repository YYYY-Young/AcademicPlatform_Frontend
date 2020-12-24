<template>
  <div class="classify-container">
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
    <el-container class="classify-box">
      <el-header class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item>引文报告</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <div class="paper-category">
        <div class="category-one">
          <div class="category-name">一级学科:</div>
          <div class="category-content">
            <span
              :class="[
                'category-item category-title',
                { 'category-item-active': index === indexOne }
              ]"
              v-for="(category, index) in categoryOne"
              :key="index"
              @click="changeIndexOne(index)"
              >{{ category }}</span
            >
          </div>
        </div>
        <div class="category-two">
          <div class="category-name">二级学科:</div>
          <div class="category-content">
            <span
              :class="[
                'category-item category-title',
                { 'category-item-active': index === indexTwo }
              ]"
              v-for="(category, index) in categoryTwo"
              :key="index"
              @click="changeIndexTwo(index)"
              >{{ category }}</span
            >
          </div>
        </div>
      </div>
      <div class="paper-main">
        <div class="paper-main-title">
          <h3>{{ value }}榜单</h3>
          <div class="paper-select">
            <el-select size="mini" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="paper-main-content">
          <el-tabs type="border-card" stretch>
            <el-tab-pane label="高被引论文">
              <el-table
                :data="highCitedPapersTable"
                size="medium"
                style="width: 100%"
                ref="highCitedPapersTableRef"
                :default-sort="{ prop: 'year', order: 'ascending' }"
                @row-click="clickHighCitedPapersTable"
              >
                <!-- 折叠面板 -->
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <div class="label-list">
                      <el-tag
                        size="medium"
                        v-for="(tag, index) in scope.row.labels"
                        class="label-item"
                        :key="index"
                        type="info"
                        @click="clickTag(tag)"
                        >{{ tag }}</el-tag
                      >
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="rank" label="排名" width="50">
                </el-table-column>
                <el-table-column prop="title" label="标题" width="250">
                </el-table-column>
                <el-table-column prop="subject" label="学科" width="200">
                </el-table-column>
                <el-table-column prop="author" label="作者" width="100">
                </el-table-column>
                <el-table-column prop="source" label="来源" width="230">
                </el-table-column>
                <el-table-column prop="year" label="年份" sortable>
                </el-table-column>
                <el-table-column prop="cited_num" label="被引量">
                </el-table-column>
              </el-table>
             <div   class="paper-pagination">
                  <el-pagination
            
                background
                layout="prev, pager, next"
                :total="100"
              >
              </el-pagination>
             </div>
            </el-tab-pane>
            <el-tab-pane label="高被引作者">
              <el-table
                :data="highCitedAuthorTable"
                style="width: 100%"
                size="medium"
                ref="highCitedAuthorTableRef"
                :default-sort="{ prop: 'year', order: 'ascending' }"
                @cell-mouse-enter="handleMouseEnter2"
                @cell-mouse-leave="handleMouseLeave2"
              >
                <!-- 折叠面板 -->
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <div class="author-hidden-content">
                      <div class="author-up">
                        <div class="author-institution">
                          <a href="#">
                            {{ scope.row.hiddenInfo.institution }}</a
                          >
                        </div>
                        <el-tag
                          size="medium"
                          type="info"
                          class="author-label"
                          >{{ scope.row.hiddenInfo.label }}</el-tag
                        >
                        <button class="author-button">关注</button>
                      </div>
                      <div class="author-down">
                        <div>
                          <span class="defalut-label">最新文章</span>
                          <a>{{ scope.row.hiddenInfo.article }}</a>
                        </div>
                        <div class="author-name">
                          {{ scope.row.hiddenInfo.en_name }}
                        </div>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="rank" label="排名" width="50">
                </el-table-column>
                <el-table-column prop="avatar" label="" width="80">
                  <template slot-scope="scope">
                    <el-avatar :src="scope.row.avatar"></el-avatar>
                  </template>
                </el-table-column>
                <el-table-column prop="author" label="作者" width="120">
                </el-table-column>
                <el-table-column prop="subject" label="学科" width="200">
                </el-table-column>
                <el-table-column prop="publish_num" label="发文量">
                </el-table-column>

                <el-table-column prop="cited_num" label="被引量">
                </el-table-column>
                <el-table-column prop="cited_average" label="篇均被引量">
                </el-table-column>
                <el-table-column prop="cited_other" label="他引">
                </el-table-column>
                <el-table-column prop="index_H" label="H指数">
                </el-table-column>
              </el-table>
             <div  class="author-pagination">
                  <el-pagination
               
                background
                layout="prev, pager, next"
                :total="100"
              >
                 </el-pagination>
             </div>
           
            </el-tab-pane>
            <el-tab-pane label="高被引期刊">
              <el-table
                :data="highCitedJournalTable"
                style="width: 100%"
                ref="highCitedJournalTableRef"
                size="medium "
                :default-sort="{ prop: 'year', order: 'ascending' }"
                @cell-mouse-enter="handleMouseEnter3"
                @cell-mouse-leave="handleMouseLeave3"
              >
                <!-- 折叠面板 -->
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <div class="journal-hidden-content">
                      <div>
                        主板单位：{{ scope.row.hiddenInfo.institution }}
                      </div>
                      <div>影响因子：{{ scope.row.hiddenInfo.factor }}</div>
                      <div>ISSN：{{ scope.row.hiddenInfo.ISSN }}</div>
                      <div>出版周期：{{ scope.row.hiddenInfo.period }}</div>
                      <div>期刊荣誉：{{ scope.row.hiddenInfo.honor }}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="rank" label="排名" width="50">
                </el-table-column>
                <el-table-column
                  prop="journal_name"
                  label="期刊名称"
                  width="180"
                >
                </el-table-column>
                <el-table-column prop="subject" label="学科" width=" 200">
                </el-table-column>
                <el-table-column prop="publish_num" label="发文量">
                </el-table-column>

                <el-table-column prop="cited_num" label="被引量">
                </el-table-column>
                <el-table-column prop="cited_average" label="篇均被引量">
                </el-table-column>

                <el-table-column prop="index_H" label="H指数">
                </el-table-column>
                <el-table-column prop="index_search" label="搜索指数">
                </el-table-column>
              </el-table>
 <div  class="journal-pagination">
                  <el-pagination
                background
               
                layout="prev, pager, next"
                :total="100"
              >
              </el-pagination>
 </div>
            </el-tab-pane>
            <el-tab-pane label="高被引机构">
              <el-table
                :data="highCitedInstitutionsTable"
                style="width: 100%"
                size="medium "
                ref="highCitedInstitutionsTableRef"
                :default-sort="{ prop: 'year', order: 'ascending' }"
                @cell-mouse-enter="handleMouseEnter4"
                @cell-mouse-leave="handleMouseLeave4"
              >
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <div class="institution-hidden-content">
                      <div>
                        <span class="defalut-label">最高被引</span>
                        <a>{{ scope.row.hiddenInfo.article_high }}</a>
                      </div>
                      <div>{{ scope.row.hiddenInfo.author }}</div>
                      <div>{{ scope.row.hiddenInfo.label }}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="rank" label="排名" width="50">
                </el-table-column>
                <el-table-column
                  prop="institution_name"
                  label="机构名称"
                  width="180"
                >
                </el-table-column>
                <el-table-column prop="subject" label="学科" width="200">
                </el-table-column>
                <el-table-column prop="publish_num" label="发文量">
                </el-table-column>

                <el-table-column prop="cited_num" label="被引量">
                </el-table-column>
                <el-table-column prop="cited_average" label="篇均被引量">
                </el-table-column>

                <el-table-column prop="index_H" label="H指数">
                </el-table-column>
                <el-table-column prop="index_search" label="搜索指数">
                </el-table-column>
              </el-table>
          <div   class="institution-pagination">
                  <el-pagination
                background
              
                layout="prev, pager, next"
                :total="100"
              >
                 </el-pagination>
          </div>
           
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      
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
  name: "Classification",
  data() {
    return {
      highCitedPapersTable: [
        {
          paperId: "00001",
          rank: 1,
          title: "水面无人艇发展与应用",
          subject: "战略、战役、战术学",
          author: "李家良",
          source: "《火力与指挥控制》",
          year: "2012",
          cited_num: "221",
          labels: ["无人艇", "发展现状", "关键技术"]
        },
        {
          paperId: "00002",
          rank: 2,
          title: "水面无人艇发展与应用",
          subject: "战略、战役、战术学",
          author: "李家良",
          source: "《火力与指挥控制》",
          year: "2012",
          cited_num: "221",
          labels: ["无人艇", "发展现状", "关键技术"]
        },
        {
          paperId: "00003",
          rank: 3,
          title: "水面无人艇发展与应用",
          subject: "战略、战役、战术学",
          author: "李家良",
          source: "《火力与指挥控制》",
          year: "2012",
          cited_num: "221",
          labels: ["无人艇", "发展现状", "关键技术"]
        },
        {
          paperId: "00004",
          rank: 4,
          title: "水面无人艇发展与应用",
          subject: "战略、战役、战术学",
          author: "李家良",
          source: "《火力与指挥控制》",
          year: "2012",
          cited_num: "221",
          labels: ["无人艇", "发展现状", "关键技术"]
        },

        {
          paperId: "00005",
          rank: 5,
          title: "水面无人艇发展与应用",
          subject: "战略、战役、战术学",
          author: "李家良",
          source: "《火力与指挥控制》",
          year: "2012",
          cited_num: "221",
          labels: ["无人艇", "发展现状", "关键技术"]
        },
        {
          paperId: "00006",
          rank: 6,
          title: "水面无人艇发展与应用",
          subject: "战略、战役、战术学",
          author: "李家良",
          source: "《火力与指挥控制》",
          year: "2012",
          cited_num: "221",
          labels: ["无人艇", "发展现状", "关键技术"]
        },
        {
          paperId: "00007",
          rank: 7,
          title: "水面无人艇发展与应用",
          subject: "战略、战役、战术学",
          author: "李家良",
          source: "《火力与指挥控制》",
          year: "2012",
          cited_num: "221",
          labels: ["无人艇", "发展现状", "关键技术"]
        },
        {
          paperId: "00008",
          rank: 8,
          title: "水面无人艇发展与应用",
          subject: "战略、战役、战术学",
          author: "李家良",
          source: "《火力与指挥控制》",
          year: "2012",
          cited_num: "221",
          labels: ["无人艇", "发展现状", "关键技术"]
        },
        {
          paperId: "00009",
          rank: 9,
          title: "水面无人艇发展与应用",
          subject: "战略、战役、战术学",
          author: "李家良",
          source: "《火力与指挥控制》",
          year: "2012",
          cited_num: "221",
          labels: ["无人艇", "发展现状", "关键技术"]
        },
        {
          paperId: "00010",
          rank: 10,
          title: "水面无人艇发展与应用",
          subject: "战略、战役、战术学",
          author: "李家良",
          source: "《火力与指挥控制》",
          year: "2012",
          cited_num: "221",
          labels: ["无人艇", "发展现状", "关键技术"]
        }
      ],
      highCitedAuthorTable: [
        {
          rank: 1,
          avatar:
            "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          author: "张维明",
          subject: "战略、战役、战术学",
          publish_num: "623",
          cited_num: "8703",
          cited_average: "13.97",
          cited_other: "8549",
          index_H: "44",
          hiddenInfo: {
            institution: "国防科技大学信息系统与管理学院",
            label: "战略,战役,战术学",
            article: "How Can We Deal With Adversarial Examples?",
            en_name: "Zhengfei Yu；Yun Zhou；Weiming Zhang；"
          }
        },
        {
          rank: 2,
          avatar:
            "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          author: "张维明",
          subject: "战略、战役、战术学",
          publish_num: "623",
          cited_num: "8703",
          cited_average: "13.97",
          cited_other: "8549",
          index_H: "44",
          hiddenInfo: {
            institution: "国防科技大学信息系统与管理学院",
            label: "战略,战役,战术学",
            article: "How Can We Deal With Adversarial Examples?",
            en_name: "Zhengfei Yu；Yun Zhou；Weiming Zhang；"
          }
        },
        {
          rank: 3,
          avatar: "",
          author: "张维明",
          subject: "战略、战役、战术学",
          publish_num: "623",
          cited_num: "8703",
          cited_average: "13.97",
          cited_other: "8549",
          index_H: "44",
          hiddenInfo: {
            institution: "国防科技大学信息系统与管理学院",
            label: "战略,战役,战术学",
            article: "How Can We Deal With Adversarial Examples?",
            en_name: "Zhengfei Yu；Yun Zhou；Weiming Zhang；"
          }
        },
        {
          rank: 4,
          avatar: "",
          author: "张维明",
          subject: "战略、战役、战术学",
          publish_num: "623",
          cited_num: "8703",
          cited_average: "13.97",
          cited_other: "8549",
          index_H: "44",
          hiddenInfo: {
            institution: "国防科技大学信息系统与管理学院",
            label: "战略,战役,战术学",
            article: "How Can We Deal With Adversarial Examples?",
            en_name: "Zhengfei Yu；Yun Zhou；Weiming Zhang；"
          }
        },
        {
          rank: 5,
          avatar: "",
          author: "张维明",
          subject: "战略、战役、战术学",
          publish_num: "623",
          cited_num: "8703",
          cited_average: "13.97",
          cited_other: "8549",
          index_H: "44",
          hiddenInfo: {
            institution: "国防科技大学信息系统与管理学院",
            label: "战略,战役,战术学",
            article: "How Can We Deal With Adversarial Examples?",
            en_name: "Zhengfei Yu；Yun Zhou；Weiming Zhang；"
          }
        },
        {
          rank: 6,
          avatar: "",
          author: "张维明",
          subject: "战略、战役、战术学",
          publish_num: "623",
          cited_num: "8703",
          cited_average: "13.97",
          cited_other: "8549",
          index_H: "44",
          hiddenInfo: {
            institution: "国防科技大学信息系统与管理学院",
            label: "战略,战役,战术学",
            article: "How Can We Deal With Adversarial Examples?",
            en_name: "Zhengfei Yu；Yun Zhou；Weiming Zhang；"
          }
        },
        {
          rank: 7,
          avatar: "",
          author: "张维明",
          subject: "战略、战役、战术学",
          publish_num: "623",
          cited_num: "8703",
          cited_average: "13.97",
          cited_other: "8549",
          index_H: "44",
          hiddenInfo: {
            institution: "国防科技大学信息系统与管理学院",
            label: "战略,战役,战术学",
            article: "How Can We Deal With Adversarial Examples?",
            en_name: "Zhengfei Yu；Yun Zhou；Weiming Zhang；"
          }
        },
        {
          rank: 8,
          avatar: "",
          author: "张维明",
          subject: "战略、战役、战术学",
          publish_num: "623",
          cited_num: "8703",
          cited_average: "13.97",
          cited_other: "8549",
          index_H: "44",
          hiddenInfo: {
            institution: "国防科技大学信息系统与管理学院",
            label: "战略,战役,战术学",
            article: "How Can We Deal With Adversarial Examples?",
            en_name: "Zhengfei Yu；Yun Zhou；Weiming Zhang；"
          }
        },
        {
          rank: 9,
          avatar: "",
          author: "张维明",
          subject: "战略、战役、战术学",
          publish_num: "623",
          cited_num: "8703",
          cited_average: "13.97",
          cited_other: "8549",
          index_H: "44",
          hiddenInfo: {
            institution: "国防科技大学信息系统与管理学院",
            label: "战略,战役,战术学",
            article: "How Can We Deal With Adversarial Examples?",
            en_name: "Zhengfei Yu；Yun Zhou；Weiming Zhang；"
          }
        },
        {
          rank: 10,
          avatar: "",
          author: "张维明",
          subject: "战略、战役、战术学",
          publish_num: "623",
          cited_num: "8703",
          cited_average: "13.97",
          cited_other: "8549",
          index_H: "44",
          hiddenInfo: {
            institution: "国防科技大学信息系统与管理学院",
            label: "战略,战役,战术学",
            article: "How Can We Deal With Adversarial Examples?",
            en_name: "Zhengfei Yu；Yun Zhou；Weiming Zhang；"
          }
        }
      ],
      highCitedJournalTable: [
        {
          rank: 1,
          journal_name: "电光与控制",
          subject: "战略、战役、战术学",
          publish_num: "28752",
          cited_num: "211973",
          cited_average: "7.37",
          index_H: "112",
          index_search: "9898",
          hiddenInfo: {
            institution: "中国航空工业洛阳电光设备研究所",
            factor: "0.510",
            ISSN: "1673-5692",
            period: "月刊",
            honor:
              "河南省首界自然科学二十佳； 河南省首届自然科学一级期刊； 河南省优秀科技期刊三等奖（98-02）；"
          }
        },
        {
          rank: 2,
          journal_name: "电光与控制",
          subject: "战略、战役、战术学",
          publish_num: "28752",
          cited_num: "211973",
          cited_average: "7.37",
          index_H: "112",
          index_search: "9898",
          hiddenInfo: {
            institution: "中国航空工业洛阳电光设备研究所",
            factor: "0.510",
            ISSN: "1673-5692",
            period: "月刊",
            honor:
              "河南省首界自然科学二十佳； 河南省首届自然科学一级期刊； 河南省优秀科技期刊三等奖（98-02）；"
          }
        },
        {
          rank: 3,
          journal_name: "电光与控制",
          subject: "战略、战役、战术学",
          publish_num: "28752",
          cited_num: "211973",
          cited_average: "7.37",
          index_H: "112",
          index_search: "9898",
          hiddenInfo: {
            institution: "中国航空工业洛阳电光设备研究所",
            factor: "0.510",
            ISSN: "1673-5692",
            period: "月刊",
            honor:
              "河南省首界自然科学二十佳； 河南省首届自然科学一级期刊； 河南省优秀科技期刊三等奖（98-02）；"
          }
        },
        {
          rank: 4,
          journal_name: "电光与控制",
          subject: "战略、战役、战术学",
          publish_num: "28752",
          cited_num: "211973",
          cited_average: "7.37",
          index_H: "112",
          index_search: "9898",
          hiddenInfo: {
            institution: "中国航空工业洛阳电光设备研究所",
            factor: "0.510",
            ISSN: "1673-5692",
            period: "月刊",
            honor:
              "河南省首界自然科学二十佳； 河南省首届自然科学一级期刊； 河南省优秀科技期刊三等奖（98-02）；"
          }
        },
        {
          rank: 5,
          journal_name: "电光与控制",
          subject: "战略、战役、战术学",
          publish_num: "28752",
          cited_num: "211973",
          cited_average: "7.37",
          index_H: "112",
          index_search: "9898",
          hiddenInfo: {
            institution: "中国航空工业洛阳电光设备研究所",
            factor: "0.510",
            ISSN: "1673-5692",
            period: "月刊",
            honor:
              "河南省首界自然科学二十佳； 河南省首届自然科学一级期刊； 河南省优秀科技期刊三等奖（98-02）；"
          }
        },
        {
          rank: 6,
          journal_name: "电光与控制",
          subject: "战略、战役、战术学",
          publish_num: "28752",
          cited_num: "211973",
          cited_average: "7.37",
          index_H: "112",
          index_search: "9898",
          hiddenInfo: {
            institution: "中国航空工业洛阳电光设备研究所",
            factor: "0.510",
            ISSN: "1673-5692",
            period: "月刊",
            honor:
              "河南省首界自然科学二十佳； 河南省首届自然科学一级期刊； 河南省优秀科技期刊三等奖（98-02）；"
          }
        },
        {
          rank: 7,
          journal_name: "电光与控制",
          subject: "战略、战役、战术学",
          publish_num: "28752",
          cited_num: "211973",
          cited_average: "7.37",
          index_H: "112",
          index_search: "9898",
          hiddenInfo: {
            institution: "中国航空工业洛阳电光设备研究所",
            factor: "0.510",
            ISSN: "1673-5692",
            period: "月刊",
            honor:
              "河南省首界自然科学二十佳； 河南省首届自然科学一级期刊； 河南省优秀科技期刊三等奖（98-02）；"
          }
        },
        {
          rank: 8,
          journal_name: "电光与控制",
          subject: "战略、战役、战术学",
          publish_num: "28752",
          cited_num: "211973",
          cited_average: "7.37",
          index_H: "112",
          index_search: "9898",
          hiddenInfo: {
            institution: "中国航空工业洛阳电光设备研究所",
            factor: "0.510",
            ISSN: "1673-5692",
            period: "月刊",
            honor:
              "河南省首界自然科学二十佳； 河南省首届自然科学一级期刊； 河南省优秀科技期刊三等奖（98-02）；"
          }
        },
        {
          rank: 9,
          journal_name: "电光与控制",
          subject: "战略、战役、战术学",
          publish_num: "28752",
          cited_num: "211973",
          cited_average: "7.37",
          index_H: "112",
          index_search: "9898",
          hiddenInfo: {
            institution: "中国航空工业洛阳电光设备研究所",
            factor: "0.510",
            ISSN: "1673-5692",
            period: "月刊",
            honor:
              "河南省首界自然科学二十佳； 河南省首届自然科学一级期刊； 河南省优秀科技期刊三等奖（98-02）；"
          }
        },
        {
          rank: 10,
          journal_name: "电光与控制",
          subject: "战略、战役、战术学",
          publish_num: "28752",
          cited_num: "211973",
          cited_average: "7.37",
          index_H: "112",
          index_search: "9898",
          hiddenInfo: {
            institution: "中国航空工业洛阳电光设备研究所",
            factor: "0.510",
            ISSN: "1673-5692",
            period: "月刊",
            honor:
              "河南省首界自然科学二十佳； 河南省首届自然科学一级期刊； 河南省优秀科技期刊三等奖（98-02）；"
          }
        }
      ],
      highCitedInstitutionsTable: [
        {
          rank: 1,
          institution_name: "武汉大学",
          subject: "战略、战役、战术学",
          publish_num: "190",
          cited_num: "6374",
          cited_average: "33.55",
          index_H: "24",
          index_search: "搜索指数",
          hiddenInfo: {
            article_high: "信息计量学(六)",
            author: "邱均平；",
            label: "情报理论与实践"
          }
        },
        {
          rank: 2,
          institution_name: "武汉大学",
          subject: "战略、战役、战术学",
          publish_num: "190",
          cited_num: "6374",
          cited_average: "33.55",
          index_H: "24",
          index_search: "搜索指数",
          hiddenInfo: {
            article_high: "信息计量学(六)",
            author: "邱均平；",
            label: "情报理论与实践"
          }
        },
        {
          rank: 3,
          institution_name: "武汉大学",
          subject: "战略、战役、战术学",
          publish_num: "190",
          cited_num: "6374",
          cited_average: "33.55",
          index_H: "24",
          index_search: "搜索指数",
          hiddenInfo: {
            article_high: "信息计量学(六)",
            author: "邱均平；",
            label: "情报理论与实践"
          }
        },
        {
          rank: 4,
          institution_name: "武汉大学",
          subject: "战略、战役、战术学",
          publish_num: "190",
          cited_num: "6374",
          cited_average: "33.55",
          index_H: "24",
          index_search: "搜索指数",
          hiddenInfo: {
            article_high: "信息计量学(六)",
            author: "邱均平；",
            label: "情报理论与实践"
          }
        },
        {
          rank: 5,
          institution_name: "武汉大学",
          subject: "战略、战役、战术学",
          publish_num: "190",
          cited_num: "6374",
          cited_average: "33.55",
          index_H: "24",
          index_search: "搜索指数",
          hiddenInfo: {
            article_high: "信息计量学(六)",
            author: "邱均平；",
            label: "情报理论与实践"
          }
        },
        {
          rank: 6,
          institution_name: "武汉大学",
          subject: "战略、战役、战术学",
          publish_num: "190",
          cited_num: "6374",
          cited_average: "33.55",
          index_H: "24",
          index_search: "搜索指数",
          hiddenInfo: {
            article_high: "信息计量学(六)",
            author: "邱均平；",
            label: "情报理论与实践"
          }
        },
        {
          rank: 7,
          institution_name: "武汉大学",
          subject: "战略、战役、战术学",
          publish_num: "190",
          cited_num: "6374",
          cited_average: "33.55",
          index_H: "24",
          index_search: "搜索指数",
          hiddenInfo: {
            article_high: "信息计量学(六)",
            author: "邱均平；",
            label: "情报理论与实践"
          }
        },
        {
          rank: 8,
          institution_name: "武汉大学",
          subject: "战略、战役、战术学",
          publish_num: "190",
          cited_num: "6374",
          cited_average: "33.55",
          index_H: "24",
          index_search: "搜索指数",
          hiddenInfo: {
            article_high: "信息计量学(六)",
            author: "邱均平；",
            label: "情报理论与实践"
          }
        },
        {
          rank: 9,
          institution_name: "武汉大学",
          subject: "战略、战役、战术学",
          publish_num: "190",
          cited_num: "6374",
          cited_average: "33.55",
          index_H: "24",
          index_search: "搜索指数",
          hiddenInfo: {
            article_high: "信息计量学(六)",
            author: "邱均平；",
            label: "情报理论与实践"
          }
        },
        {
          rank: 10,
          institution_name: "武汉大学",
          subject: "战略、战役、战术学",
          publish_num: "190",
          cited_num: "6374",
          cited_average: "33.55",
          index_H: "24",
          index_search: "搜索指数",
          hiddenInfo: {
            article_high: "信息计量学(六)",
            author: "邱均平；",
            label: "情报理论与实践"
          }
        }
      ],
      categoryOne: [
        "哲学",
        "教育学",
        "经济学",
        "法学",
        "军事学",
        "文学",
        "艺术学",
        "历史学",
        "理学",
        "信息工程",
        "工业工程",
        "农学",
        "医学",
        "管理学"
      ],
      categoryTwo: ["全部", "中国语言文学", "外国语言文学", "新闻传播学"],
      indexOne: 0,
      indexTwo: 0,

      options: [
        {
          value: "第2期",
          label: "2020-11-24更新"
        },
        {
          value: "第1期",
          label: "2020-09-24更新"
        }
      ],
      value: "第2期"
    };
  },
  methods: {
    changeIndexOne(index) {
      this.indexOne = index;
    },
    changeIndexTwo(index) {
      this.indexTwo = index;
    },
    clickHighCitedPapersTable(row, index, e) {
      this.$refs.highCitedPapersTableRef.toggleRowExpansion(row);
    },
    clickTag(tag) {
      this.$message("你点击了" + tag);
    }
    // handleMouseEnter1(row, column, cell, event) {
    //   this.$refs.highCitedPapersTableRef.toggleRowExpansion(row, true);
    // },
    // handleMouseLeave1(row) {
    //   this.$refs.highCitedPapersTableRef.toggleRowExpansion(row, false);
    // },
    // handleMouseEnter2(row) {
    //   this.$refs.highCitedAuthorTableRef.toggleRowExpansion(row, true);
    // },
    // handleMouseLeave2(row) {
    //   this.$refs.highCitedAuthorTableRef.toggleRowExpansion(row, false);
    // },
    // handleMouseEnter3(row) {
    //   this.$refs.highCitedJournalTableRef.toggleRowExpansion(row, true);
    // },
    // handleMouseLeave3(row) {
    //   this.$refs.highCitedJournalTableRef.toggleRowExpansion(row, false);
    // },
    // handleMouseEnter4(row) {
    //   this.$refs.highCitedInstitutionsTableRef.toggleRowExpansion(row, true);
    // },
    // handleMouseLeave4(row) {
    //   this.$refs.highCitedInstitutionsTableRef.toggleRowExpansion(row, false);
    // },
    // tagColor(index){
    //     var color =''
    //     switch(index/5){
    //         case 0: color = 'sucess';break;
    //         case 1: color = 'info'; break;
    //         case 2: color = 'warning';break;
    //         case 3: color = 'danger'; break;
    //         case 4: color = '';break;
    //         default: color='';
    //     }
    // }
  },
  computed: {}
};
</script>

<style scoped>
@import '../assets/css/index.css';
.cursor {
  cursor: pointer;
}
.classify-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #012248;
  padding: 0 80px;
  z-index: 99;
}
.header-content {
  position: relative;
}
.header-content span {
  font-size: 18px;
  position: absolute;
  color: #fff;
  left: 0;
  height: 60px;
  line-height: 60px;
}
.header-right {
  position: absolute;
  right: 0;
  height: 60px;
  line-height: 60px;
}
.header-right-content {
  display: flex;
  align-items: center;
}
.login,
.register {
  color: #394c61;
  margin-left: 10px;
}
.login:hover,
.register:hover {
  color: #fff;
}
.header-right-content .icon:hover {
  color: #fff;
}
.header-right-content .icon {
  font-family: element-icons !important;
  color: #394c61;
  border: 10px solid transparent;
  font-size: 18px;
}
.classify-box {
  width: 1198px;
  margin: 60px auto 0 auto;
}
.breadcrumb {
  display: flex;
  align-items: center;
  margin-left: -20px;
}
.paper-category {
  background: #fff;
  min-height: 130px;
  width: 100%;
  margin-bottom: 40px;
  padding: 30px;
  font-size: 14px;
}
.category-one {
  margin-bottom: 13px;
  min-height: 26px;
  line-height: 26px;
}
.category-two {
  min-height: 26px;
  line-height: 26px;
}
.category-content {
  width: 1048px !important;
  color: #101010;
}
.category-one div,
.category-two div {
  float: left;
  min-height: 26px;
  line-height: 26px;
}
.category-name {
  width: 90px;
  color: #666;
}
.category-item {
  display: inline-block;
  padding: 0 10px;
  cursor: pointer;
  margin-bottom: 5px;
}
.category-item-active {
  background: #4f6ef2;
  color: #fff;
}
.category-title {
  margin-right: 30px;
}
.paper-main-title {
  display: flex;
  margin-bottom: 4px;
}
.paper-main-title h3 {
  display: inline-block;
  font-size: 24px;
  line-height: 34px;
}
.paper-main-title .paper-select {
  margin-left: 10px;
  padding-top: 4px;
  width: 135px;
}
.label-list {
  margin: 20px;
}
.label-item {
  margin-left: 15px;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  background-color: #fff;
}
.label-item:hover {
  border: 1px solid #409eff;
  cursor: pointer;
  background-color: #b3d8ff;
  color: #333;
}
a {
  color: #333;
  text-decoration-line: none;
  cursor: pointer;
}
a:hover {
  color: #4f6ef2;
  text-decoration-line: underline;
}
.author-button {
  width: 86px;
  height: 34px;
  line-height: 34px;
  background-color: #4f6ef2;
  color: #fff;
}
.author-hidden-content {
  position: relative;
  margin-left: 130px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.author-institution {
  margin-top: 2x;
  margin-bottom: 10px;
}
.author-down {
  margin-top: 20px;
}
.defalut-label {
  background-color: #fafafa;
  padding: 2px 9px;
  border-radius: 15px;
  margin-right: 5px;
  border: 1px solid #c0c0c0;
  margin-bottom: 5px;
}
.author-name {
  margin-top: 8px;
}
.author-button {
  position: absolute;
  right: 20px;
}
.journal-hidden-content,
.institution-hidden-content {
  margin: 10px 0;
}
.journal-hidden-content div {
  height: 22px;
  line-height: 22px;
  color: #999;
}
.institution-hidden-content div {
  height: 22px;
  line-height: 22px;
  color: #999;
}
.paper-pagination,.author-pagination,.journal-pagination,.institution-pagination{
    width: 1198px;
    margin: 10px 350px;
}
</style>
