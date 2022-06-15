<template>
  <Layout>
    <TopNav>
      <template v-slot:titleCenter>守财奴</template>
      <template v-slot:left>
        <span>2022年</span>
        <span>日期</span>
      </template>
      <template v-slot:center>
        <span>收入</span>
        <span>20.00</span>
      </template>
      <template v-slot:right>
        <span>支出</span>
        <span>0.00</span>
      </template>
    </TopNav>
    <ol class="xxx" v-if="groupList.length>0">
      <li v-for="(group,index) in groupList" :key="index">
        <div class="title">
          <span>{{beautiful(group.title)}}</span>
          <div class="title-money">
            <span>支出：{{group.expenditure}}</span>
            <span>收入：{{group.income}}</span>
          </div>
        </div>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record" @click="updateRecord(item)">
            <span class="tags">
              <Icon :name="item.tag.name" class="tag-icon"/>
            </span>
            <span class="notes">{{item.notes?item.notes:item.tag.name}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div class="noResult" v-else>暂时没有账目可以显示哦</div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from "vue-property-decorator";
  import dayjs from "dayjs";
  import clone from '@/lib/clone';
  import TopNav from "@/components/TopNav.vue";
  @Component({
    components:{TopNav}
    })
  export default class Statistics extends Vue {
    beforeCreate(){
      this.$store.commit('fetchRecords')
    }
    get recordList(){
      return (this.$store.state as RootState).recordList
    }
    get groupList(){
      type Result = {title:string,expenditure?:number,income?:number,items:RecordItem[]}[]
      const {recordList} = this
      const newList = clone(recordList).sort((a,b)=>dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf())
     
      if(newList.length === 0) return []
      const result:Result = [{title:dayjs(newList[0].createAt).format('YYYY-MM-DD'),items:[newList[0]]}]
      
      for(let i = 1;i<newList.length;i++){
          const current = newList[i]
          const last = result[result.length - 1]
        if(dayjs(last.title).isSame(dayjs(current.createAt),'day')){
          last.items.push(current)
        }else{
          result.push({title:dayjs(current.createAt).format('YYYY-MM-DD'),items:[current]})
        }
      }
      result.map(g=>{
        g.expenditure = g.items.filter(item=>item.type==='-').
        reduce((sum,item)=>sum + item.amount,0)
        g.income = g.items.filter(item=>item.type==='+').
        reduce((sum,item)=>sum + item.amount,0)
      })
      return result
    }
    beautiful(string:string){//美化日期 显示 今天 昨天
      const now = dayjs()
      if(dayjs(string).isSame(now,'day')){
        return '今天'
      }else if(dayjs(string).isSame(now.subtract(1,'day'),'day')){
        return '昨天'
      }else if(dayjs(string).isSame(now.subtract(2,'day'),'day')){
        return '前天'
      }else if(dayjs(string).isSame(now,'year')){
        return dayjs(string).format('M月DD日')
      }else{
        return dayjs(string).format('YYYY年M月DD日')
      }
    }
    updateRecord(item:RecordItem){
      this.$router.push({name:'UpdateRecord',params: {id:item.id!}})
    }
  }
</script>
<style lang="scss" scoped>
  .xxx{
    overflow: auto;
  }
  ::v-deep{
    .type-tabs-item{
      background: #F4F4F4;
      &.selected{
        background: #C4C4C4;
        &::after{
          display: none;
        }
      }
    }
    .cycle-tabs-item{
      height: 48px;
      font-size: 20px;
    }
  }
  
  .title{
    font-size: 14px;
    color: grey;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    >.title-money{
      display: flex;
      align-items: center;
      >span{
        padding: 10px;
      }
    }
  }
  .record{
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    padding-right: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow:ellipsis;
    position:relative;
    border-bottom: 1px solid #F7F7F7;
    >.tags{
      min-width:40px;
      padding-right: 10px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: right;
    }
    >.notes{
      overflow:hidden;
      text-overflow: ellipsis;
      margin-right: auto;
      margin-left: 10px;
    }
  }
  .tags::after{
    content: '';
    position: absolute;
    right: 1px;
    background: #c4c4c4;
    width: 2px;
    height: 20px;
  }
  .noResult{
    margin: auto;
    transform: translateY(-100px);
  }
  .tag-icon{
    width: 30px;
    height: 30px;
    padding: 5px;
    border-radius: 50%;
    background:#FFDA44
  }
</style>