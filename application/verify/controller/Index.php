<?php
namespace app\verify\controller;

use think\Session;
use think\Db;

class Index
{
    public function index() {
        // $res = Db::query('select * from blog_user where id=?',[0]);
        $res = Db::table('blog_user')->where('id', 2)->select();
        $res1 = DB::name('user')->where('id', 2)->find();
        $res2 = db('user')->where('id', 0)->find();
        var_dump($res);
        var_dump($res1);
        var_dump($res2);
        return 'test test Test.php';
    }
    public function checkIsNewUser($username = '') {
        $boolean = Db::name('user')->where('username', $username)->find();
        dump(input('request.username'));
        if (is_null($boolean)) {
            return json_encode([
                'data' => true,
                'status' => 'congratulations, you can regsit this username'
            ]);
        } else {
            return json_encode([
                'data' => false,
                'status' => 'this username has been registed! Please choose another one'
            ]);
        }
    }
    public function login() {
        
        echo 'test';
        // Session::set('name','aas');
        Session::delete('name');

        // return json_encode(Session::get('name'));
    }
    public function signup() {
        return 'test';
    }
}