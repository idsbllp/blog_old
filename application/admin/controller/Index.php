<?php
namespace app\admin\controller;

use think\Controller;

class Index extends Controller
{
    public function index()
    {
        $title = '后台管理';
        $this->assign('title', $title);
        return $this->fetch();        
    }
}
