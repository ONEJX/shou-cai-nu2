
type RootState = {
    recordList:RecordItem[],
    createRecordError?:Error | null,
    createTagError?:Error | null,
    updateRecord:RecordItem | null,
    tagList:Tag[],
    currentTag?:Tag
    mask:number
}
type RecordItem = {
    id?:string
    tag:Tag
    notes:string
    type:string
    amount:number
    createAt?:string
}
type Tag = {
    id:string
    name:string
    type:string
}
type TagListModel = {
    data:Tag[]
    fetch:()=>Tag[]
    save:()=>void
    create:(name:string)=>'success' | 'duplicated'
    update:(id:string,name:string)=>'success' | 'not found' | 'duplicated'
    remove:(id:string)=>'success'
}
interface Window {
}
