<?php
require_once("../../init.php");

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
		$sql="select * from t_user where uname='$uname' and upwd=md5('$upwd')";
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
		$sql="select uname from t_user where uid='$uid'";
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

