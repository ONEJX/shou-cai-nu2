<template>
  <Layout>
    <TopNav>
      <template v-slot:titleCenter>守财奴</template>
      <template v-slot:left>
        <span class="small">{{year}}年</span>
        <span @click="showPopup" class="month"><label>{{month}}</label>月</span>
        <van-popup v-model:show="show" position="bottom">
          <van-datetime-picker
              v-model="currentDate"
              type="year-month"
              title="选择年月日"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="confirm"
          />
        </van-popup>
      </template>
      <template v-slot:center>
        <span class="small">收入</span>
        <span class="big">{{monthlyIncome===0?'0.00':monthlyIncome}}</span>
      </template>
      <template v-slot:right>
        <span class="small">支出</span>
        <span class="big">{{monthlyExpenditure===0?'0.00':monthlyExpenditure}}</span>
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
    <div class="noResult" v-else>本月没有账目记录</div>
    
    <QRCode v-if="mask===0"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component} from "vue-property-decorator";
  import dayjs from "dayjs";
  import clone from '@/lib/clone';
  import TopNav from "@/components/TopNav.vue";
  import QRCode from "@/components/QRCode.vue";
  const isoWeek = require('dayjs/plugin/isoWeek')
  dayjs.extend(isoWeek)
  @Component({
    components:{TopNav,QRCode}
    })
  export default class Statistics extends Vue {
    beforeCreate(){
      this.$store.commit('fetchRecords')
    }
    mounted(){
      if(document.documentElement.clientWidth > 500){
        if(this.$store.state.mask === 0){
          window.alert('为提升用户体验 请用手机打开')
        }
        return
      }else{
        this.$store.state.mask=1
      }
    }
    get mask(){//遮罩层
      return this.$store.state.mask
    }
  
    //------------------------------------------
    selectDate = new Date()
    year = dayjs().format('YYYY')
    month = dayjs().format('MM')
    week = ''
    show:boolean = false
    currentDate = new Date()
    minDate = new Date(2010,0,1)
    maxDate = new Date(2025,10,1)
    confirm(value:Date){
      const arr = dayjs(value).format('YYYY-MM').split('-')
      this.selectDate = value
      this.year = arr[0]
      this.month = arr[1]
      this.show = false
    }
    showPopup(){
      this.show = true
    }
    //----------------------------------------------
    get recordList(){
      return (this.$store.state as RootState).recordList
    }
    get groupList(){
      type Result = {title:string,expenditure:number,income:number,items:RecordItem[]}[]
      const {recordList} = this
      const newList = clone(recordList).filter(item=>dayjs(item.createAt).isSame(dayjs(this.selectDate),'month'))
        .sort((a,b)=>dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf())
     
      if(newList.length === 0) return []
      const result:Result = [{title:dayjs(newList[0].createAt).format('YYYY-MM-DD'),expenditure:0,income:0,items:[newList[0]]}]
      for(let i = 1;i<newList.length;i++){
          const current = newList[i]
          const last = result[result.length - 1]
        if(dayjs(last.title).isSame(dayjs(current.createAt),'day')){
          last.items.push(current)
        }else{
          result.push({title:dayjs(current.createAt).format('YYYY-MM-DD'),expenditure:0,income:0,items:[current]})
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
    get monthlyExpenditure(){//月支出
      return this.groupList.reduce((sum,item)=>sum+item.expenditure,0)
    }
    get monthlyIncome(){//月收入
      return this.groupList.reduce((sum,item)=>sum+item.income,0)
    }
    beautiful(string:string){//美化日期 显示 今天 昨天
      const now = dayjs()
      if(dayjs(string).isSame(now,'day')){
        return '今天'
      }else if(dayjs(string).isSame(now.subtract(1,'day'),'day')){
        return '昨天'
      }else if(dayjs(string).isSame(now.subtract(2,'day'),'day')){
        return '前天'
      }else{
        // @ts-ignore
        switch(dayjs(string).isoWeekday()){
          case 1:
            this.week = '星期一'
            break;
          case 2:
            this.week = '星期二'
            break;
          case 3:
            this.week = '星期三'
            break;
          case 4:
            this.week = '星期四'
            break;
          case 5:
            this.week = '星期五'
            break;
          case 6:
            this.week = '星期六'
            break;
          case 7:
            this.week = '星期日'
            break;
            default:break
        }
        return dayjs(string).format(`MM月DD日 ${this.week}`)
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
  .small{
    font-size: 14px;
    color: grey;
  }
  .big{
    font-size: 20px;
  }
  .month{
    position: relative;
    >label{
      font-size: 24px;
      padding-right: 2px;
    }
    &::after{
      content: '';
      border-left:6px solid transparent;
      border-right:6px solid transparent;
      border-top:10px solid black;
      border-bottom:10px solid transparent;
      height: 0;
      width: 0;
      position: absolute;
      right: -20px;
      top: 15px;
    }
  }
</style>
