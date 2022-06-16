<template>
  <div class="xxx">
    <div class="mask" @click="close">
    </div>
    <div class="img">
      <img src="@/assets/icons/守财奴.png" alt="手机扫描开始体验">
    </div>
  </div>
</template>

<script lang="js">
	export default {
		name: 'QRCode',
    methods:{
	    close(){
	    	this.$store.state.mask=1
      }
    }
	}
</script>

<style scoped lang="scss">
  .xxx{
    position: fixed;
  }
.mask{
  background: #808080;
  width: 100vw;
  height: 100vh;
  opacity: 0.4;
}
.img{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-70%);
  >img{
    width: 250px;
    height: 250px;
  }
}
</style>