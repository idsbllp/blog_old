<template>
    <section>
        <template v-if="articlesOfTag.length === 0">
            <h2 class="no-article">这个标签下暂无文章</h2>
        </template>
        <template v-else v-for="article in articlesOfTag">
            <articleIntro :article="article"></articleIntro>
        </template>
    </section>
</template>

<script>
    import articleIntro from './articleIntro.vue';
    export default {
        components: {
            articleIntro
        },
        data () {
            return {
                // 一个标签的所有文章
                articlesOfTag: []
            }
        },
        mounted () {
            let tag = this.$route.params.tag;
            this.getArtileByTag(tag);
        },
        methods: {
            getArtileByTag (tag) {
                if (typeof tag === 'string' && tag.length > 1) {
                    // 本地储存
                    let sessionOfTagArticles = sessionStorage.getItem(tag);
                    if(sessionOfTagArticles) {
                        this.articlesOfTag = [];
                        setTimeout(() => {
                            this.articlesOfTag = JSON.parse(sessionOfTagArticles);
                        }, 1);
                    } else {
                        this.$http.get(`/blog/public/admin/index/getArtileByTag/tag/${tag}`).then(res => {
                            this.articlesOfTag = [];
                            return res.body;
                        }).then(articles => {
                            this.articlesOfTag = articles;
                            sessionStorage.setItem(tag, JSON.stringify(articles));
                        });
                    }
                } else {
                    this.articlesOfTag = [];
                }
            }
        },
        watch: {
            $route (to, from) {
                let tags = to.path.split('/');
                let tag = tags.pop();
                this.getArtileByTag(tag);
            }
        }
    }
</script>

<style lang="less">
    .no-article {
        padding-left: 20px;
        color: #333;
    }
</style>