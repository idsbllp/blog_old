<?php
namespace app\admin\model;

use think\Model;
use think\Db;

class Article extends Model
{
    public static function tags(){
        $allTags = Db::query('SELECT DISTINCT tag_name FROM blog_category');
        // $allTags = Db::name('category')->distinct(true)->field('tag_name')->select();
        // re($allTags);
        return $allTags;
    }
    public static function getArtileByTag($tag) {
        $articles = Db::name('category')->where('tag_name', 'like', '%'.$tag.'%')->select();
        // dump(Db::getLastSql());
        return $articles;
    }
    public static function getAllArticle(){
        $articles = Db::query('SELECT * FROM blog_category');
        return $articles;
    }
}