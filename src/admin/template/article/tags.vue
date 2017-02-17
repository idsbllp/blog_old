<template>
    <main>
        <nav>
            
        </nav>
    </main>
</template>

<script>
    import editor from './editor.vue';
    export default {
        data () {
            return {

            }
        },
        monuted () {
            // this.$nextTick(() => {
                console.log(this);
            // }); 
        },
        components: {
            editor,
        }
    }
</script>

<style lang="less"></style>