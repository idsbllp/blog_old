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

### 个人介绍

##### 本人李立平，网名 idsbllp , 其实我也不知道这是什么意思。 19 年毕业生。 学习前端开发中.

***

之前就一直有个想法写一个，但是一只没做，这个寒假闲着没事，就边学习边做咯。 ThinkPHP5+Vue+VueRouter（由于项目不算大，没有使用vuex）。markdown 编辑器没有使用vue原生的，而是GitHub找了一个， [@ LanEditor](https://github.com/EcjtuNet/LanEditor/)

### 进度：

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
    - 开学了，学习(耍)之中。。。
+ 2017-3-26
    - 一个月，学习(学)一个月，终于腾出点时间写了这个修改文章
+ 2017-11-14
    - 又没事了，改一下样式
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