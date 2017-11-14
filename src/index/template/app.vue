<template>
    <div class="app">
        <!-- <myHeader></myHeader> -->
        <bg></bg>
        <router-view :userInfor.sync="userInfor"></router-view>
    </div>
</template>

<script>
    // import myHeader from './public/header.vue';
    import bg from './public/bg.vue';

    export default {
        data() {
            return {
                title: 'idsbllp',
                userInfor: {
                    username: 'idsbllp',
                    realname: '李立平'
                },
            }
        },
        components: {
            // myHeader,
            bg,
        }
    }
</script>
<style>
    .app {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>