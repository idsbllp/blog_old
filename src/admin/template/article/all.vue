<template>
    <main>
        <template v-for="article in articles">
            <article-intro :article.sync="article"></article-intro>
        </template>
    </main>
</template>

<script>
    import articleIntro from './articleIntro.vue';

    export default {
        components: {
            articleIntro
        },
        data () {
            return {
                articles: []
            }
        },
        mounted () {
            this.$http.get('/blog/public/admin/index/getAllArticle').then(res => {
                res = JSON.parse(res.body);
                this.articles = res;
            });
        },
    }
</script>

<style lang="less">
    
</style>