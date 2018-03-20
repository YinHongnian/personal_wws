$(()=>{
/*********首页轮播图**********/
//获得ul和圆点
var $ulImgs=$("#banner .banner_img"),
    $ulInds=$("#banner>.indicators"),
    LIWIDTH=1200,INTERVAL=500,WAIT=2000,
    moved=0,timer=null,canMove=true;
//ajax获得数据库中轮播图片
$.get("data/routes/products/getCarousel.php")
    .then(data=>{
        var html="";
        for(var i=0;i<data.length;i+=3){
            html+=` 
            <li>
                <div class="banner_lg">
                    <a href="${data[i].href}">
                        <img  title="${data[i].title}" src="${data[i].img}">
                    </a>
                    <a href="${data[i].href}" class="banner_title">
                    <h3>${data[i].title}</h3>
                    </a>
                </div>
                <div class="banner_sm top_img">
                    <a href="${data[i+1].href}">
                        <img title="${data[i+1].title}" src="${data[i+1].img}">
                    </a>
                    <a href="${data[i+1].href}" class="banner_title">
                        <h3>${data[i+1].title}</h3>
                    </a>
                </div>
                <div class="banner_sm bottom_img">
                    <a href="${data[i+2].href}">
                        <img title="${data[i+2].title}" src="${data[i+2].img}">
                    </a>
                    <a href="${data[i+2].href}" class="banner_title">
                        <h3>${data[i+2].title}</h3>
                    </a>
                </div>    
            </li>
            `
        }
        html+=` 
            <li>
                <div class="banner_lg">
                    <a href="${data[0].href}">
                        <img  title="${data[0].title}" src="${data[0].img}">
                    </a>
                    <a href="${data[0].href}" class="banner_title">
                    <h3>${data[0].title}</h3>
                    </a>
                </div>
                <div class="banner_sm top_img">
                    <a href="${data[1].href}">
                        <img title="${data[1].title}" src="${data[1].img}">
                    </a>
                    <a href="${data[1].href}" class="banner_title">
                        <h3>${data[1].title}</h3>
                    </a>
                </div>
                <div class="banner_sm bottom_img">
                    <a href="${data[2].href}">
                        <img title="${data[2].title}" src="${data[2].img}">
                    </a>
                    <a href="${data[2].href}" class="banner_title">
                        <h3>${data[2].title}</h3>
                    </a>
                </div>    
            </li>`
        var dataL= data.length/3;
        $ulImgs.html(html).css("width",(dataL+1)*LIWIDTH);
        $ulInds.html("<li></li>".repeat(dataL))
            .children().first().addClass("hover");
        function autoMove(){
            if(canMove){
                //判断是否为最后一张
                if(moved==dataL){
                    //将move归为0,同时将ul的left归为0
                    moved=0;
                    $ulImgs.css("left",0);
                }
                timer=setTimeout(()=>{move(1,autoMove);},WAIT);
            }
        }
        autoMove();

        /*自动开启轮播,鼠标悬停时自动关闭轮播 */
        $("#banner").hover(
            ()=>{
                //关闭轮播开关
                canMove=false;
                clearTimeout(timer);
                timer=null;
            },
            ()=>{
                //打开轮播
                canMove=true;
                autoMove();
            }
        );

        /*小圆点绑定单击事件 */
        $ulInds.on("click","li",e=>{
            e.preventDefault();
            //获得当前圆点的下标
            moved=$(e.target).index();
            //图片移动-LIWIDTH*moved
            $ulImgs.stop(true).animate({
                left:-LIWIDTH*moved
            },INTERVAL);
            //为当前圆点增加hover属性并清除其他圆点的hover属性//$(e.target)
            $ulInds.children(":eq("+moved+")").addClass("hover").siblings().removeClass("hover");
        })

        /*定义move的函数,参数为方向和回调函数,1为向左,-1为向右 */
        function move(dir,callback){
            moved+=dir;//按照方向增减moved
            //圆点的hover添加
            //如果move没有到头
            if(moved<dataL){
                $ulInds.children(":eq("+moved+")").addClass("hover").siblings().removeClass("hover");
            }else{
                $ulInds.children(":eq(0)").addClass("hover").siblings().removeClass("hover");
            }
            //图片的轮播
            $ulImgs.stop(true).animate({left:-LIWIDTH*moved},INTERVAL,callback);
        }

        /**为两个侧边按钮绑定单击事件 */
        $("#banner>[data-move=right]").click(()=>{
            if(moved==dataL){
                moved=0;
                $ulImgs.css("left",0);
            }
            move(1);
        });
        $("#banner>[data-move=left]").click(()=>{
            if(moved==0){
                moved=dataL;
                $ulImgs.css("left",-LIWIDTH*moved);
            }
            move(-1);
        });
    })
});

