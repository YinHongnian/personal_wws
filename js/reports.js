$(()=>{
    function loadNews(n){
        $.get("data/routes/trails/getReports.php",{page:n})
        .then(data=>{
            var html="";
            for(var i=0;i<data.length;i++){
                var time=new Date(parseInt(data[i].rtime));
                var newTime=time.getFullYear()+"-"+time.getMonth()+"-"+time.getDate();
                html+=`<div class="new">
                <a href="javascript:;">
                    <img src="${data[i].banner}" alt="">
                </a>
                <div class="ndesc">
                    <a href="javascript:;">
                        <h3 class="title">${data[i].title}</h3>
                    </a>
                    <div>${data[i].uname}&nbsp;&nbsp;·&nbsp;&nbsp;${newTime}&nbsp;&nbsp;·&nbsp;&nbsp;试用报告</div>
                </div>
            </div>`;
            }
            var $nl=$("#newsList");
            $nl.html(html);
            //为加载更多绑定单击事件
            var n=1;       
            $("#loadMore").on("click",()=>{
                n+=1;
                loadNews(n);
            }) 
        })
    }
    loadNews(1);
})