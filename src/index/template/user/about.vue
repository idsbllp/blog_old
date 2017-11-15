<template>
    <section>
        <div class="article-content" v-if="infor" v-compiledMarkdown="infor"></div>
    </section>
</template>

<script>
    export default {
        data () {
            return {
                infor: 
`
## <span hover>IDSBLLP</span>


`
            }
        },
        mounted () {
            // marked.setOptions({
            //     renderer: new marked.Renderer(),
            //     gfm: true,
            //     tables: true,
            //     breaks: false,
            //     pedantic: false,
            //     sanitize: false,
            //     smartLists: true,
            //     smartypants: false,
            //     highlight: function (code) {
            //         return hljs.highlightAuto(code).value;
            //     }
            // });
        },
        directives: {
            compiledMarkdown: {
                bind (el, binding) {
                    el.innerHTML = marked(binding.value);
                }
            }
        },
    }
</script>

<style lang="less">
    
</style>