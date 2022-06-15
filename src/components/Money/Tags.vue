<template>
  <div class="tags">
    <ul class="current" v-if="value==='-'">
      <li class="list-item" v-for="tag in expenditureTagList" :key="tag.id" @click="toggle(tag)">
        <Icon :name="tag.name" class="tag-icon" :class="{selected:selectedTag.name === tag.name}"/>
        <span>{{tag.name}}</span>
      </li>
    </ul>
    <ul class="current" v-else>
      <li class="list-item" v-for="tag in incomeTagList" :key="tag.id" @click="toggle(tag)">
        <Icon :name="tag.name" class="tag-icon" :class="{selected:selectedTag.name === tag.name}"/>
        <span>{{tag.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator'
  @Component
  export default class Tags extends Vue {
    @Prop() value:string  = '-'
    @Prop() selectedTag!: Tag
    created(){
      this.$store.commit('fetchTags')
    }
    get tagList(){
      return this.$store.state.tagList as Tag[]
    }
    get expenditureTagList(){
      return this.tagList.filter(tag => tag.type === '-')
    }
    get incomeTagList(){
    return this.tagList.filter(tag => tag.type === '+')
    }
    toggle(tag:Tag){
      this.$emit('update:value',this.value)
      this.$emit('update:selectedTag',tag)
    }
  }
</script>

<style scoped lang="scss">
  .tags {
    width: 100vw;
    > .current {
      margin-top: 57px;
      display: flex;
      flex-wrap: wrap;
      > .list-item {
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 24px;
        > .tag-icon {
          width: 45px;
          height: 45px;
          padding: 6px;
          border-radius: 50%;
          background: #f5f5f5;
          
          &.selected {
            background: #FFDA44;
          }
        }
        
        > span {
          margin-top: 5px;
          font-size: 14px;
        }
      }
    }
  }
</style>