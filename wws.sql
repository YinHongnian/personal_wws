SET NAMES UTF8;
DROP DATABASE IF EXISTS wws;
CREATE DATABASE wws CHARSET=UTF8;
USE wws;

/*公司表*/
CREATE TABLE company(
    cid INT PRIMARY KEY AUTO_INCREMENT,
    cname VARCHAR(64),
    logo VARCHAR(128),
    introduce VARCHAR(255),
    brand VARCHAR(8)
);

/*商品表*/
CREATE TABLE products(
    pid INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(128),
    category VARCHAR(16),
    price DECIMAL(10,2),
    like_num INT,
    collect_num INT,
    evaluation_pnum INT,
    cid INT,
    FOREIGN KEY (cid) REFERENCES company(cid),
    trail_end_time BIGINT,
    banner VARCHAR(128),
    parameter VARCHAR(128),
    index_trail_site INT,
    recommend INT,
    expire INT
);
/*类别表*/
CREATE TABLE category_according(
	catId INT PRIMARY KEY AUTO_INCREMENT,
	accordingName VARCHAR(8)
);
CREATE TABLE category(
    category_id INT PRIMARY KEY,
    categoryName VARCHAR(8),
    catId INT
);
/*商品分类表*/
CREATE TABLE product_category(
    pcid INT PRIMARY KEY AUTO_INCREMENT,
    pid INT,
    FOREIGN KEY (pid) REFERENCES products(pid),
    category_id INT
);
/*商品详情介绍栏图片*/
CREATE TABLE product_intro(
    piid INT PRIMARY KEY AUTO_INCREMENT,
    pid INT,
    FOREIGN KEY (pid) REFERENCES products(pid),
    iurl VARCHAR(128)
);
/*商品图片*/
CREATE TABLE product_img(
    iid INT PRIMARY KEY AUTO_INCREMENT,
    pid INT,
    FOREIGN KEY (pid) REFERENCES products(pid),
    sm VARCHAR(128),
    md VARCHAR(128),
    lg VARCHAR(128)
);

/*用户信息表*/
CREATE TABLE users(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    uname VARCHAR(64),
    upwd VARCHAR(32),
    email VARCHAR(32),
    avater VARCHAR(128),
    expire INT
);
/*试用报告表*/
CREATE TABLE trail_reports(
    rid INT PRIMARY KEY AUTO_INCREMENT,
    pid INT,
    FOREIGN KEY (pid) REFERENCES products(pid),
    uid INT,
    FOREIGN KEY (uid) REFERENCES users(uid),
    rurl VARCHAR(128), 
    rtime BIGINT,
    banner VARCHAR(128),
    title VARCHAR(128),
    collect_num INT,
    like_num INT,
    index_site INT,
    expire INT
);
/*申请试用表*/
CREATE TABLE apply_trail(
	atid INT PRIMARY KEY AUTO_INCREMENT,
	 pid INT,
	FOREIGN KEY (pid) REFERENCES products(pid),
	uid INT,
	FOREIGN KEY (uid) REFERENCES users(uid),
	isOk ENUM('0','1','2')
);

/*商品分数表*/
CREATE TABLE product_score(
    sid INT PRIMARY KEY AUTO_INCREMENT,
    pid INT,
    FOREIGN KEY (pid) REFERENCES products(pid),
    uid INT,
    FOREIGN KEY (uid) REFERENCES users(uid),
    design INT,
    performance INT, 
    comprehensive INT,
    isRecommend TINYINT
);
/*购物车表*/
CREATE TABLE cart(
    cartid INT PRIMARY KEY AUTO_INCREMENT,
    uid INT,
    FOREIGN KEY (uid) REFERENCES users(uid),
    pid INT,
    FOREIGN KEY (pid) REFERENCES products(pid),
    count INT,
    is_checked TINYINT
);

/*收货地址表*/
CREATE TABLE receiver_address(
	aid INT PRIMARY KEY AUTO_INCREMENT,
	uid INT,
	FOREIGN KEY (uid) REFERENCES users(uid),
	receiver VARCHAR(16),
	address VARCHAR(128),
	phone INT,
	isDefault TINYINT,
	expire TINYINT
);
/*订单表*/
CREATE TABLE orders(
	oid INT PRIMARY KEY AUTO_INCREMENT,
	aid INT,
	FOREIGN KEY (aid) REFERENCES receiver_address(aid),
	uid INT,
	FOREIGN KEY (uid) REFERENCES users(uid),
	status INT,
	order_time BIGINT,
	pay_time BIGINT,
	deliver_time BIGINT,
	receiverd_time BIGINT,
	isTrail TINYINT,
	expire TINYINT
);
/*订单详情表*/
CREATE TABLE order_details(
	did INT PRIMARY KEY AUTO_INCREMENT,
	oid INT,
	FOREIGN KEY (oid) REFERENCES orders(oid),
	pid INT,
	FOREIGN KEY (pid) REFERENCES products(pid),
	count INT
);
/*资讯表*/
CREATE TABLE news(
    nid INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(64),
    subTitle VARCHAR(128),
    author VARCHAR(16) NOT NULL DEFAULT 'Sara',
    nfrom VARCHAR(8),
    pid INT,
    publish_time BIGINT,
    banner VARCHAR(128),
    contents VARCHAR(1024),
    index_site INT
);
/*资讯图片表*/
CREATE TABLE news_img(
    niid INT PRIMARY KEY AUTO_INCREMENT,
    img VARCHAR(128)
);
/*首页轮播表*/
CREATE TABLE carousel(
    ciid INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(128),
    href VARCHAR(128),
    img VARCHAR(128),
    index_site INT
);

