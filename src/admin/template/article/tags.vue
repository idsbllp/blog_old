<template>
    <main class="tags-con">
        <nav class="tag-infor-nav">
            <template  v-for="tag in tags">
                <router-link :to="{path: '/index/article-tags/' + tag}" hover class="nav-list" v-bind:class="{'no-tag': tag === '暂无标签'}">
                    {{tag}}
                </router-link>
            </template>
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