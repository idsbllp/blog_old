<template>
    <div class="apps">
        <headers></headers>
        <bg class="asd"></bg>
    </div>
</template>

<script>
    import headers from './public/header.vue';
    import bg from './public/bg.vue';

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
        }
    }
</script>
<style>
    body {
        margin: 0;
    }
</style>