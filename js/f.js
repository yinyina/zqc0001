// JavaScript Document
$(function(){
	//初始
	var StrPath = location.href;
	var bool = StrPath.indexOf("http");

	var bMenu = true;
	var iMax = 0;
	var kcjsarra = new Array();
	var kcjsarrb = new Array();

	//$( "#coursetitle" ).html( sCourseTitle );
	$( "#menutitle" ).html( sMenuTitle );
	loadlist();
	loaddowmlist();
	$(".span3").html($("li[level]").eq(0).html());
	var oldLi = $("#list ul li[indexc=1]").eq(0);

	var spbt0;
	for(i=0; i<arrList.length;i++){
		if(arrList[i].level==3){
			spbt0 = arrList[i].coursename;
			break;
		}	
	}
	$("#spbt").html(spbt0);
	
	var ipagechange = 0;
	var sfilename1 = arrList[oldLi.index()].filename;
	var sfilenamelocal1 = arrList[oldLi.index()].localpath;
	oldLi.css({"background":"url(img/level3-"+ arrList[oldLi.index()].filetype +"-c.png) no-repeat left center","color":"#ffffff"});
	showvideo(sfilename1);
		if (bool<0){
			showvideo(sfilenamelocal1);
		}
	var iMaxTop = 0;
	var iMaxCnt = 0;
	setSize();
	
	document.title = sCourseTitle;
	
	//模拟滚动条（滚动）
	function scroll(id,id2){
		
		var obj=document.getElementById(id);
		var list=document.getElementById(id2);
		list.scrollTop=0;
		var oUl=list.children[0];
		var bar=obj.getElementsByTagName("div")[1];
		var prev=obj.getElementsByTagName("div")[0];
		var next=obj.getElementsByTagName("div")[2];
		if(oUl.offsetHeight>list.offsetHeight){
			obj.style.display='block';
			list.style.overflowY='scroll';
			//按比例设置滚动条长度
			bar.style.height=Math.floor(obj.offsetHeight*list.offsetHeight/oUl.offsetHeight)+'px';
			bar.style.overflow='hidden';
			//拖拽滚动条事件加载
			bar.onmousedown=function(ev){
				var o=this;
				var oEvent=ev||event;
				var y=oEvent.clientY-this.offsetTop;
				document.onmousemove=function(ev){
					oEvent=ev||event;
					var otop=oEvent.clientY-y;
					var stop=otop*oUl.offsetHeight/obj.offsetHeight;
					if(otop<=0){
						o.style.top=0+'px';
						list.scrollTop=0;
					}else if(otop>=obj.offsetHeight-bar.offsetHeight){
						o.style.top=obj.offsetHeight-bar.offsetHeight+'px';
						list.scrollTop=oUl.offsetHeight-list.offsetHeight;
					}else{
						o.style.top=otop+'px';
						list.scrollTop=stop;
					}
				}
				document.onmouseup=function(){
					document.onmousemove=null;
					document.onmouseup=null;
				}
			}
			//向上按钮事件加载
			prev.onmousedown=function(){
				if(bar.offsetTop>0){
					var move=setInterval(function(){
						if(bar.offsetTop-obj.offsetHeight*0.02>0){
							bar.style.top=bar.offsetTop-obj.offsetHeight*0.02+'px';
							list.scrollTop=list.scrollTop-oUl.offsetHeight*0.02;
						}else{
							clearInterval(move);
							bar.style.top=0+'px';
							list.scrollTop=0;
						}
					},100);
					prev.onmouseup=function(){clearInterval(move);}
				}
			}
			//向下按钮事件加载
			next.onmousedown=function(){
				if(bar.offsetTop<obj.offsetHeight-bar.offsetHeight){
					var move=setInterval(function(){
						if(bar.offsetTop+obj.offsetHeight*0.02<obj.offsetHeight-bar.offsetHeight){
							bar.style.top=bar.offsetTop+obj.offsetHeight*0.02+'px';
							list.scrollTop=list.scrollTop+oUl.offsetHeight*0.02;
						}else{
							clearInterval(move);
							bar.style.top=obj.offsetHeight-bar.offsetHeight+'px';
							list.scrollTop=oUl.offsetHeight-list.offsetHeight;
						}
					},100);
					next.onmouseup=function(){clearInterval(move);}
				}
			}
			//鼠标滚轮事件加载
			list.onscroll=function(){
				bar.style.top=list.scrollTop*obj.offsetHeight/oUl.offsetHeight+'px';
			}
		}
	}
	scroll("scrollbox","list");	
	
	

	//改变窗口大小时自适应
	$(window).resize(setSize);
	function setSize(){
		$( "body" ).css( "height", $(window).height());
		$( "#list" ).css( "height", $(window).height()-160 );
		bMenu?$( "#menu" ).css( "left", $(window).width()-320 ):$( "#menu" ).css( "left", $(window).width() );
		$( "#maincnt" ).css( {"height":$(window).height()-149, "width":$( "#menu" ).offset().left-80, "top":96, "left":40} );
		$( "#kcjs" ).css( { "width":$( "#menu" ).offset().left-40, "bottom":0, "left":150} );
		$( "#cnt" ).css( "height", $( "#maincnt" ).height());

		$( "#cnt" ).css({ "width":$("#cnt").height()*16/9});
		
		if (bool<0){
			$( "#cnt" ).css({ "width":$("#cnt").height()*16/9-44});
		}
		
		var aaa = $( "#maincnt" ).width()
		var bbb = $( "#cnt" ).width()
		if( bbb > aaa){
			$( "#cnt" ).css( "width",$( "#maincnt" ).width());
			$( "#cnt" ).css( "height",$( "#cnt" ).width()*9/16);
		}

		var aaa = $( "#maincnt" ).height()
		var bbb = $( "#cnt" ).height()
		if( bbb > aaa){
			
			$( "#cnt" ).css( "height",$( "#maincnt" ).height());
			$( "#cnt" ).css( "width",$( "#cnt" ).height()*16/9);
		}
		
		$( "#cnt" ).css( {"marginTop":($("#maincnt").height()-$("#cnt").height())/2});
		$( "#videoBox" ).css({"height":$(window).height(),"width":$(window).width()});
		
		$( "#nr_box" ).css( {"height":$(window).height()-100});
		$( "#nr_box" ).css( {"marginTop":($(window).height()-$("#nr_box").height())/2});
		$( "#nr_jj" ).css( {"height":$("#nr_box").height()-30});

		var iScroll = $("#list").height()/$("#list ul").height();
		$( ".scroll-bg2" ).css( "height", iScroll*$("#list").height()-10);
		iMaxCnt = $("#list ul").height() - $("#list").height();
		iMaxTop = $("#list").height() - $("#scrollbox").height();
		iMax = iMaxCnt/iMaxTop;
	}
	
	//右侧菜单的展开/收缩效果
	$( "#icon1" ).click( function(){
		bMenu?slideMenu("+","<<"):slideMenu("-",">>");
		bMenu = !bMenu;
	})
	
	//右侧菜单的展开/收缩效果调用的函数
	function slideMenu(f,g){
		$( "#menu" ).animate( {"left":f+"=320"}, "normal", "linear", function(){$( "#icon1" ).html( g )});
		$( "#maincnt" ).animate( {"width":f+"=320"}, "normal", "linear");
	}
	
	var spwbsum=0;
	for(i=0; i<arrList.length;i++){
		if(arrList[i].filetype){
			spwbsum++;
		}
	}

	
	//内容区上下滑动效果
	$( ".pageup" ).click( function(){

		if(spwbsum>1){
			setSize();
		}else{}
		
		var iPrevc = $("li[indexc]").eq((oldLi.index("li[indexc]")-1)).index();
		if(oldLi.index("li[indexc]")-1>-1){
			slideCnt(-$("#maincnt").height(),$(window).height()) ;
			if(arrList[iPrevc].filetype=="v"){
				showvideo(arrList[iPrevc].filename);
					if (bool<0){
						showvideo(arrList[iPrevc].localpath);
					}
					
				if(arrList[oldLi.index()].filetype=="v"){
					oldLi.css({"background":"url(img/level3-v-n.png) no-repeat left center","color":"#000000"})
				}else if(arrList[oldLi.index()].filetype=="t"){
					oldLi.css({"background":"url(img/level3-t-n.png) no-repeat left center","color":"#000000"})
				}	
				
				oldLi = $("li[indexc]").eq((oldLi.index("li[indexc]")-1));
				oldLi.css({"background":"url(img/level3-v-c.png) no-repeat left center","color":"#ffffff"});
			}else if(arrList[iPrevc].filetype=="t"){
				showtxt(arrList[iPrevc].filename);

				if(arrList[oldLi.index()].filetype=="v"){
					oldLi.css({"background":"url(img/level3-v-n.png) no-repeat left center","color":"#000000"})
				}else if(arrList[oldLi.index()].filetype=="t"){
					oldLi.css({"background":"url(img/level3-t-n.png) no-repeat left center","color":"#000000"})
				}	
				
				oldLi = $("li[indexc]").eq((oldLi.index("li[indexc]")-1));
				oldLi.css({"background":"url(img/level3-t-c.png)","color":"#ffffff"});
			}
			$("#kcjs_ul li").css("background","url(img/d1.png)");
			$("#kcjs_ul li p span").removeClass("current");
			$(".span1").html(arrNum[oldLi.attr("indexa")-1]);
			$(".span2").html(oldLi.attr("indexa"));
			$(".span3").html($("li[level]").eq(oldLi.attr("indexa")-1).html()); 
			$("#spbt").html(arrList[iPrevc].coursename);
		}else{
			var hanppt = ($("#cnt").html()).indexOf("ppt");
			if(hanppt>0){
				$( "#cnt" ).css({ "width":($("#cnt").height()-34)*16/9});
			}
		}
	})
	$( ".pagedown" ).click( function(){
		
		if(spwbsum>1){
			setSize();
		}else{}

		var iNextc = $("li[indexc]").eq((oldLi.index("li[indexc]")+1)).index();
		if(arrList[iNextc]){
			slideCnt($(window).height(),-$("#maincnt").height()) ;
			if(arrList[iNextc].filetype=="v"){
				showvideo(arrList[iNextc].filename);
					if (bool<0){
						showvideo(arrList[iNextc].localpath);
					}
				
				if(arrList[oldLi.index()].filetype=="v"){
					oldLi.css({"background":"url(img/level3-v-n.png) no-repeat left center","color":"#000000"})
				}else if(arrList[oldLi.index()].filetype=="t"){
					oldLi.css({"background":"url(img/level3-t-n.png) no-repeat left center","color":"#000000"})
				}

				oldLi = $("li[indexc]").eq((oldLi.index("li[indexc]")+1));
				oldLi.css({"background":"url(img/level3-v-c.png) no-repeat left center","color":"#ffffff"});
			}else if(arrList[iNextc].filetype=="t"){
				showtxt(arrList[iNextc].filename);
				$(this).css({"color":"#ffffff"})

				if(arrList[oldLi.index()].filetype=="v"){
					oldLi.css({"background":"url(img/level3-v-n.png) no-repeat left center","color":"#000000"})
				}else if(arrList[oldLi.index()].filetype=="t"){
					oldLi.css({"background":"url(img/level3-t-n.png) no-repeat left center","color":"#000000"})
				}	
				
				oldLi = $("li[indexc]").eq((oldLi.index("li[indexc]")+1));
				oldLi.css({"background":"url(img/level3-t-c.png) no-repeat left center","color":"#ffffff"});
			}
			$("#kcjs_ul li").css("background","url(img/d1.png)");
			$("#kcjs_ul li p span").removeClass("current");
			$(".span1").html(arrNum[oldLi.attr("indexa")-1]);
			$(".span2").html(oldLi.attr("indexa"));
			$(".span3").html($("li[level]").eq(oldLi.attr("indexa")-1).html()); 
			$("#spbt").html(arrList[iNextc].coursename);
		}else{
			var hanppt = ($("#cnt").html()).indexOf("ppt");
			if(hanppt>0){
				$( "#cnt" ).css({ "width":($("#cnt").height()-34)*16/9});
			}
		}
	})
	
	//弹出层
	function loaddowmlist(){
		var downlistli = null;
		var downlist = null;
		var downdiv = document.getElementById("kcjs_ul");

		for(var i=0; i<arrkcjs.length; i++){
			var kcjsa = arrkcjs[i].split("-")[0];
			var kcjsb = arrkcjs[i].split("-")[1];
			kcjsarra.push(kcjsa);
			kcjsarrb.push(kcjsb);
		}
		for(var i=0; i<arrkcjs.length; i++){
			this.index = i;
			if(kcjsarra[this.index]=="授课PPT"){
				downlistli = '<li name="cllippt">' +  kcjsarra[this.index] + '</li>'
			}else{
				downlistli = '<li>' +  kcjsarra[this.index] + '</li>'	
			}
			downlist = downlistli;
			downdiv.innerHTML += downlist;
		}
	}
	
	var downdivul = document.getElementById("kcjs_ul");	
	var downdivli = downdivul.getElementsByTagName("li");
		
	var arrkcjsliarrnum;
	var arrkcjsliarr;
	
	for(var i=0; i<downdivli.length; i++){
		downdivli[i].index = i;

		var downlilistli = '';
		var downullist = '';
		var downullists = '';
				
		arrkcjsliarrnum = downdivli[i].index+1;
		arrkcjsliarr = eval("arrkcjsli"+arrkcjsliarrnum)

		for(j=0;j<arrkcjsliarr.length;j++){
			this.num = j;
			downlilistli='<span>'+ arrkcjsliarr[this.num] +'</span>'
			downullist += downlilistli;
			
		}	
		downullists = '<p>'+downullist+'</p>';
		$(downdivli[i]).append(downullists);
	}

	$("#kcjs_ul li").hover(function(){
		$("#kcjs_ul li p").hide();
		$(this).children().show();
		var valuecz = $(this).children().children().length
		if( valuecz !== 0 ){
			$(this).css("cursor","default");
		}	
	},function(){
		$("#kcjs_ul li p").hide();
	});

	$("#kcjs_ul li").click(function(){

		var valuecz = $(this).children().children().length
		
		if( valuecz == 0 ){
			
			if($(this).attr("name")=="cllippt"){
				$( "#cnt" ).css({ "width":($("#cnt").height()-34)*16/9});
			}else if($(this).attr("name")!=="cllippt"){
				setSize();
			}

			if(arrList[oldLi.index()].filetype=="v"){
				oldLi.css({"background":"url(img/level3-v-n.png) no-repeat left center","color":"#000000"})
			}else if(arrList[oldLi.index()].filetype=="t"){
				oldLi.css({"background":"url(img/level3-t-n.png) no-repeat left center","color":"#000000"})
			}
			
			var down1 = $(this).index();
			showtxt(kcjsarrb[down1]);
			$("#kcjs_ul li").css("background","url(img/d1.png)");
			$("#kcjs_ul li p span").removeClass("current");
			$(this).css("background","url(img/d2.png)");
		}else{
			$("#kcjs_ul li p span").click(function(){
				
				if($(this).parent().parent().attr("name")=="cllippt"){
					$( "#cnt" ).css({ "width":($("#cnt").height()-34)*16/9});
				}else if($(this).parent().parent().attr("name")!=="cllippt"){
					setSize();
				}

				if(arrList[oldLi.index()].filetype=="v"){
					oldLi.css({"background":"url(img/level3-v-n.png) no-repeat left center","color":"#000000"})
				}else if(arrList[oldLi.index()].filetype=="t"){
					oldLi.css({"background":"url(img/level3-t-n.png) no-repeat left center","color":"#000000"})
				}
				
				$("#kcjs_ul li p span").removeClass("current");
				$(this).addClass("current");
				$("#kcjs_ul li").css("background","url(img/d1.png)");
				$(this).parents("li").css("background","url(img/d2.png)");

				var down1 = $(this).parents("li").index();
				
				var down2 = $(this).index()+1;
				showtxt(kcjsarrb[down1] + down2);

			});
		}
	});	
		
	$("#close").click( function(){
		$(this).parents("#tandiv").hide()
	})
	


	//内容区上下滑动效果调用的函数
	function slideCnt(c,d){
		$( "#maincnt" ).animate( {"top": c }, "normal", "linear", function(){
			$( "#maincnt" ).css( "top", d );
			$( "#maincnt" ).animate( {"top":96}, "normal", "linear");
		})
	}
	
	//视频播放函数
	function showvideo(vid){
		if (bool>=0){
			var sPlayer = "<script src='http://p.bokecc.com/player?vid="+ vid +"&siteid=039C1380CF417F50&autoStart=true&width=100%&height=100%&playerid=B06860C839D4B051&playertype=1' type='text/javascript'></script>"
			$("#cnt").html(sPlayer);
			
		}else{
			var mp4path = "video/" + CourseCode + vid;
			var imgpath = "img/beforevideo";
			var video_height = $(window).height()-151;
			var video_width = video_height*16/9-44;
			
			var mstr = "<table width='"+ video_width +"' height='"+ video_height +"' cellpadding='0' cellspacing='1' bgcolor='#eceaea'>";
			mstr = mstr + "<tr>";
			mstr = mstr + "<td bgcolor=#ffffff valign=top><EMBED width="+ video_width +" height="+ video_height +" id=objF type=application/x-shockwave-flash src=player.swf flashvars='file="+mp4path+".mp4&amp;type=http&amp;image="+imgpath+".jpg&amp;repeat=list&amp;bufferlength=1&amp;volume=100&amp;autostart=0&amp;controlbar=bottom&amp;displayclick=play&amp;logo.position=top-left' allowfullscreen='true' allowscriptaccess='always' bgcolor='#000000' wmode='transparent'></EMBED></td>";
			mstr = mstr + "  </tr>";
			mstr = mstr + "</table>";
			$("#cnt").html(mstr);
		}
	}
	
	//文档播放函数
	function showtxt(tid){
		tpath = "swf/"+tid+".swf";
		var ptr = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0' width=100% height=100% id='123'  align='middle'><param name='allowScriptAccess' value='always' /><param name='movie' value="+tpath+"><param name='quality' value='high'><param name='wmode' value='transparent' /><param name='wmode' value='opaque'><embed src="+tpath+" name='123' quality='high' allowScriptAccess='always'  swLiveConnect='true' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash'  width=100% height=100% wmode='transparent'></embed></object>";
		$("#cnt").html(ptr);
	}
	
	//载入栏目
	function loadlist(){
		var onewLi = null;
		var $Ul = $( "#list ul" );
		var numa = 0;
		var numb = 0;
		var numc = 0;

		$.each( arrList,function( i,elem ){
			switch(elem.level){
				case "1":
					numa++;
					numb=0;
					onewLi = $( "<li>"+elem.coursename+"</li>" ).appendTo($Ul).css({"background":"url(img/level1-"+numa+".png) no-repeat left center","font-weight":"bold","font-size":"17px"}).attr({"indexa":numa,"level":"1"})
				break;
				case "2":
					numb++;
					numc=0;
					onewLi = $( "<li>"+elem.coursename+"</li>" ).appendTo($Ul).css({"background":"url(img/level2-"+numb+".png) no-repeat left center","font-weight":"bold"}).attr({"indexa":numa,"indexb":numb})
				break;
				case "3":
					numc++;
					onewLi = $( "<li>"+elem.coursename+"</li>" ).appendTo($Ul).css({"background":"url(img/level3-"+ elem.filetype +"-n.png) no-repeat left center","cursor":"pointer"}).attr({"indexa":numa,"indexb":numb,"indexc":numc,"title":elem.coursename}).click(function(){
							setSize();
							if(elem.filetype=="v"){
								showvideo(elem.filename);
									if (bool<0){
										showvideo(elem.localpath);
									}
									$("#spbt").html(elem.coursename);
								$(this).css({"background":"url(img/level3-v-c.png) no-repeat left center","color":"#ffffff"})
							}else if(elem.filetype=="t"){
								showtxt(elem.filename);
								$(this).css({"background":"url(img/level3-t-c.png) no-repeat left center","color":"#ffffff"})
							}
							
							if(arrList[oldLi.index()].filetype=="v"){
								if($(this).index()==oldLi.index()){
									oldLi.css({"background":"url(img/level3-v-c.png) no-repeat left center","color":"#ffffff"})
								}else{
									oldLi.css({"background":"url(img/level3-v-n.png) no-repeat left center","color":"#000000"})
								}
							}else if(arrList[oldLi.index()].filetype=="t"){
								if($(this).index()==oldLi.index()){
									oldLi.css({"background":"url(img/level3-t-c.png) no-repeat left center","color":"#ffffff"})
								}else{
									oldLi.css({"background":"url(img/level3-t-n.png) no-repeat left center","color":"#000000"})
								}
							}

							oldLi = $(this);
							$("#kcjs_ul li").css("background","url(img/d1.png)");
							$("#kcjs_ul li p span").removeClass("current");
							$(".span1").html(arrNum[oldLi.attr("indexa")-1]);
							$(".span2").html(oldLi.attr("indexa"));
							$(".span3").html($("li[level]").eq(oldLi.attr("indexa")-1).html()); 
							$("#spbt").html($("li[level]").eq(oldLi.attr("indexa")-1).elem.coursename());
							
						}
					)
				break;
				default:
				break;
			}
		})
	}
		
	
	
});

