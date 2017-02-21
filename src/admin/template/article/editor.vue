<template>
    <section id="edit">
        <textarea id="editor" name="editor" @change="showInfor"></textarea>
        <div id="show"></div>
    </section>
</template>

<script>
    import LanEditor from "../../js/LanEditor.js";
    
    export default {
        data () {
            return {
                title: 'editor',

            }
        },
        mounted () {
            // 删去上次的缓存
            let sessionArticleName = '';
            let sessionNames = [];
            for (let sessionName in localStorage) {
                sessionNames.push(sessionName);
            }
            sessionNames.forEach((val, idx, arr) => {
                if (val.match(/\d+\$article/g)) {
                    sessionArticleName = val;
                }
            });
            localStorage.removeItem(sessionArticleName);

            $(document).ready(function(){
                var lan = LanEditor.init({
                    textelem: "editor",
                    showelem: "show",
                    PluginsMode: false
                });
                if (lan.status == false){
                    return ;
                } else {
                    // 默认保存LanEditor快速指南文件
                    // 获取文件创建的时间
                    var createTime = LanEditor.Time.GetTimestamp();
                    // 文件名
                    LanEditor.File.CurOpenFile.name = "article";
                    // 创建时间
                    LanEditor.File.CurOpenFile.time = createTime;
                    // 保存文件
                    LanEditor.File.SaveFile();
                    // 渲染
                    LanEditor.RenderHTML();
                }
            });
        },
        methods: {
            showInfor: function () {
                // console.log(document.querySelector('#editor').innerHTML);
                // console.log($('#editor').text());
            }
        }
    }
</script>

<style lang="less">
    #edit {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    #editor {
        box-sizing: border-box;
        float: left;
        padding: 5px;
        width: 50%;
        height: 100%;
        border: 1px solid #ccc;
    }
    #show {
        box-sizing: border-box;
        float: left;
        padding: 5px;
        width: 50%;
        height: 100%;
        font-size: 14px;
        color: #fff;
        border-left: 1px dashed #666;
        background: #ccc;
    }
</style>