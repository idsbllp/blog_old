<template>
    <div class="app">
        <!-- <myHeader></myHeader> -->
        <bg></bg>
        <router-view :userInfor.sync="userInfor"></router-view>
    </div>
</template>

<script>
    import myHeader from './public/header.vue';
    import bg from './public/bg.vue';
    import articleList from './article/article_list.vue';

    export default {
        data() {
            return {
                title: 'idsbllp',
                userInfor: {
                    username: 'idsbllp',
                    realname: '李立平'
                },
            }
        },
        components: {
            myHeader,
            bg,
            articleList,
        }
    }
</script>
<style>
    .app {
        overflow: hidden;
    }
</style>