<template>
    <main class="tags-con">
        <nav class="tag-infor-nav">
            <template  v-for="tag in tags">
                <router-link :to="{path: '/index/article-tags/' + tag}" hover class="nav-list" v-bind:class="{'no-tag': tag === '暂无标签'}">
                    {{tag}}
                </router-link>
            </template>
            <div class="nav-list add-tag" v-on:click="addTag">添加标签</div>
            <div class="add-tag_con" v-if="inputtingTag">
                <input type="text" class="add-tag_input" v-focus placeholder="六字以内" v-on:keyup.enter="submitAddTag" v-on:blur="cancleAddTag">
            </div>
        </nav>
        <section class="tag-infor-con">
            <router-view></router-view>
        </section>
    </main>
</template>

<script>
    import editor from './editor.vue';
    export default {
        components: {
            editor,
        },
        data () {
            return {
                tags: [],
                inputtingTag: false
            }
        },
        mounted () {
            this.$http.get('/blog/public/admin/index/getAllTags').then(res => {
                this.tags = res.body;
            });
        },
        methods: {
            addTag () {
                this.inputtingTag = true;
            },
            submitAddTag (e) {
                let value = e.target.value;
                if (value.trim() === '') {
                    this.inputtingTag = false;
                    return;
                } else {
                    if (value.trim().length > 6) {
                        swal('限六字以内');
                    } else if (~this.tags.indexOf(value)) {
                        swal('标签已存在，请重新输入');
                        return;
                    } else {
                        this.$http.post('/blog/public/admin/index/addTag', {
                            tag: value
                        }).then(res => {
                            res = res.body;
                            if (res.code) {
                                this.tags.push(value);
                            } else {
                                swal('添加失败, 原因:', res.status);
                            }
                        });
                    }
                }
            },
            cancleAddTag (e) {
                this.inputtingTag = false;
            }
        },
        directives: {
            focus: {
                inserted (el) {
                    el.focus();
                }
            }
        }
    }
</script>

<style lang="less">
    .tags-con {
        box-sizing: border-box;
        position: absolute;
        z-index: 3;
        top: 0;
        left: 0;
        padding-top: 78px;
        width: 100%;
        height: 100%;
    }
    .tag-infor-nav {
        float: left;
        width: 150px;
        height: 100%;
        background: #dbdbdb;
        .nav-list {
            display: block;
            font-size: 20px;
        }
        .no-tag {
            color: #3f2c2c;
        }
    }
    .tag-infor-con {
        height: 100%;
        background: #e9e9e9;
        overflow: scroll;
        .router-link-active {
            text-decoration: none;
        }
    }
    .add-tag {
        color: #333;
        cursor: pointer;
    }
    .add-tag_input {
        margin-top: 10px;
        box-sizing: border-box;
        width: 100%;
        height: 30px;
    }
</style>