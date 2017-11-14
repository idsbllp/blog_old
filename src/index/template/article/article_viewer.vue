<template>
    <article>
        <div v-title v-if="article">{{article.name}}</div>
        <h1 class="title">{{article.name}}</h1>
        <div class="article-content" v-if="article" v-compiledMarkdown>{{article.content}}</div>
    </article>
</template>

<script>
    export default {
        data () {
            return {
                article: '',
            }
        },
        mounted () {
            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                highlight: function (code) {
                    return hljs.highlightAuto(code).value;
                }
            });
            this.getArticle(this.$route.params.articleName);
        },
        methods: {
            getArticle (articleName) {
                this.$http.get(`/blog/public/index/index/getArticleByName?name=${articleName}`).then(res => {
                    let article = res.body[0];
                    new Promise((resolve, reject) => {
                        resolve();
                    }).then(() => {
                        this.article = '';
                    }).then(() => {
                        this.article = article;
                    });
                });
            },
        },
        directives: {
            compiledMarkdown: {
                bind (el) {
                    el.innerHTML = marked(el.innerText);
                }
            }
        },
        watch: {
            $route (to, from) {
                this.getArticle(to.params.articleName);
            },
        }
    }
</script>

<style lang="less">
    .title {
        text-align: center;
    }
    .article-content {
        img {
            display: block;
            margin: 0 auto;
            max-width: 80%;
        }
    }
</style>
