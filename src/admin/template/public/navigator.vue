<template>
    <nav class="user-infor-nav">
        <router-link to="/about-article" hover class="nav-list">我的动态</router-link>
        <router-link to="/all-article" hover class="nav-list">全部文章</router-link>
        <router-link to="/article-tags" hover class="nav-list">标签管理</router-link>
    </nav>
</template>

<script>
    export default {

    }
</script>

<style lang="less">
    .nav-list {
        display: block;
        height: 40px;
        line-height: 40px;
        color: #fff;
        font-size: 16px;
        text-align: center;
        border-bottom: 1px solid #737272;
    }
    .router-link-active {
        color: #007fff;
        text-decoration: underline;
    }
</style>