<?php
namespace app\index\controller;

use think\Controller;
use think\Session;

class Test extends Controller
{
    public function index() {

        return $this->fetch();
    }
    public function verifyCaptcha($data) {
        echo $data;
        // $res = $this->validate($data, [
        //     'captcha|验证码'=>'required|captcha'
        // ]);
        return json_encode($res);
    }
    public function login() {

        echo 'test';
        // Session::set('name','thinkphp');
        // session('name','value');

        return json_encode(Session::has('name'));
    }
    public function signup() {
        return 'test';
    }
}