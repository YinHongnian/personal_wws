<?php
require_once("../../init.php");
//注册函数
function register(){
    global $conn;
	//1.获取uname,upwd和email的值
    @$uname=$_REQUEST["uname"];
    @$upwd=$_REQUEST["upwd"];
    @$email=$_REQUEST["email"];
	//如果uname,upwd和email不为空
    if($uname&&$upwd&&$email){
		//插入数据进users表中
        $sql="insert into users (uid,uname,upwd,email) values (null,'$uname','$upwd','$email')";
		//执行sql语句
        mysqli_query($conn,$sql);
    }
}
//register();

//检查用户名是否可用
function checkName(){
	global $conn;
	//获得用户名
	@$uname=$_REQUEST["uname"];
	//如果用户名不为空
	if($uname){
		//查找为该用户名的行
		$sql="select * from users where uname='$uname'";
		$result=mysqli_query($conn,$sql);
		$users=mysqli_fetch_all($result,1);
		//如果$users不为空数组
		if(count($users)!=0)
			return false;//用户名已存在,不能使用
		else
			return true;//用户名可用
	}
}

//登录函数
function login(){
	global $conn;
		session_start();
	//获取uname和upwd的值
	@$uname=$_REQUEST["uname"];
	@$upwd=$_REQUEST["upwd"];
	@$yzm = $_REQUEST["yzm"];
	if($yzm!=""){

		@$code = $_SESSION["code"];
		 if($code!=$yzm){
		   echo '{"ok":-1}';
		   exit;
		 }
	}
	//如果用户名和密码不为空
	if($uname!==""&&$upwd!==""){
		//定义sql查询语句
		$sql="select * from users where uname='$uname' and binary upwd='$upwd'";
		$result=mysqli_query($conn,$sql);
		//获取查询结果
		$user=mysqli_fetch_all($result,1);
		//如果结果不为空
		if(count($user)!=0){
			//打开session
			//将user中第一个对象的uid保存至session的uid中
			$_SESSION["uid"]=$user[0]["uid"];
			//返回登录成功
			echo  '{"ok":1}';
		}else
			//否则登录失败
			echo '{"ok":-2}';
	}
}
//login();
//注销
function logout(){
	//打开session
	session_start();
	//清空session中保存的uid的值
	$_SESSION["uid"]=null;
}
//logout();
//判断是否登录
function isLogin(){
	//引入全局变量$conn
	global $conn;
	//打开session
	session_start();
	//获得session中保存的uid的值,保存至$uid中
	@$uid=$_SESSION["uid"];
	//如果uid有值
	if($uid){
		//定义查询sql语句
		$sql="select uname from users where uid='$uid'";
		//执行sql获得查询结果
		$result=mysqli_query($conn,$sql);
		//保存结果值至$user中
		$user=mysqli_fetch_all($result,1);
		//返回uname
		return ["ok"=>1,"uname"=>$user[0]["uname"]]; //登录成功
	}else//否则
		//返回["ok"=>0];
		return ["ok"=>0];
}

//提交产品分数表
function addToProductScore(){
	global $conn;
	session_start();
	$uid=$_SESSION["uid"];
	$pid=$_REQUEST["pid"];
	$design=(int)$_REQUEST["design"];
	$performance=(int)$_REQUEST["performance"];
	$comprehensive=(int)$_REQUEST["comprehensive"];
	$isRecommend=(int)$_REQUEST["isRecommend"];
	if($uid){
		$sql="SELECT * FROM product_score WHERE uid=$uid AND pid=$pid";
		$result=mysqli_query($conn,$sql);
		$row=mysqli_fetch_assoc($result);
		if($row){
			echo '{"ok":-1}';
		}else{
			$sql="INSERT INTO product_score VALUES(null,$pid,$uid,$design,$performance,$comprehensive,$isRecommend)";
			mysqli_query($conn,$sql);
			echo  '{"ok":1}';
		}
	}
}
//addToProductScore();

function getAddress(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	$sql="SELECT aid,address FROM receiver_address WHERE uid=$uid";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}
//getAddress();