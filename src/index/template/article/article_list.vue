<template>
    <section class="article-list">
        <nav class="article-navigator">
            <ul v-for="(articles, tag) in tags" class="tag">
                <p> {{tag}} </p>
                <li v-for="article in articles" class="nav-list">
                    <router-link :to="{path: '/article/' + article.name}" hover class="nav-list_anchor">
                        {{article.name}}
                    </router-link>
                </li>
            </ul>
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
            });
        },
        components: {
            user,
        }
    }
</script>
<style lang="less">
    .article-navigator {
        height: 100%;
        background-color: rgba(1, 1, 1, .5);
        color: #fff;
        &::-webkit-scrollbar {
            width: 0;
        }
        .tag {
            padding: 10px 10px;
            border-bottom: 1px dashed #fff;
            font-size: 22px;
        }
        .nav-list {
            padding-left: 30px;
            line-height: 40px;
            font-size: 16px;
            letter-spacing: 1px;
            list-style: disc inside;
            &_anchor {
                color: #fff;
            }
        }
    }
</style>
