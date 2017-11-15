<?php
namespace app\admin\controller;

use think\Controller;
use app\admin\model\Article;
use think\Request;
use think\Session;
use think\Db;

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
        return $res;
    }
    public function getAllArticle() {
        return Article::getAllArticle();
    }
    public function getArticleByName() {
        $request = Request::instance();
        $articleName = $request->param()['name'];
        $res = Article::getArticleByName($articleName);
        return $res;
    }
    public function addArticle() {
        if (!Session::get('username')) {
            return $this->redirect('http://localhost/blog/public/admin/#/login');
        }
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
        if (!Session::get('username')) {
            return $this->redirect('http://localhost/blog/public/admin/#/login');
        }
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
    public function doRegist() {
        if (!Session::get('username')) {
            return $this->redirect('http://localhost/blog/public/admin/#/login');
        }
        $request = Request::instance();
        if (strtoupper($request->method()) !== 'POST') {
            return [
                'code' => 0,
                'status' => 'method error, POST only'
            ]; 
        }
        $param = $request->param();
        $username = $param['username'];
        $password = $param['password'];

        if ($username && $password) {
            $res = Db::query('SELECT username FROM blog_user WHERE username = :username', ['username' => $username]);
            if ($res) {
                return [
                    'code' => 0,
                    'status' => 'this username has been registed'
                ];
            }
            $password = $this->sha($password);
            $userInfo = [
                'id' => null,
                'username' => $username,
                'password' => $password,
                'lastlogintime' => time(),
                'realname' => '李立平'
            ];
            $res = Db::name('user')->insert($userInfo);
            return [
                'code' => $res,
                'status' => 'registe success'
            ];
        } else {
            return [
                'code' => 0,
                'status' => 'please fill all the blank'
            ];
        }
    }
    public function getUser() {
        $user_id = Session::get('user_id');
        $user = Db::query('SELECT username, realname, lastlogintime FROM blog_user WHERE id = :user_id', ['user_id' => $user_id]);
        return $user;
    }
    public function doLogin() {
        $request = Request::instance();
        if (strtoupper($request->method()) !== 'POST') {
            return [
                'code' => 0,
                'status' => 'method error, POST only'
            ]; 
        }
        $param = $request->param();
        $username = $param['username'];
        $password = $param['password'];

        if ($username && $password) {
            $res = Db::query('SELECT * FROM blog_user WHERE username = :username', ['username' => $username]);
            if (!$res) {
                return [
                    'code' => 0,
                    'status' => 'login faild'
                ];
            }
            $password_from_db = $res[0]['password'];
            if (password_verify($password, $password_from_db)) {
                Session::set('username', $username);
                Session::set('user_id', $res[0]['id']);
                return [
                    'code' => 1,
                    'status' => 'login success'
                ];
            } else {
                return [
                    'code' => 0,
                    'status' => 'login faild'
                ];
            }
        } else {
           return [
               'code' => 0,
               'status' => 'login faild'
           ]; 
       }
    }
    public function sha($password = 'nigehamapi') {
        $options = [
            'cost' => 12
        ];
        $pwd = password_hash($password, PASSWORD_DEFAULT, $options);
        return $pwd;
    }
}