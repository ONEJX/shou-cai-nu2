import dayjs from "dayjs";
const time = {
  tiemtZone(time:string){
    let timeMills=Date.parse(time);
    //时区差,该值为负数
    let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    //返回当前时区的时间
    let imetZoneTime = (new Date(timeMills -tzoffset)).toISOString().slice(0, -1);
    return imetZoneTime;
  },
  timeFormat(time:string,haveT?:boolean) {
    if(haveT){
      return dayjs(time).format('YYYY-MM-DDTHH:mm:ss')
    }else{
      return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
export default time