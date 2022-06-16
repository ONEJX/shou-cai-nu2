<template>
    <div class="money">
      <Type :value.sync="record.type"/>
      <Tags :value.sync="record.type" :selected-tag="record.tag" @update:selectedTag='getSelectedTag'/>
      <transition name="fade">
        <NumberPad v-if="record.tag.name!==''" :value.sync="record.amount" @submit="saveRecord" :notes.sync = "record.notes" :createAt.sync = 'record.createAt'/>
      </transition>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from "vue-property-decorator";
  import Type from "@/components/Money/Type.vue";
  import Tags from "@/components/Money/Tags.vue";
  import NumberPad from "@/components/Money/NumberPad.vue";
  import time from "@/lib/time";
  @Component({
    components: {NumberPad, Tags, Type}
  })
  export default class Money extends Vue {
    updateId = this.$route.params.id
    record:RecordItem = this.updateRecord || {tag:{id:'',name:'',type:''},notes:'',type:'-',amount:0,createAt:time.timeFormat(new Date().toISOString(),true)}
    beforeCreate(){
      this.$store.commit('fetchRecords')
    }
    mounted(){ //修复移动端软键盘带来的影响
      const money = <HTMLElement>document.querySelector('.money')
      const body = <HTMLElement>document.querySelector('body')
      money.style.height = body.clientHeight + 'px'
    }
    get updateRecord():RecordItem{
      this.$store.commit('findRecord',this.updateId)
      return this.$store.state.updateRecord
    }
    getDate(value:string){
      this.record.createAt = value
    }
    getSelectedTag(selectedTag:Tag){
      this.record.tag = selectedTag
    }
    saveRecord(){
      this.$store.commit('createRecord',this.record)
      window.alert('已保存')
      this.$router.back()
    }
  }
</script>
<style lang="scss" scoped>
  .money{
    overflow: auto;
    height: 100vh;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
