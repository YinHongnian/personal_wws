/**加载上方导航标签栏 */
$(()=>{
    /**获得分类列表 */
    //为class为tabs的ul动态添加li
    $.get("data/routes/products/getCategoryAccording.php").then(data=>{
        var html="";
        for(var tabs of data){
            html+=`<li data-catId="${tabs.catId}">${tabs.accordingName}</li>`;
        }
        $(".tabs").html(html);
        //为tabs绑定单击事件
        $(".tabs").on("click","li",e=>{
            var $tar=$(e.target);
            var $container=$tar.parent().siblings();
            $container.show();
            //动态移动i.traggle
            var leftWidth=150+145*parseInt($tar.index());
            $container.find(".traggle").css("left",leftWidth);
            //动态加载li
            var $catId=$tar.data("catid");
            $.get("data/routes/products/getCategorys.php?catId="+$catId).then(data=>{
                var html="";
                for(var c of data){
                    html+=`<li data-categoryid="${c.category_id}">${c.categoryName}</li>`
                }
                $container.find(".tag-content").html(html);
                //为tag-content绑定单击事件
                $container.on("click","li",e=>{
                    var $categoryid=$(e.target).data("categoryid");
                    $.get("data/routes/products/getProductsByCategory.php?category_id="+$categoryid).then(data=>{
                        var html="";
                        for(var p of data){
                            html+=`<div class="product">
                            <div class="pimg">
                                <a href="product_details.html?pid=${p.pid}">
                                    <img src="${p.banner}">
                                </a>
                            </div>
                            <div class="pdesc">
                                <a href="product_details.html?pid=${p.pid}">
                                    <h3>${p.title}</h3>
                                </a>
                                <p class="pdata">
                                    <span class="lf">价格 : ${p.price}</span>
                                    <span class="rt">评分 : ${p.score}</span>
                                </p>
                                <div>
                                    <span class="reduce">-</span>
                                    <input type="text" value="1">
                                    <span class="add">+</span>
                                    <a href="javascript:;" class="addCart">加入购物车</a>
                                </div>
                            </div>
                        </div>`
                        }
                        $("#productList").html(html);
                        $(".pnum").html(data.length);
                    })
                })
            })
        })  
    })
    
})

/**加载下方产品 */
function loadProducts(pno=0,sortAccording){
    var kw="";
    if(location.search!="")
        kw=location.search.split("=")[1];
        //发送ajax请求
    $.get("data/routes/products/getProducts.php",{pageNo:pno,sortAccording:sortAccording,kw:kw}).then(obj=>{
        console.log(obj);
        var html="";
        for(var p of obj.data){
            html+=`<div class="product">
            <div class="pimg">
                <a href="product_details.html?pid=${p.pid}">
                    <img src="${p.banner}">
                </a>
            </div>
            <div class="pdesc">
                <a href="product_details.html?pid=${p.pid}">
                    <h3>${p.title}</h3>
                </a>
                <p class="pdata">
                    <span class="lf">价格 : ${p.price}</span>
                    <span class="rt">评分 : ${p.score}</span>
                </p>
                <div>
                    <span class="reduce">-</span>
                    <input type="text" value="1">
                    <span class="add">+</span>
                    <a href="javascript:;" class="addCart">加入购物车</a>
                </div>
            </div>
        </div>`
        }
        $("#productList").html(html);
        $(".pnum").html(obj.count);

        //为.pdesc的最后一个div绑定单击事件
        var $divCart=$(".pdesc>div:last-child");
        $divCart.click(e=>{
            var $tar=$(e.target);
            var $inputCount=$tar.siblings("input");
            var count=parseInt($inputCount.val());
            if($tar.is(".reduce")){
                if($inputCount.val()>1)
                    $inputCount.val(count-1);
            }
            if($tar.is(".add")){
                $inputCount.val(count+1);
            }
            if($tar.is(".addCart")){
                var $pid=$tar.parent().parent().children("a").attr("href").split("=")[1];
                
                $.post("data/routes/carts/addToCart.php",{pid:$pid,count:count},()=>{alert("添加成功");})
            }
        });

        //加载页码
        var html=`<a href="javascript:;" class="previous">上一页</a>`;
        for(var i=1;i<=obj.pageCount;i++){
            html+=`<a href="javascript:;">${i}</a>`;
        }
        html+=`<a href="javascript:;" class="next">下一页</a>`;
        //为当前页添加.hover属性
        $divPages=$(".ppage");
        $divPages.html(html).children(":eq("+(obj.pageNo+1)+")").addClass("current");
        checkAStatus($divPages,obj.pageCount,obj.pageNo);
        //为$divPages绑定单击事件
        $divPages.off("click").click(e=>{
            var $tar=$(e.target);
            if($tar.is("a")){
                if(!$tar.is(":first-child,:last-child")){
                    //如果不含current属性,则保存在pno中调用loadProducts()函数
                    if(!$tar.is(".current")){
                        var pno=$tar.html()-1;
                        loadProducts(pno);
                    }
                }else{
                   if(!$tar.is(".disabled")){
                      var $curr=$divPages.children(".current");
                      if($tar.is(".next")){
                          loadProducts($curr.html());
                      } else{
                          loadProducts($curr.html()-2);
                      }
                   } 
                }
            }
        });

        
    })
}

function checkAStatus($divPages,pageCount,pageNo){
    //获得$divPages下的上一页和下一页
    var $prev=$divPages.children().first();
    var $next=$divPages.children().last();
    //如果pageNo不是第一页0,也不是最后一页pageCount-1
    if(pageNo!=0 && pageNo!=pageCount-1){
        $prev.removeClass("disabled");
        $next.removeClass("disabled");
    }else{
        if(pageNo==0){
            $prev.addClass("disabled");
            $next.removeClass("disabled");
        }
        if(pageNo==pageCount-1){
            $next.addClass("disabled");
            $prev.removeClass("disabled");
        }
    }
}
$(()=>{
    loadProducts();
    //为psort绑定单击事件
    $("#psort").on("click","li:nth-child(2n+1)",e=>{
        var $tar=$(e.target);
        //为当前li增加hover属性,并移除兄弟的hover属性
        $tar.addClass("hover").siblings().removeClass("hover");
        //发送ajax请求
        var sortAccording="";
        if($tar.is("li:nth-child(3)")) sortAccording= "price";
        if($tar.is("li:nth-child(5)")) sortAccording= "score";
        if($tar.is("li:nth-child(7)")) sortAccording= "title";
        loadProducts(0,sortAccording);
    })
})