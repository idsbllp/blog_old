<template>
    <section id="edit">
        <textarea id="editor" name="editor"></textarea>
        <div id="show"></div>
    </section>
</template>

<style lang="less">
    #edit {
        width: 1000px;
        height: 600px;
        border-right: 1px dashed #666;
        padding: 5px;
        overflow: hidden;
    }
    #editor {
        float: left;
        padding: 5px;
        width: 49%;
        height: 100%;
        background: #fff;
    }
    #show {
        float: left;
        width: 49%;
        height: 100%;
        overflow: auto;
        right: 0px;
        top: 0px;
        padding: 5px;
        font-size: 14px;
        font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
        border-left: 1px dashed #666;
        background: #ccc;
        color: #fff;
    }
</style>
<script>
    import LanEditor from "../../js/LanEditor.js"
    
    export default {
        data () {
            return {
                title: 'editor'
            }
        },
        mounted () {

            $(document).ready(function(){
                var lan = LanEditor.init({
                    textelem: "editor",
                    showelem: "show",
                    PluginsMode: false
                });
                if (lan.status == false){
                    console.log(lan.message);
                    return ;
                } else {
                    // 默认保存LanEditor快速指南文件
                    // 获取文件创建的时间
                    var createTime = LanEditor.Time.GetTimestamp();
                    // 文件名
                    LanEditor.File.CurOpenFile.name = "LanEditor快速指南";
                    // 创建时间
                    LanEditor.File.CurOpenFile.time = createTime;
                    // 保存文件
                    LanEditor.File.SaveFile();
                    // 渲染
                    LanEditor.RenderHTML();
                }
            });
        },
    }
</script>