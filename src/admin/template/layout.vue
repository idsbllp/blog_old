
<template>
    <div class="blog">
        <div class="admin-left">
            <user :userInfor.sync="userInfor"></user>
            <navigator></navigator>
        </div>
        <div class="admin-right">
            <myHeader :userInfor.sync="userInfor"></myHeader>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import user from './public/user.vue';
    import navigator from './public/navigator.vue';
    import myHeader from './public/myHeader.vue';

    export default {
        components: {
            user,
            navigator,
            myHeader,
        },
        beforeCreate () {
            const llp = sessionStorage.getItem('llp');
            if (!llp) {
                location.href = '/blog/public/admin/#/login';
            }
        },
        data () {
            return {
                title: 'idsbllp',
                userInfor: {
                    username: 'idsbllp',
                    realname: '李立平',
                },
            }
        }
    }
</script>

<style lang="less">
    .blog {
        position: relative;
        width: 100%;
        height: 100%;
    }
    .admin-left {
        position: absolute;
        top: 0;
        left: 0;
        width: 250px;
        height: 100%;
        background: #ccc;
        z-index: 2;
        border-right: 1px solid #ddd;
    }
    .admin-right {
        position: absolute;
        top: 0;
        left: 250px;
        right: 0;
        bottom: 0;
        background: #f8f9fa;
        z-index: 1;
        border-left: 1px solid #bbb;
        overflow-x: hidden;
        overflow-y: scroll;
        &::-webkit-scrollbar {
            width: 8px;
        }
        &::-webkit-scrollbar-track {
            /*box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);*/
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: #999;
        }
    }
</style>