INSERT INTO company VALUES
(1,'北京新云医疗科技有限公司','img/product_details/clogo/logo1.png','北京新云医疗科技有限公司成立于2016年，是国内第一家专注于疼痛康复管理的互联网创新公司，中关村国家级高新技术企业。目前拥有北京新云医院管理有限公司与常州新云医疗器械有限公司两家分公司。为解决疼痛问题日趋严峻的发展形势，新云医疗自主研发出一系列快速缓解疼痛的可穿戴设备——云贴。其可通过手机App进行操控，智能检测疼痛状态并提供专业级疼痛评价报告，对大数据进行分析后建立医用数据库。云贴的问世实现了疼痛的检测、评估与管理，可为疼痛科医师的精准化诊疗提供有效的参考依据。','新云医疗'),
(2,'无锡睿米信息技术有限公司','img/product_details/clogo/logo2.png','小米生态链企业-睿米科技，吸纳创新的理念与先进的技术，将移动互联网与汽车电子产品深度融合，以注重用户体验为基础进行创新产品的开发，为用户创造新鲜有趣的高品质车载智能产品。我们将对品质的热忱与新事物的好奇心融入到我们的产品与事业，激发每个人在创新科技中的灵感，希望为广大汽车用户提供更高品质和更具设计美感的车载智能产品，让驾驶变得更舒适、更有乐趣。','米家'),
(3,'爱保护科技','img/product_details/clogo/logo3.png','深圳市爱保护科技有限公司是一家集设计、生产、硬件、结构、APP为一体的创新型科技，公司拥有一批高素质、经验丰富、勇于开拓的高技术专业人才，具有组织良好的软件研发团队，并建立了规范的软件研发流程管理和配置管理，以先进的技术创一流的产品，以科学的管理创一流的效益。','SAM-COACH'),
(4,'福州富应成智能科技','img/product_details/clogo/logo4.png','福州富应成智能科技有限公司是以青少年儿童健康成长为核心，创建智能化学习成长环境为目的，自主研发帮助青少年儿童书写习惯养成、促进青少年儿童生理心理健康成长的智能化产品的创新型科技企业。','唯赐宝'),
(5,'珠海市源声电子有限公司','img/product_details/clogo/logo5.jpeg','珠海市源声电子有限公司成立于2012年，是一家专注耕耘于声学领域，同时具备研发、生产、营销于一体的声学公司。多年来在国际耳机品牌的ODM市场所积累强大的声学智慧、专利研发、产制经验，无论在收音，发声硬件及设备的研究与开发皆为业界翘楚，运营团队洞悉国际高端耳机音质，质量产制要求，亦具备厚实的研发经验。 MUKO是源声旗下品牌，以追求卓越音质的实践，改善声音的音质本体，到结合人体工学进行改良设计，并已获得多项专利。凭借热诚与专业持续精进的研发，投入品牌运营誓中国耳机品牌提升至国际水平。让用户可以通过MUKO的产品获得全新的体验，从“听我想听”出发，找到“想听就听”的产品，进而进阶到到“享听究听”的境界。','MUKO'),
(6,'深圳市幻实科技有限公司','img/product_details/clogo/logo6.jpeg','深圳市幻实科技有限公司是一家为企业和消费者提供增强现实AR解决方案的高科技公司，主要致力于AR技术的研究和应用。公司的增强现实AR产品和项目涉及玩具、教育、影视娱乐、广告传媒、婚纱摄影、服装、金融、旅游、展览等行业。','幻实科技'),
(7,'小米科技','img/product_details/clogo/logo7.jpeg','北京小米科技有限责任公司成立2010年4月，是一家专注于智能产品自主研发的移动互联网公司。\"为发烧而生\"是小米的产品概念。小米公司首创了用互联网模式开发手机操作系统、发烧友参与开发改进的模式。','小米'),
(8,'豹骑运动科技','img/product_details/clogo/logo8.jpeg','深圳市豹骑运动科技有限司是一家专注于智能运动设备的移动互联网公司,\"为运动而生\"是豹骑的产品理念.我们倡导\"运动+互动\"的体验模式,与豹粉共同参与产品开发与改进,通过联网思维建立健康生态系统,共同形成一个开放自由的社交平台。','豹骑'),
(9,'傅里叶科技有限公司','img/product_details/clogo/logo9.png','RunRunFast燃速智能健身车团队，用物联网思维，打造最有好玩的健身车。燃速始于一个技术宅解决健身惰性的念头，践行着把想法变成现实的创客精神，从众筹到发行，一路成长。以玩的理念，改变世界。我们玩世不恭，我们天马行空。时代在变，要玩，就玩到极致。','燃速(runrunfast)'),
(10,'上海锐拍智能科技有限公司','img/product_details/clogo/logo10.png','上海锐拍智能科技有限公司成立于2016年元月，公司主要着力于电子消费级智能产品的设计和开发。锐拍智能将给全球智能产品行业带来各类新奇、智能和低价位的高质量产品。我们相信通过公司不懈的努力，将会创造更多的最前沿智能消费级产品奉献给全球用户。','锐拍'),
(11,'三个爸爸','img/product_details/clogo/logo11.jpeg','极客新蜜蜂智能环境科技（北京）有限公司 (品牌\"三个爸爸\")，专注于制造和销售家庭环境与孩子健康成长相关的智能硬件。','三个爸爸'),
(12,'雄迈信息','img/product_details/clogo/logo12.jpeg','杭州雄迈信息技术有限公司，全球领先的安防视频产品和技术提供商。2014年，进军以家庭为核心的消费类市场，依托自主研发的视频、音频、智能分析等核心技术，为用户提供家庭摄像机、运动摄像机、行车记录仪、智能插座、智能灯光、智能盒子等互联网产品，致力于打造“未来家庭”智慧生活方式。我们希望用科技的力量，让每一个人、每一个家庭都能享受到便捷有趣、安全舒适、充满关爱的智能生活。','雄迈信息技术有限公司');


