<template>
  <div>
    <h1>hello world</h1>
    <el-link href="/" type="primary">hello world</el-link>
    <el-link @click.native="$router.push('/home')" type="primary">主要链接</el-link>
    <el-link href="/home" type="success">成功链接</el-link>
    <el-link @click.native="$router.push('/icon')" type="warning">警告链接</el-link>
    <el-link type="danger">危险链接</el-link>
    <el-link type="info">信息链接</el-link>
    <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    <router-view></router-view>
  </div>
</template>
<script>
// (async function() {
//   await 1;
//   console.log("1");
// })();
async function aaa() {
  await 1;
}

aaa();
console.log(this);
import Vue from "vue";
import { Link, Switch } from "element-ui";
Vue.use(Link);
Vue.use(Switch);
export default {
  data() {
    console.log(this);
    return {
      value: true
    };
  }

  /*  components: {
    ElLink: Link,
    ElSwitch: Switch
  } */
};
</script>
<style lang="less" scoped>
.img {
  display: block;
}
</style>





