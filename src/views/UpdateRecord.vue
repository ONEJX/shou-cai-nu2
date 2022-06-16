<template>
    <div class="container">
      <TopNav class="header">
        <template v-slot:titleLeft>
          <Icon name="left" class="left-icon"/>
        </template>
        <template v-slot:titleCenter>
          <Icon :name="record.tag.name" class="tag-icon"/>
        </template>
        <template v-slot:center>{{record.tag.name}}</template>
      </TopNav>
      <div class="main">
        <div class="content"><label>类型</label><span>{{record.type==='-'?'支出':'收入'}}</span></div>
        <div class="content"><label>金额</label><span>{{record.amount}}</span></div>
        <div class="content"><label>日期</label><span>{{formatDate}}</span></div>
        <div class="content"><label>备注</label><span>{{record.notes?record.notes:record.tag.name}}</span></div>
      </div>
      <div class="footer">
        <div class="update" @click="goUpdate">编辑</div>
        <div class="delete" @click="goDelete">删除</div>
      </div>
    </div>
</template>
<script lang="ts">
	import Vue from 'vue'
	import {Component} from "vue-property-decorator";
	import TopNav from "@/components/TopNav.vue";
  import time from "@/lib/time";
	@Component({
		components:{TopNav}
	})
	export default class UpdateRecord extends Vue {
	  updateRecordId = this.$route.params.id.toString()
    beforeCreate(){
      this.$store.commit('fetchRecords')
    }
	  get record(){
      this.$store.commit('findRecord', this.updateRecordId)
      return this.$store.state.updateRecord
    }
    get formatDate(){
	    if(this.record.createAt !== undefined){
        return time.timeFormat(this.record.createAt)
      }
    }
    goUpdate(){
      if(this.record.id !== undefined){
        this.$router.push({name:'Money',params: {id:this.record.id.toString()}})
      }
    }
    goDelete(){
      if(this.record.id !== undefined){
        if(window.confirm('确认删除吗')){
            this.$store.commit('deleteRecord',this.record.id)
            this.$router.back()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .container{
    width: 100vw;
    height: 100vh;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
  }
  .header{
    height: 15vh;
  }
  .left-icon{
    width: 30px;
    height: 30px;
  }
.tag-icon{
  width: 60px;
  height: 60px;
  background: #fff;
  border-radius: 50%;
  padding: 10px;
}
  .main{
    display: flex;
    flex-direction: column;
    align-items: end;
    >.content{
      border-bottom:1px solid #E5E5E5;
      width: 93%;
      min-height: 50px;
      display: flex;
      justify-content: start;
      align-items: center;
      margin-left: auto;
      >label{
        color: grey;
        margin-right: 20px;
      }
    }
  }
  .footer{
    display: flex;
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0;
    bottom: 0;
    border-top:1px solid #E5E5E5 ;
    >div{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      &:active{
        background: #F5F5F5;
      }
    }
    >.update{
      position: relative;
      &::after{
      content: '';
      width: 1px;
      height: 25px;
      position: absolute;
      right: 0;
      background: #F5F5F5;
      }
    }
  }
</style>