INSERT INTO products VALUES
(1,'智能云贴疼痛舒缓仪','医疗健康','399.00',2,1,3,1,'1513468800000','img/products/p1c1.png','img/product_details/parameter/p110.jpg',1,1,0),
(2,'米家车载空气净化器','智能配件','449.00',1,0,1,2,'1511222400000','img/products/p2c1.png',null,0,0,0),
(3,'SMA-COACH心率手环','智能穿戴','199.00',0,0,0,3,'1510876800000','img/products/p3c1.png',null,4,0,0),
(4,'唯赐宝学习智能笔','教育科技','398.00',0,0,0,4,'1511222400000','img/products/p4c1.png','img/product_details/parameter/p415.jpg',0,0,0),
(5,'MUKO耳机 LB660','娱乐休闲','299.00',0,0,0,5,'1511222400000','img/products/p5c1.png','img/product_details/parameter/p510.jpg',0,0,0),
(6,'AR极限魔方','娱乐休闲','58.00',0,0,0,6,'1510876800000','img/products/p6c1.png',null,3,1,0),
(7,'小米无人机1080p 版','娱乐休闲','2499.00',0,0,0,7,'1511222400000','img/products/p7c1.png',null,0,0,0),
(8,'豹骑健身跑车','运动健身','989.00',0,0,0,8,'1511222400000','img/products/p8c1.png',null,0,0,0),
(9,'燃速智能健身车','休闲娱乐','999.00',1,0,0,9,'1511222400000','img/products/p9c1.png',null,0,0,0),
(10,'X-CAM锐拍两轴手持稳定器','出行户外','299.00',0,0,0,10,'1511222400000','img/products/p10c1.png','img/product_details/parameter/p1011.jpg',0,0,0),
(11,'三个爸爸PM2.5空气检测仪','环境控制','159.00',0,0,0,11,'1511222400000','img/products/p11c1.png','img/product_details/parameter/p11-15.jpg',0,0,0),
(12,'雄迈智能云台摄像机','智能家居','198.00',0,0,0,11,'1511202400000','img/index/trail2.png','img/product_details/parameter/p12-20.jpg',2,0,0);


INSERT INTO category_according VALUES
(1, '适用人群'),
(2, '场景应用'),
(3, '健康监测'),
(4, '智能家居'),
(5, '休闲娱乐'),
(6, '运动健身'),
(7, '教育科技'),
(8, '智能穿戴');

INSERT INTO category VALUES
(101, '儿童',1),
(102, '青少年',1),
(103, '婴幼儿',1),
(104, '女性',1),
(105, '全部',1),
(200, '户外',2),
(201, '医疗器械',2),
(202, '娱乐影音',2),
(203, '智能出行',2),
(300,'睡眠监测',3),
(301,'皮肤监测',3),
(302,'智能秤',3),
(303,'心脑血管监测',3),
(304,'体质分析',3),
(305,'消毒检测',3),
(306,'空气检测',3),
(400,'插座',4),
(401,'机器人',4),
(402,'路由器',4),
(403,'智能灯',4),
(404,'其他',4),
(500,'耳机音响',5),
(501,'拍照设备',5),
(502,'情趣用品',5),
(503,'无人机',5),
(504,'键盘',5),
(505,'数据线',5),
(506,'充电器',5),
(600,'健身车',6),
(601,'握力器',6),
(700,'智能笔',7),
(701,'指尖传感器',7),
(800,'智能手表',8),
(801,'指尖耳机',8);


INSERT INTO product_category VALUES
(1,1,104),
(2,1,201),
(3,2,200),
(4,3,303),
(5,4,101),
(6,5,500), 
(7,6,104),
(8,7,503),
(9,8,600),
(10,9,600),
(11,10,700),
(12,11,306),
(13,11,404);







