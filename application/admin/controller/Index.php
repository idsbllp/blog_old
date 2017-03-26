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
        $tags = Article::tags();
        return $tags;
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
    public function addTag() {
        $request = Request::instance();
        $tag = $request->param()['tag'];
        if ('POST' === strtoupper($request->method())) {
            $res = Article::addtag($tag);
            return [
                'status' => '添加标签成功',
                'code' => $res
            ];
        } else {
            return [
                'status' => 'POST only',
                'code' => 0
            ];
        }
    }
    public function getArticleByName() {
        $request = Request::instance();
        $articleName = $request->param()['name'];
        $res = Article::getArticleByName($articleName);
        return $res;
    }
    public function addArticle() {
        $request = Request::instance();

        if (strtoupper($request->method()) !== 'POST') {
            return [
                'code' => 0,
                'status' => 'method error, POST only'
            ]; 
        }

        $article = $request->param();
        $res = Article::addArticle($article);
        if ($res) {
            return [
                'status' => '添加文章成功',
                'code' => 1
            ];
        } else {
            return [
                'status' => '文章名重复',
                'code' => 0
            ];
        }
    }
    public function modifyArticle() {
        $request = Request::instance();
        if (strtoupper($request->method()) !== 'POST') {
            return [
                'code' => 0,
                'status' => 'method error, POST only'
            ]; 
        }
        $article = $request->param();
        $res = Article::modifyArticle($article);
        if ($res) {
            return [
                'status' => '更新文章成功',
                'code' => 1
            ];
        } else {
            return [
                'status' => '更新失败',
                'code' => 0
            ];
        }
    }
}