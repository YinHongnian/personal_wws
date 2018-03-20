$(()=>{
    
        // 判断是否登录
        $.get("data/routes/users/isLogin.php",data=>{
            if(data.ok==0){
                alert("您还未登录!请先登录");
            }else{
                //发送ajax请求获得地址
                $.get("data/routes/users/getAddress.php",ars=>{
                    var html="";
                    for(var i=0;i<ars.length;i++){
                        html+=`<option value="${ars[i].aid}">${ars[i].address}</option>`
                    }
                    $("#address").html(html);
                })
                loadCart();
            }
        })
                
        function loadCart(){
            //发送ajax请求获得购物车列表
            $.get("data/routes/carts/getCart.php",data=>{
                console.log(data);
                var html="";
                var is_allchk=false;
                for(var i=0;i<data.length;i++){
                    if(data[i].is_checked=="1"){
                        html+=`<div class="cart-item">
                        <input type="checkbox" name="check" class="check" checked>`;
                        is_allchk=true;
                    }else{
                        html+=`<div class="cart-item">
                        <input type="checkbox" name="check" class="check">`;
                        is_allchk=false;
                    }
                    html+=`	
                    <a href="product_details?lid=${data[i].pid}">
                        <img src="${data[i].banner}" alt="">
                    </a>
                    <a href="product_details?lid=${data[i].pid}">
                        <span class="ptitle">${data[i].title}</span>
                    </a>
                    <span class="price">¥${data[i].price}</span>
                    <div class="count">
                        <span class="reduce">-</span> 
                        <input type="text" value="${data[i].count}" maxlength="2">
                        <span class="add">+</span> 
                    </div>
                    <span class="total">¥${data[i].price*data[i].count}</span>
                    <a href="javascript:;" class="del" data-pid=${data[i].pid}>删除</a>
                </div>`;
                }
                $(".content").html(html);
                if(is_allchk){$(".allCheck").prop("checked",true);}
                //计算总和和总件数
                var sumPrice=0,totalCount=0;
                for(var i=0;i<data.length;i++){
                  if(data[i].is_checked=="1"){
                      totalCount+=parseInt(data[i].count);
                      sumPrice+=(data[i].price*data[i].count);
                  }  
                }
                $(".colCount").html(totalCount);
                $(".sumPrice").html("¥"+sumPrice);
               
                    //为container绑定单击事件
                    $(".shopping-cart .container").off("click").click(e=>{
                        var $tar=$(e.target);
                        //如果是全选
                        if($tar.is(".allCheck")){
                            var $chks=$tar.parents(".shopping-cart .container").find("input[type='checkbox']");
                            if($tar.is(":checked")){
                                $chks.prop("checked",true);
                                $.post("data/routes/carts/selectAll.php",{chkAll:1}).then(()=>{loadCart();})
                            }else{
                                $chks.prop("checked",false);
                                $.post("data/routes/carts/selectAll.php",{chkAll:0}).then(()=>{loadCart();})
                            }
                        }
                        //如果只选中一个
                        if($tar.is(".check")){
                            var $chkAlls= $tar.parents(".container").find(".allCheck");
                            var $pid=$tar.siblings(".del").data().pid;
                            if($tar.is(":checked")){
                                $.post("data/routes/carts/selectOne.php",{chkOne:1,pid:$pid}).then(()=>{
                                    loadCart();
                                })
                            }else{
                                $.post("data/routes/carts/selectOne.php",{chkOne:0,pid:$pid}).then(()=>{
                                    loadCart();
                                    $chkAlls.prop("checked",false); 
                                })
                            }
                        }
                        //如果是数量的增减按钮
                        if($tar.is(".reduce") || $tar.is(".add")){
                            e.preventDefault();
                            var $pid=$tar.parent().siblings(".del").data().pid;
                            var $count=parseInt( $tar.siblings("input").val());
                            if($tar.is(".reduce")){
                                if($count>1){
                                    $tar.siblings("input").val($count-1);
                                    $.get("data/routes/carts/updateCart.php",{pid:$pid,count:($count-1)}).then(loadCart());
                                }else if($count==1){
                                   if(confirm("是否删除?")){
                                        $.get("data/routes/carts/updateCart.php",{pid:$pid,count:0}).then(loadCart());
                                    }
                                }
                            }
                            if($tar.is(".add")){
                                $tar.siblings("input").val($count+1);
                                $.get("data/routes/carts/updateCart.php",{pid:$pid,count:($count+1)}).then(loadCart());
                            }
                        }
                    })

                    //为删除按钮绑定事件
                    $(".del").off("click").click(e=>{
                        e.preventDefault();
                        var $pid=$(e.target).data().pid;
                        $.get("data/routes/carts/delCart.php",{pid:$pid},loadCart())
                    }) 
                    //为删除选中的商品绑定单击事件
                    $(".delChk").off("click").click(e=>{
                        for(var i=0;i<data.length;i++){
                            if(data[i].is_checked=="1"){
                                $.get("data/routes/carts/delCart.php",{pid:data[i].pid},loadCart())
                            }
                        }
                    })  
        })
    }      
})