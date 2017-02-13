<?php
namespace app\index\model;

use think\Model;
use think\Db;

class User extends Model
{
    public function login() {

    }
    public function checkIsNewUser($username = '') {
        $boolean = Db::name('user')->where('username', $username)->find();
        if (is_null($boolean)) {
            return [
                'data': true,
                'status': 'this username has been registed! Please choose another one'
            ]; 
        } else {
            return [
                'data': false,
                'status': 'congratulations, you can regsit this username'
            ];
        }
    }
}