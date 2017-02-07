<template>
    <main class="homepage">
        <nav class="hp-navigator">
            <ul>
                <li v-for="blog in blogs" class="tags">
                    {{blog.name}}
                </li>
            </ul>
        </nav>
        <article class="hp-list">
            
        </article>
    </main>
</template>
<style lang="less">
    .hp-navigator {
        position: fixed;
        top: 78px;
        width: 30%;
        height: 100%;
        overflow-x: auto;
        overflow-y: scroll;
        background-color: rgba(1, 1, 1, .5);
        color: #fff;
        &::-webkit-scrollbar {
            width: 10px;
            padding: 0 10px;
        }
        &::-webkit-scrollbar-track {
            border-radius: 5px;
            background: rgba(1, 1, 1, .5);
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background: rgba(255, 255, 255, .5);
        }
        &::-webkit-scrollbar-thumb:hover {
            border-radius: 5px;
            background: rgba(255, 255, 255, .7);
        }
        &::-webkit-scrollbar-thumb:window-inactive {
            background: rgba(255, 255, 255, .8);
        }
        .tags {
            width: 100%;
            height: 60px;
        }
    }
    .hp-list {
        position: fixed;
        top: 78px;
        left: 30%;
        width: 70%;
        height: 100%;
        background: #ccc;
        opacity: .5;
    }

</style>
<script>
    export default {
        data () {
            return {
                blogs: [
                    {
                        name: 'llp1',
                        brief: 'brief1'
                    },
                    {
                        name: 'llp2',
                        brief: 'brief2'
                    },
                    {
                        name: 'llp3',
                        brief: 'brief3'
                    },
                    {
                        name: 'llp4',
                        brief: 'brief4'
                    },
                    {
                        name: 'llp4',
                        brief: 'brief4'
                    },
                ]
            }
        }
    }
</script>