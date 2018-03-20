<?php 
require_once("../init.php");
function adminLogin(){
    global $conn;
    @$aname=$_REQUEST['aname'];
    @$apwd=$_REQUEST['apwd'];
    $sql="SELECT * FROM adminlist WHERE aname=$aname AND apwd=$apwd";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_all($resul,1);
    if(count($row)>0){
        session_start();
        $_SESSION['admid']=$row[0]['admid'];
        echo  '{"ok":1}';
    }else 
        echo  '{"ok":-1}';
}