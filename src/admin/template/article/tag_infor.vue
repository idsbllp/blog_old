<template>
    <section>
        {{$route.params.tag}}
    </section>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        mounted () {
            
            console.log(this.$route.params.tag);
        },
        watch: {
            $route (to, from) {
                // console.log(to);
            }
        }
    }
</script>

<style lang="less">
    
</style>