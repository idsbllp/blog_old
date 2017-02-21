<?php
namespace app\admin\model;

use think\Model;
use think\Db;

class Article extends Model
{
    public static function tags() {
        $allTags = Db::name('tag')->field('tag_name')->select();
        // $allTags = Db::query('SELECT * FROM blog_tag');
        return $allTags;
    }
    public static function getArtileByTag($tag) {
        $articles = Db::name('category')->where('tag_name', 'like', '%'.$tag.'%')->select();
        return $articles;
    }
    public static function getAllArticle() {
        $articles = Db::name('category')->select();
        // $articles = Db::query('SELECT * FROM blog_category');
        return $articles;
    }
    public static function addArticle($article) {
        $article = json_decode($article['article']);
        $tags = $article->tags ? implode(',', $article->tags) : '暂无标签';
        $name = $article->name;
        
        $hasBlog = Db::name('category')->where('name', $name)->select();
        // $hasBlog = Db::query('SELECT * FROM blog_category WHERE name = ?', [$name]);
        if ($hasBlog) {
            return 0;
        }

        $articleInfor = [
            'id' => $article->id,
            'name' => $name,
            'tag_name' => $tags,
            'brief' => $article->brief,
            'date' => $article->date,
            'content' => $article->content
        ];
        // 更新标签
        foreach ($article->tags as $key => $value) {
            $hasTag = Db::name('tag')->where('tag_name', $value)->find();
            if (is_null($hasTag)) {
                $tagInfor = [
                    'id' => null,
                    'tag_name' => $value,
                    'blogs' => $name
                ];
                Db::name('tag')->insert($tagInfor);
            } else {
                $blogs = Db::query('SELECT blogs FROM blog_tag WHERE tag_name = :tag', [$value]);
                // dump($blogs);
                $data = [
                    'blogs' => $blogs[0]['blogs'] . '\n' . $name,
                    'tag' => $value
                ];
                Db::query('UPDATE blog_tag SET blogs = :blogs WHERE tag_name = :tag', $data);
                // $data = [
                //     'blogs' => $name,
                //     'tag' => $value
                // ];
                // Db::query('UPDATE blog_tag SET blogs = CONCAT(blogs,"\n",:blogs) WHERE tag_name = :tag', $data);
            }
        }
        // 更新目录
        // $res = Db::query('INSERT INTO blog_category (id, name,tag_name, brief, date, content) VALUES (:id, :name, :tag_name, :brief, :date, :content)', $articleInfor);
        $res = Db::name('category')->insert($articleInfor);
        return $res;
    }
}