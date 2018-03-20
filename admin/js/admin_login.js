$(()=>{
    //为验证码图片绑定单击事件
    $("#setYzm").click(e=>{
        $(e.target).attr("src","data/routes/users/code_gg.php");
    });
   
    //为登录按钮绑定单击事件
   $("#login").click(e=>{
        e.preventDefault();
        var $uname=$("#uname").val();
        var $upwd=$("#upwd").val();
		var $yzm=$("#yzm").val();
		$.get("data/routes/users/login.php?uname="+$uname+"&upwd="+$upwd+"&yzm="+$yzm).then(data=>{
			if(data.ok==-1){
				$(".yzm_show").html("验证码错误!").parent().show();		
			}else if(data.ok==-2){
				$(".yzm_show").html("用户名或密码错误!").parent().show();
			}else{
				$(".yzm_show").parent().hide();
				location.href="/index.html";
			}
		})
   })
})
