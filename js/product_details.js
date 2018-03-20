/**加载详情页面 */
$(()=>{
    if(location.search!=""){
        //获取pid的值
        var data=location.search.slice(1);
        //发送ajax请求
        $.get("data/routes/products/getProductById.php?"+data,output=>{
            console.log(output);
            var p=output["product"];
            var c=output["company"];
            var imgs=output["imgs"];
            var intros=output["intros"];
            var s=output["score"];
            var a=output["apply"];
            var html="";
            //面包屑导航
            $("#bread-crumb>a:last-child").html(p.category);
            var $mImg=$("#mediumDiv");
            var $icon_list= $("#icon_list");
            var $lgDiv= $("#largeDiv");
            //产品中图
            $mImg.children().first().attr("src",imgs[0].md);
           //产品大图
           $lgDiv.css("background-image","url("+imgs[0].lg+")");
           //产品小图
            var html="";
           for(var i=0;i<imgs.length;i++){
               html+=`<li>
               <img src="${imgs[i].sm}" data-i=${i}>
           </li>`;
           }
           $icon_list.html(html);

           /*******放大镜*******/
          /*为向前向后两个按钮绑定单击事件*/
          //获得向前向后的按钮
          var $backward=$(".backward");
          var $forward=$(".forward");
          var moved=0,LIWIDTH=85;
          //最开始如果图片张数小于等于5,两个按钮都禁用
          if(imgs.length<=5){
              $forward.addClass("disabled");
          }
          //为forward绑定单击事件
          $forward.click(e=>{
            e.preventDefault();
              var $tar=$(e.target);
              //如果点击对象没有disabled属性
              if(!$tar.is(".disabled")){
                  //moved++
                  moved++;
                  //$icon_list向左移动LIWIDTH*moved
                  $icon_list.css("left",-LIWIDTH*moved-10+"px");
                  //如果moved>0说明backward按钮可用
                  if(moved>0){ 
                    $backward.removeClass("disabled");
                }
                //若是moved等于imgs.length-5则不可继续移动
                  if(moved==imgs.length-5){$tar.addClass("disabled")};
              }
          })
          //为backward绑定单击事件
          $backward.click(e=>{
            e.preventDefault();
              var $tar=$(e.target);
              if(!$tar.is(".disabled")){
                  console.log("dfg");
                  moved--;
                  $icon_list.css("left",LIWIDTH*moved-10+"px");
                  if(moved<imgs.length-5) $forward.removeClass("disabled");
                  if(moved==0) $tar.addClass("disabled");
              }
          })
          //为小图绑定单击事件
          $icon_list.click(e=>{
            e.preventDefault();
              var $tar=$(e.target);
              if($tar.is("img")){
                  var i=parseInt($tar.data().i);
                  $mImg.children().first().attr("src",imgs[i].md);
                  $lgDiv.css("background-image","url("+imgs[i].lg+")");
              }
          });
          
          var $superMask=$("#superMask"),
          $mask=$("#mask");
          //为$superMask绑定鼠标移入事件,移入时,$mask和largeDiv显示
          $superMask.mouseover(()=>{
            $mask.show();
            $lgDiv.show();
          })
          //为$superMask绑定鼠标移出事件,移入时,$mask和largeDiv隐藏
          $superMask.mouseout(()=>{
            $mask.hide();
            $lgDiv.hide();
          })
          //为$superMask绑定鼠标移动事件
          var WSIZE=300,HSIZE=180;
          $superMask.mousemove(e=>{
            //获得鼠标的xy坐标
            var x=e.offsetX, y=e.offsetY;
            //设置mask的left,top,使其中心始终为鼠标的xy坐标值
            var lf=x-WSIZE/2;
            var tp=y-HSIZE/2;
            if(lf<0) lf=0;
            else if(lf>200){lf=200};
            if(tp<0) tp=0;
            else if(tp>120){tp=120};
            $mask.css("left",lf);
            $mask.css("top",tp);
            //设置lgDiv里图片的left和top值
            $lgDiv.css("background-position",-2*lf+"px "+(-2*tp)+"px");
            $lgDiv.css("background-repeat","no-repeat");
          })

           //产品文字信息描述
            $("#show-details>h1").html(p.title);
            $("#score").html(parseInt(s.design)+parseInt(s.performance)+parseInt(s.comprehensive));
            $("#score-user").html(s.count);
            $(".brand").html(c.brand);
            $("#assort").html(p.category);
            $("#price").html("¥"+p.price);
            //判断申请试用按钮是否有效
            var t=new Date().getTime();
            if(t>p.trail_end_time) $("#trail").addClass("disabled");
            //为add和reduce绑定单击事件
            $(".cart").click(e=>{
                e.preventDefault();
                var $tar=$(e.target);
                var $count=parseInt($(".cart>input").val());
                if($tar.is(".reduce")){
                    if($count>1){
                        $(".cart>input").val($count-1);
                    }
                }
                if($tar.is(".add")){
                    $(".cart>input").val($count+1);
                }
            });
            //为btns绑定单击事件
            $(".btns").click(e=>{
                e.preventDefault();
                //判断是否登录
                $.get("data/routes/users/isLogin.php",data=>{
                    if(data.ok==0){
                        alert("请先登录!")
                    }else{
                        var $tar=$(e.target);
                        if($tar.is("#trail")){
                            if(!$tar.is(".disabled")){
                                $.post("data/routes/trails/addToApplyTrail.php",{pid:p.pid},d=>{
                                    if(d.ok==1){
                                        alert("申请已提交,请耐心等待审核结果!");
                                    }else{
                                        alert("请勿重复提交!");
                                    }
                                })
                            }
                        }
                        //加入购物车
                        if($tar.is(".addCart")){
                            var $count=$tar.parent().siblings(".cart").children().eq(1).val();
                            $.post("data/routes/carts/addToCart.php",{pid:p.pid,count:$count},()=>{alert("加入购物车成功!");})
                        }
                        //立即购买
                        if($tar.is("#buy")){
                            location.href="cart.html";
                        }
                    }
                })  
            })

             //为标签添加单击事件
           $tab=$(".pdetails-tabs");
           $tcontainer=$(".pdetails-container");
           $tab.on("click","li",e=>{
               $tar=$(e.target);
               $tar.addClass("hover").siblings().removeClass("hover");
               var i=$tar.index();
               $tar.parent().siblings().children().eq(i).show().siblings().hide();
           })

            //动态加载introduce的内容
           html="";
           //intoduce图片
           for(var img of intros){
               html+=`<img src="${img.iurl}">`;
           }
           $(".intro_img").html(html);
           $(".like-num").html(p.like_num);
           $(".collect-num").html(p.collect_num);
           var $s1=$("#score1"),$s2=$("#score2"),$s3=$("#score3");
           var sd=parseInt(s.design),sp=parseInt(s.performance),sc=parseInt(s.comprehensive);
           $s1.html(sd);
           $s1.parent().children("i:lt("+sd+")").addClass("active");
           $s2.html(sp);
           $s2.parent().children("i:lt("+sp+")").addClass("active");
           $s3.html(sc);
           $s3.parent().children("i:lt("+sc+")").addClass("active");
           //为星星绑定单击事件
           $(".comments").click(e=>{
               var $tar=$(e.target);
               if($tar.is("i")){
                    var n=$tar.index();
                   if($tar.is(".active")){
                       $tar.removeClass("active");
                       $tar.parent().children("i:gt("+n+")").removeClass("active");
                    }else{   
                        $tar.parent().children("i:eq("+n+")").addClass("active");
                        $tar.parent().children("i:lt("+n+")").addClass("active");
                    }
                    var sn=parseInt($tar.parent().children("i.active").last().index())+1;
                    $tar.siblings("span").html(sn);
               }
               if($tar.is("a.btn")){
                    e.preventDefault();
                    //判断是否登录
                    $.get("data/routes/users/isLogin.php",data=>{
                        if(data.ok==0){
                            alert("请先登录!")
                        }else{
                            var sd=$s1.html(),sp=$s2.html(),sc=$s3.html();
                            var sr=$tar.parent().find("[checked]").val();
                            console.log(sr);
                            $.post("data/routes/users/addToProductScore.php",
                            {pid:p.pid,design:sd,performance:sp,comprehensive:sc,isRecommend:sr},
                            pc=>{
                                if(pc.ok==-1){
                                    alert("您已评价过,请勿重复打分!");
                                }else{
                                    alert("感谢您的参与,打分成功!");
                                }
                            })   
                        }
                    })
                }
           });


           //动态加载parameter的内容
          $("#parameter>img").attr("src",p.parameter);
           //动态加载trail的内容
           html="";
           console.log(a);
           for(var i=0;i<a.length;i++){
               html+=`<div class="user">
               <div></div>
               <p>${a[i].uname}</p>
           </div>`;
           }
           $(".userList").html(html);
           //动态加载report的内容
           $.get("data/routes/trails/getReportById.php",{pid:p.pid})
           .then(data=>{
               var html="";
               for(var r of data){
                   var t=parseInt(r.rtime);
                   var time=new Date(t).toLocaleDateString();
                   html+=`<div class="report-desc">
                   <div class="report-img">
                       <a href="${r.rurl}"><img src="${r.banner}"></a>
                   </div>
                   <a href="#">
                       <h3>${r.title}</h3>
                   </a>
                   <p>
                       <a href="#">${r.uname}</a>
                       &nbsp;&nbsp;·&nbsp;&nbsp;
                       <span class="write-time">${time}</span>
                       &nbsp;&nbsp;·&nbsp;&nbsp;
                       发布
                   </p>
               </div>`
               }
               $("#trail-report").html(html);
           })
           
           //右侧公司信息
           $(".company>h4").html(c.cname);
           html=`<img src="${c.logo}"> ${c.introduce}`;
           $(".cintro").html(html);
        })
    }
})