<template>
    <section class="add-article-con">
        <h3>添加文章</h3>
        <div class="add-content">
            <input v-model="name" type="text" class="article_name" placeholder="请输入文章标题">
            <div class="article_tags">
                标签: <input v-model="tag">
            </div>
            <textarea v-model="brief" type="text" class="article_brief" placeholder="请输入文章简介"></textarea>
            <h4>输入文章信息</h4>
            <div class="article_content">
                <editor :content.sync="content"></editor>
            </div>
            <div class="submit" v-on:click="submitModifyArticle">提交</div>
        </div>
    </section>
</template>

<script>
    import editor from './editor.vue';

    export default {
        components: {
            editor
        },
        data () {
            return {
                inputtingTag: false,
                tag: '',
                name: '',
                brief: '',
                content: ''
            }
        },
        mounted () {
            const articleName = this.$route.params.article;
            if (articleName) {
                const url = `/blog/public/admin/index/getArticleByName/name/${articleName}`;
                this.$http.get(url).then(res => {
                    if (res.body.length > 0) {
                        res = JSON.parse(res.body);
                        let article = res[0];

                        console.log(article);

                        const {name, brief, content, tag, id} = article;
                        this.articleId = id;
                        this.name = name;
                        this.brief = brief;
                        this.content = content;
                        this.contentCopy = content;
                        this.tag = tag;
                        var e = new KeyboardEvent("keyup", {bubbles : true, cancelable : true, key : "Q", char : "Q", shiftKey : true});
                        $('#editor')[0].dispatchEvent(e);
                    } else {
                        this.redirectToErrorPage();
                    }
                });
            } else {
                this.redirectToErrorPage();
            }
        },
        methods: {
            submitModifyArticle () {
                let article = {
                    id: this.articleId,
                    name: this.name,
                    tag: this.tag || '暂无标签',
                    brief: this.brief || '',
                    content: this.contentCopy,
                    date: Date.now()
                };
                // 判断输入
                if (!article.name) {
                    swal('请输入文章标题！');
                    return;
                }
                // 获取输入的文章内容
                let content = '';
                for (let sessionName in window.localStorage) {
                    if (sessionName.match(/\d+\$article/g)) {
                        let val = window.localStorage[sessionName];
                        content = val;
                    }
                }

                if (!content && !this.content) {
                    swal('请输入文章内容！');
                    return;
                } else if (content) {
                    article.content = content;
                }

                this.$http.post('/blog/public/admin/index/modifyArticle', {
                    article: JSON.stringify(article)
                }).then(res => {
                    res = JSON.parse(res.body);
                    if (res.code) {
                        swal({
                            title: res.status,
                            type: 'success'
                        }, () => {
                            this.$router.replace({
                                name: '$index'
                            });
                        });
                    } else {
                        swal(res.status, '', 'error');
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            redirectToErrorPage () {
                this.$router.replace({
                    name: '$404'
                });
            }
        },
        directives: {
            focus: {
                inserted (el) {
                    el.focus();
                }
            },
        }
    }
</script>

<style lang="less">
    .add-article-con {
        padding-left: 10px;
        padding-right: 10px;
    }
    .add-content {
        position: relative;
        margin-bottom: 20px;
        padding: 10px;
        padding-bottom: 70px;
        border-radius: 10px;
        box-shadow: 1px 1px 10px #dbdcdc, -1px -1px 10px #dbdcdc, -1px 1px 10px #dbdcdc, 1px -1px 10px #dbdcdc;
        border: 1px solid #ccc;
    }
    .article_name {
        display: block;
        width: 95%;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .article_tags {
        margin: 15px 0;
        font-size: 18px;
        color: #333;
        .tag {
            margin: 0 5px;
            padding: 5px 10px;
            color: #fff;
            font-size: 16px;
            border-radius: 3px;
            background: #007fff;
            cursor: pointer;
        }
        .add-tag_con {
            margin-top: 10px;
        }
        .add-tag_input {
            width: 160px;
            height: 30px;
            font-size: 14px;
            line-height: 30px;
        }
        .add-tag_btn {
            margin-right: 5px;
            padding: 5px 10px;
            color: #fff;
            font-style: normal;
            font-size: 16px;
            border-radius: 3px;
            background: #ccc;
            cursor: pointer;
            &:focus {
                outline: none;
            }
        }
    }
    .article_brief {
        width: 95%;
        height: 40px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    .article_content {
        width: 96%;
        height: 600px;
    }
    .submit {
        position: absolute;
        bottom: 15px;
        right: 40px;
        width: 70px;
        height: 30px;
        background: #007fff;
        color: #fff;
        font-size: 20px;
        text-align: center;
        line-height: 30px;
        border-radius: 5px;
        cursor: pointer;
    }
</style>