INSERT INTO product_intro VALUES
(1,1,'img/product_details/introduce/p11.jpg'),
(2,1,'img/product_details/introduce/p12.jpg'),
(3,1,'img/product_details/introduce/p13.jpg'),
(4,1,'img/product_details/introduce/p14.jpg'),
(5,1,'img/product_details/introduce/p15.jpg'),
(6,1,'img/product_details/introduce/p16.jpg'),
(7,1,'img/product_details/introduce/p17.jpg'),
(8,1,'img/product_details/introduce/p18.jpg'),
(9,1,'img/product_details/introduce/p19.jpg'),
(10,1,'img/product_details/introduce/p110.jpg'),
(11,2,'img/product_details/introduce/p21.jpg'),
(12,2,'img/product_details/introduce/p22.jpg'),
(13,2,'img/product_details/introduce/p24.jpg'),
(14,2,'img/product_details/introduce/p25.jpg'),
(15,2,'img/product_details/introduce/p26.jpg'),
(16,2,'img/product_details/introduce/p27.jpg'),
(17,2,'img/product_details/introduce/p28.jpg'),
(18,2,'img/product_details/introduce/p29.jpg'),
(19,2,'img/product_details/introduce/p210.jpg'),
(20,2,'img/product_details/introduce/p211.jpg'),
(21,2,'img/product_details/introduce/p212.jpg'),
(22,2,'img/product_details/introduce/p213.jpg'),
(23,2,'img/product_details/introduce/p214.jpg'),
(24,2,'img/product_details/introduce/p215.jpg'),
(25,3,'img/product_details/introduce/p31.png'),
(26,3,'img/product_details/introduce/p32.png'),
(27,3,'img/product_details/introduce/p33.git'),
(28,3,'img/product_details/introduce/p34.git'),
(29,3,'img/product_details/introduce/p35.png'),
(30,3,'img/product_details/introduce/p36.png'),
(31,3,'img/product_details/introduce/p37.png'),
(32,4,'img/product_details/introduce/p41.jpg'),
(33,4,'img/product_details/introduce/p42.git'),
(34,4,'img/product_details/introduce/p43.git'),
(35,4,'img/product_details/introduce/p44.git'),
(36,4,'img/product_details/introduce/p45.git'),
(37,4,'img/product_details/introduce/p46.git'),
(38,4,'img/product_details/introduce/p47.jpg'),
(39,4,'img/product_details/introduce/p48.jpg'),
(40,4,'img/product_details/introduce/p49.jpg'),
(41,4,'img/product_details/introduce/p410.jpg'),
(42,4,'img/product_details/introduce/p411.jpg'),
(43,4,'img/product_details/introduce/p412.jpg'),
(44,4,'img/product_details/introduce/p413.jpg'),
(45,4,'img/product_details/introduce/p414.jpg'),
(46,4,'img/product_details/introduce/p415.jpg'),
(47,4,'img/product_details/introduce/p416.jpg'),
(48,5,'img/product_details/introduce/p51.jpg'),
(49,5,'img/product_details/introduce/p52.jpg'),
(50,5,'img/product_details/introduce/p53.jpg'),
(51,5,'img/product_details/introduce/p54.jpg'),
(52,5,'img/product_details/introduce/p55.jpg'),
(53,5,'img/product_details/introduce/p56.jpg'),
(54,5,'img/product_details/introduce/p57.jpg'),
(55,5,'img/product_details/introduce/p58.jpg'),
(56,5,'img/product_details/introduce/p59.jpg'),
(57,5,'img/product_details/introduce/p510.jpg'),
(58,6,'img/product_details/introduce/p61.jpg'),
(59,6,'img/product_details/introduce/p62.jpg'),
(60,6,'img/product_details/introduce/p63.jpg'),
(61,6,'img/product_details/introduce/p64.jpg'),
(62,6,'img/product_details/introduce/p65.jpg'),
(63,7,'img/product_details/introduce/p71.png'),
(64,7,'img/product_details/introduce/p72.png'),
(65,7,'img/product_details/introduce/p73.png'),
(66,7,'img/product_details/introduce/p74.png'),
(67,7,'img/product_details/introduce/p75.png'),
(68,7,'img/product_details/introduce/p76.png'),
(69,7,'img/product_details/introduce/p77.png'),
(70,7,'img/product_details/introduce/p78.png'),
(71,7,'img/product_details/introduce/p79.png'),
(72,7,'img/product_details/introduce/p710.png'),
(73,7,'img/product_details/introduce/p711.png'),
(74,7,'img/product_details/introduce/p712.png'),
(75,7,'img/product_details/introduce/p713.png'),
(76,7,'img/product_details/introduce/p714.png'),
(77,7,'img/product_details/introduce/p715.png'),
(78,7,'img/product_details/introduce/p716.png'),
(79,7,'img/product_details/introduce/p717.png'),
(80,8,'img/product_details/introduce/p81.jpg'),
(81,8,'img/product_details/introduce/p82.jpg'),
(82,8,'img/product_details/introduce/p83.jpg'),
(83,8,'img/product_details/introduce/p84.jpg'),
(84,8,'img/product_details/introduce/p85.jpg'),
(85,8,'img/product_details/introduce/p86.jpg'),
(86,8,'img/product_details/introduce/p87.jpg'),
(87,8,'img/product_details/introduce/p88.jpg'),
(88,9,'img/product_details/introduce/p91.png'),
(89,9,'img/product_details/introduce/p92.png'),
(90,9,'img/product_details/introduce/p93.png'),
(91,9,'img/product_details/introduce/p94.git'),
(92,9,'img/product_details/introduce/p95.png'),
(93,9,'img/product_details/introduce/p96.png'),
(94,10,'img/product_details/introduce/p101.jpg'),
(95,10,'img/product_details/introduce/p102.jpg'),
(96,10,'img/product_details/introduce/p103.jpg'),
(97,10,'img/product_details/introduce/p104.jpg'),
(98,10,'img/product_details/introduce/p105.jpg'),
(99,10,'img/product_details/introduce/p106.jpg'),
(100,10,'img/product_details/introduce/p107.jpg'),
(101,10,'img/product_details/introduce/p108.jpg'),
(102,10,'img/product_details/introduce/p109.jpg'),
(103,10,'img/product_details/introduce/p1010.jpg'),
(104,10,'img/product_details/introduce/p1011.jpg'),
(105,10,'img/product_details/introduce/p1012.jpg'),
(106,11,'img/product_details/introduce/p11-1.jpg'),
(107,11,'img/product_details/introduce/p11-2.jpg'),
(108,11,'img/product_details/introduce/p11-3.jpg'),
(109,11,'img/product_details/introduce/p11-4.jpg'),
(110,11,'img/product_details/introduce/p11-5.jpg'),
(111,11,'img/product_details/introduce/p11-6.jpg'),
(112,11,'img/product_details/introduce/p11-7.jpg'),
(113,11,'img/product_details/introduce/p11-8.jpg'),
(114,11,'img/product_details/introduce/p11-9.jpg'),
(115,11,'img/product_details/introduce/p11-10.jpg'),
(116,11,'img/product_details/introduce/p11-11.jpg'),
(117,11,'img/product_details/introduce/p11-12.jpg'),
(118,11,'img/product_details/introduce/p11-13.jpg'),
(119,11,'img/product_details/introduce/p11-14.jpg'),
(120,11,'img/product_details/introduce/p11-15.jpg');




