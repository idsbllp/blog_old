<template>
    <article class="article-list">
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
    </article>
</template>

<script>
    // import marked from 'marked';
    // import highlight from 'highlight.js';

    if (!Date.prototype.format) {
        Date.prototype.format = function(format) {
            var o = {
                "M+": this.getMonth() + 1, //month
                "d+": this.getDate(), //day
                "h+": this.getHours(), //hour
                "m+": this.getMinutes(), //minute
                "s+": this.getSeconds(), //second
                "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                "S": this.getMilliseconds() //millisecond
            }
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1,(this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o){
                if (new RegExp("(" + k + ")").test(format)){
                    format = format.replace(RegExp.$1,RegExp.$1.length == 1 ? o[k] :("00" + o[k]).substr(("" + o[k]).length));
                }
            }
            return format;
        };
    }

    export default {
        props: ['article'],
        data () {
            return {

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
        },
        directives: {
            compiledMarkdown: {
                bind: function(el){
                    el.innerHTML = marked(el.innerText);
                    if(el.querySelector('pre')){
                        el.querySelector('pre').style.display = "none"
                    }
                    if(el.querySelector('blockquote')){
                        el.querySelector('blockquote').style.display = "none"
                    }
                }
            }
        },
    }
</script>

<style lang="less">
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
        font-family: inherit;
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
</style>