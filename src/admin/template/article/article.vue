<template>
    <article class="article-list">
        <h2 class="article-name">
            {{article.name}}
            <router-link :to="{path: '/article-tags/' + lable}" v-for="lable in article.tag_name" class="lable" v-bind:class="{'no-tag': lable === '暂无标签'}">{{lable}}</router-link>
        </h2>
        <div class="article-brief">
            {{article.brief}}
        </div>
        <div class="article-content" v-compiledMarkdown>{{article.content}}</div>
        <time class="article-time">
            {{new Date(article.date).format('yyyy-MM-dd hh:mm:ss')}}
        </time>
    </article>    
</template>

<script>
    
    export default {
        
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
        },
        directives: {
            compiledMarkdown: {
                bind: function(el){
                    el.innerHTML = marked(el.innerText);
                }
            }
        },
    }
</script>

<style lang="less">
    /*.article-content {
        pre, img, blockquote {
            display: none;
        }
    }*/
</style>