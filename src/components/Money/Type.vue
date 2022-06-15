<template>
  <div class="nav">
    <ul class="types">
      <li :class="{selected:value === '-'}" @click="selectType('-')">支出</li>
      <li :class="{selected:value === '+'}" @click="selectType('+')">收入</li>
    </ul>
    <span @click="clock" class="clock">取消</span>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator'
  
  @Component
  export default class Type extends Vue {
    @Prop() readonly value!:string;
    selectType(type: string) {
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown')
      }
      this.$emit('update:value',type)
    }
    clock(){
      this.$router.back()
    }
  }
</script>

<style scoped lang="scss">
  .nav {
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background: #FFDA44;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    >span{
      position: absolute;
      right: 10px;
    }
    > .types {
      display: flex;
      > li {
        padding-left: 24px;
        padding-right: 24px;
        position: relative;
        
        &.selected::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          height: 2px;
          background: black;
        }
      }
    }
  }
</style>