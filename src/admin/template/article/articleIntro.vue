<template>
    <article class="article-list">
        <h2 class="article-name">
            {{article.name}}
            <router-link :to="{path: '/index/article-tags/' + lable}" v-for="lable in article.tag_name" class="lable" v-bind:class="{'no-tag': lable === '暂无标签'}">{{lable}}</router-link>
            <router-link :to="{path: '/index/modify/' + article.name}" class="modify-btn">修改</router-link>
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
        .no-tag {
            background: #999;
            color: #fff;
        }
    }
    .lable {
        margin-left: 15px;
        padding: 2px 10px 2px 13px;
        font-size: 20px;
        color: #fff;
        line-height: 0;
        text-align: center;
        vertical-align: middle;
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
        pre, img, blockquote {
            display: none;
        }
    }
    .modify-btn {
        float: right;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        margin-right: 30px;
        background: #ccc;
        color: #999;
        border-radius: 5px;
        &:hover {
            text-decoration: none;
        }
    }
    .article-time {
        color: #666;
        letter-spacing: 0;
        font-style: italic;
    }
</style>