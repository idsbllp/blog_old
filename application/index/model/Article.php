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
}