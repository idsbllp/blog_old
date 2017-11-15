<template>
    <div class="blog">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        // 检测登录
        async beforeCreate() {
            let isLogin = await this.$http.get('/blog/public/admin/index/isLogin')
            isLogin = JSON.parse(isLogin.body);
            if (sessionStorage.getItem('username') && isLogin.code) {
                location.href = '/blog/public/admin/#/'
            } else {
                location.href = '/blog/public/admin/#/login';
            }
            this.$http.get('/blog/public/admin/index/getuser').then(res => {
                this.userInfo = res.body[0];
            });
        },
    }
</script>