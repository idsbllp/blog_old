<template>
    <div class="app">
        <headers></headers>
        <bg></bg>
        <article-list>
            
        </article-list>
    </div>
</template>

<script>
    import headers from './public/header.vue';
    import bg from './public/bg.vue';
    import articleList from './public/list.vue';
    import '../img/asd.jpg';

    export default {
        el: '#app',
        data() {
            return {
                title: 'idsbllp',
            }
        },
        components: {
            headers,
            bg,
            articleList,
        }
    }
</script>
<style>

</style>