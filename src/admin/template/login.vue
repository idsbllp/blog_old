<template>
    <div id="login">
        <canvas id="canvas"></canvas>
        <div class="login">
            <form method="POST" class="login-form">
                <p>用户名</p>
                <input v-model="username" type="text" class="username" name="username" placeholder="帐号">
                <p>密码</p>
                <input v-model="password" type="password" class="password" name="password" placeholder="密码">
                <input type="button" value="登录" id="loginBtn" v-on:click="gotoLogin">
            </form>
        </div>
    </div>
</template>

<script>
    import bg from '../js/canvas.js';
    export default {

        beforeCreate () {
            const llp = sessionStorage.getItem('llp');
            if (llp) {
                location.href = '/blog/public/admin/#/';
            }
        },
        mounted () {
            bg();
        },
        methods: {
            gotoLogin () {
                const username = this.username;
                const password = this.password;
                if (!username.trim() || !password.trim()) {
                    sweetAlert('请输入账号或者密码', '', 'error');
                    return;
                }
                this.$http.post('/blog/public/admin/index/doLogin', {
                    username,
                    password
                }).then(res => {
                    res = res.body;
                    console.log(res);
                    if (res.code) {
                        sessionStorage.setItem('llp', 'llp');
                        location.href = '/blog/public/admin/#/';
                    }
                });
            }
        }
    }
</script>
<style lang="less">
    #canvas {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    #login {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .login {
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 300px;
        height: 222px;
        background-color: rgb(204, 204, 204);
        border: 2px double #ccc;
        box-shadow: 0 0 10px #ccc;
        &-form {
            margin: 0 auto;
            width: 230px;
            height: 222px;
        input {
            display: block;
            padding-left: 27px;
            color: #0e8c3c;
            outline: 0px;
            height: 30px;
            width: 200px;
            border: 1px solid #ccc;
            border-radius: 5px;
            &:focus {
                outline: 0;
            }
        }
        }
        p {
            color: white;
        }
    }
    #loginBtn {
        margin-top: 20px;
        padding-left: 0;
        width: 230px;
        height: 35px;
        font-size: 14px;
        letter-spacing: 3px;
        color: #fff;
        border-radius: 5px;
        background: #46Ae00;
        box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
        cursor: pointer;
    }
    .login-btn:hover {
        background: #339b00;
    }

</style>