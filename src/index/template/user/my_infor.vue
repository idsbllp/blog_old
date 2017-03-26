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
## IDSBLLP 博客网

之前就一直有个想法写一个，但是一只没做，这个寒假闲着没事，就边学习边做咯。 ThinkPHP+vue+vue-router（由于项目不大，没有使用vuex）。markdown 编辑器没有使用vue原生的，而是GitHub找了一个，感谢 [@ LanEditor](https://github.com/EcjtuNet/LanEditor/)

#### 进度：

+ 2017-1-28 
    - 开始构建项目，添加vue
+ 2017-1-30
    - 添加webpack打包
+ 2017-2-8
    - 更改后端composer
+ 2017-2-13
    - 添加markdown编辑器
+ 2017-2-14
    - 决定使用vue-router
+ 2017-2-18
    - 开始写后端
    - 所有文章，标签部分完成
+ 2017-2-22
    - 添加文章部分完成
+ 2017-2-24
    - 开学了，耍之中。。。
`
            }
        },
        mounted () {
            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                highlight: function (code) {
                    return hljs.highlightAuto(code).value;
                }
            });
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