<?php
namespace app\index\model;

use think\Model;
use think\Db;

class User extends Model
{
    public function login() {

    }
    public static function checkIsNewUser($username = 'idsbllp') {
        $boolean = Db::name('user')->where('username', $username)->find();
        if (is_null($boolean)) {
            return json_encode([
                'data' => true,
                'status' => 'congratulations, you can regsit this username'
            ]); 
        } else {
            return json_encode([
                'data' => false,
                'status' => 'this username has been registed! Please choose another one'
            ]);
        }
    }
}