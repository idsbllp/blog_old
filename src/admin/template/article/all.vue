<template>
    <main>
        <template v-for="article in articles">
            <!-- <article class="article-list">
                <h2>
                    {{article.name}}
                    <router-link :to="{path: '/article-tags/' + lable}" v-for="lable in article.tag_name" class="lable">{{lable}}</router-link>
                </h2>
                <div class="article-brief">
                    {{article.brief}}
                </div>
                <div class="article-content" v-compiledMarkdown>{{article.content}}</div>
                <time class="article-time">
                    {{new Date(article.date).format('yyyy-MM-dd hh:mm:ss')}}
                </time>
            </article> -->
            <article-intro :article.sync="article"></article-intro>
        </template>
    </main>
</template>

<script>
    import marked from 'marked';
    import articleIntro from './articleIntro.vue';

    export default {
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
        components: {
            articleIntro
        },
    }
</script>

<!-- <style lang="less">
    .article-list {
        margin-top: -20px;
        margin-left: 10px;
        padding-top: 10px;
        padding-left: 20px;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        &:last-child {
            border-bottom: none;
        }
    }
    .lable {
        margin-left: 15px;
        padding-left: 15px;
        padding-right: 12px;
        font-size: 20px;
        color: #fff;
        line-height: 0;
        text-align: center;
        background: #007fff;
        border-radius: 5px;
    }
    .article-brief {
        font-size: 18px;
        color: #455336;
    }
    .article-content {
        padding-left: 22px;
        font-size: 20px;
        color: #000;
    }
    .article-time {
        color: #666;
        letter-spacing: 0;
        font-style: italic;
    }
</style> -->