INSERT INTO product_img VALUES
(1,1,'img/product_details/sm/sm11.png','img/product_details/md/md11.png','img/product_details/lg/lg11.png'),
(2,1,'img/product_details/sm/sm12.png','img/product_details/md/md12.png','img/product_details/lg/lg12.png'),
(3,1,'img/product_details/sm/sm13.png','img/product_details/md/md13.png','img/product_details/lg/lg13.png'),
(4,1,'img/product_details/sm/sm14.png','img/product_details/md/md14.png','img/product_details/lg/lg14.png'),
(5,1,'img/product_details/sm/sm15.png','img/product_details/md/md15.png','img/product_details/lg/lg15.png'),
(6,2,'img/product_details/sm/sm21.png','img/product_details/md/md21.png','img/product_details/lg/lg21.png'),
(7,2,'img/product_details/sm/sm22.png','img/product_details/md/md22.png','img/product_details/lg/lg22.png'),
(8,2,'img/product_details/sm/sm23.png','img/product_details/md/md23.png','img/product_details/lg/lg23.png'),
(9,2,'img/product_details/sm/sm24.png','img/product_details/md/md24.png','img/product_details/lg/lg24.png'),
(10,2,'img/product_details/sm/sm25.png','img/product_details/md/md25.png','img/product_details/lg/lg25.png'),
(11,3,'img/product_details/sm/sm31.png','img/product_details/md/md31.png','img/product_details/lg/lg31.png'),
(12,4,'img/product_details/sm/sm41.png','img/product_details/md/md41.png','img/product_details/lg/lg41.png'),
(13,4,'img/product_details/sm/sm42.png','img/product_details/md/md42.png','img/product_details/lg/lg42.png'),
(14,4,'img/product_details/sm/sm43.png','img/product_details/md/md43.png','img/product_details/lg/lg43.png'),
(15,4,'img/product_details/sm/sm44.png','img/product_details/md/md44.png','img/product_details/lg/lg44.png'),
(16,5,'img/product_details/sm/sm51.png','img/product_details/md/md51.png','img/product_details/lg/lg51.png'),
(17,5,'img/product_details/sm/sm52.png','img/product_details/md/md52.png','img/product_details/lg/lg52.png'),
(18,5,'img/product_details/sm/sm53.png','img/product_details/md/md53.png','img/product_details/lg/lg53.png'),
(19,6,'img/product_details/sm/sm61.png','img/product_details/md/md61.png','img/product_details/lg/lg61.png'),
(20,6,'img/product_details/sm/sm62.png','img/product_details/md/md62.png','img/product_details/lg/lg62.png'),
(21,6,'img/product_details/sm/sm63.png','img/product_details/md/md63.png','img/product_details/lg/lg63.png'),
(22,6,'img/product_details/sm/sm64.png','img/product_details/md/md64.png','img/product_details/lg/lg64.png'),
(23,6,'img/product_details/sm/sm65.png','img/product_details/md/md65.png','img/product_details/lg/lg65.png'),
(24,7,'img/product_details/sm/sm71.png','img/product_details/md/md71.png','img/product_details/lg/lg71.png'),
(25,7,'img/product_details/sm/sm72.png','img/product_details/md/md72.png','img/product_details/lg/lg72.png'),
(26,8,'img/product_details/sm/sm81.png','img/product_details/md/md81.png','img/product_details/lg/lg81.png'),
(27,8,'img/product_details/sm/sm82.png','img/product_details/md/md82.png','img/product_details/lg/lg82.png'),
(28,9,'img/product_details/sm/sm91.png','img/product_details/md/md91.png','img/product_details/lg/lg91.png'),
(29,9,'img/product_details/sm/sm92.png','img/product_details/md/md92.png','img/product_details/lg/lg92.png'),
(30,9,'img/product_details/sm/sm93.png','img/product_details/md/md93.png','img/product_details/lg/lg93.png'),
(31,9,'img/product_details/sm/sm94.png','img/product_details/md/md94.png','img/product_details/lg/lg94.png'),
(32,10,'img/product_details/sm/sm101.png','img/product_details/md/md101.png','img/product_details/lg/lg101.png'),
(33,10,'img/product_details/sm/sm102.jpg','img/product_details/md/md102.jpg','img/product_details/lg/lg102.jpg'),
(34,11,'img/product_details/sm/sm11-1.png','img/product_details/md/md11-1.png','img/product_details/lg/lg11-1.png'),
(35,11,'img/product_details/sm/sm11-2.png','img/product_details/md/md11-2.png','img/product_details/lg/lg11-2.png'),
(36,11,'img/product_details/sm/sm11-3.png','img/product_details/md/md11-3.png','img/product_details/lg/lg11-3.png'),
(37,11,'img/product_details/sm/sm11-4.png','img/product_details/md/md11-4.png','img/product_details/lg/lg11-4.png');






