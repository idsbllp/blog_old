<template>
    <div class="app">
        <editor></editor>
    </div>
</template>

<script>
    import editor from './public/editor.vue';

    export default {
        el: '#app',
        data() {
            return {
                title: 'idsbllp',
            }
        },
        components: {
            editor,
        }
    }
</script>
<style>

</style>