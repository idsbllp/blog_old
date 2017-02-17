<?php
namespace app\admin\model;

use think\Model;
use think\Db;

class Article extends Model
{
    public static function tags(){
        $allTags = Db::query('SELECT DISTINCT tag FROM blog_category');
        return $allTags;
    }
}