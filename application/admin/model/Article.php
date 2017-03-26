<?php
namespace app\admin\model;

use think\Model;
use think\Db;

class Article extends Model
{
    public static function tags() {
        $allTagsObj = Db::name('tag')->field('tag_name')->select();
        // $allTags = Db::query('SELECT * FROM blog_tag');
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
        $articles = Db::name('category')->where('tag_name', 'like', '%'.$tag.'%')->select();
        // $articles = Db::query('SELECT * FROM blog_category WHERE tag_name LIKE "%' . $tag . '%"');
        return $articles;
    }
    public static function getAllArticle() {
        $articles = Db::name('category')->select();
        // $articles = Db::query('SELECT * FROM blog_category');
        return $articles;
    }
    public static function addTag($tag) {
        $hasTag = Db::name('tag')->where('tag_name', $tag)->find();
        // $res = 0;
        if (is_null($hasTag)) {
            $data = [
                'id' => null,
                'tag_name' => $tag,
                'blogs' => null
            ];
            $res = Db::name('tag')->insert($data);
            return $res;
        } else {
            return 0;
        }
    }
    public static function getArticleByName($name) {
        $res = Db::name('category')->where('name', $name)->select();
        return $res;
    }
    public static function addArticle($article) {
        $article = json_decode($article['article']);

        $name = $article->name;
        $hasBlog = Db::name('category')->where('name', $name)->select();
        // $hasBlog = Db::query('SELECT * FROM blog_category WHERE name = ?', [$name]);
        if ($hasBlog) {
            return 0;
        }
        $tags = $article->tags ? $article->tags : ['暂无标签'];

        $articleInfor = [
            'id' => $article->id,
            'name' => $name,
            'tag_name' => implode(',', $tags),
            'brief' => $article->brief,
            'date' => $article->date,
            'content' => $article->content
        ];
        // 更新标签
        foreach ($tags as $key => $value) {
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
    public static function modifyArticle($article) {
        $article = json_decode($article['article']);

        $id = $article->id;
        $originalArticle = Db::name('category')->where('id', $id)->select()[0];

        if (!$originalArticle) {
            return 0;
        }
        $tags = $article->tags ? $article->tags : ['暂无标签'];

        $articleInfor = [
            'id' => $id,
            'name' => $article->name,
            'tag_name' => implode(',', $tags),
            'brief' => $article->brief,
            'date' => $article->date,
            'content' => $article->content
        ];
        // 更新目录(blog_category)的标题，标签，简介，时间，内容
        $haha = Db::query('UPDATE blog_category SET name = :name, tag_name = :tag_name, brief = :brief, date = :date, content = :content WHERE id = :id', $articleInfor);

        // 更新(bs_tag)标签
        if ($originalArticle['tag_name'] != $articleInfor['tag_name']) {
            foreach ($tags as $key => $value) {
                $hasTag = Db::name('tag')->where('tag_name', $value)->find();
                if (is_null($hasTag)) {
                    $tagInfor = [
                        'id' => null,
                        'tag_name' => $value,
                        'blogs' => $articleInfor['name']
                    ];
                    Db::name('tag')->insert($tagInfor);
                } else {
                    $blogs = Db::query('SELECT blogs FROM blog_tag WHERE tag_name = :tag', [$value]);
                    $data = [
                        'blogs' => $blogs[0]['blogs'] . '\n' . $articleInfor['name'],
                        'tag' => $value
                    ];
                    Db::query('UPDATE blog_tag SET blogs = :blogs WHERE tag_name = :tag', $data);
                }
            }
        }
        return 1;
    }
}