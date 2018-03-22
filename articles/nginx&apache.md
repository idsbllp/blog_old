# 搞了几天的环境 nginx前端，apache后端

> 其他

### 没事玩玩，熟悉一下环境配置

***

> 搞了几天的环境 nginx前端，apache后端

## 1. 首先下载

+ nginx， php， apache

```
  apt install nginx php7.0 apache2

```

+ 整合php和apache

```
apt install libapache2-mod-php7.0
```

## 2. 配置nginx

> 目录 /etc/nginx/sites-available/example.com.conf , 目的是转发请求到 Apache 服务器

```
server {
    listen 80;

    server_name example.com www.example.com;
    root /var/www/html;

    index index.html index.php index.htm index;
    # 遇到404和php 交给apache处理
    error_page 404 @proxy;

    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php7.0-fpm.sock;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:8000;    # apache default port
    }
    location @proxy {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:8000;
    }
}
```

## 3.配置apache

> 目录 /etc/apache2/

+ ports.conf

```
NameVirtualHost *:8000

Listen 8000

<IfModule ssl_module>
    Listen 443
</IfModule>

<IfModule mod_gnutls.c>
    Listen 443
</IfModule>
```

+ ./sites-available/000-default.conf 第一行

```
<VirtualHost *:8000>
...
```

## 4. 重启服务器

```
    systemctl restart nginx.service
    systemctl restart apache2.service
```
这样就可以把PHP过滤到apache。nginx前端，apache后端差不多就完成啦。