<script>
    //es6
    export default {
        el:"#app",
         //data:function(){}，下面是es6写法
         data () {
            return {
                name:"guowenfh",
                age:"2q1"
            }
        }
    }
</script>
<template>
    <div>
        <h1>姓名：{{name}}</h1>
        <h2>wacao: {{age}}</h2>
    </div>
</template>

<style>
    header {
        padding: 20px 0 10px 0;
        text-align: center;
        font-size: 48px;
        color: #fff;
        background-color: rgba(122, 122, 122, .5);
    }
</style>
