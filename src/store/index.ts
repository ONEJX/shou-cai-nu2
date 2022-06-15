import Vue from 'vue'
import Vuex from 'vuex'
import clone from "@/lib/clone";
import {createTagId,createRecordId} from "@/lib/createId";
import router from "@/router";

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    createRecordError:null,
    createTagError:null,
    recordList:[],
    updateRecord: null,
    tagList:[],
    currentTag:undefined,
    mask:0//状态码，0表示电脑使用，不是0表示手机使用或者已经出现过一次遮罩层
  } as RootState,
  mutations: {
    fetchRecords(state){
      state.recordList =  JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
    },
    findRecord(state,id:string){
      state.updateRecord = state.recordList.filter(t=>t.id===id)[0]
    },
    createRecord(state,record:RecordItem){
      const newRecord:RecordItem = clone(record)
      if(newRecord.id === undefined){
        newRecord.id = createRecordId().toString()
        state.recordList.push(newRecord)
        store.commit('saveRecords')
      }else{
        store.commit('changeRecord',record)
      }
    },
    changeRecord(state,record:RecordItem){
      const result = state.recordList.filter(r=>r.id===record.id)[0]
      result.tag = record.tag
      result.type = record.type
      result.amount = record.amount
      result.createAt = record.createAt
      result.notes = record.notes
      store.commit('saveRecords')
    },
    deleteRecord(state,id:string){
      let index = -1
      for(let i = 0;i<=state.recordList.length;i++){
        if(state.recordList[i].id===id){
          index = i
          break;
        }
      }
      state.recordList.splice(index,1)
      store.commit('saveRecords')
    },
    saveRecords(state){
      state.createRecordError = null
      try {
        window.localStorage.setItem('recordList',JSON.stringify(state.recordList))
      }catch (e) {
        state.createRecordError = e
      }
    },
  
    fetchTags(state){
      state.tagList =  JSON.parse(window.localStorage.getItem('tagList') || '[]')
      if(!state.tagList || state.tagList.length===0){
        store.commit('createTag',{name:'餐饮',type:'-'})
        store.commit('createTag',{name:'购物',type:'-'})
        store.commit('createTag',{name:'日用',type:'-'})
        store.commit('createTag',{name:'交通',type:'-'})
        store.commit('createTag',{name:'蔬菜',type:'-'})
        store.commit('createTag',{name:'水果',type:'-'})
        store.commit('createTag',{name:'零食',type:'-'})
        store.commit('createTag',{name:'运动',type:'-'})
        store.commit('createTag',{name:'娱乐',type:'-'})
        store.commit('createTag',{name:'餐饮',type:'-'})
        store.commit('createTag',{name:'通讯',type:'-'})
        store.commit('createTag',{name:'服饰',type:'-'})
        store.commit('createTag',{name:'美容',type:'-'})
        store.commit('createTag',{name:'住房',type:'-'})
        store.commit('createTag',{name:'孩子',type:'-'})
        store.commit('createTag',{name:'长辈',type:'-'})
        store.commit('createTag',{name:'社交',type:'-'})
        store.commit('createTag',{name:'旅行',type:'-'})
        store.commit('createTag',{name:'烟酒',type:'-'})
        store.commit('createTag',{name:'数码',type:'-'})
        store.commit('createTag',{name:'汽车',type:'-'})
        store.commit('createTag',{name:'医疗',type:'-'})
        store.commit('createTag',{name:'书籍',type:'-'})
        store.commit('createTag',{name:'学习',type:'-'})
        store.commit('createTag',{name:'宠物',type:'-'})
        store.commit('createTag',{name:'礼物',type:'-'})
        store.commit('createTag',{name:'办公',type:'-'})
        store.commit('createTag',{name:'维修',type:'-'})
        store.commit('createTag',{name:'捐赠',type:'-'})
        store.commit('createTag',{name:'彩票',type:'-'})
        store.commit('createTag',{name:'工资',type:'+'})
        store.commit('createTag',{name:'兼职',type:'+'})
        store.commit('createTag',{name:'理财',type:'+'})
        store.commit('createTag',{name:'礼金',type:'+'})
      }
      return state.tagList
    },
    findTag(state,id:string){
      return state.tagList.filter(t=>t!.id===id)[0]
    },
    createTag(state,payload:{name:string,type:string}){
      const {name,type} = payload
      const names = state.tagList.map(item=>item!.name)
      if(names.indexOf(name)>=0){ return 'duplicated'}
      const id = createTagId().toString()
      state.tagList.push({id,name:name,type})
      store.commit('saveTag')
      return 'success'
    },
    updateTag(state,payload:{id:string,name:string}){
      const {id,name} = payload
      const idList = state.tagList.map(item=>item!.id)
      if(idList.indexOf(id)>=0){
        const nameList = state.tagList.map(item=>item!.name)
        if(nameList.indexOf(name)>=0){
          window.alert('标签重复')
        }else{
          const tag = state.tagList.filter(item=>item!.id===id)[0]
          tag!.name = name
          store.commit('saveTag')
        }
      }
    },
    removeTag(state,id:string){
      let index = -1
      for(let i = 0;i<=state.tagList.length;i++){
        if(state.tagList[i]!.id===id){
          index = i
          break;
        }
      }
      if(index >= 0){
        state.tagList.splice(index,1)
        store.commit('saveTag')
        router.back()
        window.alert('删除成功')
      }
    },
    saveTag(state){
      window.localStorage.setItem('tagList',JSON.stringify(state.tagList))
    
    },
  }
});
export default store