<?php
namespace app\index\model;

use think\Model;
use think\Db;

class Article extends Model
{
    public static function getArticleByName($name) {
        $res = Db::query('SELECT * FROM blog_category WHERE name = ?', [$name]);
        return $res;
    }
    public static function getAllArticle() {
        $articles = Db::name('category')->select();
        $res = [];
        // $tags
        foreach ($articles as $key => $article) {
            $tag = $article['tag'];
            if (isset($res[$tag])) {
                array_push($res[$tag], $article);
            } else {
                $res[$tag] = [$article];
            }
        }
        return $res;
    }
}