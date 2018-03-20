<?php
require_once("../../init.php");
/*加入购物车*/
function addToCart(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	@$pid=$_REQUEST["pid"];
	@$count=(int)$_REQUEST["count"];
	//查询该用户该产品的记录
	$sql="SELECT * FROM cart WHERE uid=$uid AND pid=$pid";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_assoc($result);
	if($row){
		$count+=$row["count"];
		$sql="UPDATE cart SET count=$count WHERE uid=$uid AND pid=$pid";
	}else
		//如果数据库没有改用户的该产品的记录
		$sql="INSERT INTO cart VALUES(null,$uid,$pid,$count,0)";
	mysqli_query($conn,$sql);
}
//addToCart();

function getCart(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	$sql="SELECT c.pid,c.count,c.is_checked,p.title,p.price,p.banner FROM cart c,products p WHERE c.uid=$uid AND c.pid=p.pid";
	$result=mysqli_query($conn,$sql);
	$rows=mysqli_fetch_all($result,1);
	echo json_encode(	$rows);
}
//getCart();

function delCart(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	@$pid=$_REQUEST["pid"];
	$sql="DELETE  FROM cart WHERE uid=$uid AND pid=$pid";
	mysqli_query($conn,$sql);
}
//delCart();

function updateCart(){
	global $conn;
	session_start();
	@$uid=$_SESSION["uid"];
	@$pid=$_REQUEST["pid"];
	@$count=$_REQUEST["count"];
	if($count==0){
		$sql="DELETE  FROM cart WHERE uid=$uid AND pid=$pid";
	}else{
		$sql="UPDATE cart SET count=$count WHERE uid=$uid AND pid=$pid";
	}
	mysqli_query($conn,$sql);
}
//updateCart();

function selectAll(){
	global $conn;
	@$chkAll=$_REQUEST["chkAll"];
	session_start();
	@$uid=$_SESSION["uid"];
	$sql="UPDATE cart SET is_checked=$chkAll WHERE uid=$uid";
	mysqli_query($conn,$sql);
}
function selectOne(){
	global $conn;
	@$chkOne=$_REQUEST["chkOne"];
	@$pid=$_REQUEST["pid"];
	session_start();
	@$uid=$_SESSION["uid"];
	$sql="UPDATE cart SET is_checked=$chkOne WHERE uid=$uid AND pid=$pid";
	mysqli_query($conn,$sql);
}
