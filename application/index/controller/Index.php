<?php
namespace app\index\controller;

use think\Controller;

class Index extends Controller
{
    public function index() {
        $title = 'tp5';
        $this->assign('title', $title);
        return $this->fetch();
    }
    public function test() {
        return 'test';
    }
}
