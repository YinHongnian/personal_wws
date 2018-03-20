//加载其他网页时,自动执行header.js
$(()=>{
	//判断登录
	function loadStatus(){
		//获得登录和已登录的两个div
		var $acc=$("#account"); //未登录时
		var $welcome=$("#welcomeList"); //已登录后
		$.get("data/routes/users/isLogin.php")
			.then(data=>{
				if(data.ok==1){
					$welcome.show();
					$acc.hide();
					$("#uname").html(data.uname);
				}else{
					$welcome.hide();
					$acc.show();
				}
		});
	}

	/***********搜索************ */
	//向header.html发送ajax get请求
	//.load方法,第一个参数是ajax请求地址,第二个参数为data可不写,.第三个参数为ajax成功后执行的函数
	$("#header").load("header.html",()=>{
		//location的search属性是url问号(包括问号)后的部分
		//如果search有值,则将值放入搜索文本框
		if(location.search)
			$("#txtSearch").val(
				decodeURI(location.search.split("=")[1])	
		);

		/*为search绑定单击事件,跳转到商品列表*/
		//查找data-trigger="search"的img绑定单击事件
		$("[data-trigger=search]").click(()=>{
			var kw=$("#txtSearch").val().trim();
			if(kw!==""){
				//kw=encodeURIComponent(kw);
				location="products.html?kw="+kw;
			}		
		});
		loadStatus();
		//搜索帮助
		var $txtSearch=$("#txtSearch"),
		$shelper=$("#shelper");
		$txtSearch.keyup(e=>{
			//如果按下的不是enter键
			if(e.keyCode!=13){
				//如果按的是向下的键
				if(e.keyCode==40){
					if(!$shelper.is(":has(.focus)")){
						$shelper.children().first().addClass("focus");
					}else{
						if($shelper.children().last().is(".focus")){
							$shelper.children().last().removeClass("focus");
							$shelper.children().first().addClass("focus");
						}else{
							$shelper.children(".focus").removeClass("focus").next().addClass("focus");
						}
					}
					$txtSearch.val($shelper.children(".focus").attr("title"));
				}else if(e.keyCode==38){ //如果按的是向上的键
					if(!$shelper.is(":has(.focus)")){
						$shelper.children().last().addClass("focus");
					}else{
						if($shelper.children().first().is(".focus")){
							$shelper.children().last().addClass("focus");
							$shelper.children().first().removeClass("focus");
						}else{
							$shelper.children(".focus").removeClass("focus").prev().addClass("focus");
						}
					}
				}else{ //如果按下的是其他键
					var  $tar=$(e.target);
					$.get("data/routes/products/searchHelper.php",{term:$tar.val()}).then(data=>{
						console.log(data);
						var html="";
						for(var i=0;i<data.length;i++){
							var p=data[i];
							html+=`<li class="search-item" title="${p.title}" data-url="product_details?lid=${p.pid}">
							${p.title}
						</li>`
						}
						$shelper.show().html(html);
					})
				}
			}else
				$("[data-trigger=search]").click();
		}).blur(()=>$shelper.hide());
	

		/*为class为account的div绑定鼠标移入移出事件*/
		var $account=$("#account");
		$account.mouseover(()=>{
			$account.css("height",120)
				.find(".accountMenu").css("display","block");
		});
		$account.mouseout(()=>{
			$account.css("height",40)
				.find(".accountMenu").css("display","none");
		});

		/*为class为log的div绑定单击事件*/
		$account.on("click",".log", e=>{
			var $lrModal=$(e.target).parents("#account").next();
			$lrModal.find(".log-tab").addClass("active").siblings().removeClass("active");
			$lrModal.find("#lr-login").show();
			$lrModal.find("#lr-register").hide();
			$lrModal.css("display","block");
		});

		/*为class为log的div绑定单击事件*/
		$account.on("click",".reg", e=>{
			var $lrModal=$(e.target).parents("#account").next();
			$lrModal.find(".reg-tab").addClass("active").siblings().removeClass("active");
			$lrModal.find("#lr-login").hide();
			$lrModal.find("#lr-register").show();
			$lrModal.css("display","block");
		})

		/*标签切换内容 */
		/*为父元素.lr-user-modal-container绑定单击事件 */
		$(".lr-user-modal-container").on("click",e=>{
			var $tar=$(e.target);
			//为当前对象添加active属性,同时取消兄弟元素的active属性
			$tar.addClass("active").siblings().removeClass("active");
			//如果当前点击对象class为"log-tab"
			if($tar.is(".log-tab")){
				//#lr-login显示lr-register隐藏
				$tar.parent().parent().siblings("#lr-login").show();
				$tar.parent().parent().siblings("#lr-register").hide();
			}else{//否则
				//#lr-login隐藏lr-register显示	
				$tar.parent().parent().siblings("#lr-login").hide();
				$tar.parent().parent().siblings("#lr-register").show();
			}
		})		
				
		/*为弹出的登录注册框绑定键盘ESC键退出事件*/
		$(".lr-user-modal").keyup(function(e){
			if(e.keyCode==27)	
				$(".lr-user-modal").hide();
		})

		/*************注册********************* */
		/**验证用户名是否可用 */
		var $uname_show=$(".uname_show");
		var unameReg=/^[\u4e00-\u9fa5_a-zA-Z0-9]{2,8}$/i;
		//id为runame的input失去焦点时检查uname是否可用
		$("#runame").blur(()=>{
			//获取uname的值
			$uname=$("#runame").val();
			//检查用户名格式是否正确
			if(!unameReg.test($uname)){
				$uname_show.html("用户名格式不正确");
			}else{
				//发送ajax请求,验证用户名是否可用
				$.get("data/routes/users/checkName.php",{uname:$uname},data=>{
					if(data=="true")
						$uname_show.html("用户名可用");
					else
						$uname_show.html("用户名已存在,请重新输入");
				})
			}
		});
	
		/**验证密码格式是否正确 */
		var $upwd_show=$(".upwd_show");
		var upwdReg=/^[_a-zA-Z0-9]{6,20}$/i;
		var $upwd=$("#rupwd");
		//id为rupwd的input设置失去焦点事件,检查其格式是否正确
		$upwd.blur(()=>{
			if(!upwdReg.test($upwd.val())){
				$upwd_show.html("密码格式不正确");
			}else
				$upwd_show.html("");
		});

		/**判断两次密码是否一致 */
		var $cpwd=$("#cpwd");
		$cpwd_show=$(".cpwd_show");
		//id为cpwd的input设置失去焦点事件,检查两次输入的密码是否一致
		$cpwd.blur(()=>{
			if($cpwd.val()!=$upwd.val()){
				$cpwd_show.html("两次密码输入不一致,请重新输入");
			}else{
				$cpwd_show.html("");
			}
		});
		
		/**为id为register-btn的a绑定鼠标单击事件 */
		$("#register-btn").click(e=>{
			e.preventDefault();
			//判断id为agree的input没有checked属性
			if($("#agree").is(":checked")){
				var $tar=$(e.target);
				var $uname=$("#runame").val();
				var $upwd=$("#rupwd").val();
				var $email=$("#email").val();
				//验证用户名是否可用
				$.get("data/routes/users/checkName.php",{uname:$uname},data=>{
					if(data=="true"){
						//发送ajax的post请求
						$.post("data/routes/users/register.php",{uname:$uname,upwd:$upwd,email:$email},()=>{
							alert("注册成功");
							$tar.parents("#lr-register").hide().siblings("#lr-login").show()
							.siblings(".lr-user-modal-container")
								.find(".log-tab").addClass("active").siblings().removeClass("active");
						})
					}	
				})
			}else{
				alert("请勾选同意协议");
			}
		})

		/*************登录********************* */
		/*为id为login-btn的a绑定单击事件,发送ajax请求登录*/
		var errorNum=0;
		$("#login-btn").click(e=>{
			e.preventDefault();
			var $uname=$("#luname").val();
			var $upwd=$("#lupwd").val();
			var $yzm=$(".yzm").val();
			$.post("data/routes/users/login.php",{uname:$uname,upwd:$upwd,yzm:$yzm},data=>{
				if(data.ok==-2){
					alert("用户名或密码错误!");
					errorNum++;
					if(errorNum>=3){
						/**显示#yzm的div */
						$("#yzm").show();
						var $setYzm=$("#setYzm");
						var $yzm=$(".yzm");
						/**为id为setYzm的验证码图片绑定单击刷新事件 */
						$setYzm.on("click",e=>{
							var $tar=$(e.target);
							$tar.attr("src","data/routes/users/code_gg.php");
						})
					}
				}
				else if(data.ok==-1){
					$(".yzm_show").html("验证码错误!")
				}else{
					alert("登录成功");
					location.reload();
				}
			})
		})
		
		/*************注销******************** */
		/**为id为logout的a绑定鼠标单击事件 */
		$("#logout").click(e=>{
			e.preventDefault();
			$.get("data/routes/users/logout.php")
				.then(()=>location.reload());
		});
		/**为 id为welcomList的div绑定鼠标移入移出事件*/
		var $welcome=$(".mywelcome");
		$welcome.mouseover(()=>{
			$welcome.css("height",120)
				.find(".my").css("display","block");
		});
		$welcome.mouseout(()=>{
			$welcome.css("height",0)
				.find(".my").css("display","none");
		});
	})
})