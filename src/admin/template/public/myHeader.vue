<template>
    <header class="admin-header">
        {{userInfor.username}}
    </header>
</template>

<style lang="less">
    .admin-header {
        height: 75px;
        background: #f4f4f6;
    }
</style>

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
            console.log(this.$http);
            this.userInfor.username = 'llp';
        }
    }
    // import '../public/user.vue'
</script>