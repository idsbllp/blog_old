<template>
    <main>
        <template v-for="article in articles">
            <article-intro :article.sync="article"></article-intro>
        </template>
    </main>
</template>

<script>
    // import marked from 'marked';
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
                let body = res.body;
                body.forEach(val => {
                    val['tag_name'] = val['tag_name'].split(',');
                });
                this.articles = body;
                // console.log(body);
            });
        },
    }
</script>

<style lang="less">
    
</style>