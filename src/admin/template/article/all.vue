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
                this.articles = res.body;
            });
        },
    }
</script>

<style lang="less">
    
</style>