INSERT INTO users VALUES
(1,'Godlove文章',123456,'godlov@126.com','img/avatar/a1.png',0),
(2,'james',123456,'james@126.com','img/avatar/a1.png',0),
(3,'toms',123456,'toms@126.com','img/avatar/a1.png',0),
(4,'susan',123456,'susan@126.com','img/avatar/a1.png',0),
(5,'ping',123456,'ping@126.com','img/avatar/a1.png',0),
(6,'dave',123456,'dave@126.com','img/avatar/a1.png',0),
(7,'wangxiaohong',123456,'wxh@126.com','img/avatar/a1.png',0),
(8,'guys',123456,'guys@126.com','img/avatar/a1.png',0),
(9,'wenzhang',123456,'wenzhang@126.com','img/avatar/a1.png',0),
(10,'meiemi',123456,'meimei@126.com','img/avatar/a1.png',0),
(11,'tods',123456,'tods@126.com','img/avatar/a1.png',0);

INSERT INTO apply_trail VALUES
(1,1,1,0),
(2,2,1,0),
(3,3,1,0),
(4,4,1,0),
(5,5,1,0),
(6,6,1,0),
(7,7,1,0),
(8,8,1,0),
(9,9,1,0),
(10,10,1,0),
(11,1,2,0),
(12,6,2,0);

INSERT INTO trail_reports VALUES
(1,1,1,'report1.html',1510272000000,'img/trails/report11.jpeg','智能云贴疼痛舒缓仪——膏药也可以很智能',0,0,1,0),
(2,1,2,'report1.html',1510272000000,'img/trails/report12.jpeg','随身的小按摩师——智能云贴疼痛舒缓仪',0,0,2,0),
(3,2,3,'report2.html',1510272000000,'img/trails/report21.jpeg','羽泉倾情代言的米家车载空气净化器到底怎么样？',0,0,3,0),
(4,2,4,'report2.html',1510272000000,'img/trails/report22.jpeg','清新车途——米家车载净化器初体验',0,0,0,0),
(5,2,2,'report2.html',1510272000000,'img/trails/report23.jpeg','有了它 驾车出行 再也不怕雾霾了—米家车载净化器初体验',0,0,0,0),
(6,2,2,'report2.html',1510272000000,'img/trails/report24.jpeg','车里能有好空气，米家车载空气净化器体验！',0,0,0,0),
(7,2,2,'report2.html',1510272000000,'img/trails/report25.jpeg','小身材，大效能——小米车载空气净化器',1,1,0,0),
(10,5,5,'report5.html',1510272000000,'img/trails/report51.jpeg','耳朵上的钻石——MUKO耳机 LB660评测',0,0,0,0),
(11,5,5,'report5.html',1510272000000,'img/trails/report52.jpeg','人间能有几回闻--MUKO耳机LB660',0,0,0,0),
(12,5,5,'report5.html',1510272000000,'img/trails/report53.jpeg','品质音乐的高传递者',0,0,0,0),
(13,5,5,'report5.html',1510272000000,'img/trails/report54.jpeg','要春风十里，更要MUKO相伴——MUKO耳机 LB660评测',0,2,0,0),
(14,5,5,'report5.html',1510272000000,'img/trails/report55.jpeg','颜值与实力共存--MUKO LB660耳机',0,0,0,0),
(15,5,5,'report5.html',1510272000000,'img/trails/report56.jpeg','青春时尚，小女生的情怀----MUKO LB660耳机评测',0,0,0,0),
(16,5,5,'report5.html',1510272000000,'img/trails/report57.jpeg','让妹子带上更漂亮的耳机-MUKO LB660',0,0,0,0),
(17,5,5,'report5.html',1510272000000,'img/trails/report58.jpeg','一款懂得骚浪贱的耳机——MUKO耳机 LB660评测',1,1,0,0),
(18,5,5,'report5.html',1510272000000,'img/trails/report59.jpeg','让你畅享音乐的小精灵--MUKO耳机LB660',0,0,0,0),
(19,5,5,'report5.html',1510272000000,'img/trails/report510.jpeg','时尚小巧女性专属，MUKO LB660耳机体验',0,1,0,0),
(23,9,9,'report9.html',1510272000000,'img/trails/report91.jpeg','大学宿舍健身神器——燃速智能健身车体验',0,0,0,0),
(24,9,9,'report9.html',1510272000000,'img/trails/report592.jpeg','追剧健身两不误—RunRunFast燃速智能健身车体验',0,0,0,0);




