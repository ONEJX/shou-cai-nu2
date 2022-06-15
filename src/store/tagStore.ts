

const localStorageKeyName = 'tagList';

const tagStore = {
  tagList:[] as Tag[],
  fetchTags(){
    this.tagList =  JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]')
    return this.tagList
  },
  findTag(id:string){
    return this.tagList.filter(t=>t!.id===id)[0]
  },
  saveTag(){
    window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.tagList))
    
  }
}
tagStore.fetchTags();
export default tagStore