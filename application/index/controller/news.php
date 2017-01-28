<?php
namespace app\index\controller;

class News
{
    public function index() {
        return 'test test index';
    }
    public function read($id = id) {
        return 'read<br>' . $id;
    }
}