/***********楼层*************** */
$(()=>{
    //加载第一层免费试用的商品
    $.get("data/routes/products/getTrailProducts.php")
        .then(data=>{
            var html="";
            for(var tp of data){
                var endTime=tp.trail_end_time;
                var diffDate=endTime-new Date().getTime();
                //大于0则还在试用中
                if(diffDate<=0){
                    html+=`<div class="trail-product">
                        <div class="trail-img">
                            <a href=""><img src="${tp.banner}" alt=""></a>
                            <div class="trail off">已结束</div>
                        </div>
                        <a href="#">
                            <h3>${tp.title}</h3>
                        </a>
                        <span class="pro-num">数量: 5</span>
                        <span class="peo-num">申请人数: 208</span>
                        <div class="trail-timer">
                            <i></i>
                            <span>距离活动结束 : 0天0时0分0秒</span>
                        </div>
                    </div>`;
                    $("#f1 .floor-content").html(html);
                }else{
                    html+=`<div class="trail-product">
                    <div class="trail-img">
                        <a href=""><img src="${tp.banner}" alt=""></a>
                        <div class="trail on">试用中</div>
                    </div>
                    <a href="product_details.html?pid="+${tp.lid}>
                        <h3>${tp.title}</h3>
                    </a>
                    <span class="pro-num">数量: 5</span>
                    <span class="peo-num">申请人数: 208</span>
                    <div class="trail-timer">
                        <i></i>
                        <span>距离活动结束 : 
                            <span id="dd">0</span>天
                            <span id="hh">0</span>时
                            <span id="mm">0</span>分
                            <span id="ss">0</span>秒
                        </span>
                        </div>
                    </div>`;
                    //倒计时
                    function time(endTime){
                        setInterval(()=>{
                            var diffDate=parseInt((endTime-new Date().getTime())/1000);
                            var dd=parseInt(diffDate/3600/24);
                            var hh=parseInt(diffDate/3600%24);
                            var mm=parseInt(diffDate/60%60);
                            var ss=parseInt(diffDate%60);
                            $("#dd").html(dd);
                            $("#hh").html(hh);
                            $("#mm").html(mm); 
                            $("#ss").html(ss);  
                        },1000); 
                     }
                     time(endTime);
                }
            }  
        })

    //加载第二层试用报告
    $.get("data/routes/trails/getTrailReport.php")
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
            $("#f2 .floor-content").html(html);
        })
    
    //加载第三层热点文章
    $.get("data/routes/news/getIndexNews.php")
        .then(data=>{
            var html="";
            for(var n of data){
                html+=`<div class="airticle">
                <a href="#">
                    <img src="${n.banner}" alt="">
                </a>
                <div class="airticle-desc">
                    <a href="#">
                        <h3>${n.title}</h3>
                    </a>
                    <div>
                        <i></i>
                        <span class="stitle">${n.subTitle}<span>
                        <br>
                        <a href="#" title="继续阅读" class="details">[详情]</a>
                    </div>
                </div>
            </div>`;
            }
        $("#f3 .floor-content").html(html);
        })


    //加载第四层推荐产品
    $.get("data/routes/news/getRecommendProducts.php")
    .then(data=>{
        var html="";
        for(var n of data){
            html+=`<div class="product-desc">
            <a href="#">
                <img src="${n.banner}" alt="">
            </a>
            <br>
            <a href="#" class="ptitle">${n.title}</a>
            <p>
                <span class="pstitle">${n.subTitle}</span>
                <a href="#" title="继续阅读" class="details">[详情]</a>
            </p>	
        </div>`;
        }
        html+=`<div id="loadMore">
            <i></i>
            <span>加载更多</span>
            </div>`;
        var $rp=$("#f4 .floor-content");
        $rp.html(html); 

         //为加载更多绑定单击事件
         var n=1;       
         $("#loadMore").on("click",()=>{
             n+=1;
             $.get("data/routes/news/getRecommendProducts.php",{page:n},
                data=>{
                     var html="";
                     for(var n of data){
                         html+=`<div class="product-desc">
                         <a href="#">
                             <img src="${n.banner}" alt="">
                         </a>
                         <br>
                         <a href="#" class="ptitle">${n.title}</a>
                         <p>
                             <span class="pstitle">${n.subTitle}</span>
                             <a href="#" title="继续阅读" class="details">[详情]</a>
                         </p>	
                         </div>
                         `;
                     }
                     html+=`<div id="loadMore">
                     <i></i>
                     <span>加载更多</span>
                     </div>`;
                     $rp.html(html);
                 })
        })
    })        
})