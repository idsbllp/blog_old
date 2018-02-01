<?php
namespace app\admin\model;

use think\Model;
use think\Db;

class Article extends Model
{
    public static function tags() {
        $allTagsObj = Db::name('category')
            ->field('tag')
            ->group('tag')
            ->select();

        $allTags = [];
        foreach ($allTagsObj as $key => $value) {
            foreach ($value as $name => $tag) {
                if ($tag === '暂无标签') {
                    array_unshift($allTags, $tag);
                } else {
                    array_push($allTags, $tag);
                }
            }
        }
        return $allTags;
    }
    public static function getArtileByTag($tag) {
        $articles = Db::name('category')->where('tag', 'like', '%'.$tag.'%')->select();
        return $articles;
    }
    public static function getAllArticle() {
        $articles = Db::name('category')->select();
        return $articles;
    }
    public static function getArticleByName($name) {
        $res = Db::name('category')->where('name', $name)->select();
        return $res;
    }
    public static function addArticle($article) {
        $article = json_decode($article['article']);

        $name = $article->name;
        $hasBlog = Db::name('category')->where('name', $name)->select();
        if ($hasBlog) {
            return 0;
        }
        $tag = $article->tag ? $article->tag : '暂无标签';

        $articleInfor = [
            'id' => $article->id,
            'name' => $name,
            'tag' => $tag,
            'brief' => $article->brief,
            'date' => $article->date,
            'content' => $article->content
        ];

        // 更新目录
        $res = Db::name('category')->insert($articleInfor);
        return $res;
    }
    public static function modifyArticle($article) {
        $article = json_decode($article['article']);
        $id = $article->id;
        $originalArticle = Db::name('category')->where('id', $id)->select()[0];

        if (!$originalArticle) {
            return false;
        }
        $tag = $article->tag ? $article->tag : '暂无标签';

        $articleInfor = [
            'id' => $id,
            'name' => $article->name,
            'tag' => $tag,
            'brief' => $article->brief,
            'date' => $article->date,
            'content' => $article->content
        ];
        // 更新目录(blog_category)的标题，标签，简介，时间，内容
        Db::query('UPDATE blog_category SET name = :name, tag = :tag, brief = :brief, date = :date, content = :content WHERE id = :id', $articleInfor);
        return true;
    }
}