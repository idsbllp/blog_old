/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : blog

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 02/22/2017 01:06:58 AM
*/

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `blog_category`
-- ----------------------------
DROP TABLE IF EXISTS `blog_category`;
CREATE TABLE `blog_category` (
  `id` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `tag_name` varchar(40) NOT NULL DEFAULT '暂无标签',
  `brief` text NOT NULL,
  `date` bigint(15) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `blog_category`
-- ----------------------------
BEGIN;
INSERT INTO `blog_category` VALUES ('49', 'q', 'sa', 's', '1487692355735', 's'), ('50', 'dq', 'sa', 's', '1487692389250', 's'), ('51', 'k', 'sa', 's', '1487692414227', 's'), ('52', 'l', 'c', 's', '1487692539231', 'case'), ('53', '9', 'c', 's', '1487692552241', 'case'), ('54', '0', 'c', 's', '1487692583001', 'case'), ('55', '0s', 'dd', 's', '1487692618040', 'case'), ('56', 'b', 'dd', 's', '1487692632118', 'case'), ('57', 'basa', 'dd,ss', 's', '1487692681263', 'case'), ('58', 'ddd', 'fuck,shit', 'cs', '1487692996122', 'switch'), ('59', '麻痹', 'fuck,shit', 'cs', '1487693009592', 'switch'), ('60', '草', 'fuck,shit', 'cs', '1487693082363', 'switch'), ('61', '草的', 'fuck,shit', 'cs', '1487693089153', 'switch'), ('62', '阿斯顿', '暂无标签', '对的', '1487693128334', '草'), ('63', '空', '阿斯顿', '阿斯顿', '1487693176955', '    的'), ('64', '滚', '暂无标签', '蛤蟆皮', '1487693288769', '日了你'), ('65', '', '暂无标签', '', '1487693572833', '日了你'), ('66', 'ff', '暂无标签', '', '1487696436085', '```js\nfunction wo() {\n    con.lo(s);\n}\n```');
COMMIT;

-- ----------------------------
--  Table structure for `blog_tag`
-- ----------------------------
DROP TABLE IF EXISTS `blog_tag`;
CREATE TABLE `blog_tag` (
  `id` int(3) unsigned NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(40) NOT NULL,
  `blogs` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `blog_tag`
-- ----------------------------
BEGIN;
INSERT INTO `blog_tag` VALUES ('74', 'sa', 'q\\ndq\\nk'), ('75', 'c', 'l\n9\\n0'), ('76', 'dd', '0s\\nb\\nbasa'), ('77', 'ss', 'basa'), ('78', 'fuck', 'ddd\\n麻痹\\n草\\n草的'), ('79', 'shit', 'ddd\\n麻痹\\n草\\n草的'), ('80', '阿斯顿', '空');
COMMIT;

-- ----------------------------
--  Table structure for `blog_user`
-- ----------------------------
DROP TABLE IF EXISTS `blog_user`;
CREATE TABLE `blog_user` (
  `id` int(2) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `group` int(1) NOT NULL DEFAULT '1',
  `realname` varchar(20) DEFAULT NULL,
  `lastlogintime` bigint(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
--  Records of `blog_user`
-- ----------------------------
BEGIN;
INSERT INTO `blog_user` VALUES ('0', 'idsbllp', 'llp', '1', '李立平吧', '1486998716173'), ('1', 'haha', 'mima', '1', '中文', '1423482736282');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
