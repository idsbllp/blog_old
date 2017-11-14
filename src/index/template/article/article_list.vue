<template>
    <section class="article-list">
        <nav class="article-navigator">
            <nav v-for="(articles, tag) in tags" class="tag">
                <p> {{tag}} </p>
                <router-link :to="{path: '/article/' + article.name}" v-for="article in articles" hover class="nav-list">
                    {{article.name}}
                </router-link>
            </nav>
        </nav>
<!--         <section class="article-main">
            <router-view></router-view>
        </section> -->
    </section>
</template>
<script>
    import user from '../user/user.vue';
    export default {
        props: ['userInfor'],
        data () {
            return {
                tags: []
            }
        },
        mounted () {
            this.$http.get('/blog/public/index/index/getAllArticle').then(res => {
                this.tags = res.body;
                // console.log(body)
                // this.articles = body;
                // this.article = body[0].content;
            });
        },
        components: {
            user,
        }
    }
</script>
<style lang="less">
    .article-list {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .article-navigator {
        box-sizing: border-box;
        padding: 20px 0;
        height: 100%;
        overflow-x: auto;
        overflow-y: scroll;
        background-color: rgba(1, 1, 1, .5);
        border-radius: 20px;
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
        .tag {
            padding: 10px 10px;
            border-bottom: 1px dashed #fff;
            font-size: 22px;
        }
        .nav-list {
            display: block;
            padding-left: 30px;
            line-height: 40px;
            color: #fff;
            font-size: 16px;
            letter-spacing: 1px;
        }
    }
</style>
