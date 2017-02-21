<template>
    <main class="tags-con">
        <nav class="tag-infor-nav">
            <template  v-for="tag in tags">
                <router-link :to="{path: '/article-tags/' + tag.tag_name}" hover class="nav-list">
                    {{tag.tag_name}}
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
        data () {
            return {
                tags: []
            }
        },
        mounted () {
            this.$http.get('/blog/public/admin/index/getAllTags').then(res => {
                this.tags = res.body;
            });
        },
        components: {
            editor,
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
    }
    .tag-infor-con {
        height: 100%;
        background: #e9e9e9;
        overflow: scroll;
        .router-link-active {
            text-decoration: none;
        }
    }
</style>