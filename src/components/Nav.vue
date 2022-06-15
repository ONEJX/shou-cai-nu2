<template>
    <div class="nav">
        <router-link to="/detailed" class="item" active-class="selected">
            <Icon class="nav-icon" name="明细"/>
            明细
        </router-link>
            <router-link to="/money" class="item" active-class="selected">
            <div class="item-add">
                <Icon class="item-icon" name="记账"/>
            </div>
            <span>记账</span>
        </router-link>
        <router-link to="/statistics" class="item" active-class="selected">
            <Icon class="nav-icon" name="图表"/>
            图表
        </router-link>
    </div>
</template>

<script lang="ts">
    import Icon from "@/components/Icon.vue";
    export default {
        name: "Nav",
        components: {Icon}
    }
</script>

<style lang="scss" scoped>
    .nav{
        box-shadow: 0 0 3px rgba(0,0,0,0.25);
        display: flex;
        min-height: 48px;
        font-size: 12px;
        > .item{
            flex:1;
            display: flex;
            padding: 2px 0;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
            >.nav-icon{
                width: 35px;
                height: 35px;
                border-radius: 50%;
                padding: 5px;
            }
            >.item-add{
                position: absolute;
                bottom: 40%; 
                border-top:2px solid rgba(0,0,0,0.25);
                width: 50px;
                height: 50px;
                border-radius: 50% 50% 0 0;
                display: flex;
                justify-content: center;
                align-items: center;
                >.item-icon{
                    width: 40px;
                    height: 40px;
                    padding: 5px;
                    background:#FFDA44 ;
                    border-radius: 50%;
                }
            }
        }
        .item:nth-child(2)>span{
            position: absolute;
            bottom: 10%;
        }
        > .item.selected>.nav-icon{
            background: #FFDA44;
        }
    }
</style>