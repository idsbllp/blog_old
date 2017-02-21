<?php
namespace app\admin\controller;

use think\Controller;
use app\admin\model\Article;
use think\Request;

class Index extends Controller
{
    public function index() {

        $title = '后台管理';
        $this->assign('title', $title);
        return $this->fetch();        
    }
    public function getAllTags() {
        // dump(Article::tags());
        $tags = Article::tags();
        // $blogs = '';
        // foreach ($tags as $key => $value) {
        //     foreach ($value as $key => $value) {
        //         if ($key === 'blogs') {
        //             $blogs .= $value . '\n';

        //         }
        //     }
        // }
        // $blogs = explode('\n', $blogs);
        // array_pop($blogs);

        // dump($blogs);
        return $tags;


        // $tags = Article::tags();
        // $tagsString = '';
        // foreach ($tags as $key => $value) {
        //     $tagsString = $tagsString . $value['tag_name'] . ',';
        // }
        // $tagsString = array_unique(explode(',', $tagsString));
        // $res = [];
        // $index = 0;
        // foreach ($tagsString as $key => $value) {
        //     $res[$index++]["tag_name"] = $value;
        // }
        // array_pop($res);
        // return $res;
        // dump($res);
    }
    public function getArtileByTag() {
        $request = Request::instance();
        $tag = $request->param()['tag'];
        $res = Article::getArtileByTag($tag);
        // dump($res);
        return $res;
    }
    public function getAllArticle() {
        $res = Article::getAllArticle();
        // $res =base64_encode(json_encode($res));
        // dump($res);
        return $res;
    }
    public function addArticle() {
        $request = Request::instance();
        $method = $request->method();

        if ('POST' === strtoupper($method)) {
            $article = $request->param();
            $res = Article::addArticle($article);
            if ($res) {
                return [
                    'status' => '添加文章成功',
                    'code' => $res
                ];
            } else {
                return [
                    'status' => '文章名重复',
                    'code' => $res
                ];
            }
        } else {
            return [
                'status' => 'POST only',
                'code' => 0
            ];
        }
        return [
            'status' => '添加文章成功',
            'code' => $res
        ];
    }
}