INSERT INTO product_score VALUES
(1,1,1,3,2,3,1),
(2,2,2,3,3,3,1),
(3,3,3,3,3,3,1),
(4,4,4,3,3,3,1),
(5,5,5,3,3,3,1),
(6,6,6,3,3,3,1),
(7,7,7,3,3,3,1),
(8,8,8,3,3,3,1),
(9,9,9,3,3,3,1),
(10,10,10,3,3,3,1);

INSERT INTO cart VALUES
(1,1,1,2,0),
(2,1,6,1,0);


INSERT INTO receiver_address VALUES
(1,1,'张三','深圳宝安区南山科技园','13567958541',1,0),
(2,2,'张三','深圳宝安区南山科技园','13567958541',1,0),
(3,3,'张三','深圳宝安区南山科技园','13567958541',1,0),
(4,4,'张三','深圳宝安区南山科技园','13567958541',1,0),
(5,5,'张三','深圳宝安区南山科技园','13567958541',1,0),
(6,6,'张三','深圳宝安区南山科技园','13567958541',1,0),
(7,7,'张三','深圳宝安区南山科技园','13567958541',1,0),
(8,8,'张三','深圳宝安区南山科技园','13567958541',1,0),
(9,9,'张三','深圳宝安区南山科技园','13567958541',1,0),
(10,10,'张三','深圳宝安区南山科技园','13567958541',1,0),
(11,11,'张三','深圳宝安区南山科技园','13567958541',1,0),
(12,2,'张三','深圳宝安区南山科技园','13567958541',0,0),
(13,2,'张三','深圳宝安区南山科技园','13567958541',0,0);

INSERT INTO orders VALUES
(1,1,1,4,1509840000000,1509840000000,1509940000000,1510099200000,1,0),
(2,2,2,4,1509840000000,1509840000000,1509940000000,1510099200000,1,0),
(3,3,3,4,1509840000000,1509840000000,1509940000000,1510099200000,1,0),
(4,4,4,4,1509840000000,1509840000000,1509940000000,1510099200000,1,0),
(5,5,5,4,1509840000000,1509840000000,1509940000000,1510099200000,1,0),
(6,6,6,4,1509840000000,1509840000000,1509940000000,1510099200000,1,0),
(7,7,7,4,1509840000000,1509840000000,1509940000000,1510099200000,1,0),
(8,8,8,4,1509840000000,1509840000000,1509940000000,1510099200000,1,0),
(9,9,9,4,1509840000000,1509840000000,1509940000000,1510099200000,1,0),
(10,10,10,4,1509840000000,1509840000000,1509940000000,1510099200000,1,0),
(11,11,11,4,1509840000000,1509840000000,1509940000000,1510099200000,1,0);


INSERT INTO order_details VALUES
(1,1,1,1),
(2,2,2,2),
(3,3,3,3),
(4,4,4,4),
(5,5,5,5),
(6,6,6,6),
(7,7,7,7),
(8,8,8,8),
(9,9,9,9),
(10,10,10,10),
(11,11,11,11);

