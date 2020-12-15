<template>
<div>
  <div class="small-width">
    <el-container style="height: 900px; ">
      <el-header class="title-un">
      <el-divider direction="vertical bold"></el-divider>
      专家分类
      </el-header>
      <el-header class="nobackground">
      <el-input placeholder="查找" v-model="search"></el-input>
      </el-header>
    <el-row :gutter="20" :align="center" justify="space-around" class="scroll">
      <el-col :xs="12" :sm="11" :md="10" :lg="9" :xl="8" v-for="cata in filteredCatagories" :key="cata.id"  class="test_">
        <div class="grid-content shadow-border" ><ProItem v-bind:cata="cata"/></div>
      </el-col>
    </el-row>
    </el-container>
  </div>
</div>
</template>

<script>
import ProItem from "./ProItem";
import axios from "axios";

export default {
  name: "ProCata",
  components: {
    ProItem,
  },
  data() {
    return {
      catas: [
        {
          userId: [1, 3, 5, 7, 9],
          id: 1,
          title: "delectus aut autem",
        },
        {
          userId: [2, 4, 6, 8, 10],
          id: 2,
          title: "quis ut nam facilis et officia qui",
        },
        {
          userId: [1, 2, 3, 4, 5],
          id: 3,
          title: "fugiat veniam minus",
        },
        {
          userId: [6, 7, 8, 10],
          id: 4,
          title: "et porro tempora",
        },
        {
          userId: [3],
          id: 5,
          title: "laboriosam mollitia et enim quasi",
        },
        {
          userId: [1, 3, 5, 7, 9],
          id: 6,
          title: "delectus aut autem",
        },
        {
          userId: [2, 4, 6, 8, 10],
          id: 7,
          title: "quis ut nam facilis et officia qui",
        },
        {
          userId: [1, 2, 3, 4, 5],
          id: 8,
          title: "fugiat veniam minus",
        },
        {
          userId: [6, 7, 8, 10],
          id: 9,
          title: "et porro tempora",
        },
        {
          userId: [3],
          id: 10,
          title: "laboriosam mollitia et enim quasi",
        },
        {
          userId: [1, 3, 5, 7, 9],
          id: 11,
          title: "delectus aut autem",
        },
        {
          userId: [2, 4, 6, 8, 10],
          id: 12,
          title: "quis ut nam facilis et officia qui",
        },
        {
          userId: [1, 2, 3, 4, 5],
          id: 13,
          title: "fugiat veniam minus",
        },
        {
          userId: [6, 7, 8, 10],
          id: 14,
          title: "et porro tempora",
        },
        {
          userId: [3],
          id: 15,
          title: "laboriosam mollitia et enim quasi",
        },
        {
          userId: [1, 3, 5, 7, 9],
          id: 16,
          title: "delectus aut autem",
        },
        {
          userId: [2, 4, 6, 8, 10],
          id: 17,
          title: "quis ut nam facilis et officia qui",
        },
        {
          userId: [1, 2, 3, 4, 5],
          id: 18,
          title: "fugiat veniam minus",
        },
        {
          userId: [6, 7, 8, 10],
          id: 19,
          title: "et porro tempora",
        },
        {
          userId: [3],
          id: 20,
          title: "laboriosam mollitia et enim quasi",
        },
      ],
      users: [],
      pageOfItems: [],
      search: ''
    }; 
  },
  methods: {
    onChangePage(pageOfItems) {
            // update page of items
            this.pageOfItems = pageOfItems;
        }
  },
  created() {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => this.users = res.data)
      .catch(err => console.log(err));
  },
  computed: {
    filteredCatagories:function() {
      return this.catas.filter((cata)=> {
        return cata.title.toLowerCase().match(this.search.toLowerCase())
      });
    }
  }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: left;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  padding: 5px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  
  padding: 5px;
  text-align: center;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.center {
  margin: auto;
  padding: 1px;
}
.title-un {
  background-color: transparent;
  border-bottom: #909399 1px solid;
  text-align: left;
  font-size: 150%;
  padding: 5px;
}
.shadow-border {
  border: solid 0px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.small-width {
  width: 48%;
}
.test_ {
  min-height: 75px;
  min-width: 225px;
}
.scroll {
  max-height: 800px;
  overflow-y: scroll;
  padding: 5px;
  overflow-x: hidden;
}
.nobackground {
  background-color: transparent;
}
</style>
