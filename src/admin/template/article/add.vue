<template>
    <section class="add-article-con">
        <h3>添加文章</h3>
        <div class="add-content">
            <input type="text" class="article_name" placeholder="请输入文章标题">
            <div class="article_tags" v-on:click="deleteTag">
                标签: <span class="tag" v-for="tag in tags">{{tag}}</span>
                <div class="add-tag_con" v-if="inputtingTag">
                    <input type="text" class="add-tag_input" v-focus placeholder="六字以内" v-on:keyup.enter="submitAddTag">
                    <input type="submit" class="add-tag_btn" value="提交" v-on:click="submitAddTag">
                    <input type="submit" class="add-tag_btn" value="取消" v-on:click="cancleAddTag">
                </div>
                <i class="add-tag_btn" v-on:click="addTag" v-if="!inputtingTag">添加</i>
            </div>
            <textarea type="text" class="article_brief" placeholder="请输入文章简介"></textarea>
            <h4>输入文章信息</h4>
            <div class="article_content">
                <editor></editor>
            </div>
            <div class="submit" v-on:click="submitAddArticle">提交</div>
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
                tags: [],
            }
        },
        methods: {
            deleteTag: function (e) {
                let target = e.target;
                if (target.nodeName.toLowerCase() === 'span') {
                    let tag = target.innerText;
                    let index =  this.tags.indexOf(tag);

                    swal({
                        title: `你确定要删除 ${tag} 吗?`,
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确认删除",
                        closeOnConfirm: false
                    }, () => {
                        this.tags.splice(index, 1);
                        swal("删除成功!", '', "success");
                    });

                    // let isDelete = confirm(`你确定要删除 ${tag} 吗?`);
                    // if (isDelete) {
                    //     this.tags.splice(index, 1);
                    // }
                }
            },
            addTag: function () {
                this.inputtingTag = true;
            },
            submitAddTag: function (e) {
                let tag = $('.add-tag_input').val().trim();
                if (tag.length > 6) {
                    // console.log('输入太长');
                    swal('标签名太长');
                    return;
                }
                if (tag.length === 0) {
                    swal('请输入标签名')
                    // console.log('请输入标签名');
                    return;
                }
                if (~this.tags.indexOf(tag)) {
                    swal('标签已存在，请重新输入');
                    // console.log('已存在，请重新输入');
                } else {
                    this.tags.push(tag);
                    this.inputtingTag = false;
                }
            },
            cancleAddTag: function () {
                this.inputtingTag = false;
            },
            saveArticletoSession: function () {
                console.log('update')
            },
            submitAddArticle: function () {
                let article = {
                    id: null,
                    name: $('.article_name').val().trim(),
                    tags: this.tags,
                    brief: $('.article_brief').val().trim(),
                    content: '',
                    date: Date.now()
                };
                // 判断输入
                if (!article.name) {
                    swal('请输入文章标题！');
                    return;
                }

                // 发送数据 并存sessionStorage
                // 获取输入的文章内容
                let sessionArticleName = '';
                let sessionNames = [];
                for (let sessionName in localStorage) {
                    sessionNames.push(sessionName);
                }
                sessionNames.forEach((val, idx, arr) => {
                    if (val.match(/\d+\$article/g)) {
                        sessionArticleName = val;
                    }
                });
                article.content = localStorage.getItem(sessionArticleName);
                if (!article.content) {
                    swal('请输入文章内容！');
                    return;
                }
                // 保存session
                sessionStorage.setItem('sessionArticle', JSON.stringify(article));

                this.$http.post('/blog/public/admin/index/addArticle', {
                    article: JSON.stringify(article)
                }).then(res => {
                    res = res.body;
                    if (res.code) {
                        swal(res.status, '', 'success');
                    }
                })
            }
        },
        directives: {
            focus: {
                inserted: function (el) {
                    el.focus();
                }
            },
            // saveArticletoSession: {
            //     update: function () {
            //         console.log('update');
            //     }
            // }
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
    }
</style>