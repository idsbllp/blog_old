<?php
namespace app\admin\controller;

use think\Controller;
use app\admin\model\Article;
use think\Request;

class Index extends Controller
{
    public function index(){

        $title = '后台管理';
        $this->assign('title', $title);
        return $this->fetch();        
    }
    public function getAllTags(){
        $tags = Article::tags();
        $tagsString = '';
        foreach ($tags as $key => $value) {
            $tagsString = $tagsString . $value['tag_name'] . ',';
        }
        $tagsString = array_unique(explode(',', $tagsString));
        $res = [];
        $index = 0;
        foreach ($tagsString as $key => $value) {
            $res[$index++]["tag_name"] = $value;
        }
        array_pop($res);
        return $res;
    }
    public function getArtileByTag(){
        $request = Request::instance();
        $tag = $request->param()['tag'];
        $res = Article::getArtileByTag($tag);
        // dump($res);
        return $res;
    }
    public function getAllArticle(){
        $res = Article::getAllArticle('be');
        // $res =base64_encode(json_encode($res));
        // dump($res);
        return $res;
    }
}