<template>
    <div class="app">
        <div class="admin-left">
            <user></user>
            <navigator></navigator>
        </div>
        <div class="admin-right">
            <router-view></router-view>
        </div>

        <!-- <editor></editor>     -->
    </div>
</template>

<script>

    import editor from './public/editor.vue';
    import user from './public/user.vue';
    import navigator from './public/navigator.vue';

    export default {
        data() {
            return {
                title: 'idsbllp',
            }
        },
        components: {
            editor,
            user,
            navigator,
        }
    }
</script>
<style lang="less">
    .admin-left {
        position: fixed;
        top: 0;
        width: 250px;
        height: 100%;
        background: #ccc;
        z-index: -1;
        border-right: 1px solid #ddd;
    }
    .admin-right {
        position: fixed;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        left: 250px;
        background: #aaa;
        z-index: -2;
        border-left: 1px solid #bbb;
        overflow-x: hidden;
        overflow-y: scroll; 
    }
</style>