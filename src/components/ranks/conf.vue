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
    <el-scrollbar>
    <div class="headerClass">Conference Rank: Computer Science</div>
    <el-row style="background: #f3f3f3;height:calc(100vh)" :gutter="20">
        <el-col :span="3">
            <!--查询输入框-->
            <el-row  class="backWhite" style="margin-left: 5px;">
                <el-input placeholder="请输入内容" v-model="searchContent" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-row>
            <!--分类-->
            <el-row style="height: 48px; margin-left: 5px;" class="backWhite" align="middle" type="flex">

                <el-checkbox v-model="meeting">会议</el-checkbox>
                <el-checkbox v-model="qk">期刊</el-checkbox>
            </el-row>

            <!--分类-->
            <el-row class="backWhite" style="height: 100px;" align="middle"  >
                <el-radio-group v-model="schoolType" style="margin-top: 20px;" v-for="item in schoolTypeList" @change="schoolTypeChange(item)">
                     <el-radio  :label="item.key">{{item.value}}</el-radio>
                </el-radio-group>
            </el-row>
            <!--学科-->
            <el-row class="backWhite"  align="middle" style="margin-top: 10px;margin-bottom: 10px;">
                <div>
                <el-radio-group v-model="subjectType" v-for="item in initSubjectList" @change="subjectTypeChange(item)">
                    <el-radio  :label="item.key">{{item.value}}</el-radio><br/>
                </el-radio-group>
                </div>
            </el-row>

        </el-col>
        <el-col :span="19">
            <el-row style="height: 45px;" class="backWhite">
                <el-row style="height: 40px;" align="middle" type="flex" >
                   <span style="margin-left: 20px;"> {{tableTitle}}</span>
                </el-row>
                <el-table
                        :data="tableData" border
                        style="width: 100%">
                    <el-table-column
                            prop="rank"
                            label="排名"
                            width="80" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="meetingName"
                            label="会议名称"
                            width="240" align="center">
                    </el-table-column>
                    <el-table-column
                            prop="H5Mark"
                            label="H5指数" align="center" sortable>
                    </el-table-column>
                    <el-table-column
                            prop="onMark"
                            label="上升指数" align="center" sortable>
                    </el-table-column>
                    <el-table-column
                            prop="tk5Mark"
                            label="TK5指数" align="center" sortable>
                    </el-table-column>
                    <el-table-column
                            prop="ccfMark"
                            label="CCF等级"  align="center" sortable>
                    </el-table-column>
                    <el-table-column
                            prop="baseMark"
                            label="基础创新指数" align="center" sortable>
                    </el-table-column>
                    <el-table-column
                            prop="thuMark"
                            label="THU等级" align="center" sortable>
                    </el-table-column>
                    <!--<el-table-column
                            prop="imgMark"
                            label="指标图" center>
                    </el-table-column>-->
                </el-table>
            </el-row>
        </el-col>
        <el-col :span="2"  class="backWhite">
            <el-row  v-for="item in rightLink">
                <el-link class="rowLine" :href="item.url" target="_blank">
                    {{item.content}}</el-link>
            </el-row>
        </el-col>
    </el-row>

    </el-scrollbar>
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
        name: "conf",
        data () {
            return {
                searchContent:"",
                meeting:true,
                qk:true,
                tableTitle:"CFF分类",
                /*学院分类*/
                schoolType:"CFF",
                schoolTypeList:[{key:"CFF",value:"CCF分类"},{key:"qh",value:"清华大学分类"}],
                initSubjectList:[],
                subjectType:"",
                /*ccf分类*/
                ccfSubject:[{
                    key:"all",
                    value:"全部"
                },{
                    key:"1",
                    value:"数据库/数据挖掘/内容检索"
                },{
                    key:"2",
                    value:"计算机网络"
                },{
                    key:"3",
                    value:"计算机图形学与多媒体"
                }],
                /*清华分类*/
                qhSubject:[{
                    key:"all",
                    value:"全部"
                },{
                    key:"1",
                    value:"数据库与数据挖掘"
                },{
                    key:"2",
                    value:"理论计算机科学"
                },{
                    key:"3",
                    value:"计算机图形学与多媒体"
                }],
                /*主页table内容*/
                tableData: [{
                    rank: 1,
                    meetingName: '[IJCV]International Journal of Computer Vision',
                    H5Mark: 74,
                    onMark:51,
                    tk5Mark:58.5,
                    ccfMark:'A',
                    baseMark:83.94,
                    thuMark:'A',
                    imgMark:'<i class="el-icon-delete"></i>'
                }, {
                    rank: 2,
                    meetingName: '[IJCV]International Journal of Computer Vision',
                    H5Mark: 74,
                    onMark:51,
                    tk5Mark:58.5,
                    ccfMark:'A',
                    baseMark:83.94,
                    thuMark:'A',
                    imgMark:'<i class="el-icon-delete"></i>'
                }, {
                    rank: 3,
                    meetingName: '[IJCV]International Journal of Computer Vision',
                    H5Mark: 74,
                    onMark:51,
                    tk5Mark:58.5,
                    ccfMark:'A',
                    baseMark:83.94,
                    thuMark:'A',
                    imgMark:'/<i class="el-icon-delete"></i>/'
                }, {
                    rank: 4,
                    meetingName: '[IJCV]International Journal of Computer Vision',
                    H5Mark: 74,
                    onMark:51,
                    tk5Mark:58.5,
                    ccfMark:'A',
                    baseMark:83.94,
                    thuMark:'A',
                    imgMark:'<i class="el-icon-delete"></i>'
                }],


                /*左侧链接内容*/
                rightLink: [{
                    url: "https://www.aminer.cn/research_report/5fbdf5aae8a87f775ad21fbe?download=false",
                    content: "重磅！2021年IEEE Fellow名单揭晓：282位新晋Fellow，华人占比近三成"
                }, {
                    url: "https://www.aminer.cn/research_report/5fb7a36dbbd017ee63f33055?download=false",
                    content: "UC伯克利“拿下”最佳论文，复旦黄萱菁出任下一届程序主席丨EMNLP 2020闭幕"
                }, {
                        url: "https://www.aminer.cn/research_report/5fb7a094bbd017ee63f33054?download=false",
                        content: "2020教程：《自然语言处理模型的可解释性研究》及相关论文"
                    }
                ]
            }
        },
        methods:{
            /*学院分类*/
            schoolTypeChange:function (val) {
                this.tableTitle = val.value;
                if(val.key==="CFF"){
                    this.initSubjectList =  this.ccfSubject;
                }else{
                    this.initSubjectList =  this.qhSubject;
                }
            },
            /*学科分类*/
            subjectTypeChange:function (val) {
                if(val.key!=="all"){
                    this.tableTitle = val.value;
                }
            }
        },
        created() {
            this.initSubjectList =  this.ccfSubject;
        }
    }

</script>

<style scoped>
@import '../../assets/css/index.css';
    .headerClass {
        width: 100%;
        height: 116px !important;
        font-size: 39px;
        text-align: center;
        background-color: #0454b8;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        font-family: Roboto-Medium,Roboto;
        font-weight: 500;
        color: #fff;
        line-height: 47px;
        letter-spacing: 1px;
        text-shadow: 1px 2px 5px rgba(0,0,0,.5);
    }

    .rowLine{
        font-size: 14px;
        color: #000e28;
        border-bottom: 1px dashed #979797;
        padding: 10px 0;
    }
    .backWhite{
        background: white;
        margin-top: 10px;
    }
    .antRadio{
        word-wrap: break-word; word-break: normal;
        margin-top: 10px;
    }
    ::v-deep .el-radio__label {
        width: 100% !important;
        text-overflow: ellipsis;
        white-space: normal;
        line-height: 18px;

    }
</style>