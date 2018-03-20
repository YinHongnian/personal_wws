<?php
require_once("../../init.php");
function getIndexNews(){
	global $conn;
	$sql="SELECT nid,title,subTitle,banner FROM news WHERE index_site!=0 ORDER BY index_site";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}
//getIndexNews();

function getRecommendProducts(){
	global $conn;
	@$page=$_REQUEST["page"];
	$page==""?$page=1:$page;
	$num=$page*6;
	$sql="SELECT nid,title,subTitle,banner,author,publish_time FROM news ORDER BY nid DESC LIMIT 0,$num";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}
//getRecommendProducts();
