import tagStore from "@/store/tagStore";
import store from "@/store";

let tagId:number = JSON.parse(window.localStorage.getItem('_TagMaxId') || '0') || 0
let recordId:number = JSON.parse(window.localStorage.getItem('_RecordMaxId') || '0') || 0
function createTagId() {
  if(tagStore.findTag(tagId.toString()) || tagStore.findTag(tagId.toString()) === undefined){
    tagId+=1
  }
  window.localStorage.setItem('_TagMaxId',JSON.stringify(tagId))
  return tagId
}

function createRecordId() {
  // @ts-ignore
  if(store.commit('findRecord',recordId.toString()) || store.commit('findRecord',recordId.toString()) === undefined){
    recordId++
  }
  window.localStorage.setItem('_RecordMaxId',JSON.stringify(recordId))
  return recordId
}
export {createRecordId,createTagId}