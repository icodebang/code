-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2018-01-07 15:12:39
-- 服务器版本： 5.7.19
-- PHP Version: 7.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `WeCenter`
--

-- --------------------------------------------------------

--
-- 表的结构 `icb_active_data`
--

CREATE TABLE IF NOT EXISTS `icb_active_data` (
  `active_id` int(10) unsigned NOT NULL,
  `uid` int(11) DEFAULT '0',
  `expire_time` int(10) DEFAULT NULL,
  `active_code` varchar(32) DEFAULT NULL,
  `active_type_code` varchar(16) DEFAULT NULL,
  `add_time` int(10) DEFAULT NULL,
  `add_ip` bigint(12) DEFAULT NULL,
  `active_time` int(10) DEFAULT NULL,
  `active_ip` bigint(12) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_answer`
--

CREATE TABLE IF NOT EXISTS `icb_answer` (
  `answer_id` int(11) NOT NULL COMMENT '回答id',
  `question_id` int(11) NOT NULL COMMENT '问题id',
  `answer_content` text COMMENT '回答内容',
  `add_time` int(10) DEFAULT '0' COMMENT '添加时间',
  `against_count` int(11) NOT NULL DEFAULT '0' COMMENT '反对人数',
  `agree_count` int(11) NOT NULL DEFAULT '0' COMMENT '支持人数',
  `uid` int(11) DEFAULT '0' COMMENT '发布问题用户ID',
  `comment_count` int(11) DEFAULT '0' COMMENT '评论总数',
  `uninterested_count` int(11) DEFAULT '0' COMMENT '不感兴趣',
  `thanks_count` int(11) DEFAULT '0' COMMENT '感谢数量',
  `category_id` int(11) DEFAULT '0' COMMENT '分类id',
  `has_attach` tinyint(1) DEFAULT '0' COMMENT '是否存在附件',
  `ip` bigint(11) DEFAULT NULL,
  `force_fold` tinyint(1) DEFAULT '0' COMMENT '强制折叠',
  `anonymous` tinyint(1) DEFAULT '0',
  `publish_source` varchar(16) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='回答';

--
-- 转存表中的数据 `icb_answer`
--

INSERT INTO `icb_answer` (`answer_id`, `question_id`, `answer_content`, `add_time`, `against_count`, `agree_count`, `uid`, `comment_count`, `uninterested_count`, `thanks_count`, `category_id`, `has_attach`, `ip`, `force_fold`, `anonymous`, `publish_source`) VALUES
(1, 1, '1. 使用 var object = {} ; 定义\n2. 使用 function （） {} 定义；', 1499930118, 0, 0, 1, 0, 0, 0, 10, 0, 2130706433, 0, 0, NULL),
(2, 1, '这个是回复? 还是评论？', 1503306562, 0, 0, 1, 0, 0, 0, 10, 0, 2130706433, 0, 0, NULL),
(3, 1, '这个是回复? 还是评论？', 1503306599, 0, 0, 1, 0, 0, 0, 10, 0, 2130706433, 0, 0, NULL),
(4, 1, '这个是回复? 还是评论？', 1503306891, 0, 0, 1, 0, 0, 0, 10, 0, 2130706433, 0, 0, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `icb_answer_comments`
--

CREATE TABLE IF NOT EXISTS `icb_answer_comments` (
  `id` int(11) unsigned NOT NULL,
  `answer_id` int(11) DEFAULT '0',
  `uid` int(11) DEFAULT '0',
  `message` text,
  `time` int(10) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_answer_thanks`
--

CREATE TABLE IF NOT EXISTS `icb_answer_thanks` (
  `id` int(11) unsigned NOT NULL,
  `uid` int(11) DEFAULT '0',
  `answer_id` int(11) DEFAULT '0',
  `user_name` varchar(255) DEFAULT NULL,
  `time` int(10) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_answer_uninterested`
--

CREATE TABLE IF NOT EXISTS `icb_answer_uninterested` (
  `id` int(11) unsigned NOT NULL,
  `uid` int(11) DEFAULT '0',
  `answer_id` int(11) DEFAULT '0',
  `user_name` varchar(255) DEFAULT NULL,
  `time` int(10) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_answer_vote`
--

CREATE TABLE IF NOT EXISTS `icb_answer_vote` (
  `voter_id` int(11) NOT NULL COMMENT '自动ID',
  `answer_id` int(11) DEFAULT NULL COMMENT '回复id',
  `answer_uid` int(11) DEFAULT NULL COMMENT '回复作者id',
  `vote_uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间',
  `vote_value` tinyint(4) NOT NULL COMMENT '-1反对 1 支持',
  `reputation_factor` int(10) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_approval`
--

CREATE TABLE IF NOT EXISTS `icb_approval` (
  `id` int(10) NOT NULL,
  `type` varchar(16) DEFAULT NULL,
  `data` mediumtext NOT NULL,
  `uid` int(11) NOT NULL DEFAULT '0',
  `time` int(10) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_article`
--

CREATE TABLE IF NOT EXISTS `icb_article` (
  `id` int(10) NOT NULL,
  `uid` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text,
  `comments` int(10) DEFAULT '0',
  `views` int(10) DEFAULT '0',
  `add_time` int(10) DEFAULT NULL,
  `has_attach` tinyint(1) NOT NULL DEFAULT '0',
  `lock` int(1) NOT NULL DEFAULT '0',
  `votes` int(10) DEFAULT '0',
  `title_fulltext` text,
  `category_id` int(10) DEFAULT '0',
  `topic_id` int(11) NOT NULL COMMENT '对应 topic表中的id',
  `is_recommend` tinyint(1) DEFAULT '0',
  `chapter_id` int(10) unsigned DEFAULT NULL,
  `sort` tinyint(2) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_article`
--

INSERT INTO `icb_article` (`id`, `uid`, `title`, `message`, `comments`, `views`, `add_time`, `has_attach`, `lock`, `votes`, `title_fulltext`, `category_id`, `topic_id`, `is_recommend`, `chapter_id`, `sort`) VALUES
(1, 1, '前端开发之Javascript', '前端开发之Javascript', 0, 12, 1499918126, 0, 0, 1, '2106931471 2145720043 javascript', 10, 0, 0, NULL, 0),
(2, 1, 'Linux中inittab文件作用', 'Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\nLinux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\nLinux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\nLinux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\n ', 0, 7, 1500607543, 0, 0, 0, 'linux inittab 2599120214 2031629992', 7, 0, 0, NULL, 0),
(3, 1, 'test attached', '[url=http://#aaa][attach]9[/attach][/url]\n\n[url=http://#aaa]mmm-[/url]\n[attach]7[/attach]\n\n[attach]6[/attach]\nhello world!', 0, 14, 1502351663, 1, 0, 0, 'test attached', 0, 0, 0, NULL, 0),
(4, 1, '测试附件内容', '\n[img]http://www.icodebang.cn/uploads/article/20170913/90x90_60c77764bb837f138db232ed80c312a4.png[/img]\n\n[size=150]测试规内容[/size]\n[img]http://www.icodebang.cn/uploads/article/20170814/90x90_6898c254095a5c28ff74ecb6b8fb9c71.png[/img]\n\n[b]粗体内容[/b]\n[b][attach]14[/attach][/b]\n\n[i]斜体[/i]\n[list=1]\n[*]列表[/*]\n[*]列表\n[/*]\n[/list]\n[quote]\n应用\n[/quote]\n[code]&lt;html&gt;\n    \n    &lt;body&gt;\n        hello world!\n    &lt;/body&gt;\n&lt;/html&gt;[/code]test end', 7, 29, 1502697530, 1, 0, 0, '2797935797 3846820214 2086923481', 1, 0, 1, NULL, 0),
(5, 1, '发布附件文章', '发布附件文章', 0, 5, 1506091200, 1, 0, 0, '2145724067 3846820214 2599131456', 1, 0, 0, NULL, 0);

-- --------------------------------------------------------

--
-- 表的结构 `icb_article_comments`
--

CREATE TABLE IF NOT EXISTS `icb_article_comments` (
  `id` int(10) NOT NULL,
  `uid` int(10) NOT NULL,
  `article_id` int(10) NOT NULL,
  `message` text NOT NULL,
  `add_time` int(10) NOT NULL,
  `at_uid` int(10) DEFAULT NULL,
  `votes` int(10) DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_article_comments`
--

INSERT INTO `icb_article_comments` (`id`, `uid`, `article_id`, `message`, `add_time`, `at_uid`, `votes`) VALUES
(1, 1, 4, 'ehllo world!', 1502787726, 0, 0),
(2, 1, 4, '可以啊！@', 1502787743, 1, 0),
(3, 1, 4, 'go ', 1502787776, 0, 0),
(4, 1, 4, 'go ！', 1502787783, 0, 0),
(5, 1, 4, 'cool', 1502787790, 0, 0),
(6, 1, 4, '不错啊！', 1502787804, 0, 0),
(7, 1, 4, '真心厉害！', 1502787820, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `icb_article_vote`
--

CREATE TABLE IF NOT EXISTS `icb_article_vote` (
  `id` int(10) NOT NULL,
  `uid` int(10) NOT NULL,
  `type` varchar(16) DEFAULT NULL,
  `item_id` int(10) NOT NULL,
  `rating` tinyint(1) DEFAULT '0',
  `time` int(10) NOT NULL,
  `reputation_factor` int(10) DEFAULT '0',
  `item_uid` int(10) DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_article_vote`
--

INSERT INTO `icb_article_vote` (`id`, `uid`, `type`, `item_id`, `rating`, `time`, `reputation_factor`, `item_uid`) VALUES
(1, 2, 'article', 1, 1, 1499928146, 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `icb_attach`
--

CREATE TABLE IF NOT EXISTS `icb_attach` (
  `id` int(11) unsigned NOT NULL,
  `file_name` varchar(255) DEFAULT NULL COMMENT '附件名称',
  `access_key` varchar(32) DEFAULT NULL COMMENT '批次 Key',
  `add_time` int(10) DEFAULT '0' COMMENT '上传时间',
  `file_location` varchar(255) DEFAULT NULL COMMENT '文件位置',
  `is_image` int(1) DEFAULT '0',
  `item_type` varchar(32) DEFAULT '0' COMMENT '关联类型',
  `item_id` bigint(20) DEFAULT '0' COMMENT '关联 ID',
  `wait_approval` tinyint(1) NOT NULL DEFAULT '0',
  `file_mime` varchar(50) DEFAULT NULL COMMENT '文件的mime',
  `css_class` varchar(10) DEFAULT NULL COMMENT '对应到前台的css class名'
) ENGINE=MyISAM AUTO_INCREMENT=351 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_attach`
--

INSERT INTO `icb_attach` (`id`, `file_name`, `access_key`, `add_time`, `file_location`, `is_image`, `item_type`, `item_id`, `wait_approval`, `file_mime`, `css_class`) VALUES
(1, '404-logo.png', NULL, 1501592663, '2eb7c1aca991bb54572c5cc6215ef604.png', 1, 'answer', 0, 0, '', ''),
(2, '404-logo.png', NULL, 1502288813, '9b065449320ce602a46b56ef9c26bef5.png', 1, 'answer', 0, 0, '', ''),
(3, 'ajax-loader.gif', NULL, 1502288877, '31843ebd15448fc532272ddc6c581df8.gif', 1, 'answer', 0, 0, '', ''),
(5, 'bg.gif', 'd60c9bbf856558dd58dffef587641b3f', 1502351573, 'ade0c692b23c14afc79a202eb25dd014.gif', 1, 'article', 3, 0, '', ''),
(6, 'icon-angle-right.png', 'd60c9bbf856558dd58dffef587641b3f', 1502351590, 'a2c7334059764f1936b3c10e42a32743.png', 1, 'article', 3, 0, '', ''),
(7, 'icon-v-hover.png', 'd60c9bbf856558dd58dffef587641b3f', 1502351590, 'f466dbdcf8c3384f06d5538fd1bda976.png', 1, 'article', 3, 0, '', ''),
(8, 'icon-angle-left.png', 'd60c9bbf856558dd58dffef587641b3f', 1502351590, '98b652c0c503e97ba1219bbc8cffbb1e.png', 1, 'article', 3, 0, '', ''),
(9, 'icon-v.png', 'd60c9bbf856558dd58dffef587641b3f', 1502351590, '93d2434bdac0258e3ab41a0ce030fe28.png', 1, 'article', 3, 0, '', ''),
(10, 'login_bg.jpg', 'd60c9bbf856558dd58dffef587641b3f', 1502351591, 'ef8f655d0ba028c7a3ee61a06167aceb.jpg', 1, 'article', 3, 0, '', ''),
(11, 'logo@2x.png', NULL, 1502690404, '11eb791898bb99c6ff69bce820f9a753.png', 1, 'answer', 0, 0, '', ''),
(12, 'icon-v-hover.png', 'ce74675b8458d1ee18be65e01cf720a3', 1502697438, '6898c254095a5c28ff74ecb6b8fb9c71.png', 1, 'article', 4, 0, '', ''),
(13, 'pen-master.zip', 'ce74675b8458d1ee18be65e01cf720a3', 1502697502, 'e3baf985bedcb82eaafd606715e8c949', 0, 'article', 4, 0, '', ''),
(14, 'PigCMS小猪微信V8.1加盟版331套模板@bbs_.52codes_.net_.rar', 'a2af20c52c074693b13718d69765616c', 1502697659, '6b21bedd0822ebb81587ab7270467bdd', 0, 'article', 4, 0, '', ''),
(15, '3557f3751f174ed5fc6cc8b23fe1936a.jpg', 'a2af20c52c074693b13718d69765616c', 1502697668, 'b590f1d0aeb3d8c78cd8a9a539478161.jpg', 1, 'article', 4, 0, '', ''),
(16, 'ajax-loader.gif', NULL, 1504262843, 'cbb1af6748727f4596dd5b443806f798.gif', 1, 'page', 0, 0, '', ''),
(17, 'icon-v-hover.png', NULL, 1504414761, 'af635004b7dc0d6b6a6b929bbff0c61c.png', 1, 'page', 0, 0, '', ''),
(19, 'icon-v.png', NULL, 1504482000, '62dfbdb3d5acba86a38e709e220a1686.png', 1, 'page', 0, 0, '', ''),
(20, 'icon-v.png', NULL, 1504482119, 'd7a1031a2e69b630a149a4789422008f.png', 1, 'page', 0, 0, '', ''),
(21, 'icon-v.png', NULL, 1504482182, '139a0dfadbcc285acd075aa0ca73ee77.png', 1, 'page', 0, 0, '', ''),
(22, 'icon-v.png', NULL, 1504482251, '5f0f249838cfbe889c0bfbe8f400e4d1.png', 1, 'page', 0, 0, '', ''),
(23, 'login_logo.png', NULL, 1504621970, '74fc6337b6506b10b83236cfc1e6328c.png', 1, 'page', 0, 0, '', ''),
(24, 'login_logo.png', NULL, 1504622232, 'e76178c51e3c4067385e83b20c3c57ba.png', 1, 'page', 0, 0, '', ''),
(350, 'Because_of_You.mp3', 'b0362f15e7bddcd741be171210084059', 1512866504, 'c08370744456a8cde8b0b6a977323181.mp3', 0, 'homework', 4, 0, 'audio/mpeg', 'audio'),
(349, 'Nobody_But_You.mp3', 'b0362f15e7bddcd741be171210084059', 1512866481, '6dd5f6c98234b44e25baddfd97d7c13b.mp3', 0, 'homework', 4, 0, 'audio/mpeg', 'audio'),
(348, '134367282.mp3', 'b79de6f094666f275862171209002216', 1512750169, '142f8d22a7e277e6143b2e16867177b3.mp3', 0, 'homework', 3, 0, 'audio/mpeg', 'audio'),
(347, '清白之年.mp3', 'b79de6f094666f275862171209002216', 1512750154, '5e2bc8fbbc025692622f2cb7fdcca6c8.mp3', 0, 'homework', 3, 0, 'audio/mpeg', 'audio'),
(345, '清白之年.mp3', NULL, 1512658707, 'bccb9cd428a825cd8a0cb05b3473a7ed.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(343, '清白之年.mp3', NULL, 1512658194, '3b100ff33ac7646a703e750daaec82ab.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(344, '134367282.mp3', NULL, 1512658206, '1fa879330a5e9586fca80d77248fca63.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(342, '清白之年.mp3', NULL, 1512656946, '16e6fbc2ad71df923dadb6b4e6e796f9.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(341, '134367282.mp3', NULL, 1512656934, '918c98506d10c5a9e297584ab16c71e2.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(340, '134367282.mp3', NULL, 1512656800, '7309ca47ab40c0d14a7923f1711f6b25.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(339, '清白之年.mp3', NULL, 1512656785, 'ac0387d95ca27fe7d307837c259b41e7.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(338, '清白之年.mp3', NULL, 1512485946, '5bb385356bd1e044551f4e4d1b0c9fcb.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(337, '清白之年.mp3', NULL, 1512485111, 'b5610ee30b2476c934fb9cae01c69e22.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(336, '清白之年.mp3', NULL, 1512481098, 'a90b43b90f39f2da2bb376c6cad7d623.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(335, '清白之年.mp3', NULL, 1512481085, '805f4c28dc318e3c37f9303065d97848.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(246, 'warmming.png', 'fa7ed4e92e491fab66f4170929180959', 1506679833, 'f56b3cd37b619ea3422796b6167052bc.png', 1, 'course', 15, 0, '', ''),
(245, '404-logo.png', 'e6125bd7628297177891170929180317', 1506679440, 'b8284f857d4695c8cf9ad8ad3eb5035c.png', 1, 'course', 14, 0, '', ''),
(334, '清白之年.mp3', NULL, 1512479627, '4156564c06ada65fab307bcdee086279.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(243, 'icon-v-hover.png', '4abf41bdd955c5b4e619170929115459', 1506657305, '493d7d29d4bc6be4b916ff2ee12dcded.png', 1, 'course_banner', 13, 0, '', ''),
(333, 'Trouble_Is_A_Friend.mp3', NULL, 1512307663, '25f61f66e7f1706a9d2aac8fd31c0484.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(241, 'icon-v.png', '2237e7f9460df90d0b61170929115130', 1506657102, '08d492d1aa72c509ec1f903e8242e9d5.png', 1, 'course', 13, 0, '', ''),
(332, '清白之年.mp3', NULL, 1512307657, 'ef199f7e398c80b4fcace3b7dafb133c.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(330, '清白之年.mp3', NULL, 1512307519, '986652708a494436843d5bbd6fce6c46.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(331, '清白之年.mp3', NULL, 1512307566, '768f37863396f2ce3dbe739abbc5afe8.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(329, '清白之年.mp3', NULL, 1512282847, '999efe110aeaa6f10b529509ef820672.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(328, '清白之年.mp3', NULL, 1512282824, '36af7fe3fa20773bb935eb11253bfab2.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(327, '清白之年.mp3', NULL, 1512282781, '77b4fe9ae99a57106aa5ca1a5ab61dc3.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(325, '清白之年.mp3', NULL, 1512282691, '3d83ea7083070f54e5ac40e1d0ee9cb4.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(326, '清白之年.mp3', NULL, 1512282745, '2abffb044bdebdfa816f46cd980fde93.mp3', 0, 'homework', 0, 0, 'audio/mpeg', 'audio'),
(323, '清白之年.mp3', NULL, 1512277068, 'e11d575a9a12afe15aac2f57fe3b81b8.mp3', 0, 'course', 0, 0, 'audio/mpeg', 'audio'),
(322, '36471593234acce2e1c69b79ab12c41b.mp3', NULL, 1512277002, 'cd2298744d128d2e0d2801908372fe48.mp3', 0, 'course', 0, 0, 'audio/mpeg', 'audio'),
(321, '1a1e837228327f8e7e129be4a59e76de.jpg', NULL, 1512276840, '416493f48ae776b9a963292775dbc4a2.jpg', 1, 'course', 0, 0, 'image/jpeg', 'image'),
(320, '1a1e837228327f8e7e129be4a59e76de.jpg', NULL, 1512276676, '5631160a732d167d71a5c31c5a612df3.jpg', 1, 'course', 0, 0, 'image/jpeg', 'image'),
(202, 'wechat_code.jpg', 'cc2b991f63ff03486424170923200829', 1506168528, 'ee1350d0ec05422ea6e6db7a295c8071.jpg', 1, 'course', 12, 0, '', ''),
(200, 'icon-v.png', NULL, 1506152570, '80d2d2d4e47f460ea7014dcbd8a85de9.png', 1, 'course', 0, 0, '', ''),
(199, 'icon-v.png', NULL, 1506152409, 'c5e30115fc576f72006ff49561a2f534.png', 1, 'course', 0, 0, '', ''),
(198, 'icon-v-hover.png', NULL, 1506151945, 'b49451a3941b23eff8e1bb9482183642.png', 1, 'course', 0, 0, '', ''),
(197, 'icon-v.png', NULL, 1506151736, '8cdc805398a397b69035cac2740ac7c5.png', 1, '/Users/zhoumingxia/icodebang.cn/', 0, 0, '', ''),
(196, 'icon-v.png', NULL, 1506150815, '7dab762861ac37c63fc51371caa1a9d5.png', 1, 'course', 0, 0, '', ''),
(195, 'icon-v.png', NULL, 1506131529, 'd7f0f91f86e4cbbb5fc84bdcbcfca9b1.png', 1, 'course', 0, 0, '', ''),
(194, 'icon-v.png', NULL, 1506129168, 'fade3fb11423db5498359216fb571f4b.png', 1, 'course', 0, 0, '', ''),
(319, '1a1e837228327f8e7e129be4a59e76de.jpg', NULL, 1512276650, '0f7d045d610c75a17338fa3f5c9c7ee8.jpg', 1, 'course', 0, 0, 'image/jpeg', 'image'),
(192, 'wechat_code.jpg', NULL, 1506125585, '72e01e9c401e24d4f7d80c74168411ba.jpg', 1, 'course', 0, 0, '', ''),
(318, '1a1e837228327f8e7e129be4a59e76de.jpg', NULL, 1512275399, 'e62400636c5e88631aeba583526bf008.jpg', 1, 'course', 0, 0, 'image/jpeg', 'image'),
(189, 'icon-v.png', '4dd367a8e83399d1c148c3145aa309f4', 1506096772, 'dc59718ee64ae003be1e614c7a3a7766.png', 1, 'article', 5, 0, '', ''),
(188, 'wechat_login.png', '7ae87c430d0d2d75fc4e4c6e20070067', 1506091181, '0562a661a18170eb0513a1f6eab7b312.png', 1, 'article', 5, 0, '', ''),
(187, 'wechat_code.jpg', '7ae87c430d0d2d75fc4e4c6e20070067', 1506091181, '82c7b118a839fe7b09f64e111a9fa0cd.jpg', 1, 'article', 5, 0, '', ''),
(317, '1a1e837228327f8e7e129be4a59e76de.jpg', NULL, 1512275327, 'ced031b44c268ecc9f07d1cd62596993.jpg', 1, 'course', 0, 0, 'image/jpeg', 'image'),
(316, '36471593234acce2e1c69b79ab12c41b.mp3', NULL, 1512232504, '9d62e647149a483a7b370aa001b9bd59.mp3', 0, 'course', 0, 0, 'audio/mpeg', 'audio'),
(315, '1a1e837228327f8e7e129be4a59e76de.jpg', NULL, 1512232311, '1c280c7543235f1c50f5663eb930fcef.jpg', 1, 'course', 0, 0, 'image/jpeg', 'image'),
(314, '1a1e837228327f8e7e129be4a59e76de.jpg', NULL, 1512232107, 'b8b4fe2e27e6dc4ad57f8068708a42c5.jpg', 1, 'course', 0, 0, 'image/jpeg', 'image'),
(181, 'wechat_login.png', NULL, 1506006970, '3b97590ac0b20e049375d3a70bb752ff.png', 1, 'course', 0, 0, '', ''),
(180, 'wechat_code.jpg', NULL, 1506006970, 'a232a3eb2088256818510a603f1dec98.jpg', 1, 'course', 0, 0, '', ''),
(179, 'bg.gif', NULL, 1506006798, '3f94dda2e207bbe4bcd73d0aa484a2dd.gif', 1, 'course', 0, 0, '', ''),
(178, '404-logo.png', NULL, 1506006798, 'cf3ffe7cd56aa565b3585dff1f7dd06a.png', 1, 'course', 0, 0, '', ''),
(177, 'aw-icon-sprite.png', NULL, 1506006798, 'dbce0e8a618f2be7bbef74889dc9d729.png', 1, 'course', 0, 0, '', ''),
(176, 'ajax-loader.gif', NULL, 1506006798, '9d46363d9277c892d17bfbfcd6fed216.gif', 1, 'course', 0, 0, '', ''),
(175, 'wechat_login.png', NULL, 1506006433, '9b359d303333325d93f19ec5e27b2e16.png', 1, 'course', 0, 0, '', ''),
(174, 'wechat_code.jpg', NULL, 1506006433, '7a266b41bf8ec59b877b430ba28e283c.jpg', 1, 'course', 0, 0, '', ''),
(173, 'login_bg.jpg', NULL, 1506006433, '17ad88f6d5244769aad8ba7e1e8a59c1.jpg', 1, 'course', 0, 0, '', ''),
(172, 'warmming.png', NULL, 1506006433, 'e965996e1808d88d14497bf10f619c55.png', 1, 'course', 0, 0, '', ''),
(171, 'logo@2x.png', NULL, 1506006433, '26c01fcecc28286943b63b640b341508.png', 1, 'course', 0, 0, '', ''),
(170, 'logo.png', NULL, 1506006433, '78d3a0ab428b5f72bcbb5e701db82cfa.png', 1, 'course', 0, 0, '', ''),
(169, 'login_logo.png', NULL, 1506006432, '709194f8a327baf99093cb8d39798501.png', 1, 'course', 0, 0, '', ''),
(168, 'icon-v.png', NULL, 1506006432, 'bebd001c43c6de261b7bf65a794e7ea3.png', 1, 'course', 0, 0, '', ''),
(167, 'default_class_imgs.png', NULL, 1506006432, '1e0740e48fe5d9d77e0f6a8b9adcfd6d.png', 1, 'course', 0, 0, '', ''),
(166, 'icon-v-hover.png', NULL, 1506006432, 'f5e57f643100087e93184f2ecdfe387c.png', 1, 'course', 0, 0, '', ''),
(165, 'icon-angle-right.png', NULL, 1506006432, 'df8fb66c9db8690bd7b9c1f3f544397c.png', 1, 'course', 0, 0, '', ''),
(164, 'icon-angle-left.png', NULL, 1506006432, 'db1f1f08a1c95642e55bc71d934354db.png', 1, 'course', 0, 0, '', ''),
(163, 'bg.gif', NULL, 1506006432, '9f21c92ee2cf03cbd1d8c64e68770852.gif', 1, 'course', 0, 0, '', ''),
(162, '404-logo.png', NULL, 1506006432, '4828f6c8b46bfad1591c23bd7748bcf7.png', 1, 'course', 0, 0, '', ''),
(161, 'aw-icon-sprite.png', NULL, 1506006432, 'd84de7bb3567100ef520f22ec577e363.png', 1, 'course', 0, 0, '', ''),
(160, 'ajax-loader.gif', NULL, 1506006432, '03ebff055fa4454c54feefe6d8506d46.gif', 1, 'course', 0, 0, '', ''),
(159, 'bg.gif', NULL, 1506006417, 'c96530796101569b42ea8278e42a3c89.gif', 1, 'course', 0, 0, '', ''),
(158, 'aw-icon-sprite.png', NULL, 1506006417, '79989b47866516535365d285e19e1350.png', 1, 'course', 0, 0, '', ''),
(157, 'ajax-loader.gif', NULL, 1506006417, 'f1cd21831db5526820ae76da4d46d43d.gif', 1, 'course', 0, 0, '', ''),
(156, '404-logo.png', NULL, 1506006417, '245f29e4e9ee7766378719b51791e7e4.png', 1, 'course', 0, 0, '', ''),
(155, 'aw-icon-sprite.png', NULL, 1506005893, '6d92e43635e729272836e2e33f22a70a.png', 1, 'course', 0, 0, '', ''),
(154, '404-logo.png', NULL, 1506005431, 'fa1c5235456f6770193e875ca695095e.png', 1, 'course', 0, 0, '', ''),
(142, 'aa.zip', '321056e38546fd2ea66921f3f7a7e71b', 1505285796, '97f3e6ac284857b73407c4df9b37d09c', 0, 'article', 4, 0, '', ''),
(153, '404-logo.png', NULL, 1506003013, '5cf4b1cf07b035a321bca304475b8764.png', 1, 'course', 12, 0, '', ''),
(313, '1a1e837228327f8e7e129be4a59e76de.jpg', NULL, 1512232061, 'c92e3ee4e008655e3913a29ecd4c3528.jpg', 1, 'course', 0, 0, 'image/jpeg', 'image'),
(152, 'bg.gif', NULL, 1506002942, 'e30be401f3992ce95ad1bb8c6a7449dc.gif', 1, 'course', 12, 0, '', ''),
(149, 'ajax-loader.gif', NULL, 1505721754, '2b0eea082cae8e8ad588767693b8c30c.gif', 1, 'course', 12, 0, '', ''),
(150, 'ajax-loader.gif', NULL, 1505721821, 'f5837edfa81d55142f659f78c7d62c44.gif', 1, 'course', 12, 0, '', ''),
(151, '404-logo.png', NULL, 1505721821, '86e1280c04b058ad9a9956e8866faf80.png', 1, 'course', 12, 0, '', ''),
(310, 'Unit2.mp3', '61acbfd38175972329ab171030101246', 1509329609, 'b96ba743a21d078c8573472d6c44107a.mp3', 0, 'course', 14, 0, 'audio/mpeg', 'audio'),
(308, 'Unit2.mp3', '901af37b47c70ae228a1171029202615', 1509280011, '59e17d8d20a203d066fa0b0c08a21985.mp3', 0, 'course', 14, 0, 'audio/mpeg', 'audio'),
(309, 'music.mp3', '901af37b47c70ae228a1171029202615', 1509280011, '1d44dd210f9513475d320450d7863dbe', 0, 'course', 14, 0, 'application/octet-stream', 'txt'),
(307, 'Unit1.mp3', '901af37b47c70ae228a1171029202615', 1509280011, '36471593234acce2e1c69b79ab12c41b.mp3', 0, 'course', 14, 0, 'audio/mpeg', 'audio'),
(312, '1a1e837228327f8e7e129be4a59e76de.jpg', NULL, 1512231070, '4fec08adb68b343d8f85e3e7cc35b53b.jpg', 1, 'course', 0, 0, 'image/jpeg', 'image'),
(311, 'music.mp3', NULL, 1512229167, '04f7ad9c08387b08a99131a703c0080c', 0, 'course', 0, 0, 'application/octet-stream', 'txt');

-- --------------------------------------------------------

--
-- 表的结构 `icb_category`
--

CREATE TABLE IF NOT EXISTS `icb_category` (
  `id` int(11) unsigned NOT NULL,
  `title` varchar(128) DEFAULT NULL,
  `type` varchar(16) DEFAULT NULL,
  `module` smallint(4) NOT NULL COMMENT '分类所属的模块',
  `icon` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT '0',
  `sort` smallint(6) DEFAULT '0',
  `url_token` varchar(32) DEFAULT NULL,
  `pic` varchar(255) NOT NULL COMMENT '分类图片',
  `views` int(11) NOT NULL COMMENT '统计查看文章次数',
  `meta_words` int(11) NOT NULL COMMENT 'seo关键字'
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_category`
--

INSERT INTO `icb_category` (`id`, `title`, `type`, `module`, `icon`, `parent_id`, `sort`, `url_token`, `pic`, `views`, `meta_words`) VALUES
(1, '儿童英语', 'question', 0, NULL, 0, 0, 'front', '20171030/2225c5e2d3e7901f63727d052a7cbb57_32x32.png', 0, 0),
(2, '安卓Android APP', 'question', 0, NULL, 0, 0, 'android', '20171029/13a4f8da7f448a235bd473a2f0a279a5_32x32.png', 0, 0),
(3, '苹果IOS APP', 'question', 0, NULL, 0, 0, 'ios', '', 0, 0),
(4, 'HTML5/H5', 'question', 0, NULL, 0, 0, 'h5', '20171029/e181fb61fbe2e9339d5f4b8f006df32b_32x32.png', 0, 0),
(5, '数据库', 'question', 0, NULL, 0, 0, '5', '20171029/40d8228b416a77fb89c37370e51508ce_32x32.png', 49, 0),
(10, 'Javascript', 'question', 0, NULL, 0, 0, '10', '20171029/4975b196f3325463d0b7cfc9f33c05b1_32x32.png', 0, 0),
(11, 'jQuery', 'question', 0, NULL, 1, 0, NULL, '', 0, 0),
(12, 'CSS', 'question', 0, NULL, 1, 0, NULL, '', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `icb_course`
--

CREATE TABLE IF NOT EXISTS `icb_course` (
  `id` int(10) NOT NULL,
  `uid` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `title2` varchar(250) NOT NULL COMMENT '文章副标题',
  `content` text,
  `comments` int(10) DEFAULT '0' COMMENT '评论数',
  `views` int(10) DEFAULT '0' COMMENT '阅读数',
  `add_time` int(10) DEFAULT NULL,
  `has_attach` tinyint(1) NOT NULL DEFAULT '0',
  `is_publish` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否发布',
  `votes` int(10) DEFAULT '0',
  `focuses` int(10) NOT NULL DEFAULT '0' COMMENT '关注次数',
  `favorites` int(10) NOT NULL DEFAULT '0' COMMENT '收藏次数',
  `title_fulltext` text,
  `parent_id` int(10) NOT NULL COMMENT '对应 分类id',
  `is_recommend` tinyint(1) DEFAULT '0',
  `chapter_id` int(10) unsigned DEFAULT NULL,
  `sort` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `url_token` varchar(100) NOT NULL,
  `meta_keyword` varchar(200) DEFAULT '',
  `pic` varchar(255) NOT NULL COMMENT '分类图片'
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_course`
--

INSERT INTO `icb_course` (`id`, `uid`, `title`, `title2`, `content`, `comments`, `views`, `add_time`, `has_attach`, `is_publish`, `votes`, `focuses`, `favorites`, `title_fulltext`, `parent_id`, `is_recommend`, `chapter_id`, `sort`, `url_token`, `meta_keyword`, `pic`) VALUES
(1, 1, '前端开发之Javascript', '', '前端开发之Javascript', 0, 8, 1499918126, 0, 0, 1, 0, 0, '2106931471 2145720043 javascript', 2, 0, NULL, 0, '', '', ''),
(2, 1, 'Linux中inittab文件作用', '', 'Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\nLinux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\nLinux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\nLinux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用\nLinux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用Linux中inittab文件作用\n ', 0, 4, 1500607543, 0, 0, 0, 0, 0, 'linux inittab 2599120214 2031629992', 2, 0, NULL, 0, '', '', ''),
(12, 1, '话题教程2', '', '[img]http://www.icodebang.cn/uploads/course/20170921/90x90_dbce0e8a618f2be7bbef74889dc9d729.png[/img]\n话题下的教程', 0, 0, 1505565136, 1, 1, 0, 0, 0, NULL, 12, 0, NULL, 0, 'topic_course_2', 'topic_course_2', ''),
(13, 1, '带附件的教程', '', '[attach]231[/attach]\n[attach]204[/attach]\n[attach]203[/attach]\n[list]\n[*]ll[/*]\n[/list]\n[list=1]\n[*]lll[/*]\n[*]ll\n[/*]\n[/list]\n[code]ll\nll[/code]\n[quote]\nkkll\n[/quote]\n            // 设置了附件， [url=http://www.icodebang.com]绑定[/url]附件和[size=120]文章[/size]关系\n            if ($set[''has_attach''] && $data[''batchKey'']) {\n                $this->model(''attach'')->bindAttachAndItem(''course'', $id, $data[''batchKey'']);\n            }\n\n[attach]203[/attach]\n\n[attach]213[/attach]\n ', 0, 0, 1506168701, 1, 1, 0, 0, 0, NULL, 3, 0, NULL, 0, 'course_attach', 'course_attach', ''),
(14, 1, '测试banner图', 'test banner pic', '<p>[img=302]undefined[/img]</p>\n\n<p>[img=245]http://www.icodebang.cn/uploads/course/20170929/b8284f857d4695c8cf9ad8ad3eb5035c_90x90.png[/img]</p>\n\n<p>article_info</p>\n\n<p>[quote]</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;\n<audio attach-id="310" controls="controls" src="http://www.icodebang.cn/uploads/course/20171030/b96ba743a21d078c8573472d6c44107a.mp3" type="audio/mpeg">&nbsp;mmmmmm</audio>\n</p>\n\n<p>&nbsp;</p>\n\n<p><br />\n&nbsp;</p>\n\n<p>&nbsp;&nbsp; [b]jjjj[/b]</p>\n\n<p>&nbsp;&nbsp; [img=245]http://www.icodebang.cn/uploads/course/20170929/b8284f857d4695c8cf9ad8ad3eb5035c_90x90.png[/img] &nbsp;</p>\n\n<p>[/quote]</p>\n\n<p>[img=245]http://www.icodebang.cn/uploads/course/20170929/b8284f857d4695c8cf9ad8ad3eb5035c_90x90.png[/img]&nbsp;</p>\n\n<p><br />\n<img attach-id="245" src="http://www.icodebang.cn/uploads/course/20170929/b8284f857d4695c8cf9ad8ad3eb5035c_90x90.png" /></p>\n\n<p>&nbsp;\n<audio attach-id="307" controls="controls" src="http://www.icodebang.cn/uploads/course/20171029/36471593234acce2e1c69b79ab12c41b.mp3">&nbsp;</audio>\n</p>\n\n<p>&nbsp;</p>\n\n<p>\n<audio attach-id="308" controls="controls" src="http://www.icodebang.cn/uploads/course/20171029/59e17d8d20a203d066fa0b0c08a21985.mp3">&nbsp;</audio>\n</p>\n\n<p>&nbsp;</p>\n\n<blockquote>\n<p>&nbsp;\n<audio attach-id="307" controls="controls" src="http://www.icodebang.cn/uploads/course/20171029/36471593234acce2e1c69b79ab12c41b.mp3">&nbsp;</audio>\n</p>\n</blockquote>\n', 0, 100, 1506679444, 1, 1, 0, 0, 0, NULL, 5, 1, NULL, 0, 'banner_test', 'banner_test', '20180107/672159fad6b4e43038f48b43cf5bbb3d.png'),
(15, 1, '测试发布新文章', '', 'if (isset($_POST[''banner_id''], $_POST[''banner_path'']) && $articleInfo[''pic'']) {\n                @unlink(get_setting(''upload_dir'') . ''/course/'' . $articleInfo[''pic'']);\n                $this->model(''tempUpload'')->deleteByIds($_POST[''banner_id'']);\n            }', 0, 6, 1506679843, 1, 1, 0, 0, 0, NULL, 5, 0, NULL, 0, '', '', '');

-- --------------------------------------------------------

--
-- 表的结构 `icb_course_content_table`
--

CREATE TABLE IF NOT EXISTS `icb_course_content_table` (
  `id` int(11) unsigned NOT NULL,
  `title` varchar(128) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `topic_id` int(11) DEFAULT '0' COMMENT '教程目录所属话题id',
  `link` varchar(255) DEFAULT NULL COMMENT '链接',
  `icon` varchar(255) DEFAULT NULL COMMENT '图标',
  `sort` smallint(6) DEFAULT '0' COMMENT '排序',
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '父级id',
  `from_type` varchar(10) DEFAULT NULL COMMENT '本条目数据来源类型， 是自定义（custom)还是来自于系统教程文章(course)）',
  `article_id` int(10) NOT NULL COMMENT '教程id',
  `add_time` int(11) NOT NULL COMMENT '记录添加时间'
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='教程目录表。 教程目录绑定标签。在标签页面展示教程目录';

--
-- 转存表中的数据 `icb_course_content_table`
--

INSERT INTO `icb_course_content_table` (`id`, `title`, `description`, `topic_id`, `link`, `icon`, `sort`, `parent_id`, `from_type`, `article_id`, `add_time`) VALUES
(1, 'H5入门参考', '', 2, NULL, NULL, 0, 0, 'course', 8, 1502204379),
(7, 'Linux中inittab文件作用', NULL, 0, NULL, NULL, 0, 0, 'course', 2, 1505980650),
(6, 'course title 5', '', 2, NULL, NULL, 4, 0, 'course', 8, 1502249870),
(8, 'Linux中inittab文件作用', NULL, 0, NULL, NULL, 0, 0, 'course', 2, 1505980667),
(9, 'Linux中inittab文件作用', NULL, 0, NULL, NULL, 0, 0, 'course', 2, 1505980691),
(10, 'Linux中inittab文件作用', NULL, 0, NULL, NULL, 0, 0, 'course', 2, 1505980913),
(11, 'course title 4', NULL, 0, NULL, NULL, 0, 0, 'course', 7, 1505981010),
(12, 'Linux中inittab文件作用', NULL, 0, NULL, NULL, 0, 2, 'course', 2, 1505981310),
(13, 'Linux中inittab文件作用', NULL, 0, NULL, NULL, 0, 2, 'course', 2, 1505981448),
(14, 'Linux中inittab文件作用', NULL, 0, NULL, NULL, 0, 0, 'course', 2, 1505981668),
(15, 'Linux中inittab文件作用', NULL, 0, NULL, NULL, 0, 0, 'course', 2, 1505981700),
(16, 'Linux中inittab文件作用', '', 2, NULL, NULL, 2, 0, 'course', 2, 1505981766),
(17, '自定义教程', '', 2, 'http://www.baidu.com', NULL, 3, 16, 'link', 0, 1505985450),
(18, '教程分章', '', 2, '', NULL, 1, 0, 'chapter', 0, 1505985481);

-- --------------------------------------------------------

--
-- 表的结构 `icb_course_homework`
--

CREATE TABLE IF NOT EXISTS `icb_course_homework` (
  `id` int(11) NOT NULL COMMENT '教程问题id',
  `course_id` int(11) NOT NULL COMMENT '教程id',
  `content` text NOT NULL COMMENT '问题内容',
  `attach_id` int(10) NOT NULL COMMENT '问题文件id,在attach表',
  `add_time` int(10) NOT NULL COMMENT '添加时间',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `sort` smallint(4) NOT NULL COMMENT '排序'
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='教程对应的课后作业内容';

--
-- 转存表中的数据 `icb_course_homework`
--

INSERT INTO `icb_course_homework` (`id`, `course_id`, `content`, `attach_id`, `add_time`, `uid`, `sort`) VALUES
(1, 15, 'hello', 347, 1512657985, 0, 0),
(3, 15, 'aha', 348, 1512750472, 1, 0),
(4, 14, 'nobody but you', 349, 1512866520, 1, 0),
(5, 14, 'becourse of you', 350, 1512866520, 1, 0);

-- --------------------------------------------------------

--
-- 表的结构 `icb_course_homework_answer`
--

CREATE TABLE IF NOT EXISTS `icb_course_homework_answer` (
  `id` int(11) NOT NULL COMMENT '作业答案id',
  `homework_id` int(11) NOT NULL COMMENT '作业id',
  `content` text NOT NULL COMMENT '回答内容',
  `wechat_media_id` varchar(250) NOT NULL DEFAULT '' COMMENT '微信素材id',
  `file` varchar(250) NOT NULL COMMENT '回答文件路径',
  `add_time` int(10) NOT NULL COMMENT '添加时间',
  `uid` int(11) NOT NULL COMMENT '用户id'
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='作业答题内容表';

--
-- 转存表中的数据 `icb_course_homework_answer`
--

INSERT INTO `icb_course_homework_answer` (`id`, `homework_id`, `content`, `wechat_media_id`, `file`, `add_time`, `uid`) VALUES
(1, 4, '', '', '0', 1515328919, 0),
(2, 5, '', '', '0', 1515328919, 0),
(3, 4, '', '', '0', 1515329665, 0),
(4, 5, '', '', '0', 1515329665, 0),
(5, 4, '', '', 'UPihgxtuvMp-ey3dQYzA-EPHt9fJnDUTeM4lUonCV-Lt-tXFQA8Z3hrLKcE7WU2f', 1515329783, 0),
(6, 5, '', '', 'mxV3mUQaPWcbQjxh3gFdcnYZLAgVz0jb8oL3k7ZBbabppf_n29Vm5XO_p0CdlCmx', 1515329783, 0),
(7, 4, '', 'UPihgxtuvMp-ey3dQYzA-EPHt9fJnDUTeM4lUonCV-Lt-tXFQA8Z3hrLKcE7WU2f', '', 1515329963, 0),
(8, 5, '', 'mxV3mUQaPWcbQjxh3gFdcnYZLAgVz0jb8oL3k7ZBbabppf_n29Vm5XO_p0CdlCmx', '', 1515329963, 0);

-- --------------------------------------------------------

--
-- 表的结构 `icb_course_month_order`
--

CREATE TABLE IF NOT EXISTS `icb_course_month_order` (
  `id` int(11) NOT NULL COMMENT '订单id',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `add_time` int(10) DEFAULT NULL COMMENT '下订单时间',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '订单状态',
  `amount` float(5,2) NOT NULL DEFAULT '0.00' COMMENT '订单金额',
  `pay_type` int(11) DEFAULT NULL COMMENT '支付类型',
  `order_year` smallint(4) DEFAULT NULL COMMENT '订单年',
  `order_month` tinyint(2) DEFAULT NULL COMMENT '订单月',
  `notify_time` int(10) NOT NULL COMMENT '支付网关回复时间'
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='教程按月订阅的订单表 ';

--
-- 转存表中的数据 `icb_course_month_order`
--

INSERT INTO `icb_course_month_order` (`id`, `uid`, `add_time`, `status`, `amount`, `pay_type`, `order_year`, `order_month`, `notify_time`) VALUES
(1, 333, NULL, 0, 22444.22, NULL, NULL, NULL, 3);

-- --------------------------------------------------------

--
-- 表的结构 `icb_draft`
--

CREATE TABLE IF NOT EXISTS `icb_draft` (
  `id` int(11) unsigned NOT NULL,
  `uid` int(11) DEFAULT '0',
  `type` varchar(16) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `data` text,
  `time` int(10) DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_edm_task`
--

CREATE TABLE IF NOT EXISTS `icb_edm_task` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` mediumtext NOT NULL,
  `subject` varchar(255) NOT NULL,
  `from_name` varchar(255) NOT NULL,
  `time` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_edm_taskdata`
--

CREATE TABLE IF NOT EXISTS `icb_edm_taskdata` (
  `id` int(11) NOT NULL,
  `taskid` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `sent_time` int(10) NOT NULL,
  `view_time` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_edm_unsubscription`
--

CREATE TABLE IF NOT EXISTS `icb_edm_unsubscription` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `time` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_edm_userdata`
--

CREATE TABLE IF NOT EXISTS `icb_edm_userdata` (
  `id` int(11) NOT NULL,
  `usergroup` int(11) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_edm_usergroup`
--

CREATE TABLE IF NOT EXISTS `icb_edm_usergroup` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `time` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_education_experience`
--

CREATE TABLE IF NOT EXISTS `icb_education_experience` (
  `education_id` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL COMMENT '用户UID',
  `education_years` int(11) DEFAULT NULL COMMENT '入学年份',
  `school_name` varchar(64) DEFAULT NULL COMMENT '学校名',
  `school_type` tinyint(4) DEFAULT NULL COMMENT '学校类别',
  `departments` varchar(64) DEFAULT NULL COMMENT '院系',
  `add_time` int(10) DEFAULT NULL COMMENT '记录添加时间'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='教育经历';

-- --------------------------------------------------------

--
-- 表的结构 `icb_favorite`
--

CREATE TABLE IF NOT EXISTS `icb_favorite` (
  `id` int(11) unsigned NOT NULL,
  `uid` int(11) DEFAULT '0',
  `item_id` int(11) DEFAULT '0',
  `time` int(10) DEFAULT '0',
  `type` varchar(16) NOT NULL DEFAULT ''
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_favorite`
--

INSERT INTO `icb_favorite` (`id`, `uid`, `item_id`, `time`, `type`) VALUES
(1, 2, 1, 1499928043, 'article');

-- --------------------------------------------------------

--
-- 表的结构 `icb_favorite_tag`
--

CREATE TABLE IF NOT EXISTS `icb_favorite_tag` (
  `id` int(11) unsigned NOT NULL,
  `uid` int(11) DEFAULT '0',
  `title` varchar(128) DEFAULT NULL,
  `item_id` int(11) DEFAULT '0',
  `type` varchar(16) NOT NULL DEFAULT ''
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_favorite_tag`
--

INSERT INTO `icb_favorite_tag` (`id`, `uid`, `title`, `item_id`, `type`) VALUES
(5, 2, 'js', 1, 'article'),
(6, 2, 'my', 1, 'article');

-- --------------------------------------------------------

--
-- 表的结构 `icb_feature`
--

CREATE TABLE IF NOT EXISTS `icb_feature` (
  `id` int(11) NOT NULL,
  `title` varchar(200) DEFAULT NULL COMMENT '专题标题',
  `description` varchar(255) DEFAULT NULL COMMENT '专题描述',
  `icon` varchar(255) DEFAULT NULL COMMENT '专题图标',
  `topic_count` int(11) NOT NULL DEFAULT '0' COMMENT '话题计数',
  `css` text COMMENT '自定义CSS',
  `url_token` varchar(32) DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_feature`
--

INSERT INTO `icb_feature` (`id`, `title`, `description`, `icon`, `topic_count`, `css`, `url_token`, `seo_title`, `enabled`) VALUES
(1, '前端开发', '前端开发技术', '1_32_32.jpg', 3, '', 'front', '前端开发相关技术', 1),
(2, 'web', 'web开发', NULL, 3, '', 'web', 'web开发', 1);

-- --------------------------------------------------------

--
-- 表的结构 `icb_feature_topic`
--

CREATE TABLE IF NOT EXISTS `icb_feature_topic` (
  `id` int(11) NOT NULL,
  `feature_id` int(11) NOT NULL DEFAULT '0' COMMENT '专题ID',
  `topic_id` int(11) NOT NULL DEFAULT '0' COMMENT '话题ID'
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_feature_topic`
--

INSERT INTO `icb_feature_topic` (`id`, `feature_id`, `topic_id`) VALUES
(7, 1, 7),
(6, 1, 6),
(5, 1, 1),
(8, 2, 7),
(9, 2, 2),
(10, 2, 6);

-- --------------------------------------------------------

--
-- 表的结构 `icb_geo_location`
--

CREATE TABLE IF NOT EXISTS `icb_geo_location` (
  `id` int(10) NOT NULL,
  `item_type` varchar(32) NOT NULL,
  `item_id` int(10) NOT NULL,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `add_time` int(10) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_help_chapter`
--

CREATE TABLE IF NOT EXISTS `icb_help_chapter` (
  `id` int(10) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `url_token` varchar(32) DEFAULT NULL,
  `sort` tinyint(2) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='帮助中心';

--
-- 转存表中的数据 `icb_help_chapter`
--

INSERT INTO `icb_help_chapter` (`id`, `title`, `description`, `url_token`, `sort`) VALUES
(1, 'help章节1', 'help章节1', 'chapter1', 0);

-- --------------------------------------------------------

--
-- 表的结构 `icb_inbox`
--

CREATE TABLE IF NOT EXISTS `icb_inbox` (
  `id` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL COMMENT '发送者 ID',
  `dialog_id` int(11) DEFAULT NULL COMMENT '对话id',
  `message` text COMMENT '内容',
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间',
  `sender_remove` tinyint(1) DEFAULT '0',
  `recipient_remove` tinyint(1) DEFAULT '0',
  `receipt` int(10) DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_inbox`
--

INSERT INTO `icb_inbox` (`id`, `uid`, `dialog_id`, `message`, `add_time`, `sender_remove`, `recipient_remove`, `receipt`) VALUES
(1, 2, 1, '有新的举报, 请登录后台查看处理: http://www.icodebang.cn/admin/question/report_list/', 1499928290, 0, 0, 1499928560),
(2, 1, 1, '已经处理', 1499928591, 0, 0, 1499928647),
(3, 1, 1, '感谢您的反馈！', 1499929945, 0, 0, 1505702025);

-- --------------------------------------------------------

--
-- 表的结构 `icb_inbox_dialog`
--

CREATE TABLE IF NOT EXISTS `icb_inbox_dialog` (
  `id` int(11) NOT NULL COMMENT '对话ID',
  `sender_uid` int(11) DEFAULT NULL COMMENT '发送者UID',
  `sender_unread` int(11) DEFAULT NULL COMMENT '发送者未读',
  `recipient_uid` int(11) DEFAULT NULL COMMENT '接收者UID',
  `recipient_unread` int(11) DEFAULT NULL COMMENT '接收者未读',
  `add_time` int(11) DEFAULT NULL COMMENT '添加时间',
  `update_time` int(11) DEFAULT NULL COMMENT '最后更新时间',
  `sender_count` int(11) DEFAULT NULL COMMENT '发送者显示对话条数',
  `recipient_count` int(11) DEFAULT NULL COMMENT '接收者显示对话条数'
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_inbox_dialog`
--

INSERT INTO `icb_inbox_dialog` (`id`, `sender_uid`, `sender_unread`, `recipient_uid`, `recipient_unread`, `add_time`, `update_time`, `sender_count`, `recipient_count`) VALUES
(1, 2, 0, 1, 0, 1499928290, 1499929945, 3, 3);

-- --------------------------------------------------------

--
-- 表的结构 `icb_integral_log`
--

CREATE TABLE IF NOT EXISTS `icb_integral_log` (
  `id` int(11) unsigned NOT NULL,
  `uid` int(11) DEFAULT '0',
  `action` varchar(16) DEFAULT NULL,
  `integral` int(11) DEFAULT NULL,
  `note` varchar(128) DEFAULT NULL,
  `balance` int(11) DEFAULT '0',
  `item_id` int(11) DEFAULT '0',
  `time` int(10) DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_integral_log`
--

INSERT INTO `icb_integral_log` (`id`, `uid`, `action`, `integral`, `note`, `balance`, `item_id`, `time`) VALUES
(1, 1, 'REGISTER', 2000, '初始资本', 2000, 0, 1499825943),
(2, 1, 'UPDATE_SIGNATURE', 10, '完善一句话介绍', 2010, 0, 1499826026),
(3, 2, 'REGISTER', 2000, '初始资本', 2000, 0, 1499918490),
(4, 2, 'UPDATE_WORK', 20, '完善工作经历', 2020, 0, 1499919352),
(5, 2, 'NEW_QUESTION', -20, '发起问题 #1', 2000, 1, 1499928237),
(6, 1, 'ANSWER_QUESTION', -5, '回答问题 #1', 2005, 1, 1499930118),
(7, 2, 'QUESTION_ANSWER', 5, '问题被回答 #1', 2005, 1, 1499930118),
(8, 1, 'AWARD', 2010, '管理员操作积分', 4015, 0, 1500358614),
(9, 1, 'AWARD', -2010, '管理员操作积分', 2005, 0, 1500358624),
(10, 1, 'NEW_QUESTION', -20, '发起问题 #2', 1985, 2, 1500732458),
(11, 1, 'UPLOAD_AVATAR', 20, '上传头像', 2005, 0, 1502778208),
(12, 1, 'BEST_ANSWER', 200, '问题 #1 最佳回复', 2205, 0, 1503287505),
(13, 1, 'ANSWER_QUESTION', -5, '回答问题 #1', 2200, 1, 1503306562),
(14, 2, 'QUESTION_ANSWER', 5, '问题被回答 #1', 2010, 1, 1503306562),
(15, 1, 'ANSWER_QUESTION', -5, '回答问题 #1', 2195, 1, 1503306599),
(16, 2, 'QUESTION_ANSWER', 5, '问题被回答 #1', 2015, 1, 1503306599),
(17, 1, 'ANSWER_QUESTION', -5, '回答问题 #1', 2190, 1, 1503306891),
(18, 2, 'QUESTION_ANSWER', 5, '问题被回答 #1', 2020, 1, 1503306891),
(19, 1, 'QUESTION_THANKS', -10, '感谢问题 #1', 2180, 1, 1503320881),
(20, 2, 'THANKS_QUESTION', 10, '问题被感谢 #1', 2030, 1, 1503320881),
(21, 1, 'NEW_QUESTION', -20, '发起问题 #3', 2160, 3, 1505576229),
(22, 1, 'NEW_QUESTION', -20, '发起问题 #4', 2140, 4, 1505653614),
(23, 1, 'NEW_QUESTION', -20, '发起问题 #5', 2120, 5, 1505653722),
(24, 1, 'NEW_QUESTION', -20, '发起问题 #6', 2100, 6, 1505653935);

-- --------------------------------------------------------

--
-- 表的结构 `icb_invitation`
--

CREATE TABLE IF NOT EXISTS `icb_invitation` (
  `invitation_id` int(10) unsigned NOT NULL COMMENT '激活ID',
  `uid` int(11) DEFAULT '0' COMMENT '用户ID',
  `invitation_code` varchar(32) DEFAULT NULL COMMENT '激活码',
  `invitation_email` varchar(255) DEFAULT NULL COMMENT '激活email',
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间',
  `add_ip` bigint(12) DEFAULT NULL COMMENT '添加IP',
  `active_expire` tinyint(1) DEFAULT '0' COMMENT '激活过期',
  `active_time` int(10) DEFAULT NULL COMMENT '激活时间',
  `active_ip` bigint(12) DEFAULT NULL COMMENT '激活IP',
  `active_status` tinyint(4) DEFAULT '0' COMMENT '1已使用0未使用-1已删除',
  `active_uid` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_jobs`
--

CREATE TABLE IF NOT EXISTS `icb_jobs` (
  `id` int(11) NOT NULL,
  `job_name` varchar(64) DEFAULT NULL COMMENT '职位名'
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_jobs`
--

INSERT INTO `icb_jobs` (`id`, `job_name`) VALUES
(1, '销售'),
(2, '市场/市场拓展/公关'),
(3, '商务/采购/贸易'),
(4, '计算机软、硬件/互联网/IT'),
(5, '电子/半导体/仪表仪器'),
(6, '通信技术'),
(7, '客户服务/技术支持'),
(8, '行政/后勤'),
(9, '人力资源'),
(10, '高级管理'),
(11, '生产/加工/制造'),
(12, '质控/安检'),
(13, '工程机械'),
(14, '技工'),
(15, '财会/审计/统计'),
(16, '金融/银行/保险/证券/投资'),
(17, '建筑/房地产/装修/物业'),
(18, '交通/仓储/物流'),
(19, '普通劳动力/家政服务'),
(20, '零售业'),
(21, '教育/培训'),
(22, '咨询/顾问'),
(23, '学术/科研'),
(24, '法律'),
(25, '美术/设计/创意'),
(26, '编辑/文案/传媒/影视/新闻'),
(27, '酒店/餐饮/旅游/娱乐'),
(28, '化工'),
(29, '能源/矿产/地质勘查'),
(30, '医疗/护理/保健/美容'),
(31, '生物/制药/医疗器械'),
(32, '翻译（口译与笔译）'),
(33, '公务员'),
(34, '环境科学/环保'),
(35, '农/林/牧/渔业'),
(36, '兼职/临时/培训生/储备干部'),
(37, '在校学生'),
(38, '其他');

-- --------------------------------------------------------

--
-- 表的结构 `icb_mail_queue`
--

CREATE TABLE IF NOT EXISTS `icb_mail_queue` (
  `id` int(11) NOT NULL,
  `send_to` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_error` tinyint(1) NOT NULL DEFAULT '0',
  `error_message` varchar(255) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_nav_menu`
--

CREATE TABLE IF NOT EXISTS `icb_nav_menu` (
  `id` int(11) unsigned NOT NULL,
  `title` varchar(128) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(16) DEFAULT NULL,
  `type_id` int(11) DEFAULT '0',
  `link` varchar(255) DEFAULT NULL COMMENT '链接',
  `icon` varchar(255) DEFAULT NULL COMMENT '图标',
  `sort` smallint(6) DEFAULT '0' COMMENT '排序',
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '父级id'
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_nav_menu`
--

INSERT INTO `icb_nav_menu` (`id`, `title`, `description`, `type`, `type_id`, `link`, `icon`, `sort`, `parent_id`) VALUES
(2, '前端&开发', '<b>前端开发所需要的技能</b>前端开发所需要的技能', 'category', 1, NULL, '2.jpg', 0, 0),
(3, '安卓Android APP', '', 'category', 2, NULL, '', 6, 0),
(4, '苹果IOS APP', '', 'category', 3, NULL, '', 7, 0),
(5, 'HTML5/H5', '', 'category', 4, NULL, '', 5, 13),
(7, 'Javascript', '', 'category', 10, NULL, '', 3, 13),
(8, 'CSS&CSS3', '', 'category', 12, NULL, '', 4, 13),
(12, '数据库', '', 'category', 5, NULL, '', 8, 0),
(13, '前端开发', '前端开发所需技能', 'custom', 0, '', '13.jpg', 1, 0),
(17, 'androidstudio', '', 'topic', 12, NULL, '', 9, 0),
(15, 'jQuery', '', 'category', 11, NULL, '', 2, 13);

-- --------------------------------------------------------

--
-- 表的结构 `icb_notification`
--

CREATE TABLE IF NOT EXISTS `icb_notification` (
  `notification_id` int(11) NOT NULL COMMENT '自增ID',
  `sender_uid` int(11) DEFAULT NULL COMMENT '发送者ID',
  `recipient_uid` int(11) DEFAULT '0' COMMENT '接收者ID',
  `action_type` int(4) DEFAULT NULL COMMENT '操作类型',
  `model_type` smallint(11) NOT NULL DEFAULT '0',
  `source_id` varchar(16) NOT NULL DEFAULT '0' COMMENT '关联 ID',
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间',
  `read_flag` tinyint(1) DEFAULT '0' COMMENT '阅读状态'
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='系统通知';

--
-- 转存表中的数据 `icb_notification`
--

INSERT INTO `icb_notification` (`notification_id`, `sender_uid`, `recipient_uid`, `action_type`, `model_type`, `source_id`, `add_time`, `read_flag`) VALUES
(2, 1, 2, 101, 4, '1', 1499930311, 0);

-- --------------------------------------------------------

--
-- 表的结构 `icb_notification_data`
--

CREATE TABLE IF NOT EXISTS `icb_notification_data` (
  `notification_id` int(11) unsigned NOT NULL,
  `data` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='系统通知数据表';

--
-- 转存表中的数据 `icb_notification_data`
--

INSERT INTO `icb_notification_data` (`notification_id`, `data`) VALUES
(2, 'a:1:{s:8:"from_uid";i:1;}');

-- --------------------------------------------------------

--
-- 表的结构 `icb_pages`
--

CREATE TABLE IF NOT EXISTS `icb_pages` (
  `id` int(10) NOT NULL,
  `url_token` varchar(32) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `contents` text,
  `enabled` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_posts_index`
--

CREATE TABLE IF NOT EXISTS `icb_posts_index` (
  `id` int(10) NOT NULL,
  `post_id` int(10) NOT NULL,
  `post_type` varchar(16) NOT NULL DEFAULT '',
  `add_time` int(10) NOT NULL,
  `update_time` int(10) DEFAULT '0',
  `category_id` int(10) DEFAULT '0',
  `is_recommend` tinyint(1) DEFAULT '0',
  `view_count` int(10) DEFAULT '0',
  `anonymous` tinyint(1) DEFAULT '0',
  `popular_value` int(10) DEFAULT '0',
  `uid` int(10) NOT NULL,
  `lock` tinyint(1) DEFAULT '0',
  `agree_count` int(10) DEFAULT '0',
  `answer_count` int(10) DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_posts_index`
--

INSERT INTO `icb_posts_index` (`id`, `post_id`, `post_type`, `add_time`, `update_time`, `category_id`, `is_recommend`, `view_count`, `anonymous`, `popular_value`, `uid`, `lock`, `agree_count`, `answer_count`) VALUES
(1, 1, 'article', 1499918126, 1499918126, 10, 0, 0, 0, 0, 1, 0, 0, 0),
(2, 1, 'question', 1499928237, 1503306891, 10, 0, 11, 0, 3, 2, 0, 0, 4),
(3, 2, 'article', 1500607543, 1500607543, 7, 0, 2, 0, 0, 1, 0, 0, 0),
(4, 2, 'question', 1500732458, 1500732458, 1, 0, 4, 0, 1, 1, 0, 0, 0),
(5, 3, 'article', 1502351663, 1502351663, 0, 0, 4, 0, 0, 1, 0, 0, 0),
(6, 4, 'article', 1502697530, 1502697530, 1, 1, 22, 0, 0, 1, 0, 0, 7),
(7, 3, 'question', 1505576229, 1505576229, 1, 0, 0, 0, 0, 1, 0, 0, 0),
(8, 4, 'question', 1505653614, 1505653614, 1, 0, 0, 0, 0, 1, 0, 0, 0),
(9, 5, 'question', 1505653722, 1505653722, 1, 0, 0, 0, 0, 1, 0, 0, 0),
(10, 6, 'question', 1505653935, 1505653935, 1, 0, 0, 0, 0, 1, 0, 0, 0),
(11, 5, 'article', 1506091200, 1506091200, 1, 0, 2, 0, 0, 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `icb_question`
--

CREATE TABLE IF NOT EXISTS `icb_question` (
  `question_id` int(11) NOT NULL,
  `question_content` varchar(255) NOT NULL DEFAULT '' COMMENT '问题内容',
  `question_detail` text COMMENT '问题说明',
  `add_time` int(11) NOT NULL COMMENT '添加时间',
  `update_time` int(11) DEFAULT NULL,
  `published_uid` int(11) DEFAULT NULL COMMENT '发布用户UID',
  `answer_count` int(11) NOT NULL DEFAULT '0' COMMENT '回答计数',
  `answer_users` int(11) NOT NULL DEFAULT '0' COMMENT '回答人数',
  `view_count` int(11) NOT NULL DEFAULT '0' COMMENT '浏览次数',
  `focus_count` int(11) NOT NULL DEFAULT '0' COMMENT '关注数',
  `comment_count` int(11) NOT NULL DEFAULT '0' COMMENT '评论数',
  `action_history_id` int(11) NOT NULL DEFAULT '0' COMMENT '动作的记录表的关连id',
  `category_id` int(11) NOT NULL DEFAULT '0' COMMENT '分类 ID',
  `type` varchar(16) DEFAULT NULL COMMENT '问题所属的类型： 技能 或者技能分类',
  `type_id` int(11) NOT NULL DEFAULT '0' COMMENT '问题所属的技能id或者技能分类id',
  `agree_count` int(11) NOT NULL DEFAULT '0' COMMENT '回复赞同数总和',
  `against_count` int(11) NOT NULL DEFAULT '0' COMMENT '回复反对数总和',
  `best_answer` int(11) NOT NULL DEFAULT '0' COMMENT '最佳回复 ID',
  `has_attach` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否存在附件',
  `unverified_modify` text,
  `unverified_modify_count` int(10) NOT NULL DEFAULT '0',
  `ip` bigint(11) DEFAULT NULL,
  `last_answer` int(11) NOT NULL DEFAULT '0' COMMENT '最后回答 ID',
  `popular_value` double NOT NULL DEFAULT '0',
  `popular_value_update` int(10) NOT NULL DEFAULT '0',
  `lock` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否锁定',
  `anonymous` tinyint(1) NOT NULL DEFAULT '0',
  `thanks_count` int(10) NOT NULL DEFAULT '0',
  `question_content_fulltext` text,
  `is_recommend` tinyint(1) NOT NULL DEFAULT '0',
  `weibo_msg_id` bigint(20) DEFAULT NULL,
  `received_email_id` int(10) DEFAULT NULL,
  `chapter_id` int(10) unsigned DEFAULT NULL,
  `sort` tinyint(2) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='问题列表';

--
-- 转存表中的数据 `icb_question`
--

INSERT INTO `icb_question` (`question_id`, `question_content`, `question_detail`, `add_time`, `update_time`, `published_uid`, `answer_count`, `answer_users`, `view_count`, `focus_count`, `comment_count`, `action_history_id`, `category_id`, `type`, `type_id`, `agree_count`, `against_count`, `best_answer`, `has_attach`, `unverified_modify`, `unverified_modify_count`, `ip`, `last_answer`, `popular_value`, `popular_value_update`, `lock`, `anonymous`, `thanks_count`, `question_content_fulltext`, `is_recommend`, `weibo_msg_id`, `received_email_id`, `chapter_id`, `sort`) VALUES
(1, '如何定义js的class？', '如题， js中怎么定义class？ 直接用function就可以么？\n ', 1499928237, 1503306891, 2, 4, 4, 33, 2, 2, 0, 10, NULL, 0, 0, 0, 1, 0, NULL, 0, 2130706433, 4, 3.4771212547197, 1505702126, 0, 0, 1, '2345020041 js class', 0, NULL, NULL, NULL, 0),
(2, 'javascript的void的用途？', 'javascript的void的用途 ？', 1500732458, 1500732458, 1, 0, 0, 5, 1, 0, 0, 1, NULL, 0, 0, 0, 0, 0, NULL, 0, 2130706433, 0, 1.602059991328, 1504677523, 0, 0, 0, 'javascript void 2999236884', 0, NULL, NULL, NULL, 0),
(3, '已关注话题， 再在这个话题中发问题， 是否会取消关注？', '已关注话题， 再在这个话题中发问题， 是否会取消关注？', 1505576229, 1505576229, 1, 0, 0, 1, 1, 0, 0, 1, NULL, 0, 0, 0, 0, 0, NULL, 0, 2130706433, 0, 0, 1505576229, 0, 0, 0, '2085127880 3580539064 2001321457 3838239064 2615921542 2146228040', 0, NULL, NULL, NULL, 0),
(4, '添加H5问题', '看看是否变更了最近话题', 1505653614, 1505653614, 1, 0, 0, 1, 1, 0, 0, 1, NULL, 0, 0, 0, 0, 0, NULL, 0, 2130706433, 0, 0, 1505653614, 0, 0, 0, '2815521152 h5 3838239064', 0, NULL, NULL, NULL, 0),
(5, '发起话题问题， 是否变更最近话题', '''recent_topics'' =&gt; serialize($new_recent_topics)', 1505653722, 1505653722, 1, 0, 0, 1, 1, 0, 0, 1, NULL, 0, 0, 0, 0, 0, NULL, 0, 2130706433, 0, 0, 1505653722, 0, 0, 0, '2145736215 3580539064 3838239064 2615921542 2146426356 2636836817', 0, NULL, NULL, NULL, 0),
(6, '发布一个Linux问题', '''recent_topics'' =&gt; serialize($new_recent_topics)', 1505653935, 1505653935, 1, 0, 0, 9, 1, 0, 0, 1, NULL, 0, 0, 0, 0, 0, NULL, 0, 2130706433, 0, 1.9030899869919, 1509894764, 0, 0, 0, '2145724067 1996820010 linux 3838239064', 0, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- 表的结构 `icb_question_comments`
--

CREATE TABLE IF NOT EXISTS `icb_question_comments` (
  `id` int(11) unsigned NOT NULL,
  `question_id` int(11) DEFAULT '0',
  `uid` int(11) DEFAULT '0',
  `message` text,
  `time` int(10) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_question_comments`
--

INSERT INTO `icb_question_comments` (`id`, `question_id`, `uid`, `message`, `time`) VALUES
(1, 1, 1, 'cool', 1503242212),
(2, 1, 1, '评论不是回复', 1503306927);

-- --------------------------------------------------------

--
-- 表的结构 `icb_question_focus`
--

CREATE TABLE IF NOT EXISTS `icb_question_focus` (
  `focus_id` int(11) NOT NULL COMMENT '自增ID',
  `question_id` int(11) DEFAULT NULL COMMENT '话题ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户UID',
  `add_time` int(10) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='问题关注表';

--
-- 转存表中的数据 `icb_question_focus`
--

INSERT INTO `icb_question_focus` (`focus_id`, `question_id`, `uid`, `add_time`) VALUES
(1, 1, 2, 1499928237),
(2, 2, 1, 1500732458),
(3, 1, 1, 1503306562),
(4, 3, 1, 1505576229),
(5, 4, 1, 1505653614),
(6, 5, 1, 1505653722),
(7, 6, 1, 1505653935);

-- --------------------------------------------------------

--
-- 表的结构 `icb_question_invite`
--

CREATE TABLE IF NOT EXISTS `icb_question_invite` (
  `question_invite_id` int(11) NOT NULL COMMENT '自增ID',
  `question_id` int(11) NOT NULL COMMENT '问题ID',
  `sender_uid` int(11) NOT NULL,
  `recipients_uid` int(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL COMMENT '受邀Email',
  `add_time` int(10) DEFAULT '0' COMMENT '添加时间',
  `available_time` int(10) DEFAULT '0' COMMENT '生效时间'
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='邀请问答';

--
-- 转存表中的数据 `icb_question_invite`
--

INSERT INTO `icb_question_invite` (`question_invite_id`, `question_id`, `sender_uid`, `recipients_uid`, `email`, `add_time`, `available_time`) VALUES
(1, 6, 1, 2, NULL, 1505701884, 0);

-- --------------------------------------------------------

--
-- 表的结构 `icb_question_thanks`
--

CREATE TABLE IF NOT EXISTS `icb_question_thanks` (
  `id` int(11) unsigned NOT NULL,
  `uid` int(11) DEFAULT '0',
  `question_id` int(11) DEFAULT '0',
  `user_name` varchar(255) DEFAULT NULL,
  `time` int(10) DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_question_thanks`
--

INSERT INTO `icb_question_thanks` (`id`, `uid`, `question_id`, `user_name`, `time`) VALUES
(1, 1, 1, 'wangkilin', 0);

-- --------------------------------------------------------

--
-- 表的结构 `icb_question_uninterested`
--

CREATE TABLE IF NOT EXISTS `icb_question_uninterested` (
  `interested_id` int(11) NOT NULL COMMENT '自增ID',
  `question_id` int(11) DEFAULT NULL COMMENT '话题ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户UID',
  `add_time` int(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='问题不感兴趣表';

-- --------------------------------------------------------

--
-- 表的结构 `icb_received_email`
--

CREATE TABLE IF NOT EXISTS `icb_received_email` (
  `id` int(10) NOT NULL,
  `uid` int(10) NOT NULL,
  `config_id` int(10) NOT NULL,
  `message_id` varchar(255) NOT NULL,
  `date` int(10) NOT NULL,
  `from` varchar(255) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `content` text,
  `question_id` int(11) DEFAULT NULL,
  `ticket_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='已导入邮件列表';

-- --------------------------------------------------------

--
-- 表的结构 `icb_receiving_email_config`
--

CREATE TABLE IF NOT EXISTS `icb_receiving_email_config` (
  `id` int(10) NOT NULL,
  `protocol` varchar(10) NOT NULL,
  `server` varchar(255) NOT NULL,
  `ssl` tinyint(1) NOT NULL DEFAULT '0',
  `port` smallint(5) DEFAULT NULL,
  `username` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `uid` int(10) NOT NULL,
  `access_key` varchar(32) NOT NULL,
  `has_attach` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='邮件账号列表';

-- --------------------------------------------------------

--
-- 表的结构 `icb_redirect`
--

CREATE TABLE IF NOT EXISTS `icb_redirect` (
  `id` int(11) unsigned NOT NULL,
  `item_id` int(11) DEFAULT '0',
  `target_id` int(11) DEFAULT '0',
  `time` int(10) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_related_links`
--

CREATE TABLE IF NOT EXISTS `icb_related_links` (
  `id` int(10) NOT NULL,
  `uid` int(10) NOT NULL,
  `item_type` varchar(32) NOT NULL,
  `item_id` int(10) NOT NULL,
  `link` varchar(255) NOT NULL,
  `add_time` int(10) DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_related_links`
--

INSERT INTO `icb_related_links` (`id`, `uid`, `item_type`, `item_id`, `link`, `add_time`) VALUES
(1, 1, 'question', 1, 'http://www.baidu.com', 1503320848);

-- --------------------------------------------------------

--
-- 表的结构 `icb_related_topic`
--

CREATE TABLE IF NOT EXISTS `icb_related_topic` (
  `id` int(11) unsigned NOT NULL,
  `topic_id` int(11) DEFAULT '0' COMMENT '话题 ID',
  `related_id` int(11) DEFAULT '0' COMMENT '相关话题 ID'
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_related_topic`
--

INSERT INTO `icb_related_topic` (`id`, `topic_id`, `related_id`) VALUES
(3, 6, 2),
(4, 6, 11);

-- --------------------------------------------------------

--
-- 表的结构 `icb_report`
--

CREATE TABLE IF NOT EXISTS `icb_report` (
  `id` int(11) NOT NULL,
  `uid` int(11) DEFAULT '0' COMMENT '举报用户id',
  `type` varchar(50) DEFAULT NULL COMMENT '类别',
  `target_id` int(11) DEFAULT '0' COMMENT 'ID',
  `reason` varchar(255) DEFAULT NULL COMMENT '举报理由',
  `url` varchar(255) DEFAULT NULL,
  `add_time` int(11) DEFAULT '0' COMMENT '举报时间',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否处理'
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_reputation_category`
--

CREATE TABLE IF NOT EXISTS `icb_reputation_category` (
  `auto_id` int(10) unsigned NOT NULL,
  `uid` int(10) DEFAULT '0',
  `category_id` smallint(4) DEFAULT '0',
  `update_time` int(10) DEFAULT '0',
  `reputation` int(10) DEFAULT '0',
  `thanks_count` int(10) DEFAULT '0',
  `agree_count` int(10) DEFAULT '0',
  `question_count` int(10) DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_reputation_category`
--

INSERT INTO `icb_reputation_category` (`auto_id`, `uid`, `category_id`, `update_time`, `reputation`, `thanks_count`, `agree_count`, `question_count`) VALUES
(1, 1, 10, 1513257959, 3, 0, 0, 1);

-- --------------------------------------------------------

--
-- 表的结构 `icb_reputation_tag`
--

CREATE TABLE IF NOT EXISTS `icb_reputation_tag` (
  `id` int(11) unsigned NOT NULL,
  `uid` int(11) DEFAULT '0',
  `tag_id` int(11) DEFAULT '0' COMMENT '标签ID',
  `tag_count` int(10) DEFAULT '0' COMMENT '威望文章计数',
  `update_time` int(10) DEFAULT NULL COMMENT '更新时间',
  `agree_count` int(10) DEFAULT '0' COMMENT '赞成',
  `thanks_count` int(10) DEFAULT '0' COMMENT '感谢',
  `reputation` int(10) DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_reputation_tag`
--

INSERT INTO `icb_reputation_tag` (`id`, `uid`, `tag_id`, `tag_count`, `update_time`, `agree_count`, `thanks_count`, `reputation`) VALUES
(1, 1, 7, 1, 1500607478, 1, 0, 0),
(2, 1, 1, 1, 1500607478, 1, 0, 0),
(3, 1, 6, 1, 1502930606, 0, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `icb_reputation_tag_category`
--

CREATE TABLE IF NOT EXISTS `icb_reputation_tag_category` (
  `id` int(10) unsigned NOT NULL,
  `uid` int(10) DEFAULT '0',
  `category_id` smallint(4) DEFAULT '0',
  `update_time` int(10) DEFAULT '0',
  `reputation` int(10) DEFAULT '0',
  `thanks_count` int(10) DEFAULT '0',
  `agree_count` int(10) DEFAULT '0',
  `question_count` int(10) DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_reputation_tag_category`
--

INSERT INTO `icb_reputation_tag_category` (`id`, `uid`, `category_id`, `update_time`, `reputation`, `thanks_count`, `agree_count`, `question_count`) VALUES
(1, 1, 10, 1502930606, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- 表的结构 `icb_reputation_topic`
--

CREATE TABLE IF NOT EXISTS `icb_reputation_topic` (
  `auto_id` int(11) unsigned NOT NULL,
  `uid` int(11) DEFAULT '0',
  `topic_id` int(11) DEFAULT '0' COMMENT '话题ID',
  `topic_count` int(10) DEFAULT '0' COMMENT '威望问题话题计数',
  `update_time` int(10) DEFAULT NULL COMMENT '更新时间',
  `agree_count` int(10) DEFAULT '0' COMMENT '赞成',
  `thanks_count` int(10) DEFAULT '0' COMMENT '感谢',
  `reputation` int(10) DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_reputation_topic`
--

INSERT INTO `icb_reputation_topic` (`auto_id`, `uid`, `topic_id`, `topic_count`, `update_time`, `agree_count`, `thanks_count`, `reputation`) VALUES
(1, 1, 7, 1, 1500607478, 1, 0, 0),
(2, 1, 1, 1, 1500607478, 1, 0, 0),
(3, 1, 6, 1, 1513257959, 0, 0, 3),
(4, 1, 2, 1, 1513257959, 0, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `icb_school`
--

CREATE TABLE IF NOT EXISTS `icb_school` (
  `school_id` int(11) NOT NULL COMMENT '自增ID',
  `school_type` tinyint(4) DEFAULT NULL COMMENT '学校类型ID',
  `school_code` int(11) DEFAULT NULL COMMENT '学校编码',
  `school_name` varchar(64) DEFAULT NULL COMMENT '学校名称',
  `area_code` int(11) DEFAULT NULL COMMENT '地区代码'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='学校';

-- --------------------------------------------------------

--
-- 表的结构 `icb_search_cache`
--

CREATE TABLE IF NOT EXISTS `icb_search_cache` (
  `id` int(10) NOT NULL,
  `hash` varchar(32) NOT NULL,
  `data` mediumtext NOT NULL,
  `time` int(10) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_sessions`
--

CREATE TABLE IF NOT EXISTS `icb_sessions` (
  `id` varchar(32) NOT NULL,
  `modified` int(10) NOT NULL,
  `data` text NOT NULL,
  `lifetime` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_sessions`
--

INSERT INTO `icb_sessions` (`id`, `modified`, `data`, `lifetime`) VALUES
('orqtq9fifddounp7nchktihes9', 1515337941, 'fzv__Anwsion|a:3:{s:10:"permission";a:15:{s:16:"is_administortar";s:1:"1";s:12:"is_moderator";s:1:"1";s:16:"publish_question";s:1:"1";s:21:"publish_approval_time";a:2:{s:5:"start";s:0:"";s:3:"end";s:0:"";}s:13:"edit_question";s:1:"1";s:10:"edit_topic";s:1:"1";s:12:"manage_topic";s:1:"1";s:12:"create_topic";s:1:"1";s:17:"redirect_question";s:1:"1";s:13:"upload_attach";s:1:"1";s:11:"publish_url";s:1:"1";s:15:"publish_article";s:1:"1";s:12:"edit_article";s:1:"1";s:19:"edit_question_topic";s:1:"1";s:15:"publish_comment";s:1:"1";}s:11:"client_info";a:3:{s:12:"__CLIENT_UID";i:1;s:18:"__CLIENT_USER_NAME";s:9:"wangkilin";s:17:"__CLIENT_PASSWORD";s:32:"337505ee476b8a7257eca170e262000c";}s:11:"admin_login";s:265:"cast-256|24AE5A390AF6D82F233ED7DF0F90502B4CEE550FD40BD89B767D2EA032B6B56F0210054203629BC9BF9DD147176A26FA55F9C6A40D314897937C4F1E342E5830703A6A0AC049AE8DBBB1EE4A3AF729B9CA2A00A996730E7D7603AB8B5AFD0BF7FAAFE81F52F54C664AAD5BD370BD2F800FF6D9851677EC5D529C73A331352DA6";}', 1440);

-- --------------------------------------------------------

--
-- 表的结构 `icb_system_setting`
--

CREATE TABLE IF NOT EXISTS `icb_system_setting` (
  `id` int(11) NOT NULL COMMENT 'id',
  `varname` varchar(255) NOT NULL COMMENT '字段名',
  `value` text COMMENT '变量值',
  `note` varchar(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM AUTO_INCREMENT=130 DEFAULT CHARSET=utf8 COMMENT='系统设置';

--
-- 转存表中的数据 `icb_system_setting`
--

INSERT INTO `icb_system_setting` (`id`, `varname`, `value`, `note`) VALUES
(1, 'db_engine', 's:6:"MyISAM";', ''),
(2, 'register_agreement', 's:1608:"当您申请用户时，表示您已经同意遵守本规章。\n欢迎您加入本站点参与交流和讨论，本站点为社区，为维护网上公共秩序和社会稳定，请您自觉遵守以下条款：\n\n一、不得利用本站危害国家安全、泄露国家秘密，不得侵犯国家社会集体的和公民的合法权益，不得利用本站制作、复制和传播下列信息：\n　（一）煽动抗拒、破坏宪法和法律、行政法规实施的；\n　（二）煽动颠覆国家政权，推翻社会主义制度的；\n　（三）煽动分裂国家、破坏国家统一的；\n　（四）煽动民族仇恨、民族歧视，破坏民族团结的；\n　（五）捏造或者歪曲事实，散布谣言，扰乱社会秩序的；\n　（六）宣扬封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；\n　（七）公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击的；\n　（八）损害国家机关信誉的；\n　（九）其他违反宪法和法律行政法规的；\n　（十）进行商业广告行为的。\n\n二、互相尊重，对自己的言论和行为负责。\n三、禁止在申请用户时使用相关本站的词汇，或是带有侮辱、毁谤、造谣类的或是有其含义的各种语言进行注册用户，否则我们会将其删除。\n四、禁止以任何方式对本站进行各种破坏行为。\n五、如果您有违反国家相关法律法规的行为，本站概不负责，您的登录信息均被记录无疑，必要时，我们会向相关的国家管理部门提供此类信息。";', ''),
(3, 'site_name', 's:38:"iCodeBang.com ——程序员的网站";', ''),
(4, 'description', 's:77:"iCodeBang.com ——程序员的网站，我们将学习开发语言社交化";', ''),
(5, 'keywords', 's:68:"iCodeBang.com ——程序员，APP开发，网站开发，开发者";', ''),
(6, 'sensitive_words', 's:0:"";', ''),
(7, 'def_focus_uids', 's:1:"1";', ''),
(8, 'answer_edit_time', 's:2:"30";', ''),
(9, 'cache_level_high', 's:1:"1";', ''),
(10, 'cache_level_normal', 's:1:"1";', ''),
(11, 'cache_level_low', 's:1:"1";', ''),
(12, 'unread_flush_interval', 's:3:"100";', ''),
(13, 'newer_invitation_num', 's:1:"5";', ''),
(14, 'index_per_page', 's:2:"20";', ''),
(15, 'from_email', 's:17:"wangkilin@126.com";', ''),
(16, 'img_url', 's:0:"";', ''),
(17, 'upload_url', 's:31:"http://www.icodebang.cn/uploads";', ''),
(18, 'upload_dir', 's:39:"/Users/zhoumingxia/git/code/www/uploads";', ''),
(19, 'ui_style', 's:7:"default";', ''),
(20, 'uninterested_fold', 's:1:"5";', ''),
(21, 'sina_akey', 's:0:"";', ''),
(22, 'sina_skey', 's:0:"";', ''),
(23, 'sina_weibo_enabled', 's:1:"N";', ''),
(24, 'answer_unique', 's:1:"N";', ''),
(25, 'notifications_per_page', 's:2:"10";', ''),
(26, 'contents_per_page', 's:2:"10";', ''),
(27, 'hot_question_period', 's:1:"7";', ''),
(28, 'category_display_mode', 's:4:"list";', ''),
(29, 'recommend_users_number', 's:1:"6";', ''),
(30, 'ucenter_enabled', 's:1:"N";', ''),
(31, 'register_valid_type', 's:5:"email";', ''),
(32, 'best_answer_day', 's:2:"30";', ''),
(33, 'answer_self_question', 's:1:"Y";', ''),
(34, 'censoruser', 's:5:"admin";', ''),
(35, 'best_answer_min_count', 's:1:"3";', ''),
(36, 'reputation_function', 's:78:"[最佳答案]*3+[赞同]*1-[反对]*1+[发起者赞同]*2-[发起者反对]*1";', ''),
(37, 'db_version', 's:8:"20160523";', ''),
(38, 'statistic_code', 's:0:"";', ''),
(39, 'upload_enable', 's:1:"Y";', ''),
(40, 'answer_length_lower', 's:1:"2";', ''),
(41, 'quick_publish', 's:1:"Y";', ''),
(42, 'register_type', 's:4:"open";', ''),
(43, 'question_title_limit', 's:3:"100";', ''),
(44, 'register_seccode', 's:1:"Y";', ''),
(45, 'admin_login_seccode', 's:1:"N";', ''),
(46, 'comment_limit', 's:1:"0";', ''),
(47, 'backup_dir', '', ''),
(48, 'best_answer_reput', 's:2:"20";', ''),
(49, 'publisher_reputation_factor', 's:2:"10";', ''),
(50, 'request_route_custom', 's:0:"";', ''),
(51, 'upload_size_limit', 's:4:"5096";', ''),
(52, 'upload_avatar_size_limit', 's:3:"512";', ''),
(53, 'topic_title_limit', 's:2:"12";', ''),
(54, 'url_rewrite_enable', 's:1:"N";', ''),
(55, 'best_agree_min_count', 's:1:"3";', ''),
(56, 'site_close', 's:1:"N";', ''),
(57, 'close_notice', 's:39:"站点已关闭，管理员请登录。";', ''),
(58, 'qq_login_enabled', 's:1:"N";', ''),
(59, 'qq_login_app_id', 's:0:"";', ''),
(60, 'qq_login_app_key', 's:0:"";', ''),
(61, 'integral_system_enabled', 's:1:"Y";', ''),
(62, 'integral_system_config_register', 's:4:"2000";', ''),
(63, 'integral_system_config_profile', 's:3:"100";', ''),
(64, 'integral_system_config_invite', 's:3:"200";', ''),
(65, 'integral_system_config_best_answer', 's:3:"200";', ''),
(66, 'integral_system_config_answer_fold', 's:3:"-50";', ''),
(67, 'integral_system_config_new_question', 's:3:"-20";', ''),
(68, 'integral_system_config_new_answer', 's:2:"-5";', ''),
(69, 'integral_system_config_thanks', 's:3:"-10";', ''),
(70, 'integral_system_config_invite_answer', 's:3:"-10";', ''),
(71, 'username_rule', 's:1:"1";', ''),
(72, 'username_length_min', 's:1:"2";', ''),
(73, 'username_length_max', 's:2:"14";', ''),
(74, 'category_enable', 's:1:"N";', ''),
(75, 'integral_unit', 's:6:"码币";', ''),
(76, 'nav_menu_show_child', 's:1:"N";', ''),
(77, 'anonymous_enable', 's:1:"Y";', ''),
(78, 'report_reason', 's:50:"广告/SPAM\n违规内容\n文不对题\n重复发问";', ''),
(79, 'allowed_upload_types', 's:45:"jpg,jpeg,png,gif,zip,doc,docx,rar,pdf,psd,mp3";', ''),
(80, 'site_announce', 's:39:"请各位搬砖工晚上自己的资料";', ''),
(81, 'icp_beian', 's:0:"";', ''),
(82, 'report_message_uid', 's:1:"1";', ''),
(83, 'today_topics', 's:10:"javascript";', ''),
(84, 'welcome_recommend_users', 's:0:"";', ''),
(85, 'welcome_message_pm', 's:180:"尊敬的{username}，您已经注册成为{sitename}的会员，请您在发表言论时，遵守当地法律法规。\n如果您有什么疑问可以联系管理员。\n\n{sitename}";', ''),
(86, 'time_style', 's:1:"Y";', ''),
(87, 'reputation_log_factor', 's:1:"3";', ''),
(88, 'advanced_editor_enable', 's:1:"Y";', ''),
(89, 'auto_question_lock_day', 's:1:"0";', ''),
(90, 'default_timezone', 's:9:"Etc/GMT-8";', ''),
(91, 'reader_questions_last_days', 's:2:"30";', ''),
(92, 'reader_questions_agree_count', 's:0:"";', ''),
(93, 'weixin_mp_token', 's:27:"TokenForKilinPublicPlatform";', ''),
(94, 'new_user_email_setting', 'a:2:{s:9:"FOLLOW_ME";s:1:"N";s:10:"NEW_ANSWER";s:1:"N";}', ''),
(95, 'new_user_notification_setting', 'a:0:{}', ''),
(96, 'user_action_history_fresh_upgrade', 's:1:"Y";', ''),
(97, 'cache_dir', 's:0:"";', ''),
(98, 'ucenter_charset', 's:5:"UTF-8";', ''),
(99, 'question_topics_limit', 's:2:"10";', ''),
(100, 'mail_config', 'a:7:{s:9:"transport";s:8:"sendmail";s:7:"charset";s:5:"UTF-8";s:6:"server";s:0:"";s:3:"ssl";s:1:"0";s:4:"port";s:0:"";s:8:"username";s:0:"";s:8:"password";s:0:"";}', ''),
(101, 'auto_create_social_topics', 's:1:"N";', ''),
(102, 'weixin_subscribe_message_key', 's:0:"";', ''),
(103, 'weixin_no_result_message_key', 's:0:"";', ''),
(104, 'weixin_mp_menu', 'a:0:{}', ''),
(105, 'new_question_force_add_topic', 's:1:"N";', ''),
(106, 'unfold_question_comments', 's:1:"N";', ''),
(107, 'report_diagnostics', 's:1:"Y";', ''),
(108, 'weixin_app_id', 's:18:"wxd25e67dfa7b2dd59";', ''),
(109, 'weixin_app_secret', 's:32:"d91611978da6c8b67f41a9945c0599ae";', ''),
(110, 'weixin_account_role', 's:4:"base";', ''),
(111, 'weibo_msg_enabled', 's:1:"N";', ''),
(112, 'weibo_msg_published_user', 'a:0:"";', ''),
(113, 'admin_notifications', 'a:11:{s:15:"answer_approval";i:0;s:17:"question_approval";i:0;s:16:"article_approval";i:0;s:24:"article_comment_approval";i:0;s:23:"unverified_modify_count";i:0;s:11:"user_report";i:0;s:17:"register_approval";i:1;s:15:"verify_approval";i:0;s:12:"last_version";a:2:{s:7:"version";s:5:"3.1.9";s:9:"build_day";s:8:"20160523";}s:10:"sina_users";N;s:19:"receive_email_error";N;}', ''),
(114, 'slave_mail_config', 's:0:"";', ''),
(115, 'receiving_email_global_config', 'a:2:{s:7:"enabled";s:1:"N";s:12:"publish_user";N;}', ''),
(116, 'last_sent_valid_email_id', 'i:0;', ''),
(117, 'google_login_enabled', 's:1:"N";', ''),
(118, 'google_client_id', 's:0:"";', ''),
(119, 'google_client_secret', 's:0:"";', ''),
(120, 'facebook_login_enabled', 's:1:"N";', ''),
(121, 'facebook_app_id', 's:0:"";', ''),
(122, 'facebook_app_secret', 's:0:"";', ''),
(123, 'twitter_login_enabled', 's:1:"N";', ''),
(124, 'twitter_consumer_key', 's:0:"";', ''),
(125, 'twitter_consumer_secret', 's:0:"";', ''),
(126, 'weixin_encoding_aes_key', 's:0:"";', ''),
(127, 'integral_system_config_answer_change_source', 's:1:"Y";', ''),
(128, 'enable_help_center', 's:1:"Y";', ''),
(129, 'ucenter_path', 's:0:"";', '');

-- --------------------------------------------------------

--
-- 表的结构 `icb_tag_tag_relation`
--

CREATE TABLE IF NOT EXISTS `icb_tag_tag_relation` (
  `id` int(11) NOT NULL,
  `child_id` int(11) NOT NULL DEFAULT '0' COMMENT '子话题id',
  `topic_id` int(11) NOT NULL DEFAULT '0' COMMENT '话题id'
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_tag_tag_relation`
--

INSERT INTO `icb_tag_tag_relation` (`id`, `child_id`, `topic_id`) VALUES
(11, 9, 8),
(12, 12, 10),
(10, 7, 1),
(9, 7, 3),
(13, 2, 1);

-- --------------------------------------------------------

--
-- 表的结构 `icb_temp_upload`
--

CREATE TABLE IF NOT EXISTS `icb_temp_upload` (
  `id` int(11) unsigned NOT NULL,
  `file_name` varchar(255) DEFAULT NULL COMMENT '附件名称',
  `add_time` int(10) DEFAULT '0' COMMENT '上传时间',
  `file_location` varchar(255) DEFAULT NULL COMMENT '文件位置',
  `item_type` varchar(32) DEFAULT '0' COMMENT '关联类型',
  `item_id` bigint(20) DEFAULT '0' COMMENT '关联 ID'
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_temp_upload`
--

INSERT INTO `icb_temp_upload` (`id`, `file_name`, `add_time`, `file_location`, `item_type`, `item_id`) VALUES
(1, '20170929/12e74f86a0d8eacec77e4fb2386c5674.png', 1506672620, NULL, 'course', 0),
(2, '20170929/f93c9b651ba348c5fbc3b0d607ec4050.png', 1506672711, NULL, 'course', 0),
(3, '2003e990b9428ca9b3e20689f4182c98.png', 1506672851, '20170929/2003e990b9428ca9b3e20689f4182c98.png', 'course', 0),
(4, '84f2fec94942c9cb0f1d5d8012872483.png', 1506677618, '20170929/84f2fec94942c9cb0f1d5d8012872483.png', 'course', 0),
(5, '6b2598e6c5df1eff0e9a87a1f85b64d3.png', 1506677650, '20170929/6b2598e6c5df1eff0e9a87a1f85b64d3.png', 'course', 0),
(6, '143da13d2dc22d912bcbfcfb2b08c1b3.png', 1506677834, '20170929/143da13d2dc22d912bcbfcfb2b08c1b3.png', 'course', 0),
(7, '9cc57ef82c006fe3927d7cddf1966c46.png', 1506679247, '20170929/9cc57ef82c006fe3927d7cddf1966c46.png', 'course', 0),
(8, '27b4a8b2c78b2b786b0d51947bc0f8c2.png', 1506679411, '20170929/27b4a8b2c78b2b786b0d51947bc0f8c2.png', 'course', 0);

-- --------------------------------------------------------

--
-- 表的结构 `icb_topic`
--

CREATE TABLE IF NOT EXISTS `icb_topic` (
  `topic_id` int(11) NOT NULL COMMENT '话题id',
  `topic_title` varchar(64) DEFAULT NULL COMMENT '话题标题',
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间',
  `discuss_count` int(11) DEFAULT '0' COMMENT '讨论计数',
  `topic_description` text COMMENT '话题描述',
  `topic_pic` varchar(255) DEFAULT NULL COMMENT '话题图片',
  `topic_lock` tinyint(2) NOT NULL DEFAULT '0' COMMENT '话题是否锁定 1 锁定 0 未锁定',
  `focus_count` int(11) DEFAULT '0' COMMENT '关注计数',
  `user_related` tinyint(1) DEFAULT '0' COMMENT '是否被用户关联',
  `url_token` varchar(32) DEFAULT NULL,
  `merged_id` int(11) DEFAULT '0',
  `seo_title` varchar(255) DEFAULT NULL,
  `parent_id` int(10) DEFAULT '0',
  `is_parent` tinyint(1) DEFAULT '0',
  `discuss_count_last_week` int(10) DEFAULT '0',
  `discuss_count_last_month` int(10) DEFAULT '0',
  `discuss_count_update` int(10) DEFAULT '0',
  `parent_ids` varchar(200) NOT NULL COMMENT '所属的父级id列表',
  `sort` smallint(4) unsigned NOT NULL DEFAULT '9999' COMMENT '排序',
  `is_hot` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否加入到话题导航推荐链接中'
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='话题';

--
-- 转存表中的数据 `icb_topic`
--

INSERT INTO `icb_topic` (`topic_id`, `topic_title`, `add_time`, `discuss_count`, `topic_description`, `topic_pic`, `topic_lock`, `focus_count`, `user_related`, `url_token`, `merged_id`, `seo_title`, `parent_id`, `is_parent`, `discuss_count_last_week`, `discuss_count_last_month`, `discuss_count_update`, `parent_ids`, `sort`, `is_hot`) VALUES
(1, '前端开发', NULL, 1, '前端开发相关技术话题', NULL, 0, 0, 0, NULL, 0, NULL, 0, 1, 1, 1, 1499918126, '', 9999, 0),
(2, 'HTML5', 1499827072, 6, 'H5技术相关话题', NULL, 0, 1, 0, 'HTML5', 0, NULL, 1, 0, 0, 1, 1506679444, 'a:1:{i:0;s:1:"1";}', 9999, 1),
(3, '服务器', 1499917858, 0, '各种服务器相关技术文章和讨论', NULL, 0, 1, 0, NULL, 0, NULL, 0, 1, 0, 0, 0, '', 9999, 0),
(4, 'Linux', 1499917906, 3, 'Linux服务器的搭建维护等工作', NULL, 0, 1, 0, NULL, 0, NULL, 3, 0, 1, 3, 1506679843, '', 9999, 0),
(5, 'Apache', 1499917953, 0, 'WEB服务器Apache的搭建与维护， 以及相关性能优化', NULL, 0, 1, 0, NULL, 0, NULL, 3, 0, 0, 0, 0, '', 9999, 0),
(6, 'Javascript', 1499918005, 8, '脚本语言Javascript的技术文章和讨论', NULL, 0, 1, 1, NULL, 0, 'Javascript js', 3, 0, 0, 1, 1506679444, '', 9999, 0),
(7, 'js', 1499918126, 1, 'description', NULL, 0, 1, 0, 'jsjs', 6, NULL, 0, 0, 1, 1, 1499918126, 'a:2:{i:0;s:1:"1";i:1;s:1:"3";}', 9999, 0),
(8, '数据库', 1503043031, 0, '数据库相关知识开发', NULL, 0, 1, 0, NULL, 0, NULL, 0, 1, 0, 0, 0, '', 9999, 0),
(9, 'MySQL', 1503043085, 0, 'MySQL数据库的管理和操作', NULL, 0, 1, 0, 'MySQL', 0, NULL, 0, 0, 0, 0, 0, 'a:1:{i:0;s:1:"8";}', 9999, 0),
(10, '安卓APP开发', 1503043180, 0, '安卓下APP的开发', '20170929/190cd2b7bf73566ef7e03e51e02ea4c0_32x32.png', 0, 1, 0, 'android', 0, NULL, 0, 1, 0, 0, 0, 'a:0:{}', 9999, 0),
(11, 'java', 1503043276, 0, 'java语言开发指南', NULL, 0, 1, 0, NULL, 0, NULL, 0, 0, 0, 0, 0, '', 9999, 0),
(12, 'androidstudio', 1503044850, 0, 'android-studio 的操作', NULL, 0, 0, 0, 'android_studio', 0, NULL, 0, 0, 0, 0, 0, 'a:1:{i:0;s:2:"10";}', 9999, 0),
(13, '0', 1505897182, 1, '', '20170928/bf8686081a339e227c6bfff13d554ffd_32x32.png', 0, 1, 0, NULL, 0, NULL, 0, 0, 1, 1, 1505897182, '', 9999, 0),
(14, '1', 1505897182, 1, '', '20170928/1a52bd5eb50f5e5e120dd3fc3c7541e2_32x32.png', 0, 1, 0, NULL, 0, NULL, 0, 0, 1, 1, 1505897182, '', 9999, 0),
(15, 'html4', 1505898326, 2, '', '20170927/8a8669a4ce9dfdcc41b382541a70e673_32_32.png', 0, 1, 0, NULL, 0, NULL, 0, 0, 1, 2, 1506168770, '', 9999, 0);

-- --------------------------------------------------------

--
-- 表的结构 `icb_topic_focus`
--

CREATE TABLE IF NOT EXISTS `icb_topic_focus` (
  `focus_id` int(11) NOT NULL COMMENT '自增ID',
  `topic_id` int(11) DEFAULT NULL COMMENT '话题ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户UID',
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间'
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='话题关注表';

--
-- 转存表中的数据 `icb_topic_focus`
--

INSERT INTO `icb_topic_focus` (`focus_id`, `topic_id`, `uid`, `add_time`) VALUES
(1, 2, 1, 1499827072),
(2, 3, 1, 1499917858),
(3, 4, 1, 1499917906),
(4, 5, 1, 1499917953),
(13, 6, 1, 1505573945),
(6, 7, 1, 1499918126),
(12, 8, 1, 1503450454),
(8, 9, 1, 1503043085),
(9, 10, 1, 1503043180),
(10, 11, 1, 1503043276),
(14, 13, 1, 1505897182),
(15, 14, 1, 1505897182),
(16, 15, 1, 1505898326);

-- --------------------------------------------------------

--
-- 表的结构 `icb_topic_merge`
--

CREATE TABLE IF NOT EXISTS `icb_topic_merge` (
  `id` int(11) NOT NULL,
  `source_id` int(11) NOT NULL DEFAULT '0',
  `target_id` int(11) NOT NULL DEFAULT '0',
  `uid` int(11) DEFAULT '0',
  `time` int(10) DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_topic_merge`
--

INSERT INTO `icb_topic_merge` (`id`, `source_id`, `target_id`, `uid`, `time`) VALUES
(1, 7, 6, 1, 1503114868);

-- --------------------------------------------------------

--
-- 表的结构 `icb_topic_relation`
--

CREATE TABLE IF NOT EXISTS `icb_topic_relation` (
  `id` int(11) NOT NULL COMMENT '自增 ID',
  `topic_id` int(11) DEFAULT '0' COMMENT '技能id',
  `item_id` int(11) DEFAULT '0' COMMENT '关联的文章id',
  `add_time` int(10) DEFAULT '0' COMMENT '添加时间',
  `uid` int(11) DEFAULT '0' COMMENT '用户ID',
  `type` varchar(16) DEFAULT NULL COMMENT '关联的文章类型：文章，问答。。'
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_topic_relation`
--

INSERT INTO `icb_topic_relation` (`id`, `topic_id`, `item_id`, `add_time`, `uid`, `type`) VALUES
(1, 7, 1, 1499918126, 1, 'article'),
(2, 1, 1, 1499918126, 1, 'article'),
(3, 6, 1, 1499918126, 1, 'article'),
(4, 6, 1, 1499928237, 2, 'question'),
(14, 6, 4, 1505293803, 1, 'article'),
(15, 6, 3, 1505576229, 1, 'question'),
(16, 2, 4, 1505653614, 1, 'question'),
(17, 6, 5, 1505653722, 1, 'question'),
(18, 4, 6, 1505653935, 1, 'question'),
(25, 2, 5, 1506096778, 1, 'article'),
(21, 2, 12, 1505897753, 1, 'course'),
(22, 6, 12, 1505897753, 1, 'course'),
(23, 15, 12, 1505898326, 1, 'course'),
(26, 2, 13, 1506168701, 1, 'course'),
(27, 6, 13, 1506168726, 1, 'course'),
(28, 15, 13, 1506168770, 1, 'course'),
(29, 2, 7, 1506169277, 1, 'course'),
(30, 4, 7, 1506169277, 1, 'course');

-- --------------------------------------------------------

--
-- 表的结构 `icb_users`
--

CREATE TABLE IF NOT EXISTS `icb_users` (
  `uid` int(11) unsigned NOT NULL COMMENT '用户的 UID',
  `user_name` varchar(255) DEFAULT NULL COMMENT '用户名',
  `email` varchar(255) DEFAULT NULL COMMENT 'EMAIL',
  `mobile` varchar(16) DEFAULT NULL COMMENT '用户手机',
  `password` varchar(32) DEFAULT NULL COMMENT '用户密码',
  `salt` varchar(16) DEFAULT NULL COMMENT '用户附加混淆码',
  `avatar_file` varchar(128) DEFAULT NULL COMMENT '头像文件',
  `sex` tinyint(1) DEFAULT NULL COMMENT '性别',
  `birthday` int(10) DEFAULT NULL COMMENT '生日',
  `province` varchar(64) DEFAULT NULL COMMENT '省',
  `city` varchar(64) DEFAULT NULL COMMENT '市',
  `job_id` int(10) DEFAULT '0' COMMENT '职业ID',
  `reg_time` int(10) DEFAULT NULL COMMENT '注册时间',
  `reg_ip` bigint(12) DEFAULT NULL COMMENT '注册IP',
  `last_login` int(10) DEFAULT '0' COMMENT '最后登录时间',
  `last_ip` bigint(12) DEFAULT NULL COMMENT '最后登录 IP',
  `online_time` int(10) DEFAULT '0' COMMENT '在线时间',
  `last_active` int(10) DEFAULT NULL COMMENT '最后活跃时间',
  `notification_unread` int(11) NOT NULL DEFAULT '0' COMMENT '未读系统通知',
  `inbox_unread` int(11) NOT NULL DEFAULT '0' COMMENT '未读短信息',
  `inbox_recv` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0-所有人可以发给我,1-我关注的人',
  `fans_count` int(10) NOT NULL DEFAULT '0' COMMENT '粉丝数',
  `friend_count` int(10) NOT NULL DEFAULT '0' COMMENT '观众数',
  `invite_count` int(10) NOT NULL DEFAULT '0' COMMENT '邀请我回答数量',
  `article_count` int(10) NOT NULL DEFAULT '0' COMMENT '文章数量',
  `question_count` int(10) NOT NULL DEFAULT '0' COMMENT '问题数量',
  `answer_count` int(10) NOT NULL DEFAULT '0' COMMENT '回答数量',
  `topic_focus_count` int(10) NOT NULL DEFAULT '0' COMMENT '关注话题数量',
  `invitation_available` int(10) NOT NULL DEFAULT '0' COMMENT '邀请数量',
  `group_id` int(10) DEFAULT '0' COMMENT '用户组',
  `reputation_group` int(10) DEFAULT '0' COMMENT '威望对应组',
  `forbidden` tinyint(1) DEFAULT '0' COMMENT '是否禁止用户',
  `valid_email` tinyint(1) DEFAULT '0' COMMENT '邮箱验证',
  `is_first_login` tinyint(1) DEFAULT '1' COMMENT '首次登录标记',
  `agree_count` int(10) DEFAULT '0' COMMENT '赞同数量',
  `thanks_count` int(10) DEFAULT '0' COMMENT '感谢数量',
  `views_count` int(10) DEFAULT '0' COMMENT '个人主页查看数量',
  `reputation` int(10) DEFAULT '0' COMMENT '威望',
  `reputation_update_time` int(10) DEFAULT '0' COMMENT '威望更新',
  `weibo_visit` tinyint(1) DEFAULT '1' COMMENT '微博允许访问',
  `integral` int(10) DEFAULT '0',
  `draft_count` int(10) DEFAULT NULL,
  `common_email` varchar(255) DEFAULT NULL COMMENT '常用邮箱',
  `url_token` varchar(32) DEFAULT NULL COMMENT '个性网址',
  `url_token_update` int(10) DEFAULT '0',
  `verified` varchar(32) DEFAULT NULL,
  `default_timezone` varchar(32) DEFAULT NULL,
  `email_settings` varchar(255) DEFAULT '',
  `weixin_settings` varchar(255) DEFAULT '',
  `recent_topics` text
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_users`
--

INSERT INTO `icb_users` (`uid`, `user_name`, `email`, `mobile`, `password`, `salt`, `avatar_file`, `sex`, `birthday`, `province`, `city`, `job_id`, `reg_time`, `reg_ip`, `last_login`, `last_ip`, `online_time`, `last_active`, `notification_unread`, `inbox_unread`, `inbox_recv`, `fans_count`, `friend_count`, `invite_count`, `article_count`, `question_count`, `answer_count`, `topic_focus_count`, `invitation_available`, `group_id`, `reputation_group`, `forbidden`, `valid_email`, `is_first_login`, `agree_count`, `thanks_count`, `views_count`, `reputation`, `reputation_update_time`, `weibo_visit`, `integral`, `draft_count`, `common_email`, `url_token`, `url_token_update`, `verified`, `default_timezone`, `email_settings`, `weixin_settings`, `recent_topics`) VALUES
(1, 'wangkilin', 'wangkilin@126.com', '', '337505ee476b8a7257eca170e262000c', 'liqg', '000/00/00/01_avatar_min.jpg', 1, NULL, '', '', 0, 1499825943, 2130706433, 1513603353, 2130706433, 5003285, 1515337941, 0, 0, 0, 1, 1, 0, 5, 5, 4, 13, 10, 1, 5, 0, 1, 0, 1, 0, 22, 3, 1513257959, 1, 2100, 0, NULL, NULL, 0, NULL, '', '', '', 'a:5:{i:0;s:5:"Linux";i:1;s:10:"Javascript";i:3;s:5:"html4";i:4;s:5:"HTML5";i:5;s:1:"1";}'),
(2, 'icodebang', 'icodebang@126.com', '', 'af118f5f471df8bd511a147dbd3a1659', 'cdwy', NULL, 1, NULL, '北京市', '西城区', 4, 1499918490, 2130706433, 1505701946, 2130706433, 128065, 1505883417, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 5, 3, 5, 0, 1, 0, 0, 0, 4, 0, 1513257959, 1, 2030, 0, NULL, NULL, 0, '1', NULL, 'a:2:{s:9:"FOLLOW_ME";s:1:"N";s:10:"NEW_ANSWER";s:1:"N";}', '', 'a:1:{i:0;s:10:"Javascript";}');

-- --------------------------------------------------------

--
-- 表的结构 `icb_users_attrib`
--

CREATE TABLE IF NOT EXISTS `icb_users_attrib` (
  `id` int(11) NOT NULL COMMENT '自增id',
  `uid` int(11) DEFAULT NULL COMMENT '用户UID',
  `introduction` varchar(255) DEFAULT NULL COMMENT '个人简介',
  `signature` varchar(255) DEFAULT NULL COMMENT '个人签名',
  `qq` bigint(15) DEFAULT NULL,
  `homepage` varchar(255) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='用户附加属性表';

--
-- 转存表中的数据 `icb_users_attrib`
--

INSERT INTO `icb_users_attrib` (`id`, `uid`, `introduction`, `signature`, `qq`, `homepage`) VALUES
(1, 1, NULL, '70后IT男', 0, ''),
(2, 2, NULL, '70后IT失业者', NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `icb_users_facebook`
--

CREATE TABLE IF NOT EXISTS `icb_users_facebook` (
  `id` bigint(20) unsigned NOT NULL,
  `uid` int(11) unsigned NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `gender` varchar(8) DEFAULT NULL,
  `locale` varchar(16) DEFAULT NULL,
  `timezone` tinyint(3) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `expires_time` int(10) unsigned NOT NULL DEFAULT '0',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_users_google`
--

CREATE TABLE IF NOT EXISTS `icb_users_google` (
  `id` varchar(64) NOT NULL,
  `uid` int(11) unsigned NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `locale` varchar(16) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `gender` varchar(8) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `add_time` int(10) unsigned NOT NULL DEFAULT '0',
  `access_token` varchar(128) DEFAULT NULL,
  `refresh_token` varchar(128) DEFAULT NULL,
  `expires_time` int(10) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_users_group`
--

CREATE TABLE IF NOT EXISTS `icb_users_group` (
  `group_id` int(11) NOT NULL,
  `type` tinyint(3) DEFAULT '0' COMMENT '0-会员组 1-系统组',
  `custom` tinyint(1) DEFAULT '0' COMMENT '是否自定义',
  `group_name` varchar(50) NOT NULL,
  `reputation_lower` int(11) DEFAULT '0',
  `reputation_higer` int(11) DEFAULT '0',
  `reputation_factor` float DEFAULT '0' COMMENT '威望系数',
  `permission` text COMMENT '权限设置'
) ENGINE=MyISAM AUTO_INCREMENT=101 DEFAULT CHARSET=utf8 COMMENT='用户组';

--
-- 转存表中的数据 `icb_users_group`
--

INSERT INTO `icb_users_group` (`group_id`, `type`, `custom`, `group_name`, `reputation_lower`, `reputation_higer`, `reputation_factor`, `permission`) VALUES
(1, 0, 0, '超级管理员', 0, 0, 5, 'a:15:{s:16:"is_administortar";s:1:"1";s:12:"is_moderator";s:1:"1";s:16:"publish_question";s:1:"1";s:21:"publish_approval_time";a:2:{s:5:"start";s:0:"";s:3:"end";s:0:"";}s:13:"edit_question";s:1:"1";s:10:"edit_topic";s:1:"1";s:12:"manage_topic";s:1:"1";s:12:"create_topic";s:1:"1";s:17:"redirect_question";s:1:"1";s:13:"upload_attach";s:1:"1";s:11:"publish_url";s:1:"1";s:15:"publish_article";s:1:"1";s:12:"edit_article";s:1:"1";s:19:"edit_question_topic";s:1:"1";s:15:"publish_comment";s:1:"1";}'),
(2, 0, 0, '前台管理员', 0, 0, 4, 'a:14:{s:12:"is_moderator";s:1:"1";s:16:"publish_question";s:1:"1";s:21:"publish_approval_time";a:2:{s:5:"start";s:0:"";s:3:"end";s:0:"";}s:13:"edit_question";s:1:"1";s:10:"edit_topic";s:1:"1";s:12:"manage_topic";s:1:"1";s:12:"create_topic";s:1:"1";s:17:"redirect_question";s:1:"1";s:13:"upload_attach";s:1:"1";s:11:"publish_url";s:1:"1";s:15:"publish_article";s:1:"1";s:12:"edit_article";s:1:"1";s:19:"edit_question_topic";s:1:"1";s:15:"publish_comment";s:1:"1";}'),
(3, 0, 0, '未验证会员', 0, 0, 0, 'a:5:{s:16:"publish_question";s:1:"1";s:21:"publish_approval_time";a:2:{s:5:"start";s:0:"";s:3:"end";s:0:"";}s:11:"human_valid";s:1:"1";s:19:"question_valid_hour";s:1:"2";s:17:"answer_valid_hour";s:1:"2";}'),
(4, 0, 0, '普通会员', 0, 0, 0, 'a:3:{s:21:"publish_approval_time";a:2:{s:5:"start";s:0:"";s:3:"end";s:0:"";}s:19:"question_valid_hour";s:2:"10";s:17:"answer_valid_hour";s:2:"10";}'),
(5, 1, 0, '注册会员', 0, 100, 1, 'a:6:{s:16:"publish_question";s:1:"1";s:21:"publish_approval_time";a:2:{s:5:"start";s:0:"";s:3:"end";s:0:"";}s:11:"human_valid";s:1:"1";s:19:"question_valid_hour";s:1:"5";s:17:"answer_valid_hour";s:1:"5";s:15:"publish_comment";s:1:"1";}'),
(6, 1, 0, '初级会员', 100, 200, 1, 'a:8:{s:16:"publish_question";s:1:"1";s:21:"publish_approval_time";a:2:{s:5:"start";s:0:"";s:3:"end";s:0:"";}s:13:"upload_attach";s:1:"1";s:11:"publish_url";s:1:"1";s:19:"question_valid_hour";s:1:"5";s:17:"answer_valid_hour";s:1:"5";s:15:"publish_article";s:1:"1";s:19:"edit_question_topic";s:1:"1";}'),
(7, 1, 0, '中级会员', 200, 500, 1, 'a:9:{s:16:"publish_question";s:1:"1";s:21:"publish_approval_time";a:2:{s:5:"start";s:0:"";s:3:"end";s:0:"";}s:10:"edit_topic";s:1:"1";s:12:"create_topic";s:1:"1";s:17:"redirect_question";s:1:"1";s:13:"upload_attach";s:1:"1";s:11:"publish_url";s:1:"1";s:15:"publish_article";s:1:"1";s:15:"publish_comment";s:1:"1";}'),
(8, 1, 0, '高级会员', 500, 1000, 1, 'a:11:{s:16:"publish_question";s:1:"1";s:21:"publish_approval_time";a:2:{s:5:"start";s:0:"";s:3:"end";s:0:"";}s:13:"edit_question";s:1:"1";s:10:"edit_topic";s:1:"1";s:12:"create_topic";s:1:"1";s:17:"redirect_question";s:1:"1";s:13:"upload_attach";s:1:"1";s:11:"publish_url";s:1:"1";s:15:"publish_article";s:1:"1";s:19:"edit_question_topic";s:1:"1";s:15:"publish_comment";s:1:"1";}'),
(9, 1, 0, '核心会员', 1000, 999999, 1, 'a:12:{s:16:"publish_question";s:1:"1";s:21:"publish_approval_time";a:2:{s:5:"start";s:0:"";s:3:"end";s:0:"";}s:13:"edit_question";s:1:"1";s:10:"edit_topic";s:1:"1";s:12:"manage_topic";s:1:"1";s:12:"create_topic";s:1:"1";s:17:"redirect_question";s:1:"1";s:13:"upload_attach";s:1:"1";s:11:"publish_url";s:1:"1";s:15:"publish_article";s:1:"1";s:19:"edit_question_topic";s:1:"1";s:15:"publish_comment";s:1:"1";}'),
(99, 0, 0, '游客', 0, 0, 0, 'a:9:{s:10:"visit_site";s:1:"1";s:13:"visit_explore";s:1:"1";s:12:"search_avail";s:1:"1";s:14:"visit_question";s:1:"1";s:11:"visit_topic";s:1:"1";s:13:"visit_feature";s:1:"1";s:12:"visit_people";s:1:"1";s:13:"visit_chapter";s:1:"1";s:11:"answer_show";s:1:"1";}'),
(100, 0, 1, '特殊组', 0, 0, 0, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `icb_users_notification_setting`
--

CREATE TABLE IF NOT EXISTS `icb_users_notification_setting` (
  `notice_setting_id` int(11) NOT NULL COMMENT '自增id',
  `uid` int(11) NOT NULL,
  `data` text COMMENT '设置数据'
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='通知设定';

--
-- 转存表中的数据 `icb_users_notification_setting`
--

INSERT INTO `icb_users_notification_setting` (`notice_setting_id`, `uid`, `data`) VALUES
(1, 2, 'a:0:{}');

-- --------------------------------------------------------

--
-- 表的结构 `icb_users_online`
--

CREATE TABLE IF NOT EXISTS `icb_users_online` (
  `uid` int(11) NOT NULL COMMENT '用户 ID',
  `last_active` int(11) DEFAULT '0' COMMENT '上次活动时间',
  `ip` bigint(12) DEFAULT '0' COMMENT '客户端ip',
  `active_url` varchar(255) DEFAULT NULL COMMENT '停留页面',
  `user_agent` varchar(255) DEFAULT NULL COMMENT '用户客户端信息'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='在线用户列表';

--
-- 转存表中的数据 `icb_users_online`
--

INSERT INTO `icb_users_online` (`uid`, `last_active`, `ip`, `active_url`, `user_agent`) VALUES
(1, 1515337941, 2130706433, 'http://www.icodebang.cn/?/m/english/homework/14', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:57.0) Gecko/20100101 Firefox/57.0');

-- --------------------------------------------------------

--
-- 表的结构 `icb_users_qq`
--

CREATE TABLE IF NOT EXISTS `icb_users_qq` (
  `id` bigint(11) unsigned NOT NULL,
  `uid` int(11) NOT NULL COMMENT '用户在本地的UID',
  `nickname` varchar(64) DEFAULT NULL,
  `openid` varchar(128) DEFAULT '',
  `gender` varchar(8) DEFAULT NULL,
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间',
  `access_token` varchar(64) DEFAULT NULL,
  `refresh_token` varchar(64) DEFAULT NULL,
  `expires_time` int(10) DEFAULT NULL,
  `figureurl` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_users_sina`
--

CREATE TABLE IF NOT EXISTS `icb_users_sina` (
  `id` bigint(11) NOT NULL COMMENT '新浪用户 ID',
  `uid` int(11) NOT NULL COMMENT '用户在本地的UID',
  `name` varchar(64) DEFAULT NULL COMMENT '微博昵称',
  `location` varchar(255) DEFAULT NULL COMMENT '地址',
  `description` text COMMENT '个人描述',
  `url` varchar(255) DEFAULT NULL COMMENT '用户博客地址',
  `profile_image_url` varchar(255) DEFAULT NULL COMMENT 'Sina 自定义头像地址',
  `gender` varchar(8) DEFAULT NULL,
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间',
  `expires_time` int(10) DEFAULT '0' COMMENT '过期时间',
  `access_token` varchar(64) DEFAULT NULL,
  `last_msg_id` bigint(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_users_twitter`
--

CREATE TABLE IF NOT EXISTS `icb_users_twitter` (
  `id` bigint(20) unsigned NOT NULL,
  `uid` int(11) unsigned NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `screen_name` varchar(128) DEFAULT NULL,
  `location` varchar(64) DEFAULT NULL,
  `time_zone` varchar(64) DEFAULT NULL,
  `lang` varchar(16) DEFAULT NULL,
  `profile_image_url` varchar(255) DEFAULT NULL,
  `add_time` int(10) unsigned NOT NULL DEFAULT '0',
  `access_token` varchar(255) NOT NULL DEFAULT 'a:2:{s:11:"oauth_token";s:0:"";s:18:"oauth_token_secret";s:0:"";}'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_users_ucenter`
--

CREATE TABLE IF NOT EXISTS `icb_users_ucenter` (
  `id` int(11) unsigned NOT NULL,
  `uid` int(11) DEFAULT '0',
  `uc_uid` int(11) DEFAULT '0',
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_users_weixin`
--

CREATE TABLE IF NOT EXISTS `icb_users_weixin` (
  `id` int(10) NOT NULL,
  `uid` int(10) NOT NULL,
  `openid` varchar(255) NOT NULL,
  `expires_in` int(10) DEFAULT NULL,
  `access_token` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `scope` varchar(64) DEFAULT NULL,
  `headimgurl` varchar(255) DEFAULT NULL,
  `nickname` varchar(64) DEFAULT NULL,
  `sex` tinyint(1) DEFAULT '0',
  `province` varchar(32) DEFAULT NULL,
  `city` varchar(32) DEFAULT NULL,
  `country` varchar(32) DEFAULT NULL,
  `add_time` int(10) NOT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `location_update` int(10) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_user_action_history`
--

CREATE TABLE IF NOT EXISTS `icb_user_action_history` (
  `history_id` int(11) NOT NULL COMMENT '自增ID',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `associate_type` tinyint(1) DEFAULT NULL COMMENT '关联类型: 1 问题 2 回答 3 评论 4 话题',
  `associate_action` smallint(3) DEFAULT NULL COMMENT '操作类型',
  `associate_id` int(11) DEFAULT NULL COMMENT '关联ID',
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间',
  `associate_attached` int(11) DEFAULT NULL,
  `anonymous` tinyint(1) DEFAULT '0' COMMENT '是否匿名',
  `fold_status` tinyint(1) DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=94 DEFAULT CHARSET=utf8 COMMENT='用户操作记录';

--
-- 转存表中的数据 `icb_user_action_history`
--

INSERT INTO `icb_user_action_history` (`history_id`, `uid`, `associate_type`, `associate_action`, `associate_id`, `add_time`, `associate_attached`, `anonymous`, `fold_status`) VALUES
(1, 1, 4, 402, 1, 1499827004, -1, 0, 0),
(2, 1, 4, 403, 1, 1499827004, -1, 0, 0),
(3, 1, 4, 401, 2, 1499827072, -1, 0, 0),
(4, 1, 4, 406, 2, 1499827072, -1, 0, 0),
(5, 1, 4, 401, 3, 1499917858, -1, 0, 0),
(6, 1, 4, 406, 3, 1499917858, -1, 0, 0),
(7, 1, 4, 401, 4, 1499917906, -1, 0, 0),
(8, 1, 4, 406, 4, 1499917906, -1, 0, 0),
(9, 1, 4, 401, 5, 1499917953, -1, 0, 0),
(10, 1, 4, 406, 5, 1499917953, -1, 0, 0),
(11, 1, 4, 401, 6, 1499918005, -1, 0, 0),
(12, 1, 4, 406, 6, 1499918005, -1, 0, 0),
(13, 1, 4, 401, 7, 1499918126, -1, 0, 0),
(14, 1, 4, 406, 7, 1499918126, -1, 0, 0),
(15, 1, 1, 501, 1, 1499918126, -1, 0, 0),
(16, 2, 1, 502, 1, 1499928146, -1, 0, 0),
(17, 2, 1, 401, 1, 1499928237, 6, 0, 0),
(18, 2, 4, 401, 6, 1499928237, 1, 0, 0),
(19, 2, 1, 101, 1, 1499928237, -1, 0, 0),
(20, 1, 2, 201, 1, 1499930118, 1, 0, 0),
(21, 1, 1, 201, 1, 1499930118, 1, 0, 0),
(22, 1, 1, 501, 2, 1500607543, -1, 0, 0),
(23, 1, 1, 101, 2, 1500732458, -1, 0, 0),
(24, 1, 1, 103, 2, 1500741972, -1, 0, 0),
(25, 1, 1, 108, 2, 1500742346, -1, 0, 0),
(26, 1, 1, 108, 2, 1500742663, -1, 0, 0),
(27, 1, 1, 501, 3, 1502351663, -1, 0, 0),
(28, 1, 1, 501, 4, 1502697530, -1, 0, 0),
(29, 1, 1, 503, 4, 1502787726, 1, 0, 0),
(30, 1, 1, 503, 4, 1502787743, 2, 0, 0),
(31, 1, 1, 503, 4, 1502787776, 3, 0, 0),
(32, 1, 1, 503, 4, 1502787783, 4, 0, 0),
(33, 1, 1, 503, 4, 1502787790, 5, 0, 0),
(34, 1, 1, 503, 4, 1502787804, 6, 0, 0),
(35, 1, 1, 503, 4, 1502787820, 7, 0, 0),
(36, 1, 4, 401, 8, 1503043031, -1, 0, 0),
(37, 1, 4, 406, 8, 1503043031, -1, 0, 0),
(38, 1, 4, 401, 9, 1503043085, -1, 0, 0),
(39, 1, 4, 406, 9, 1503043085, -1, 0, 0),
(40, 1, 4, 401, 10, 1503043180, -1, 0, 0),
(41, 1, 4, 406, 10, 1503043180, -1, 0, 0),
(42, 1, 4, 401, 11, 1503043276, -1, 0, 0),
(43, 1, 4, 406, 11, 1503043276, -1, 0, 0),
(44, 1, 4, 410, 6, 1503206656, 2, 0, 0),
(45, 1, 4, 411, 6, 1503206885, 2, 0, 0),
(46, 1, 4, 410, 6, 1503206929, 2, 0, 0),
(47, 1, 4, 411, 6, 1503208049, -1, 0, 0),
(48, 1, 4, 411, 6, 1503208112, 2, 0, 0),
(49, 1, 4, 410, 6, 1503208123, 2, 0, 0),
(50, 1, 4, 410, 6, 1503212506, 11, 0, 0),
(51, 1, 2, 201, 2, 1503306562, 1, 0, 0),
(52, 1, 1, 201, 1, 1503306562, 2, 0, 0),
(53, 1, 2, 201, 3, 1503306599, 1, 0, 0),
(54, 1, 1, 201, 1, 1503306599, 3, 0, 0),
(55, 1, 2, 201, 4, 1503306891, 1, 0, 0),
(56, 1, 1, 201, 1, 1503306891, 4, 0, 0),
(57, 1, 4, 406, 6, 1503372423, -1, 0, 0),
(58, 1, 4, 406, 8, 1503450454, -1, 0, 0),
(59, 1, 4, 406, 6, 1505573945, -1, 0, 0),
(60, 1, 1, 401, 3, 1505576229, 6, 0, 0),
(61, 1, 4, 401, 6, 1505576229, 3, 0, 0),
(62, 1, 1, 101, 3, 1505576229, -1, 0, 0),
(63, 1, 1, 401, 4, 1505653614, 2, 0, 0),
(64, 1, 4, 401, 2, 1505653614, 4, 0, 0),
(65, 1, 1, 101, 4, 1505653614, -1, 0, 0),
(66, 1, 1, 401, 5, 1505653722, 6, 0, 0),
(67, 1, 4, 401, 6, 1505653722, 5, 0, 0),
(68, 1, 1, 101, 5, 1505653722, -1, 0, 0),
(69, 1, 1, 401, 6, 1505653935, 4, 0, 0),
(70, 1, 4, 401, 4, 1505653935, 6, 0, 0),
(71, 1, 1, 101, 6, 1505653935, -1, 0, 0),
(72, 1, 4, 401, 13, 1505897182, -1, 0, 0),
(73, 1, 4, 406, 13, 1505897182, -1, 0, 0),
(74, 1, 4, 401, 14, 1505897182, -1, 0, 0),
(75, 1, 4, 406, 14, 1505897182, -1, 0, 0),
(76, 1, 4, 401, 15, 1505898326, -1, 0, 0),
(77, 1, 4, 406, 15, 1505898326, -1, 0, 0),
(78, 1, 1, 501, 5, 1506091200, -1, 0, 0),
(79, 1, 4, 404, 15, 1506499250, -1, 0, 0),
(80, 1, 4, 404, 15, 1506499650, -1, 0, 0),
(81, 1, 4, 404, 15, 1506499656, -1, 0, 0),
(82, 1, 4, 404, 15, 1506502914, -1, 0, 0),
(83, 1, 4, 404, 14, 1506507918, -1, 0, 0),
(84, 1, 4, 404, 14, 1506515057, -1, 0, 0),
(85, 1, 4, 404, 14, 1506520211, -1, 0, 0),
(86, 1, 4, 404, 14, 1506573467, -1, 0, 0),
(87, 1, 4, 404, 14, 1506573565, -1, 0, 0),
(88, 1, 4, 404, 14, 1506573911, -1, 0, 0),
(89, 1, 4, 404, 14, 1506573944, -1, 0, 0),
(90, 1, 4, 404, 14, 1506574236, -1, 0, 0),
(91, 1, 4, 404, 13, 1506577076, -1, 0, 0),
(92, 1, 4, 404, 10, 1506676931, -1, 0, 0),
(93, 1, 4, 404, 10, 1506677063, -1, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `icb_user_action_history_data`
--

CREATE TABLE IF NOT EXISTS `icb_user_action_history_data` (
  `history_id` int(11) unsigned NOT NULL,
  `associate_content` text,
  `associate_attached` text,
  `addon_data` text COMMENT '附加数据'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_user_action_history_data`
--

INSERT INTO `icb_user_action_history_data` (`history_id`, `associate_content`, `associate_attached`, `addon_data`) VALUES
(1, '前端开发', '默认话题', ''),
(2, '前端开发相关技术话题', '默认话题', ''),
(3, 'HTML5', '', ''),
(4, '', '', ''),
(5, '服务器', '', ''),
(6, '', '', ''),
(7, 'Linux', '', ''),
(8, '', '', ''),
(9, 'Apache', '', ''),
(10, '', '', ''),
(11, 'Javascript', '', ''),
(12, '', '', ''),
(13, 'js', '', ''),
(14, '', '', ''),
(15, '前端开发之Javascript', '前端开发之Javascript', ''),
(16, '', '', ''),
(17, 'Javascript', '', ''),
(18, 'Javascript', '', ''),
(19, '如何定义js的class？', '如题， js中怎么定义class？ 直接用function就可以么？\n ', ''),
(20, '1. 使用 var object = {} ; 定义\n2. 使用 function （） {} 定义；', '', ''),
(21, '1. 使用 var object = {} ; 定义\n2. 使用 function （） {} 定义；', '', ''),
(22, 'Linux中inittab文件作用', 'Linux中inittab文件作用', ''),
(23, 'javascript的void的用途？', 'javascript的void的用途？', ''),
(24, 'javascript的void的用途 ？', 'javascript的void的用途？', 'a:1:{s:13:"modify_reason";N;}'),
(25, '', '', ''),
(26, '', '', ''),
(27, 'test attached', '[url=http://#aaa]mmm-[/url]\n[attach]7[/attach]\n\n[attach]6[/attach]\n ', ''),
(28, '测试附件内容', '测试规内容', ''),
(29, 'ehllo world!', '', ''),
(30, '可以啊！@', '', ''),
(31, 'go ', '', ''),
(32, 'go ！', '', ''),
(33, 'cool', '', ''),
(34, '不错啊！', '', ''),
(35, '真心厉害！', '', ''),
(36, '数据库', '', ''),
(37, '', '', ''),
(38, 'MySQL', '', ''),
(39, '', '', ''),
(40, '安卓APP开发', '', ''),
(41, '', '', ''),
(42, 'java', '', ''),
(43, '', '', ''),
(44, '', '', ''),
(45, '', '', ''),
(46, '', '', ''),
(47, '', 'undefined', ''),
(48, '', '', ''),
(49, '', '', ''),
(50, '', '', ''),
(51, '这个是回复? 还是评论？', '', ''),
(52, '这个是回复? 还是评论？', '', ''),
(53, '这个是回复? 还是评论？', '', ''),
(54, '这个是回复? 还是评论？', '', ''),
(55, '这个是回复? 还是评论？', '', ''),
(56, '这个是回复? 还是评论？', '', ''),
(57, '', '', ''),
(58, '', '', ''),
(59, '', '', ''),
(60, 'Javascript', '', ''),
(61, 'Javascript', '', ''),
(62, '已关注话题， 再在这个话题中发问题， 是否会取消关注？', '已关注话题， 再在这个话题中发问题， 是否会取消关注？', ''),
(63, 'HTML5', '', ''),
(64, 'HTML5', '', ''),
(65, '添加H5问题', '看看是否变更了最近话题', ''),
(66, 'Javascript', '', ''),
(67, 'Javascript', '', ''),
(68, '发起话题问题， 是否变更最近话题', '''recent_topics'' =&gt; serialize($new_recent_topics)', ''),
(69, 'Linux', '', ''),
(70, 'Linux', '', ''),
(71, '发布一个Linux问题', '''recent_topics'' =&gt; serialize($new_recent_topics)', ''),
(72, '0', '', ''),
(73, '', '', ''),
(74, '1', '', ''),
(75, '', '', ''),
(76, 'html4', '', ''),
(77, '', '', ''),
(78, '发布附件文章', '发布附件文章', ''),
(79, '20170927/01a87db94c63fb64e03b1659c202c004_32_32.png', '', ''),
(80, '20170927/d70b337cf6b26651ea8f88b566a48c12_32_32.png', '20170927/01a87db94c63fb64e03b1659c202c004_32_32.png', ''),
(81, '20170927/0cb0b047082390f86c57713e34342130_32_32.png', '20170927/d70b337cf6b26651ea8f88b566a48c12_32_32.png', ''),
(82, '20170927/8a8669a4ce9dfdcc41b382541a70e673_32_32.png', '20170927/0cb0b047082390f86c57713e34342130_32_32.png', ''),
(83, '20170927/0a3d38074d8a83e6e0eb5445a9b6c33e_32_32.png', '', ''),
(84, '20170927/01d1e45458114dab7bed7dd4ad74664b_32_32.png', '20170927/0a3d38074d8a83e6e0eb5445a9b6c33e_32_32.png', ''),
(85, '20170927/da2b397c0880146ceef4535e7563cdd1_32_32.png', '20170927/01d1e45458114dab7bed7dd4ad74664b_32_32.png', ''),
(86, '20170928/', '20170927/da2b397c0880146ceef4535e7563cdd1_32_32.png', ''),
(87, '20170928/', '', ''),
(88, '20170928/', '', ''),
(89, '20170928/', '', ''),
(90, '20170928/1a52bd5eb50f5e5e120dd3fc3c7541e2_32x32.png', '', ''),
(91, '20170928/bf8686081a339e227c6bfff13d554ffd_32x32.png', '', ''),
(92, '20170929/e5937b782cc3450d4378f6eafee1e046_32x32.png', '', ''),
(93, '20170929/190cd2b7bf73566ef7e03e51e02ea4c0_32x32.png', '20170929/e5937b782cc3450d4378f6eafee1e046_32x32.png', '');

-- --------------------------------------------------------

--
-- 表的结构 `icb_user_action_history_fresh`
--

CREATE TABLE IF NOT EXISTS `icb_user_action_history_fresh` (
  `id` int(11) NOT NULL,
  `history_id` int(11) NOT NULL,
  `associate_id` int(11) NOT NULL,
  `associate_type` tinyint(1) NOT NULL,
  `associate_action` smallint(3) NOT NULL,
  `add_time` int(10) NOT NULL DEFAULT '0',
  `uid` int(10) NOT NULL DEFAULT '0',
  `anonymous` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=94 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_user_action_history_fresh`
--

INSERT INTO `icb_user_action_history_fresh` (`id`, `history_id`, `associate_id`, `associate_type`, `associate_action`, `add_time`, `uid`, `anonymous`) VALUES
(2, 2, 1, 4, 403, 1499827004, 1, 0),
(64, 64, 2, 4, 401, 1505653614, 1, 0),
(6, 6, 3, 4, 406, 1499917858, 1, 0),
(70, 70, 4, 4, 401, 1505653935, 1, 0),
(10, 10, 5, 4, 406, 1499917953, 1, 0),
(67, 67, 6, 4, 401, 1505653722, 1, 0),
(14, 14, 7, 4, 406, 1499918126, 1, 0),
(56, 56, 1, 1, 201, 1503306891, 1, 0),
(19, 19, 1, 1, 101, 1499928237, 2, 0),
(18, 18, 6, 4, 401, 1499928237, 2, 0),
(20, 20, 1, 2, 201, 1499930118, 1, 0),
(26, 26, 2, 1, 108, 1500742663, 1, 0),
(62, 62, 3, 1, 101, 1505576229, 1, 0),
(65, 65, 4, 1, 101, 1505653614, 1, 0),
(58, 58, 8, 4, 406, 1503450454, 1, 0),
(39, 39, 9, 4, 406, 1503043085, 1, 0),
(93, 93, 10, 4, 404, 1506677063, 1, 0),
(43, 43, 11, 4, 406, 1503043276, 1, 0),
(51, 51, 2, 2, 201, 1503306562, 1, 0),
(53, 53, 3, 2, 201, 1503306599, 1, 0),
(55, 55, 4, 2, 201, 1503306891, 1, 0),
(78, 78, 5, 1, 501, 1506091200, 1, 0),
(71, 71, 6, 1, 101, 1505653935, 1, 0),
(91, 91, 13, 4, 404, 1506577076, 1, 0),
(90, 90, 14, 4, 404, 1506574236, 1, 0),
(82, 82, 15, 4, 404, 1506502914, 1, 0);

-- --------------------------------------------------------

--
-- 表的结构 `icb_user_follow`
--

CREATE TABLE IF NOT EXISTS `icb_user_follow` (
  `follow_id` int(11) unsigned NOT NULL COMMENT '自增ID',
  `fans_uid` int(11) DEFAULT NULL COMMENT '关注人的UID',
  `friend_uid` int(11) DEFAULT NULL COMMENT '被关注人的uid',
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间'
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='用户关注表';

--
-- 转存表中的数据 `icb_user_follow`
--

INSERT INTO `icb_user_follow` (`follow_id`, `fans_uid`, `friend_uid`, `add_time`) VALUES
(1, 2, 1, 1499918490),
(2, 1, 2, 1499930311);

-- --------------------------------------------------------

--
-- 表的结构 `icb_user_read_history`
--

CREATE TABLE IF NOT EXISTS `icb_user_read_history` (
  `id` int(11) NOT NULL COMMENT '记录id，自增',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `item_id` int(11) NOT NULL COMMENT '条目id',
  `item_type` varchar(16) NOT NULL COMMENT '条目类型:article, course, question等',
  `last_time` int(10) NOT NULL COMMENT '上次阅读条目时间',
  `page_position` varchar(100) NOT NULL COMMENT '阅读到的位置, json数据。 {页面高度，阅读位置高度}。 依据此，自动滚屏到上次阅读位置',
  `read_content_marks` text NOT NULL COMMENT '页面内容已阅读信息记录：如多条音频视频展示中哪些已读未读'
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `icb_user_read_history`
--

INSERT INTO `icb_user_read_history` (`id`, `uid`, `item_id`, `item_type`, `last_time`, `page_position`, `read_content_marks`) VALUES
(1, 0, 14, 'course', 1511261549, '{"pageHeight":"1281","scrollHeight":"807"}', '');

-- --------------------------------------------------------

--
-- 表的结构 `icb_verify_apply`
--

CREATE TABLE IF NOT EXISTS `icb_verify_apply` (
  `id` int(10) NOT NULL,
  `uid` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `attach` varchar(255) DEFAULT NULL,
  `time` int(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `data` text,
  `status` tinyint(1) DEFAULT '0',
  `type` varchar(16) DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_weibo_msg`
--

CREATE TABLE IF NOT EXISTS `icb_weibo_msg` (
  `id` bigint(20) NOT NULL,
  `created_at` int(10) NOT NULL,
  `msg_author_uid` bigint(20) NOT NULL,
  `text` varchar(255) NOT NULL,
  `access_key` varchar(32) NOT NULL,
  `has_attach` tinyint(1) NOT NULL DEFAULT '0',
  `uid` int(10) NOT NULL,
  `weibo_uid` bigint(20) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `ticket_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='新浪微博消息列表';

-- --------------------------------------------------------

--
-- 表的结构 `icb_weixin_accounts`
--

CREATE TABLE IF NOT EXISTS `icb_weixin_accounts` (
  `id` int(10) NOT NULL,
  `weixin_mp_token` varchar(255) NOT NULL,
  `weixin_account_role` varchar(20) DEFAULT 'base',
  `weixin_app_id` varchar(255) DEFAULT '',
  `weixin_app_secret` varchar(255) DEFAULT '',
  `weixin_mp_menu` text,
  `weixin_subscribe_message_key` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `weixin_no_result_message_key` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `weixin_encoding_aes_key` varchar(43) DEFAULT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='微信多账号设置';

--
-- 转存表中的数据 `icb_weixin_accounts`
--

INSERT INTO `icb_weixin_accounts` (`id`, `weixin_mp_token`, `weixin_account_role`, `weixin_app_id`, `weixin_app_secret`, `weixin_mp_menu`, `weixin_subscribe_message_key`, `weixin_no_result_message_key`, `weixin_encoding_aes_key`) VALUES
(1, 'TokenForKilinPublicPlatform', 'subscription', 'wxd25e67dfa7b2dd59', 'd91611978da6c8b67f41a9945c0599ae', NULL, '', '', '');

-- --------------------------------------------------------

--
-- 表的结构 `icb_weixin_login`
--

CREATE TABLE IF NOT EXISTS `icb_weixin_login` (
  `id` int(10) NOT NULL,
  `token` int(10) NOT NULL,
  `uid` int(10) DEFAULT NULL,
  `session_id` varchar(32) NOT NULL,
  `expire` int(10) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_weixin_message`
--

CREATE TABLE IF NOT EXISTS `icb_weixin_message` (
  `id` int(11) NOT NULL,
  `weixin_id` varchar(32) NOT NULL,
  `content` varchar(255) NOT NULL,
  `action` text,
  `time` int(10) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_weixin_msg`
--

CREATE TABLE IF NOT EXISTS `icb_weixin_msg` (
  `id` int(10) NOT NULL,
  `msg_id` bigint(20) NOT NULL,
  `group_name` varchar(255) NOT NULL DEFAULT '未分组',
  `status` varchar(15) NOT NULL DEFAULT 'unsent',
  `error_num` int(10) DEFAULT NULL,
  `main_msg` text,
  `articles_info` text,
  `questions_info` text,
  `create_time` int(10) NOT NULL,
  `filter_count` int(10) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='微信群发列表';

-- --------------------------------------------------------

--
-- 表的结构 `icb_weixin_qr_code`
--

CREATE TABLE IF NOT EXISTS `icb_weixin_qr_code` (
  `scene_id` mediumint(5) NOT NULL,
  `ticket` varchar(255) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `subscribe_num` int(10) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='微信二维码';

-- --------------------------------------------------------

--
-- 表的结构 `icb_weixin_reply_rule`
--

CREATE TABLE IF NOT EXISTS `icb_weixin_reply_rule` (
  `id` int(10) NOT NULL,
  `account_id` int(10) NOT NULL DEFAULT '0',
  `keyword` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `image_file` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT '',
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `link` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT '0',
  `sort_status` int(10) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 表的结构 `icb_weixin_third_party_api`
--

CREATE TABLE IF NOT EXISTS `icb_weixin_third_party_api` (
  `id` int(10) NOT NULL,
  `account_id` int(10) NOT NULL DEFAULT '0',
  `url` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  `rank` tinyint(2) unsigned NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='微信第三方接入';

-- --------------------------------------------------------

--
-- 表的结构 `icb_work_experience`
--

CREATE TABLE IF NOT EXISTS `icb_work_experience` (
  `work_id` int(11) unsigned NOT NULL COMMENT '自增ID',
  `uid` int(11) DEFAULT NULL COMMENT '用户ID',
  `start_year` int(11) DEFAULT NULL COMMENT '开始年份',
  `end_year` int(11) DEFAULT NULL COMMENT '结束年月',
  `company_name` varchar(64) DEFAULT NULL COMMENT '公司名',
  `job_id` int(11) DEFAULT NULL COMMENT '职位ID',
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间'
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='工作经历';

-- --------------------------------------------------------

--
-- 表的结构 `wait_del_icb_tag`
--

CREATE TABLE IF NOT EXISTS `wait_del_icb_tag` (
  `id` int(11) NOT NULL COMMENT 'it技能id',
  `title` varchar(64) DEFAULT NULL COMMENT '技能标题',
  `add_time` int(10) DEFAULT NULL COMMENT '添加时间',
  `discuss_count` int(11) DEFAULT '0' COMMENT '讨论计数',
  `description` text COMMENT '技能描述',
  `tag_pic` varchar(255) DEFAULT NULL COMMENT '技能图片',
  `tag_lock` tinyint(1) NOT NULL DEFAULT '0' COMMENT '技能是否锁定 1 锁定 0 未锁定',
  `focus_count` int(11) DEFAULT '0' COMMENT '关注计数',
  `user_related` tinyint(1) DEFAULT '0' COMMENT '是否被用户关联',
  `url_token` varchar(32) DEFAULT NULL,
  `merged_id` int(11) DEFAULT '0',
  `seo_title` varchar(255) DEFAULT NULL,
  `discuss_count_last_week` int(10) DEFAULT '0',
  `discuss_count_last_month` int(10) DEFAULT '0',
  `discuss_count_update` int(10) DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='话题';

--
-- 转存表中的数据 `wait_del_icb_tag`
--

INSERT INTO `wait_del_icb_tag` (`id`, `title`, `add_time`, `discuss_count`, `description`, `tag_pic`, `tag_lock`, `focus_count`, `user_related`, `url_token`, `merged_id`, `seo_title`, `discuss_count_last_week`, `discuss_count_last_month`, `discuss_count_update`) VALUES
(1, '前端开发', NULL, 1, '前端开发相关技术话题', NULL, 0, 0, 0, NULL, 0, NULL, 1, 1, 1499918126),
(2, 'HTML5', 1499827072, 0, 'H5技术相关话题', NULL, 0, 1, 0, NULL, 0, NULL, 0, 0, 0),
(3, '服务器', 1499917858, 0, '各种服务器相关技术文章和讨论', NULL, 0, 1, 0, NULL, 0, NULL, 0, 0, 0),
(4, 'Linux', 1499917906, 0, 'Linux服务器的搭建维护等工作', NULL, 0, 1, 0, NULL, 0, NULL, 0, 0, 0),
(5, 'Apache', 1499917953, 0, 'WEB服务器Apache的搭建与维护， 以及相关性能优化', NULL, 0, 1, 0, NULL, 0, NULL, 0, 0, 0),
(6, 'Javascript', 1499918005, 2, '脚本语言Javascript的技术文章和讨论', NULL, 0, 1, 0, NULL, 0, NULL, 2, 2, 1499928237),
(7, 'js', 1499918126, 1, '', NULL, 0, 1, 0, '', 0, NULL, 1, 1, 1499918126),
(8, 'Git', 1501057996, 0, 'git教程， git使用， git服务器搭建', NULL, 0, 0, 0, 'git', 0, NULL, 0, 0, 0),
(9, 'SVN', 1501086315, 0, 'svn使用', NULL, 0, 0, 0, 'svn', 0, NULL, 0, 0, 0),
(10, 'jQuery', 1501086547, 0, 'jQuery使用', NULL, 0, 0, 0, 'jquery', 0, NULL, 0, 0, 0),
(16, 'mysql', 1502034843, 0, NULL, NULL, 0, 0, 0, '', 0, NULL, 0, 0, 0),
(15, 'Oracle', 1502034843, 0, NULL, NULL, 0, 0, 0, NULL, 0, NULL, 0, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `wait_del_icb_tag_article_relation`
--

CREATE TABLE IF NOT EXISTS `wait_del_icb_tag_article_relation` (
  `id` int(11) NOT NULL COMMENT '自增 ID',
  `type_id` int(11) DEFAULT '0' COMMENT 'tag/category id',
  `type` varchar(10) NOT NULL COMMENT 'tag 或者 category',
  `article_id` int(11) DEFAULT '0' COMMENT '关联的文章id',
  `article_type` varchar(16) DEFAULT NULL COMMENT '关联的文章类型：文章，问答。。',
  `add_time` int(10) DEFAULT '0' COMMENT '添加时间',
  `uid` int(11) DEFAULT '0' COMMENT '用户ID'
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `wait_del_icb_tag_article_relation`
--

INSERT INTO `wait_del_icb_tag_article_relation` (`id`, `type_id`, `type`, `article_id`, `article_type`, `add_time`, `uid`) VALUES
(1, 7, '', 1, 'article', 1499918126, 1),
(2, 1, '', 1, 'article', 1499918126, 1),
(3, 6, '', 1, 'article', 1499918126, 1),
(4, 6, '', 1, 'question', 1499928237, 2),
(5, 9, 'tag', 4, 'course', 0, 0),
(6, 8, 'tag', 4, 'course', 0, 0),
(7, 8, 'tag', 6, 'course', 0, 0),
(8, 2, 'tag', 6, 'course', 0, 0),
(9, 8, 'tag', 7, 'course', 0, 0),
(15, 4, 'tag', 8, 'course', 0, 0),
(11, 15, 'tag', 8, 'course', 0, 0),
(12, 16, 'tag', 8, 'course', 0, 0),
(16, 2, 'tag', 9, 'course', 0, 0),
(17, 6, 'tag', 10, 'course', 0, 0),
(18, 2, 'tag', 10, 'course', 0, 0),
(19, 6, 'tag', 11, 'course', 0, 0),
(20, 2, 'tag', 11, 'course', 0, 0),
(21, 2, 'tag', 12, 'course', 0, 0),
(22, 6, 'tag', 12, 'course', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `wait_del_icb_tag_category`
--

CREATE TABLE IF NOT EXISTS `wait_del_icb_tag_category` (
  `id` int(11) NOT NULL,
  `title` varchar(200) DEFAULT NULL COMMENT '专题标题',
  `description` varchar(255) DEFAULT NULL COMMENT '专题描述',
  `icon` varchar(255) DEFAULT NULL COMMENT '专题图标',
  `tag_count` int(11) NOT NULL DEFAULT '0' COMMENT 'tag计数',
  `css` text COMMENT '自定义CSS',
  `url_token` varchar(32) DEFAULT NULL,
  `seo_title` varchar(255) DEFAULT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  `sort` smallint(6) DEFAULT '0' COMMENT '排序',
  `discuss_count` int(10) NOT NULL DEFAULT '0' COMMENT '讨论数',
  `focus_count` int(10) NOT NULL DEFAULT '0' COMMENT '关注数',
  `add_time` int(11) DEFAULT NULL COMMENT '记录添加时间'
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `wait_del_icb_tag_category`
--

INSERT INTO `wait_del_icb_tag_category` (`id`, `title`, `description`, `icon`, `tag_count`, `css`, `url_token`, `seo_title`, `enabled`, `sort`, `discuss_count`, `focus_count`, `add_time`) VALUES
(1, '前端开发', '前端开发技术', NULL, 3, '', 'front', '前端开发相关技术', 1, 0, 0, 0, NULL),
(2, '数据库', '数据库操作相关知识和教程', NULL, 0, NULL, 'database', NULL, 0, 0, 0, 0, 1501141331),
(4, '服务器', '各种服务器的操作知识和教程', NULL, 6, NULL, 'server', NULL, 0, 0, 0, 0, 1501216382);

-- --------------------------------------------------------

--
-- 表的结构 `wait_del_icb_tag_category_relation`
--

CREATE TABLE IF NOT EXISTS `wait_del_icb_tag_category_relation` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL DEFAULT '0' COMMENT '技能分类ID -> skill_category.id',
  `tag_id` int(11) NOT NULL DEFAULT '0' COMMENT '技能id'
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `wait_del_icb_tag_category_relation`
--

INSERT INTO `wait_del_icb_tag_category_relation` (`id`, `category_id`, `tag_id`) VALUES
(14, 1, 2),
(2, 1, 14),
(20, 4, 16),
(11, 1, 10),
(18, 4, 4),
(17, 4, 5),
(16, 4, 8),
(15, 4, 9),
(13, 1, 6),
(19, 4, 7);

-- --------------------------------------------------------

--
-- 表的结构 `wait_del_icb_tag_nav_menu`
--

CREATE TABLE IF NOT EXISTS `wait_del_icb_tag_nav_menu` (
  `id` int(11) unsigned NOT NULL,
  `title` varchar(128) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(16) DEFAULT NULL,
  `type_id` int(11) DEFAULT '0',
  `link` varchar(255) DEFAULT NULL COMMENT '链接',
  `icon` varchar(255) DEFAULT NULL COMMENT '图标',
  `sort` smallint(6) DEFAULT '0' COMMENT '排序',
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '父级id'
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `wait_del_icb_tag_nav_menu`
--

INSERT INTO `wait_del_icb_tag_nav_menu` (`id`, `title`, `description`, `type`, `type_id`, `link`, `icon`, `sort`, `parent_id`) VALUES
(2, '前端开发', '<b>前端开发所需要的技能</b>前端开发所需要的技能', 'category', 1, NULL, '', 0, 0),
(3, '安卓Android APP', '', 'category', 2, NULL, '', 6, 0),
(4, '苹果IOS APP', '', 'category', 3, NULL, '', 7, 0),
(5, 'HTML5/H5', '', 'category', 4, NULL, '', 4, 13),
(7, 'Javascript', '', 'category', 10, NULL, '', 2, 13),
(8, 'CSS&CSS3', '', 'category', 12, NULL, '', 5, 13),
(12, '数据库', '', 'category', 5, NULL, '', 11, 0),
(13, '前端开发', '前端开发所需技能', 'custom', 0, '', '13.jpg', 1, 0),
(15, 'jQuery', '', 'category', 11, NULL, '', 3, 13),
(16, '前端开发', '', 'skill', 1, NULL, '', 99, 17),
(17, '前端开发', '', 'skill', 1, NULL, '', 99, 0),
(20, 'androidstudio', NULL, NULL, 12, NULL, '', 99, 0),
(19, '前端开发', '', 'skill', 1, NULL, '', 99, 17),
(21, 'androidstudio', NULL, 'topic', 12, NULL, '', 99, 0),
(22, 'androidstudio', NULL, 'topic', 12, NULL, '', 99, 0),
(23, 'androidstudio', NULL, 'topic', 12, NULL, '', 99, 0),
(24, 'androidstudio', NULL, 'topic', 12, NULL, '', 99, 0),
(25, 'androidstudio', NULL, 'topic', 12, NULL, '', 99, 0),
(26, 'androidstudio', NULL, 'topic', 12, NULL, '', 99, 0),
(27, 'androidstudio', NULL, 'topic', 12, NULL, '', 99, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `icb_active_data`
--
ALTER TABLE `icb_active_data`
  ADD PRIMARY KEY (`active_id`),
  ADD KEY `active_code` (`active_code`),
  ADD KEY `active_type_code` (`active_type_code`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `icb_answer`
--
ALTER TABLE `icb_answer`
  ADD PRIMARY KEY (`answer_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `agree_count` (`agree_count`),
  ADD KEY `against_count` (`against_count`),
  ADD KEY `add_time` (`add_time`),
  ADD KEY `uid` (`uid`),
  ADD KEY `uninterested_count` (`uninterested_count`),
  ADD KEY `force_fold` (`force_fold`),
  ADD KEY `anonymous` (`anonymous`),
  ADD KEY `publich_source` (`publish_source`);

--
-- Indexes for table `icb_answer_comments`
--
ALTER TABLE `icb_answer_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `answer_id` (`answer_id`),
  ADD KEY `time` (`time`);

--
-- Indexes for table `icb_answer_thanks`
--
ALTER TABLE `icb_answer_thanks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `answer_id` (`answer_id`);

--
-- Indexes for table `icb_answer_uninterested`
--
ALTER TABLE `icb_answer_uninterested`
  ADD PRIMARY KEY (`id`),
  ADD KEY `answer_id` (`answer_id`);

--
-- Indexes for table `icb_answer_vote`
--
ALTER TABLE `icb_answer_vote`
  ADD PRIMARY KEY (`voter_id`),
  ADD KEY `answer_id` (`answer_id`),
  ADD KEY `vote_value` (`vote_value`);

--
-- Indexes for table `icb_approval`
--
ALTER TABLE `icb_approval`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type` (`type`),
  ADD KEY `uid` (`uid`),
  ADD KEY `time` (`time`);

--
-- Indexes for table `icb_article`
--
ALTER TABLE `icb_article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `has_attach` (`has_attach`),
  ADD KEY `uid` (`uid`),
  ADD KEY `comments` (`comments`),
  ADD KEY `views` (`views`),
  ADD KEY `add_time` (`add_time`),
  ADD KEY `lock` (`lock`),
  ADD KEY `votes` (`votes`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `is_recommend` (`is_recommend`),
  ADD KEY `chapter_id` (`chapter_id`),
  ADD KEY `sort` (`sort`),
  ADD FULLTEXT KEY `title_fulltext` (`title_fulltext`);

--
-- Indexes for table `icb_article_comments`
--
ALTER TABLE `icb_article_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `article_id` (`article_id`),
  ADD KEY `add_time` (`add_time`),
  ADD KEY `votes` (`votes`);

--
-- Indexes for table `icb_article_vote`
--
ALTER TABLE `icb_article_vote`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `type` (`type`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `time` (`time`),
  ADD KEY `item_uid` (`item_uid`);

--
-- Indexes for table `icb_attach`
--
ALTER TABLE `icb_attach`
  ADD PRIMARY KEY (`id`),
  ADD KEY `access_key` (`access_key`),
  ADD KEY `is_image` (`is_image`),
  ADD KEY `fetch` (`item_id`,`item_type`),
  ADD KEY `wait_approval` (`wait_approval`);

--
-- Indexes for table `icb_category`
--
ALTER TABLE `icb_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`parent_id`),
  ADD KEY `url_token` (`url_token`),
  ADD KEY `title` (`title`);

--
-- Indexes for table `icb_course`
--
ALTER TABLE `icb_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `has_attach` (`has_attach`),
  ADD KEY `uid` (`uid`),
  ADD KEY `comments` (`comments`),
  ADD KEY `views` (`views`),
  ADD KEY `add_time` (`add_time`),
  ADD KEY `lock` (`is_publish`),
  ADD KEY `votes` (`votes`),
  ADD KEY `is_recommend` (`is_recommend`),
  ADD KEY `chapter_id` (`chapter_id`),
  ADD KEY `sort` (`sort`),
  ADD KEY `idx_url_token` (`url_token`),
  ADD FULLTEXT KEY `title_fulltext` (`title_fulltext`);

--
-- Indexes for table `icb_course_content_table`
--
ALTER TABLE `icb_course_content_table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`link`);

--
-- Indexes for table `icb_course_homework`
--
ALTER TABLE `icb_course_homework`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `icb_course_homework_answer`
--
ALTER TABLE `icb_course_homework_answer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `icb_course_month_order`
--
ALTER TABLE `icb_course_month_order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `icb_draft`
--
ALTER TABLE `icb_draft`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `time` (`time`);

--
-- Indexes for table `icb_edm_task`
--
ALTER TABLE `icb_edm_task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `icb_edm_taskdata`
--
ALTER TABLE `icb_edm_taskdata`
  ADD PRIMARY KEY (`id`),
  ADD KEY `taskid` (`taskid`),
  ADD KEY `sent_time` (`sent_time`),
  ADD KEY `view_time` (`view_time`);

--
-- Indexes for table `icb_edm_unsubscription`
--
ALTER TABLE `icb_edm_unsubscription`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `icb_edm_userdata`
--
ALTER TABLE `icb_edm_userdata`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usergroup` (`usergroup`);

--
-- Indexes for table `icb_edm_usergroup`
--
ALTER TABLE `icb_edm_usergroup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `icb_education_experience`
--
ALTER TABLE `icb_education_experience`
  ADD PRIMARY KEY (`education_id`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `icb_favorite`
--
ALTER TABLE `icb_favorite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `time` (`time`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `icb_favorite_tag`
--
ALTER TABLE `icb_favorite_tag`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `title` (`title`),
  ADD KEY `type` (`type`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `icb_feature`
--
ALTER TABLE `icb_feature`
  ADD PRIMARY KEY (`id`),
  ADD KEY `url_token` (`url_token`),
  ADD KEY `title` (`title`),
  ADD KEY `enabled` (`enabled`);

--
-- Indexes for table `icb_feature_topic`
--
ALTER TABLE `icb_feature_topic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feature_id` (`feature_id`),
  ADD KEY `topic_id` (`topic_id`);

--
-- Indexes for table `icb_geo_location`
--
ALTER TABLE `icb_geo_location`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_type` (`item_type`),
  ADD KEY `add_time` (`add_time`),
  ADD KEY `geo_location` (`latitude`,`longitude`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `icb_help_chapter`
--
ALTER TABLE `icb_help_chapter`
  ADD PRIMARY KEY (`id`),
  ADD KEY `title` (`title`),
  ADD KEY `url_token` (`url_token`),
  ADD KEY `sort` (`sort`);

--
-- Indexes for table `icb_inbox`
--
ALTER TABLE `icb_inbox`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dialog_id` (`dialog_id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `add_time` (`add_time`),
  ADD KEY `sender_remove` (`sender_remove`),
  ADD KEY `recipient_remove` (`recipient_remove`),
  ADD KEY `sender_receipt` (`receipt`);

--
-- Indexes for table `icb_inbox_dialog`
--
ALTER TABLE `icb_inbox_dialog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recipient_uid` (`recipient_uid`),
  ADD KEY `sender_uid` (`sender_uid`),
  ADD KEY `update_time` (`update_time`),
  ADD KEY `add_time` (`add_time`);

--
-- Indexes for table `icb_integral_log`
--
ALTER TABLE `icb_integral_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `action` (`action`),
  ADD KEY `time` (`time`),
  ADD KEY `integral` (`integral`);

--
-- Indexes for table `icb_invitation`
--
ALTER TABLE `icb_invitation`
  ADD PRIMARY KEY (`invitation_id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `invitation_code` (`invitation_code`),
  ADD KEY `invitation_email` (`invitation_email`),
  ADD KEY `active_time` (`active_time`),
  ADD KEY `active_ip` (`active_ip`),
  ADD KEY `active_status` (`active_status`);

--
-- Indexes for table `icb_jobs`
--
ALTER TABLE `icb_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `icb_mail_queue`
--
ALTER TABLE `icb_mail_queue`
  ADD PRIMARY KEY (`id`),
  ADD KEY `is_error` (`is_error`),
  ADD KEY `send_to` (`send_to`);

--
-- Indexes for table `icb_nav_menu`
--
ALTER TABLE `icb_nav_menu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`link`);

--
-- Indexes for table `icb_notification`
--
ALTER TABLE `icb_notification`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `recipient_read_flag` (`recipient_uid`,`read_flag`),
  ADD KEY `sender_uid` (`sender_uid`),
  ADD KEY `model_type` (`model_type`),
  ADD KEY `source_id` (`source_id`),
  ADD KEY `action_type` (`action_type`),
  ADD KEY `add_time` (`add_time`);

--
-- Indexes for table `icb_notification_data`
--
ALTER TABLE `icb_notification_data`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `icb_pages`
--
ALTER TABLE `icb_pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `url_token` (`url_token`),
  ADD KEY `enabled` (`enabled`);

--
-- Indexes for table `icb_posts_index`
--
ALTER TABLE `icb_posts_index`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `post_type` (`post_type`),
  ADD KEY `add_time` (`add_time`),
  ADD KEY `update_time` (`update_time`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `is_recommend` (`is_recommend`),
  ADD KEY `anonymous` (`anonymous`),
  ADD KEY `popular_value` (`popular_value`),
  ADD KEY `uid` (`uid`),
  ADD KEY `lock` (`lock`),
  ADD KEY `agree_count` (`agree_count`),
  ADD KEY `answer_count` (`answer_count`),
  ADD KEY `view_count` (`view_count`);

--
-- Indexes for table `icb_question`
--
ALTER TABLE `icb_question`
  ADD PRIMARY KEY (`question_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `update_time` (`update_time`),
  ADD KEY `add_time` (`add_time`),
  ADD KEY `published_uid` (`published_uid`),
  ADD KEY `answer_count` (`answer_count`),
  ADD KEY `agree_count` (`agree_count`),
  ADD KEY `question_content` (`question_content`),
  ADD KEY `lock` (`lock`),
  ADD KEY `thanks_count` (`thanks_count`),
  ADD KEY `anonymous` (`anonymous`),
  ADD KEY `popular_value` (`popular_value`),
  ADD KEY `best_answer` (`best_answer`),
  ADD KEY `popular_value_update` (`popular_value_update`),
  ADD KEY `against_count` (`against_count`),
  ADD KEY `is_recommend` (`is_recommend`),
  ADD KEY `weibo_msg_id` (`weibo_msg_id`),
  ADD KEY `received_email_id` (`received_email_id`),
  ADD KEY `unverified_modify_count` (`unverified_modify_count`),
  ADD KEY `chapter_id` (`chapter_id`),
  ADD KEY `sort` (`sort`),
  ADD FULLTEXT KEY `question_content_fulltext` (`question_content_fulltext`);

--
-- Indexes for table `icb_question_comments`
--
ALTER TABLE `icb_question_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `time` (`time`);

--
-- Indexes for table `icb_question_focus`
--
ALTER TABLE `icb_question_focus`
  ADD PRIMARY KEY (`focus_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `question_uid` (`question_id`,`uid`);

--
-- Indexes for table `icb_question_invite`
--
ALTER TABLE `icb_question_invite`
  ADD PRIMARY KEY (`question_invite_id`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `sender_uid` (`sender_uid`),
  ADD KEY `recipients_uid` (`recipients_uid`),
  ADD KEY `add_time` (`add_time`);

--
-- Indexes for table `icb_question_thanks`
--
ALTER TABLE `icb_question_thanks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indexes for table `icb_question_uninterested`
--
ALTER TABLE `icb_question_uninterested`
  ADD PRIMARY KEY (`interested_id`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `icb_received_email`
--
ALTER TABLE `icb_received_email`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `config_id` (`config_id`),
  ADD KEY `message_id` (`message_id`),
  ADD KEY `date` (`date`),
  ADD KEY `ticket_id` (`ticket_id`);

--
-- Indexes for table `icb_receiving_email_config`
--
ALTER TABLE `icb_receiving_email_config`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `server` (`server`);

--
-- Indexes for table `icb_redirect`
--
ALTER TABLE `icb_redirect`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `icb_related_links`
--
ALTER TABLE `icb_related_links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `item_type` (`item_type`),
  ADD KEY `item_id` (`item_id`),
  ADD KEY `add_time` (`add_time`);

--
-- Indexes for table `icb_related_topic`
--
ALTER TABLE `icb_related_topic`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topic_id` (`topic_id`),
  ADD KEY `related_id` (`related_id`);

--
-- Indexes for table `icb_report`
--
ALTER TABLE `icb_report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `add_time` (`add_time`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `icb_reputation_category`
--
ALTER TABLE `icb_reputation_category`
  ADD PRIMARY KEY (`auto_id`),
  ADD UNIQUE KEY `uid_category_id` (`uid`,`category_id`);

--
-- Indexes for table `icb_reputation_tag`
--
ALTER TABLE `icb_reputation_tag`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topic_count` (`tag_count`),
  ADD KEY `uid` (`uid`),
  ADD KEY `topic_id` (`tag_id`),
  ADD KEY `reputation` (`reputation`);

--
-- Indexes for table `icb_reputation_tag_category`
--
ALTER TABLE `icb_reputation_tag_category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid_category_id` (`uid`,`category_id`);

--
-- Indexes for table `icb_reputation_topic`
--
ALTER TABLE `icb_reputation_topic`
  ADD PRIMARY KEY (`auto_id`),
  ADD KEY `topic_count` (`topic_count`),
  ADD KEY `uid` (`uid`),
  ADD KEY `topic_id` (`topic_id`),
  ADD KEY `reputation` (`reputation`);

--
-- Indexes for table `icb_school`
--
ALTER TABLE `icb_school`
  ADD PRIMARY KEY (`school_id`);

--
-- Indexes for table `icb_search_cache`
--
ALTER TABLE `icb_search_cache`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hash` (`hash`),
  ADD KEY `time` (`time`);

--
-- Indexes for table `icb_sessions`
--
ALTER TABLE `icb_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `modified` (`modified`),
  ADD KEY `lifetime` (`lifetime`);

--
-- Indexes for table `icb_system_setting`
--
ALTER TABLE `icb_system_setting`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `varname` (`varname`);

--
-- Indexes for table `icb_tag_tag_relation`
--
ALTER TABLE `icb_tag_tag_relation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feature_id` (`child_id`),
  ADD KEY `topic_id` (`topic_id`);

--
-- Indexes for table `icb_temp_upload`
--
ALTER TABLE `icb_temp_upload`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fetch` (`item_id`,`item_type`);

--
-- Indexes for table `icb_topic`
--
ALTER TABLE `icb_topic`
  ADD PRIMARY KEY (`topic_id`),
  ADD UNIQUE KEY `topic_title` (`topic_title`),
  ADD KEY `url_token` (`url_token`),
  ADD KEY `merged_id` (`merged_id`),
  ADD KEY `discuss_count` (`discuss_count`),
  ADD KEY `add_time` (`add_time`),
  ADD KEY `user_related` (`user_related`),
  ADD KEY `focus_count` (`focus_count`),
  ADD KEY `topic_lock` (`topic_lock`),
  ADD KEY `parent_id` (`parent_id`),
  ADD KEY `is_parent` (`is_parent`),
  ADD KEY `discuss_count_last_week` (`discuss_count_last_week`),
  ADD KEY `discuss_count_last_month` (`discuss_count_last_month`),
  ADD KEY `discuss_count_update` (`discuss_count_update`);

--
-- Indexes for table `icb_topic_focus`
--
ALTER TABLE `icb_topic_focus`
  ADD PRIMARY KEY (`focus_id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `topic_id` (`topic_id`),
  ADD KEY `topic_uid` (`topic_id`,`uid`);

--
-- Indexes for table `icb_topic_merge`
--
ALTER TABLE `icb_topic_merge`
  ADD PRIMARY KEY (`id`),
  ADD KEY `source_id` (`source_id`),
  ADD KEY `target_id` (`target_id`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `icb_topic_relation`
--
ALTER TABLE `icb_topic_relation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topic_id` (`topic_id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `type` (`type`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `icb_users`
--
ALTER TABLE `icb_users`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `user_name` (`user_name`),
  ADD KEY `email` (`email`),
  ADD KEY `reputation` (`reputation`),
  ADD KEY `reputation_update_time` (`reputation_update_time`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `agree_count` (`agree_count`),
  ADD KEY `thanks_count` (`thanks_count`),
  ADD KEY `forbidden` (`forbidden`),
  ADD KEY `valid_email` (`valid_email`),
  ADD KEY `last_active` (`last_active`),
  ADD KEY `integral` (`integral`),
  ADD KEY `url_token` (`url_token`),
  ADD KEY `verified` (`verified`),
  ADD KEY `answer_count` (`answer_count`);

--
-- Indexes for table `icb_users_attrib`
--
ALTER TABLE `icb_users_attrib`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `icb_users_facebook`
--
ALTER TABLE `icb_users_facebook`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid` (`uid`),
  ADD KEY `access_token` (`access_token`);

--
-- Indexes for table `icb_users_google`
--
ALTER TABLE `icb_users_google`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid` (`uid`),
  ADD KEY `access_token` (`access_token`);

--
-- Indexes for table `icb_users_group`
--
ALTER TABLE `icb_users_group`
  ADD PRIMARY KEY (`group_id`),
  ADD KEY `type` (`type`),
  ADD KEY `custom` (`custom`);

--
-- Indexes for table `icb_users_notification_setting`
--
ALTER TABLE `icb_users_notification_setting`
  ADD PRIMARY KEY (`notice_setting_id`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `icb_users_online`
--
ALTER TABLE `icb_users_online`
  ADD KEY `uid` (`uid`),
  ADD KEY `last_active` (`last_active`);

--
-- Indexes for table `icb_users_qq`
--
ALTER TABLE `icb_users_qq`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `add_time` (`add_time`),
  ADD KEY `access_token` (`access_token`),
  ADD KEY `openid` (`openid`);

--
-- Indexes for table `icb_users_sina`
--
ALTER TABLE `icb_users_sina`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid` (`uid`),
  ADD KEY `access_token` (`access_token`),
  ADD KEY `last_msg_id` (`last_msg_id`);

--
-- Indexes for table `icb_users_twitter`
--
ALTER TABLE `icb_users_twitter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid` (`uid`),
  ADD KEY `access_token` (`access_token`);

--
-- Indexes for table `icb_users_ucenter`
--
ALTER TABLE `icb_users_ucenter`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `uc_uid` (`uc_uid`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `icb_users_weixin`
--
ALTER TABLE `icb_users_weixin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid` (`uid`),
  ADD KEY `openid` (`openid`),
  ADD KEY `expires_in` (`expires_in`),
  ADD KEY `scope` (`scope`),
  ADD KEY `sex` (`sex`),
  ADD KEY `province` (`province`),
  ADD KEY `city` (`city`),
  ADD KEY `country` (`country`),
  ADD KEY `add_time` (`add_time`),
  ADD KEY `latitude` (`latitude`,`longitude`),
  ADD KEY `location_update` (`location_update`);

--
-- Indexes for table `icb_user_action_history`
--
ALTER TABLE `icb_user_action_history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `add_time` (`add_time`),
  ADD KEY `uid` (`uid`),
  ADD KEY `associate_id` (`associate_id`),
  ADD KEY `anonymous` (`anonymous`),
  ADD KEY `fold_status` (`fold_status`),
  ADD KEY `associate` (`associate_type`,`associate_action`),
  ADD KEY `associate_attached` (`associate_attached`),
  ADD KEY `associate_with_id` (`associate_id`,`associate_type`,`associate_action`),
  ADD KEY `associate_with_uid` (`uid`,`associate_type`,`associate_action`);

--
-- Indexes for table `icb_user_action_history_data`
--
ALTER TABLE `icb_user_action_history_data`
  ADD PRIMARY KEY (`history_id`);

--
-- Indexes for table `icb_user_action_history_fresh`
--
ALTER TABLE `icb_user_action_history_fresh`
  ADD PRIMARY KEY (`id`),
  ADD KEY `associate` (`associate_type`,`associate_action`),
  ADD KEY `add_time` (`add_time`),
  ADD KEY `uid` (`uid`),
  ADD KEY `history_id` (`history_id`),
  ADD KEY `associate_with_id` (`id`,`associate_type`,`associate_action`),
  ADD KEY `associate_with_uid` (`uid`,`associate_type`,`associate_action`),
  ADD KEY `anonymous` (`anonymous`);

--
-- Indexes for table `icb_user_follow`
--
ALTER TABLE `icb_user_follow`
  ADD PRIMARY KEY (`follow_id`),
  ADD KEY `fans_uid` (`fans_uid`),
  ADD KEY `friend_uid` (`friend_uid`),
  ADD KEY `user_follow` (`fans_uid`,`friend_uid`);

--
-- Indexes for table `icb_user_read_history`
--
ALTER TABLE `icb_user_read_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `icb_verify_apply`
--
ALTER TABLE `icb_verify_apply`
  ADD PRIMARY KEY (`id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `time` (`time`),
  ADD KEY `name` (`name`,`status`),
  ADD KEY `type` (`type`);

--
-- Indexes for table `icb_weibo_msg`
--
ALTER TABLE `icb_weibo_msg`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_at` (`created_at`),
  ADD KEY `uid` (`uid`),
  ADD KEY `weibo_uid` (`weibo_uid`),
  ADD KEY `question_id` (`question_id`),
  ADD KEY `ticket_id` (`ticket_id`);

--
-- Indexes for table `icb_weixin_accounts`
--
ALTER TABLE `icb_weixin_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `weixin_mp_token` (`weixin_mp_token`),
  ADD KEY `weixin_account_role` (`weixin_account_role`),
  ADD KEY `weixin_app_id` (`weixin_app_id`);

--
-- Indexes for table `icb_weixin_login`
--
ALTER TABLE `icb_weixin_login`
  ADD PRIMARY KEY (`id`),
  ADD KEY `session_id` (`session_id`),
  ADD KEY `token` (`token`),
  ADD KEY `expire` (`expire`);

--
-- Indexes for table `icb_weixin_message`
--
ALTER TABLE `icb_weixin_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `weixin_id` (`weixin_id`),
  ADD KEY `time` (`time`);

--
-- Indexes for table `icb_weixin_msg`
--
ALTER TABLE `icb_weixin_msg`
  ADD PRIMARY KEY (`id`),
  ADD KEY `msg_id` (`msg_id`),
  ADD KEY `group_name` (`group_name`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `icb_weixin_qr_code`
--
ALTER TABLE `icb_weixin_qr_code`
  ADD PRIMARY KEY (`scene_id`),
  ADD KEY `ticket` (`ticket`),
  ADD KEY `subscribe_num` (`subscribe_num`);

--
-- Indexes for table `icb_weixin_reply_rule`
--
ALTER TABLE `icb_weixin_reply_rule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `keyword` (`keyword`),
  ADD KEY `enabled` (`enabled`),
  ADD KEY `sort_status` (`sort_status`);

--
-- Indexes for table `icb_weixin_third_party_api`
--
ALTER TABLE `icb_weixin_third_party_api`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `enabled` (`enabled`),
  ADD KEY `rank` (`rank`);

--
-- Indexes for table `icb_work_experience`
--
ALTER TABLE `icb_work_experience`
  ADD PRIMARY KEY (`work_id`),
  ADD KEY `uid` (`uid`);

--
-- Indexes for table `wait_del_icb_tag`
--
ALTER TABLE `wait_del_icb_tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `topic_title` (`title`),
  ADD KEY `url_token` (`url_token`),
  ADD KEY `merged_id` (`merged_id`),
  ADD KEY `discuss_count` (`discuss_count`),
  ADD KEY `add_time` (`add_time`),
  ADD KEY `user_related` (`user_related`),
  ADD KEY `focus_count` (`focus_count`),
  ADD KEY `topic_lock` (`tag_lock`),
  ADD KEY `discuss_count_last_week` (`discuss_count_last_week`),
  ADD KEY `discuss_count_last_month` (`discuss_count_last_month`),
  ADD KEY `discuss_count_update` (`discuss_count_update`);

--
-- Indexes for table `wait_del_icb_tag_article_relation`
--
ALTER TABLE `wait_del_icb_tag_article_relation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topic_id` (`type_id`),
  ADD KEY `uid` (`uid`),
  ADD KEY `type` (`article_type`),
  ADD KEY `item_id` (`article_id`);

--
-- Indexes for table `wait_del_icb_tag_category`
--
ALTER TABLE `wait_del_icb_tag_category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `url_token` (`url_token`),
  ADD KEY `title` (`title`),
  ADD KEY `enabled` (`enabled`);

--
-- Indexes for table `wait_del_icb_tag_category_relation`
--
ALTER TABLE `wait_del_icb_tag_category_relation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feature_id` (`category_id`),
  ADD KEY `topic_id` (`tag_id`);

--
-- Indexes for table `wait_del_icb_tag_nav_menu`
--
ALTER TABLE `wait_del_icb_tag_nav_menu`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parent_id` (`link`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `icb_active_data`
--
ALTER TABLE `icb_active_data`
  MODIFY `active_id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_answer`
--
ALTER TABLE `icb_answer`
  MODIFY `answer_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '回答id',AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `icb_answer_comments`
--
ALTER TABLE `icb_answer_comments`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_answer_thanks`
--
ALTER TABLE `icb_answer_thanks`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_answer_uninterested`
--
ALTER TABLE `icb_answer_uninterested`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_answer_vote`
--
ALTER TABLE `icb_answer_vote`
  MODIFY `voter_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自动ID';
--
-- AUTO_INCREMENT for table `icb_approval`
--
ALTER TABLE `icb_approval`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_article`
--
ALTER TABLE `icb_article`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `icb_article_comments`
--
ALTER TABLE `icb_article_comments`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `icb_article_vote`
--
ALTER TABLE `icb_article_vote`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_attach`
--
ALTER TABLE `icb_attach`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=351;
--
-- AUTO_INCREMENT for table `icb_category`
--
ALTER TABLE `icb_category`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `icb_course`
--
ALTER TABLE `icb_course`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `icb_course_content_table`
--
ALTER TABLE `icb_course_content_table`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `icb_course_homework`
--
ALTER TABLE `icb_course_homework`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '教程问题id',AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `icb_course_homework_answer`
--
ALTER TABLE `icb_course_homework_answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '作业答案id',AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `icb_course_month_order`
--
ALTER TABLE `icb_course_month_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单id',AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_draft`
--
ALTER TABLE `icb_draft`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_edm_task`
--
ALTER TABLE `icb_edm_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_edm_taskdata`
--
ALTER TABLE `icb_edm_taskdata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_edm_unsubscription`
--
ALTER TABLE `icb_edm_unsubscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_edm_userdata`
--
ALTER TABLE `icb_edm_userdata`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_edm_usergroup`
--
ALTER TABLE `icb_edm_usergroup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_education_experience`
--
ALTER TABLE `icb_education_experience`
  MODIFY `education_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_favorite`
--
ALTER TABLE `icb_favorite`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_favorite_tag`
--
ALTER TABLE `icb_favorite_tag`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `icb_feature`
--
ALTER TABLE `icb_feature`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `icb_feature_topic`
--
ALTER TABLE `icb_feature_topic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `icb_geo_location`
--
ALTER TABLE `icb_geo_location`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_help_chapter`
--
ALTER TABLE `icb_help_chapter`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_inbox`
--
ALTER TABLE `icb_inbox`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `icb_inbox_dialog`
--
ALTER TABLE `icb_inbox_dialog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '对话ID',AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_integral_log`
--
ALTER TABLE `icb_integral_log`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `icb_invitation`
--
ALTER TABLE `icb_invitation`
  MODIFY `invitation_id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '激活ID';
--
-- AUTO_INCREMENT for table `icb_jobs`
--
ALTER TABLE `icb_jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=39;
--
-- AUTO_INCREMENT for table `icb_mail_queue`
--
ALTER TABLE `icb_mail_queue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `icb_nav_menu`
--
ALTER TABLE `icb_nav_menu`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `icb_notification`
--
ALTER TABLE `icb_notification`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `icb_pages`
--
ALTER TABLE `icb_pages`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_posts_index`
--
ALTER TABLE `icb_posts_index`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `icb_question`
--
ALTER TABLE `icb_question`
  MODIFY `question_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `icb_question_comments`
--
ALTER TABLE `icb_question_comments`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `icb_question_focus`
--
ALTER TABLE `icb_question_focus`
  MODIFY `focus_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `icb_question_invite`
--
ALTER TABLE `icb_question_invite`
  MODIFY `question_invite_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_question_thanks`
--
ALTER TABLE `icb_question_thanks`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_question_uninterested`
--
ALTER TABLE `icb_question_uninterested`
  MODIFY `interested_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID';
--
-- AUTO_INCREMENT for table `icb_received_email`
--
ALTER TABLE `icb_received_email`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_receiving_email_config`
--
ALTER TABLE `icb_receiving_email_config`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_redirect`
--
ALTER TABLE `icb_redirect`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_related_links`
--
ALTER TABLE `icb_related_links`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_related_topic`
--
ALTER TABLE `icb_related_topic`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `icb_report`
--
ALTER TABLE `icb_report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_reputation_category`
--
ALTER TABLE `icb_reputation_category`
  MODIFY `auto_id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_reputation_tag`
--
ALTER TABLE `icb_reputation_tag`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `icb_reputation_tag_category`
--
ALTER TABLE `icb_reputation_tag_category`
  MODIFY `id` int(10) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_reputation_topic`
--
ALTER TABLE `icb_reputation_topic`
  MODIFY `auto_id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `icb_search_cache`
--
ALTER TABLE `icb_search_cache`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=43;
--
-- AUTO_INCREMENT for table `icb_system_setting`
--
ALTER TABLE `icb_system_setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',AUTO_INCREMENT=130;
--
-- AUTO_INCREMENT for table `icb_tag_tag_relation`
--
ALTER TABLE `icb_tag_tag_relation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `icb_temp_upload`
--
ALTER TABLE `icb_temp_upload`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `icb_topic`
--
ALTER TABLE `icb_topic`
  MODIFY `topic_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '话题id',AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `icb_topic_focus`
--
ALTER TABLE `icb_topic_focus`
  MODIFY `focus_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `icb_topic_merge`
--
ALTER TABLE `icb_topic_merge`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_topic_relation`
--
ALTER TABLE `icb_topic_relation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增 ID',AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `icb_users`
--
ALTER TABLE `icb_users`
  MODIFY `uid` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户的 UID',AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `icb_users_attrib`
--
ALTER TABLE `icb_users_attrib`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `icb_users_group`
--
ALTER TABLE `icb_users_group`
  MODIFY `group_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=101;
--
-- AUTO_INCREMENT for table `icb_users_notification_setting`
--
ALTER TABLE `icb_users_notification_setting`
  MODIFY `notice_setting_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_users_qq`
--
ALTER TABLE `icb_users_qq`
  MODIFY `id` bigint(11) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_users_ucenter`
--
ALTER TABLE `icb_users_ucenter`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_users_weixin`
--
ALTER TABLE `icb_users_weixin`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_user_action_history`
--
ALTER TABLE `icb_user_action_history`
  MODIFY `history_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增ID',AUTO_INCREMENT=94;
--
-- AUTO_INCREMENT for table `icb_user_action_history_fresh`
--
ALTER TABLE `icb_user_action_history_fresh`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=94;
--
-- AUTO_INCREMENT for table `icb_user_follow`
--
ALTER TABLE `icb_user_follow`
  MODIFY `follow_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `icb_user_read_history`
--
ALTER TABLE `icb_user_read_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '记录id，自增',AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_verify_apply`
--
ALTER TABLE `icb_verify_apply`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_weixin_accounts`
--
ALTER TABLE `icb_weixin_accounts`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `icb_weixin_login`
--
ALTER TABLE `icb_weixin_login`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_weixin_message`
--
ALTER TABLE `icb_weixin_message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_weixin_msg`
--
ALTER TABLE `icb_weixin_msg`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_weixin_qr_code`
--
ALTER TABLE `icb_weixin_qr_code`
  MODIFY `scene_id` mediumint(5) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_weixin_reply_rule`
--
ALTER TABLE `icb_weixin_reply_rule`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_weixin_third_party_api`
--
ALTER TABLE `icb_weixin_third_party_api`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `icb_work_experience`
--
ALTER TABLE `icb_work_experience`
  MODIFY `work_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `wait_del_icb_tag`
--
ALTER TABLE `wait_del_icb_tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'it技能id',AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `wait_del_icb_tag_article_relation`
--
ALTER TABLE `wait_del_icb_tag_article_relation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增 ID',AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `wait_del_icb_tag_category`
--
ALTER TABLE `wait_del_icb_tag_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `wait_del_icb_tag_category_relation`
--
ALTER TABLE `wait_del_icb_tag_category_relation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `wait_del_icb_tag_nav_menu`
--
ALTER TABLE `wait_del_icb_tag_nav_menu`
  MODIFY `id` int(11) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=28;
  
  
  
 
CREATE TABLE IF NOT EXISTS `icb_course_homework_record` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `latest_course_id` int(11) NOT NULL,
  `latest_date` date NOT NULL COMMENT '最近交作业日期',
  `keep_days` smallint(4) NOT NULL DEFAULT '1' COMMENT '连续多少天交作业'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='交作业纪录表';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `icb_course_homework_record`
--
ALTER TABLE `icb_course_homework_record`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `icb_course_homework_record`
--
ALTER TABLE `icb_course_homework_record`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT; 
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
