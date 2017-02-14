<template>
    <section class="user-infor-con">
        <a href="##" class="user-logo_anchor">
            <img class="user-logo_img" src="../../img/07224141D943EBC03B8BD9DCCC09658A.jpg" alt="header img">
        </a>
        <ul class="user-infor">
            <li class="user-infor_item">
                {{userInfor.username}} ({{userInfor.realname}})
            </li>
            <li class="user-infor_item">
                {{userInfor.username}}
            </li>
        </ul>
    </section>
</template>

<style lang="less">
    .user-infor-con {
        padding-top: 20px;
        width: 100%;
        height: auto;
        background: #bbb;
        border-bottom: 1px solid #ccc;
    }
    .user-logo_anchor {
        display: block;
        margin: 0 auto;
        width: 140px;
        height: 140px;
        border-radius: 50%;
        overflow: hidden;
    }
    .user-logo_img {
        width: 100%;
        height: 100%;
    }
    .user-infor {
        padding: 0;
    }
    .user-infor_item {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 22px;
        text-align: center;
        color: #fff;
        list-style: none;
    }
</style>

<script>
    export default {
        props: ['userInfor'],
        data () {
            return {
                
            }
        }
    }
</script>