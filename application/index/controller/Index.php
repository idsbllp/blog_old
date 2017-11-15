<?php
namespace app\index\controller;

use think\Controller;
use think\Request;
use app\index\model\Article;

class Index extends Controller
{
    public function index() {

        $title = 'idsbllp';
        $this->assign('title', $title);
        return $this->fetch();
    }
    public function test() {
        return CACHE_PATH;
    }
    public function getBiyingPic() {
        $url = 'http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1';
        $str = file_get_contents($url);
        $str = json_decode($str);
        $imgUrl = $str->{'images'}[0]->{'url'};

        if ($imgUrl) {
            $imgUrl = 'http://cn.bing.com/' . $imgUrl;
        } else {
            $imgUrl = 'http://localhost/tp5/public/static/index/img/aierwen.jpeg';
        }
        $img = imagecreatefromjpeg($imgUrl);

        header('Content-Type: image/jpeg');
        imageinterlace($img, 1);
        imagejpeg($img);
        imagedestroy($img);
        exit();
    }
    public function getAllArticle() {
        return Article::getAllArticle();
    }
    public function getArticleByName() {
        $request = Request::instance();
        $articleName = $request->param()['name'];
        $article = Article::getArticleByName($articleName);

        return $article;
    }
    public function getM() {
        $res = \app\index\model\User::checkIsNewUser();
        dump($res);
    }
}
