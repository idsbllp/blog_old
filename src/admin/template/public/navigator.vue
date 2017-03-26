<template>
    <nav class="user-infor-nav">
        <router-link to="/all-article" hover class="nav-list">全部文章</router-link>
        <router-link to="/article-tags" hover class="nav-list">标签管理</router-link>
        <router-link to="/add-article" hover class="nav-list">添加文章</router-link>
    </nav>
</template>

<script>
    export default {

    }
</script>

<style lang="less">
    .user-infor-nav {
        
    }
    .nav-list {
        display: block;
        line-height: 40px;
        color: #fff;
        font-size: 16px;
        text-align: center;
        border-bottom: 1px dashed #fff;
        letter-spacing: 1px;
    }
    .router-link-active {
        color: #007fff;
        text-decoration: underline;
    }
</style>