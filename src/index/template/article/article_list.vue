<template>
    <main class="homepage">
        <nav class="hp-navigator">
            <user :userInfor.sync="userInfor"></user>
            <nav>
                <router-link :to="{path: '/article/' + article.name}" v-for="article in articles" hover class="nav-list">
                    {{article.name}}
                </router-link>
            </nav>
        </nav>
        <main class="hp-main">
            <router-view></router-view>
        </main>
    </main>
</template>
<script>
    import user from '../user/user.vue';
    export default {
        props: ['userInfor'],
        data () {
            return {
                articles: []
            }
        },
        mounted () {
            this.$http.get('/blog/public/admin/index/getAllArticle').then(res => {
                let body = res.body;
                body.forEach(val => {
                    val['tag_name'] = val['tag_name'].split(',');
                });
                this.articles = body;
                this.article = body[0].content;
            });
        },
        components: {
            user,
        }
    }
</script>
<style lang="less">
    .hp-navigator {
        position: fixed;
        top: 78px;
        width: 22%;
        height: 100%;
        overflow-x: auto;
        overflow-y: scroll;
        background-color: rgba(1, 1, 1, .5);
        color: #fff;
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
            background: rgba(255, 255, 255, .8);
        }
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
        box-sizing: border-box;
        padding: 10px;
        padding-bottom: 70px;
        position: fixed;
        top: 78px;
        left: 22%;
        width: 78%;
        height: 100%;
        background: rgba(204, 204, 204, .6);
        overflow: scroll;
    }
</style>
