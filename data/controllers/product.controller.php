<?php
require_once("../../init.php");
/*******首页轮播产品********/
function getCarousel(){
	global $conn;
	$sql="SELECT title,href,img FROM carousel ORDER BY index_site";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}
//getCarousel();

/********免费试用产品************* */
function getTrailProducts(){
	global $conn;
	$sql="SELECT pid, title,trail_end_time,banner,index_trail_site FROM products WHERE index_trail_site!=0 ORDER BY index_trail_site ";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}
//getTrailProducts();

/********获得分类标签************* */
function getCategoryAccording(){
	global $conn;
	$sql="SELECT * FROM category_according ";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}
//getCategoryAccording();

/********获得分类标签内容************* */
function getCategorys(){
	global $conn;
	@$catId=$_REQUEST["catId"];
	$sql="SELECT category_id,categoryName FROM category WHERE catId=$catId";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}
//getCategorys();

/********通过分类搜索产品************* */
function getProductsByCategory(){
	global $conn;
	$category_id=$_REQUEST["category_id"];
	$sql="SELECT p.pid,p.title,p.price,p.banner,p.like_num+p.collect_num+p.evaluation_pnum as score  FROM products p, product_category c WHERE p.pid=c.pid AND c.category_id=$category_id";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}
//getProductsByCategory();

/********分页加载产品************* */
function getProducts(){
	global $conn;
	$output=[
		"count"=>0, //产品总数
		"pageSize"=>8,  //每页产品个数
		"pageNo"=>0,  //当前第几页
		"pageCount"=>0, //总页数
		"data"=>[]  //产品信息
	];
	@$pageNo=(int)$_REQUEST["pageNo"];
	@$sortAccording=$_REQUEST["sortAccording"];
	@$kw=$_REQUEST["kw"];
	if($pageNo)
	 $output["pageNo"]=$pageNo;
	 //定义sql语句
	 $sql="SELECT pid,title,price,banner,like_num+collect_num+evaluation_pnum as score FROM products "; 
	 if($kw){
		 $kws=explode(" ",$kw);
		 for($i=0;$i<count($kws);$i++){
			 $kws[$i]=" title like '%".$kws[$i]."%' ";
		 }
		 $sql.=" where ".implode(" and ",$kws);
	 }
	if($sortAccording)
		$sql.="ORDER BY $sortAccording ";
	$result=mysqli_query($conn,$sql);
	$products=mysqli_fetch_all($result,1);
	$output["count"]=count($products);
	$output["pageCount"]=ceil($output["count"]/$output["pageSize"]);
	$sql.=" LIMIT ".($output["pageNo"]*$output["pageSize"]).",".$output["pageSize"];
	$result=mysqli_query($conn,$sql);
	$output["data"]=mysqli_fetch_all($result,1);
	echo json_encode($output);
}
//getProducts();
/********通过id搜索产品************* */
function getProductById(){
	global $conn;
	@$pid=$_REQUEST["pid"];
	$output=[
//		"product"=>[pid,title,category,price,like_num,collect_num,evaluation_pnum,trail_end_time],
//		"company"=>[cname,logo,introduce,brand],
//		"imgs"=>[s,sm2...],
//		"intros"=>[iurl1,iurl2...],
//     "score"=>[design,performance,comprehensive],
	];
	$sql="SELECT pid,title,category,price,like_num,collect_num,evaluation_pnum,trail_end_time,parameter FROM products WHERE pid=$pid";
	$result=mysqli_query($conn,$sql);
	$output["product"]=mysqli_fetch_all($result,1)[0];
	$sql="SELECT cname,logo,introduce,brand FROM company WHERE cid=(SELECT cid FROM products WHERE pid=$pid)";
	$result=mysqli_query($conn,$sql);
	$output["company"]=mysqli_fetch_all($result,1)[0];
	$sql="SELECT sm,md,lg FROM product_img WHERE pid=$pid";
	$result=mysqli_query($conn,$sql);
	$output["imgs"]=mysqli_fetch_all($result,1);
	$sql="SELECT iurl FROM product_intro WHERE pid=$pid";
	$result=mysqli_query($conn,$sql);
	$output["intros"]=mysqli_fetch_all($result,1);
	$sql="SELECT AVG(design) as design,AVG(performance) as performance,AVG(comprehensive) as comprehensive,count(*) as count FROM product_score WHERE pid=$pid";
	$result=mysqli_query($conn,$sql);
	$output["score"]=mysqli_fetch_all($result,1)[0];
	$sql="SELECT u.uname,u.avater FROM users u,apply_trail a WHERE u.uid=a.uid and a.pid=$pid  LIMIT 0,8";
	$result=mysqli_query($conn,$sql);
	$output["apply"]=mysqli_fetch_all($result,1);
	echo json_encode($output);
}
//getProductById();

function searchHelper(){
	global $conn;
	@$kw=$_REQUEST["term"];
	$sql="SELECT pid,title FROM products ";
	if($kw){
		$kws=explode(" ",$kw);
		for($i=0;$i<count($kws);$i++){
			$kws[$i]=" title LIKE '%".$kws[$i]."%' ";
		}
		$sql.="WHERE ".implode(" AND ",$kws);
	}
	$sql.=" ORDER BY title LIMIT 10";
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}
//searchHelper();

