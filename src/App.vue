<template>
  <div class="app-container">
    <Test-page></Test-page>
  </div>
</template>

<style lang="less">
    .app-container{
      height:100px;
    }
</style>

<script>
import TestPage from './views/TestPage'

export default {
  name: "app",
  components:{TestPage},
  data() {
    return {};
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>


