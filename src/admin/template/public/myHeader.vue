<template>
    <header class="admin-header fonts" hover>
        {{userInfor.username.toUpperCase()}}
    </header>
</template>

<script>
    export default {
        props: ['userInfor'],
        data () {
            return {
                // userInfor: {
                //     username: 'llp'
                // }
            }
        },
        mounted () {
            this.userInfor.username = 'idsbllp';
        }
    }
</script>

<style lang="less">
    .admin-header {
        position: relative;
        z-index: 4;
        height: 78px;
        text-align: center;
        font-size: 48px;
        color: #aaa;
        line-height: 78px;
        background-color: rgba(122, 122, 122, .5);
        background: #fff;
        border-bottom: 1px solid #f1f1f1;
        transition: color .3s;
    }
</style>