INSERT INTO news VALUES
(1,'除了好看，百度的首款智能音箱背后还有什么秘密？','作为百度的首款智能音箱，究竟有什么惊艳的地方？',null,' 极客公园',null,1509940000000,'img/news/new1.jpg',null,1),
(2,'人工智能助力智慧建筑，第18届中国国际建筑智能化峰会(武汉站)成功举办！','2017年第十八届中国国际建筑智能化峰会武汉站的活动，于今天（11月15日）下午在武汉香格里拉大酒店隆重举行……',null,' 千家智客',null,1509940000000,'img/news/new2.jpg',null,2),
(3,'无人机管理列入立法计划 年底或出台','《全国无人机政策分析报告》发布，最高频词为“安全”',null,' 南都',null,1509940000000,'img/news/new3.jpg',null,3),
(4,'英特尔和李宇春做了一次尝试，用人工智能技术拍摄MV','李宇春的最新MV将电子曲风的浪漫情歌与尖端科技的人工智能完美融合，赋予了音乐与科技更多的可能。',null,' 钛媒体',null,1509940000000,'img/news/new4.gif',null,4),
(5,'可以戴在手上的“充电宝”','如果能量密度够高的话，将会有更大的实用性',null,' 36氪',null,1509940000000,'img/news/new5.png',null,0),
(6,'Nissin智能消音叉 让你优雅“吸”面','为了不影响同桌的食客吃饭，同时也不耽误自己吸溜面条，日本的一家食品公司最近计划生产一款高科技智能消音叉，这个长得像电动牙刷的饭叉可以用别的声音掩盖吸溜面条的声音。',null,' 36氪',null,1509940000000,'img/news/new6.png',null,0),
(7,'真实版魔镜，照一照给皮肤状况打分','HiMirror Plus 不仅可以根据皮肤状况打分，而且还堪比美颜神器。',null,' cnBeta.COM',null,1509940000000,'img/news/new7.jpg',null,0),
(8,'防止疲劳驾驶，福特开发防瞌睡帽子','在长时间的驾驶过程中入睡是一种偶尔的、但是往往也是致命的情况，为此福特公司开发了 SafeCap 。',null,' Techweb',null,1509940000000,'img/news/new8.jpg',null,0),
(9,'这个神器能让秀恩爱的情侣原地消失！','简直就是现实版神笔马良……',null,' 黑口袋',null,1509940000000,'img/news/new9.jpg',null,0),
(10,'黑科技喷雾！一喷就能让鞋子防水抗污','刚买的小白鞋被狠狠踩了一脚，瞬间黑掉的心情，我是绝对不想经历了……',null,' 每日好物推送',null,1509940000000,'img/news/new10.gif',null,0),
(11,'“治愈系”智能发热衣','冬天太冷，不想穿太厚的衣服，出行也不想带太多的衣服，却想暖洋洋一整天，与其多穿一件棉衣或毛衣，不如来一件创新科技结合的发热衣。',null,' 网络',null,1509940000000,'img/news/new11.jpg',null,0),
(12,'这是全世界最强的万能胶，没有之一','大家好~，今天我们来说一样常见的东西—— 胶带',null,' 网络',null,1509940000000,'img/news/new12.jpg',null,0),
(13,'私人按摩师：智能无线颈椎通络仪','伴随着时间不断地向前奔跑，长期用电脑、长期开车、玩手机，我们的颈椎承受着比以往更大的压力。智能无线颈椎通络仪作为你的私人按摩师应运而生。',null,' 网络',null,1509940000000,'img/news/new13.jpg',null,0),
(14,'鲸锐智能磁控划船机','鲸锐智能磁控划船机首轮上线以来，经过将近一个月的时间，就已突破3100000元，众筹完成度3100%，该项目成功刷新了磁阻划船机众筹史上记录。　　到底是什么样的磁阻划船机，一经上线...',null,' 在线投稿',null,1509940000000,'img/news/new14.png',null,0),
(15,'Moona智能枕头：远离失眠困扰','现代都市人压力大，睡眠质量渐渐下降，所以一晚优质的睡眠成为众多小白领的梦想！',null,' 网络',null,1509940000000,'img/news/new15.gif',null,0),
(16,'Teamosa智能茶具 ，一键泡茶','要想泡杯好的功夫茶，哪用那么多功夫！',null,' 戴客网',null,1509940000000,'img/news/new16.jpg',null,0);

INSERT INTO carousel VALUES
(1,'【智客号】智能化行业自媒体+优质原创分享平台','new_details.html?nid=1','img/index/carousel11.jpg',1),
(2,'首届\"千家杯\"有奖征文大赛正式启动','new_details.html?nid=2','img/index/carousel12.jpg',2),
(3,'Moona智能枕头：远离失眠困扰','new_details.html?nid=3','img/index/carousel13.jpg',3),
(4,'黑科技渗入日常：未来我们可能只需要亲自吃饭睡觉……','new_details.html?nid=4','img/index/carousel21.jpg',4),
(5,'【视频】失重条件下的无人机居然是个球','new_details.html?nid=5','img/index/carousel22.jpg',5),
(6,'直击世界机器人大会上那些炫科技！','new_details.html?nid=6','img/index/carousel23.jpg',6),
(7,'【焦点】第十八届中国国际建筑智能化峰会（成都站）成功举办！','new_details.html?nid=7','img/index/carousel31.jpg',7),
(8,'【免费试用】雄迈智能云台摄像机','new_details.html?nid=8','img/index/carousel32.jpg',8),
(9,'全新千家智客APP正式上线！','new_details.html?nid=9','img/index/carousel33.jpg',9);
