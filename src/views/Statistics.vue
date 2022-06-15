<template>
  <Layout>
    <TopNav>
      <template v-slot:title>守财奴</template>
      <template v-slot:slot1>111</template>
      <template v-slot:slot2>222</template>
      <template v-slot:slot3>333</template>
    </TopNav>
  </Layout>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component} from "vue-property-decorator";
    import TopNav from "@/components/TopNav.vue";
   @Component({
     components:{TopNav}
   })
    export default  class Labels extends Vue{
    }
</script>
<style lang="scss" scoped>

</style>