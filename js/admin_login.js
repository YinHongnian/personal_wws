(()=>{
    //为验证码图片绑定单击事件

    //验证码绑定焦点离开事件
    //为登录按钮绑定单击事件
    document.getElementById("login").onclick=
        (e)=>{
            e.preventDefault();
            var uname=document.getElementById("uname").value;
            var upwd=document.getElementById("upwd").value;
            var xhr=new XMLHttpRequest();
            xhr.open("POST","data/routes/admin/user/adminlogin.php",true);
            xhr.onreadystatechange=()=>{
                if(xhr.readyState==4 && xhr.status==200){
                    var resText = xhr.responseText;
                }
            }
            xhr.setRequestHeader(
                "Content-Type",
                "application/x-www-form-urlencoded"
            );
            xhr.send({uname:uname,upwd:upwd});
        };
})()
