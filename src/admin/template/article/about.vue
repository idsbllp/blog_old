<template>
    <main>
        <editor></editor>
    </main>
</template>

<script>
    import editor from './editor.vue';
    import LanEditor from "../../js/LanEditor.js";

    export default {
        
        components: {
            editor,
        },
        methods: {
            showInfor: function () {
                // console.log(LanEditor.GetRenderHTML());
            }
        }
    }
</script>

<style lang="less">
    
</style>