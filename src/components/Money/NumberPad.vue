<template>
  <div class="numberPad">
    <div class="date">
      <label for="date">
        <Icon name="日期" class="date-icon"/>
        <span>日期：</span>
        <input id="date" type="datetime-local" :value="createAt" @input="onDateChanged($event.target.value)">
      </label>
    </div>
    <div class="notesAndOutput">
      <label for="notes" class="notes">
        <Icon name="备注" class="notes-icon"/>
        <span>备注：</span>
        <input id="notes" type="text" placeholder="点击写备注..." :value="notes" @input="onValueChanged($event.target.value)"/>
      </label>
      <div class="output">{{output}}</div>
    </div>
    <div class="buttons">
      <button @click="outputContent">1</button>
      <button @click="outputContent">2</button>
      <button @click="outputContent">3</button>
      <button @click="remove" class="button-icon-f"><Icon name="删除" class="button-icon"/></button>
      <button @click="outputContent">4</button>
      <button @click="outputContent">5</button>
      <button @click="outputContent">6</button>
      <button>+</button>
      <button @click="outputContent">7</button>
      <button @click="outputContent">8</button>
      <button @click="outputContent">9</button>
      <button>-</button>
      <button @click="outputContent">.</button>
      <button @click="outputContent">0</button>
      <button @click="clear">清空</button>
      <button @click="ok" class="button-ok">完成</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator'
  
  @Component
  export default class NumberPad extends Vue {
    @Prop() readonly value!:number
    @Prop() notes!:string;
    @Prop(String) createAt!:'';
    output = this.value.toString()
    
    outputContent(e:MouseEvent){
      const button = (e.target as HTMLButtonElement);
      const input = button.textContent!;
      if(this.output.length === 7){ return; }
      if(this.output === '0'){
        if('0123456789'.indexOf(input)>=0){
          this.output = input;
        }else{
          this.output += input;
        }
        return;
      }
      if (this.output.indexOf('.') >= 0 && input === '.') {
        return;
      }
      this.output += input
    }
    remove(){
      if(this.output.length !== 1){
        this.output = this.output.slice(0,-1)
      }else{
        this.output = '0'
      }
    }
    clear(){
      this.output = '0'
    }
    ok(){
      const number = parseFloat(this.output)
      this.$emit('update:value',number)
      this.$emit('submit',number)
      this.clear()
    }
    onValueChanged(notes:string,oldValue:string){
      this.$emit('update:notes',notes)
    }
    onDateChanged(value:string,oldValue:string){
      this.$emit('update:createAt',value)
    }
  }
</script>

<style scoped lang="scss">
    .numberPad {
      background: #f5f5f5;
      width: 100vw;
      position: fixed;
      left: 0;
      bottom: 0;
      
      > .date {
        border-bottom: 1px solid gray;
        border-top: 1px solid gray;
        
        > label {
          display: flex;
          align-items: center;
          > .date-icon{
            width: 16px;
            height: 16px;
            margin-left: 9px;
            margin-right: 5px;
          }
          
          > input {
            border: none;
            background: none;
            min-height: 36px;
            flex-grow: 1;
            padding-right: 10px;
          }
        }
      }
      
      > .notesAndOutput {
        width: 100vw;
        max-height: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        > .notes {
          display: flex;
          align-items: center;
          flex-grow: 1;
          
          > .notes-icon {
            width: 1em;
            height: 1em;
            margin-left: 10px;
            margin-right: 5px;
          }
          
          > span {
            margin-right: 2px;
          }
          
          > input {
            border: none;
            background: none;
            flex-grow: 1;
          }
        }
        
        > .output {
          display: flex;
          max-width: 80px;
          align-items: center;
          min-height: 36px;
          font-size: 20px;
          margin-left: 16px;
          padding-right: 5px;
        }
      }
      
      > .buttons {
        width: 100vw;
        display: flex;
        flex-wrap: wrap;
        .button-ok {
          background: #FFDA44;
        }
        
        > button {
          width: 25%;
          height: 56px;
          font-size: 18px;
          background: #f5f5f5;
          border: 1px solid #D9D9D9;
          > .button-icon {
            width: 30px;
            height: 30px;
          }
        }
      }
    }
</style>