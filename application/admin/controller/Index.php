<?php
namespace app\admin\controller;

use think\Controller;
use app\admin\model\Article;

class Index extends Controller
{
    public function index(){

        $title = '后台管理';
        $this->assign('title', $title);
        return $this->fetch();        
    }
    public function getAllTags(){
        $res = Article::tags();
        // dump($res);
        return $res;
    }
}