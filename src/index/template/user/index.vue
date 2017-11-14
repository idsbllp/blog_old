<template>
    <main class="homepage">
        <nav class="hp-navigator">
            <user :userInfor.sync="userInfor"></user>
            <nav>
                <router-link :to="{path: '/index'}" hover class="nav-list">
                    首页
                </router-link>
                <router-link :to="{path: '/article'}" hover class="nav-list">
                    专题
                </router-link>
                <router-link :to="{path: '/about'}" hover class="nav-list">
                    关于
                </router-link>
            </nav>
        </nav>
        <section class="hp-main">
            <router-view></router-view>
        </section>
    </main>
</template>
<script>
    import user from '../user/user.vue';
    export default {
        props: ['userInfor'],
        components: {
            user,
        }
    }
</script>
<style lang="less">
    .homepage {
        height: 100%;
        overflow: hidden;
    }
    .hp-navigator {
        float: left;
        width: 22%;
        height: 100%;
        overflow-x: auto;
        overflow-y: scroll;
        background-color: rgba(1, 1, 1, .5);
        color: #fff;
        .nav-list {
            display: block;
            line-height: 40px;
            color: #fff;
            font-size: 16px;
            text-align: center;
            border-bottom: 1px dashed #fff;
            letter-spacing: 1px;
        }
    }
    .hp-main {
        float: left;
        box-sizing: border-box;
        padding: 10px;
        width: 78%;
        height: 100%;
        background: rgba(204, 204, 204, .6);
        overflow: scroll;
        &::-webkit-scrollbar {
            width: 10px;
            padding: 0 10px;
        }
        &::-webkit-scrollbar-track {
            border-radius: 5px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background: rgba(255, 255, 255, .5);
        }
        &::-webkit-scrollbar-thumb:hover {
            border-radius: 5px;
            background: rgba(255, 255, 255, .7);
        }
        &::-webkit-scrollbar-thumb:window-inactive {
            background: #007fff;
        }
    }
</style>
