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
}
