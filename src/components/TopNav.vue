<template>
<div class="container">
  <div class="title">
    <div class="title-left" @click="back">
      <slot name="titleLeft"/>
    </div>
      <slot name="titleCenter"/>
  </div>
  <div class="content">
    <div class="xxx"><slot name="left"/></div>
    <div class="xxx center"><slot name="center"/></div>
    <div class="xxx"><slot name="right"/></div>
  </div>
</div>
</template>

<script lang="js">
	export default {
		name: 'TopNav',
    methods:{
	    back(){
	    	this.$router.back()
      }
    }
	}
</script>

<style scoped lang="scss">
.container{
  width: 100vw;
  height: 15vh;
  background:#FFDA44;
  display: flex;
  flex-direction: column;
  >.title{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: cursive;
    font-weight: 600;
    position: relative;
    >.title-left{
      position: absolute;
      left: 0;
      top:15px;
    }
  }
  >.content{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 10px;
    >.center{
      position: relative;
    }
    >.xxx{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>