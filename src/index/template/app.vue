<template>
    <div class="app">
        <headers></headers>
        <bg></bg>
        <router-view :userInfor.sync="userInfor"></router-view>
    </div>
</template>

<script>
    import headers from './public/header.vue';
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
            headers,
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