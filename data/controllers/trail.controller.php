<?php
require_once("../../init.php");
/********主页试用报告************* */
function getTrailReport(){
	global $conn;
	$sql="SELECT r.rid, r.pid,u.uname,r.rurl,r.rtime,r.banner,title FROM trail_reports r, users u WHERE r.uid=u.uid AND r.index_site!=0 ORDER BY r.index_site ";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}
//getTrailReport();
/***********试用报告******************* */
function getReports(){
	global $conn;
	@$page=$_REQUEST["page"];
	$page==""?$page=1:$page;
	$num=$page*6;
	$sql="SELECT r.rid, r.pid,u.uname,r.rurl,r.rtime,r.banner,title FROM trail_reports r, users u WHERE r.uid=u.uid LIMIT 0,$num";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}

function getReportById(){
	global $conn;
	@$pid=$_REQUEST["pid"];
	$sql="SELECT r.rid, r.pid,u.uname,r.rurl,r.rtime,r.banner,title FROM trail_reports r, users u WHERE r.uid=u.uid AND r.pid=$pid ";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}
//getReportById();
/********申请试用************* */
function addToApplyTrail(){
	global $conn;
	session_start();
	$uid=$_SESSION["uid"];
	$pid=$_REQUEST["pid"];
	if($uid && $pid){
		//先查找是否有
		$sql="SELECT * FROM apply_trail WHERE uid=$uid AND pid=$pid";
		$result=mysqli_query($conn,$sql);
		$row=mysqli_fetch_assoc($result);
		if($row){
			echo '{"ok":-1}';
		}else{
			$sql="INSERT INTO apply_trail VALUES(null,$pid,$uid,'0')";
			mysqli_query($conn,$sql);
			echo '{"ok":1}';
		}
	}
}
//addToApplyTrail();