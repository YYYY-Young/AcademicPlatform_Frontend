<template>
  <div @click="toDetail()">
    <div class="spacing1" style="font-size: 130%;">{{ cata.title }}</div>
    <div>
    <div class="spacing2 displayinline">专家人数：<strong class="displayinline fontblue">{{ cata.userId.length }}</strong></div>
    <el-button type="primary" plain size="mini" class="displayinline buttonalign">进入</el-button>
    </div>
  </div>
</template>

<script>
import Router from 'vue-router'
export default {
  name: "ProItems",
  props: ["cata"],
  methods: {
    toDetail() {
      this.$router.push({name: 'CataResult', query: { cata: this.cata } });
      console.log('done!')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
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
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.bottomleft {
  position: absolute;
  bottom: 8px;
  left: 16px;
  font-size: 75%;
}
.smallertext {
  font-size: 75%;
  text-align:left;
}
.spacing1 {
  padding: 10px;
  min-height: 80px;
  font-size: 18px;
}
.spacing2 {
  text-align: left;
  font-size: 75%;
  height: 20px;
  padding-right: 50px;
}
.displayinline {
  display: inline;
  text-align: left;
}
.fontblue {
  color:#1127f2;
}
.buttonalign {
  text-align: right;
}
</style>
