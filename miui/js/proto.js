
//页脚轮播图构造函数
var Change = function(dom){
				//alert(1);
				this.current = 0;
				this.width = 296;
				this.flag = true;
				this.lbtn = dom.querySelectorAll(".con-lbtn")[0];
				this.rbtn = dom.querySelectorAll(".con-rbtn")[0];
				this.moveList = dom.querySelectorAll(".item-list")[0];
				this.dots = dom.querySelectorAll(".cdot");
				var that = this;
				this.dotEvent();
				//console.log(this.lbtn);
				this.rbtn.onclick=function(){
					//console.log(this)
					that.rmove();
				};
				this.lbtn.onclick=function(){
					that.lmove();
				}
			}
			Change.prototype={
				rmove:function(){
					var that = this;
					if(this.flag){
						this.flag = false;
						this.current++;
						if(this.current>=3){
							this.current=3;
						}
						this.tool();
					}
				},
				lmove:function(){
					if(this.flag){
						this.flag = false;
						this.current--;
						if(this.current<=0){
							this.current=0;
						}
						this.tool();
					}
				},
				dotEvent:function(){
					var that = this; 
					for(var i = 0,len = this.dots.length;i<len;i++){
						(function(i){
							//console.log(i);
							that.dots[i].onclick=function(){
								for(var j = 0,jlen = that.dots.length;j<len;j++){
									that.dots[j].className="cdot";
								}
								this.className="cdot active";
								that.current = i;
								that.animate(that.moveList,{marginLeft:-that.current*that.width},1,4);
							}
						})(i);
					}
				},
				tool:function(){
					var that = this;
					for(var j = 0,jlen=this.dots.length;j<jlen;j++){
							this.dots[j].className="cdot";
						}
						console.log(this);
						this.dots[this.current].className="cdot active";
						this.animate(this.moveList,{marginLeft:-this.current*this.width},1,4,function(){
							that.flag = true;
						});
				},
				getStyle:function(obj,name){
					if(obj.currentStyle){
						return obj.currentStyle[name];
					}else{
						return getComputedStyle(obj,false)[name];
					}
				},
				animate:function(dom,dataobj,iTime,step,fn){
					var that = this;
					clearInterval(dom.timer);
					dom.timer = setInterval(function(){
						var flag = true;
						for(var attr in dataobj){
							if(attr=="opacity"){
								var currentValue = that.getStyle(dom,"opacity")*100;
							}else{
								var currentValue = parseInt(that.getStyle(dom,attr));
							}
							//匀速运动
							if(currentValue>dataobj[attr]){
								var speed = -step;
							}else{
								var speed = step;
							}
							
							//缓冲运动
							/*var speed = (dataobj[attr]-currentValue)/10;
							if(speed>0){
								speed = Math.ceil(speed);
							}else{
								speed = Math.floor(speed);
							}*/
							
							if (currentValue == dataobj[attr]) {

									continue; //结束本次函数的执行
							}
							if(currentValue!=dataobj[attr]){
									flag = false;
							}
							if(attr=="opacity"){
								currentValue+=speed;
								dom.style["opacity"]=currentValue/100;
								dom.style["filter"]="alpha(opacity="+currentValue+")";
							}else{
								currentValue+=speed;
								dom.style[attr]=currentValue+"px";
							}
						}
						if(flag){
							clearInterval(dom.timer);
							if(fn){
								fn();
							}
						}
					},iTime);
				}
			}





//获取属性值
function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj,false)[name];
	}
}
//margin运动函数
function move(dom,iTag,iSpeed){
	var mleft = parseInt(getStyle(dom,"margin-left"));
	clearInterval(dom.mt);
		dom.mt = setInterval(function(){	
			if(Math.abs(mleft-iTag)<20){
				dom.style.marginLeft=iTag+"px";
				clearInterval(dom.mt);
			}
			if(mleft==iTag){
				clearInterval(dom.mt);
			}else{
				mleft += iSpeed;
				dom.style.marginLeft=mleft+"px";
			}
		},6);
	}
/*--------------------------nav cart样式--------------------*/
var topa = function (){
	var cartMenu = document.getElementById("cart_menu");
	var carta = document.getElementById("cart_a");
	carta.onmouseenter=function(){
		this.className="cart_a active";
		cartMenu.style.display="block";
		animate(cartMenu,{height:100},10,10);
	}
	carta.onmouseleave=function(){
		animate(cartMenu,{height:0},10,10,function(){
			cartMenu.style.display="none";
		});
		this.className="cart_a";
	}
}
topa();
/*--------------------------导航栏特效--------------------*/
var navEffect = function(){
	var mouse = document.querySelectorAll(".mouse")[0];
	var childItem = document.querySelectorAll(".item-child");
	var navs = document.querySelectorAll(".nav-item");
	mouse.onmouseenter=function(){
		for(var i = 0,len=navs.length-2;i<len;i++){
			animate(childItem[i],{height:210},10,10);
			childItem[i].style.borderTop="1px solid #e0e0e0";
			navs[i].index=i;
			navs[i].onmouseenter=function(){
				for(var i = 0,len=navs.length-2;i<len;i++){
					childItem[i].style.display="none";
				}
				childItem[this.index].style.display="block";
			}
		}
		
	}
	mouse.onmouseleave=function(){
		for(var i = 0,len=navs.length-2;i<len;i++){
			animate(childItem[i],{height:0},10,10);
			childItem[i].style.borderTop="none";
		}
	}
}
navEffect();

/*--------------------------搜索框效果--------------------*/
var search = function(){
	var sch = document.getElementById("search");
	var hotSell = document.getElementById("hot-sell");
	var hotWord = document.getElementById("hot-word");
	var keys = document.querySelectorAll(".result-key");
	sch.onfocus=function(){
		this.style.borderColor="#ff6700";
		hotWord.style.display="none";
		this.nextElementSibling.style.borderColor="#ff6700";
		hotSell.style.display="block";
	}
	sch.onblur=function(){
		this.style.borderColor="#e0e0e0";
		this.nextElementSibling.style.borderColor="#e0e0e0";
		hotSell.style.display="none";
		hotWord.style.display="block";
	}
	for(var i = 0,len=keys.length;i<len;i++){
		keys[i].onmouseover=function(){
			this.style.background="#eee";
		}
		keys[i].onmouseout=function(){
			this.style.background="#fff";
		}
	}
}
search();
/*--------------------------侧边菜单栏--------------------*/
var sideBan = function(){
	var cateItems = document.querySelectorAll(".categroy-item");
	for(var i = 0,len=cateItems.length;i<len;i++){
		(function(i){
			cateItems[i].onmouseover = function(){
				for(var j = 0,jlen=cateItems.length;j<jlen;j++){
					cateItems[j].className="categroy-item";
				}
				cateItems[i].className="categroy-item active";
			}
		})(i);
		cateItems[i].onmouseout = function(){
			this.className="categroy-item";
		}
	}
}
sideBan();
/*--------------------------主页广告轮播图--------------------*/
var lunbo = function(){
	var itime = null;
	var mainItem = document.querySelectorAll(".main-item");
	var dots = document.querySelectorAll(".dot-btn");
	var rbtn = document.getElementById("right-btn");
	var lbtn = document.getElementById("left-btn");
	var currenIndex = 0;
	var flag = true;//按钮开关
	
	//初始界面效果
	dots[currenIndex].style.background="#fff";
	mainItem[currenIndex].style.zIndex=50;
	animate(mainItem[currenIndex],{opacity:100},50,10);
	
	//自动轮播
	itime = setInterval(function(){
		change();
		currenIndex++;
		if(currenIndex>4){
			currenIndex=0;
		}
	},3000);
	
	
	
	var change = function(){
		for(var i = 0,len = mainItem.length;i<len;i++){
			animate(mainItem[i],{opacity:0},50,10);
			mainItem[i].style.zIndex=0;
			dots[i].style.background="#757575";
		}
		dots[currenIndex].style.background="#fff";
		mainItem[currenIndex].style.zIndex=50;
		animate(mainItem[currenIndex],{opacity:100},50,10,function(){
			flag=true;
		});
	}
	
	for(var i = 0,len = dots.length;i<len;i++){
		(function(i){
			dots[i].onclick = function(){
				currenIndex = i;
				change();
			}
		})(i);
	}
	//右键-->下一张
	rbtn.onclick=function(){
		if(flag){
			flag = false;
			currenIndex++;
			currenIndex=currenIndex%5;
			change();
		}
	}
	
	lbtn.onclick=function(){
		if(flag){
			flag = false;
			currenIndex--;
			if(currenIndex<0){
				currenIndex=4;
			}
			change();
		}
	}
}
lunbo();

/*--------------------------获取产品轮播数据--------------------*/
var prodData = function(){
	var lunboBox = document.getElementById("lunbo");
	ajax({
		method:"get",
		url:"data/data.json",
		isAsyc:true,
		success:function(data){
			if(data){
				var arr = JSON.parse(data);
				createDom(arr);
			}
		},
		error:function(mes){
			alert(mes);
		}
	});
	/*
	<li class="lunbo-item1">
		<a class="thumb" href=""><img src/></a>
		<h3 class="title">
			<a href="">小米Max 优惠200元</a>
			<p class="desc">120GB大容量</p>
			<p class="price">2099元</p>
		</h3>
	</li>
	 */
	function createDom(arr){
		for(var i = 0,len = arr.length;i<len;i++){
			var li = document.createElement("li");
			li.className="lunbo-item"+(i+1);
			li.innerHTML = '<a class="thumb" href=""><img src='+arr[i].imgSrc+'/></a>'+
					'<h3 class="title">'+
						'<a href="">'+arr[i].prodTit+'</a>'+
						'<p class="desc">'+arr[i].prodDesc+'</p>'+
						'<p class="price">'+arr[i].prodPrice+'</p>'+
					'</h3>'
			lunboBox.appendChild(li);
		}
	}
}
prodData();

/*--------------------------产品轮播效果--------------------*/
var prodLunbo = function(){
		
	var lunboBox = document.getElementById("lunbo");
	var leftbtn = document.getElementById("btn-left");
	var rightbtn = document.getElementById("btn-right");
	var btncontrol = document.querySelectorAll(".prod-control")[0];
	var prodTime = null;
	var timeFun = function(){
		if(parseInt(getStyle(lunboBox,"margin-left"))==0){
			move(lunboBox,-(lunboBox.offsetWidth/2),-20);
				leftbtn.className="btn";
				rightbtn.className="btn active";
		}
		if(parseInt(getStyle(lunboBox,"margin-left"))==-(lunboBox.offsetWidth/2)){
			move(lunboBox,0,20);
			leftbtn.className="btn active";
			rightbtn.className="btn";
		}	
	}
	prodTime = setInterval(timeFun,5000);
	//鼠标进入控制按钮
	btncontrol.onmouseover=function(){
		clearInterval(prodTime);
		//按钮
		rightbtn.onclick=function(){
			if(parseInt(getStyle(lunboBox,"margin-left"))==0){
				move(lunboBox,-(lunboBox.offsetWidth/2),-20);
				leftbtn.className="btn";
				rightbtn.className="btn active";
			}else{
				lunboBox.style.marginLeft=-(lunboBox.offsetWidth/2)+"px";
			}
		}
		leftbtn.onclick=function(){
			if(parseInt(getStyle(lunboBox,"margin-left"))==-(lunboBox.offsetWidth/2)){
				move(lunboBox,0,20);
				leftbtn.className="btn active";
				rightbtn.className="btn";
			}else{
				lunboBox.style.marginLeft=0+"px";
			}
		}
	}
	//鼠标离开控制按钮
	btncontrol.onmouseout=function(){
		prodTime = setInterval(timeFun,5000);
	}
}
prodLunbo();

/*--------------------------智能硬件数据获取--------------------*/
var homeData = function(){
	var homeUl = document.querySelectorAll(".home-ul")[0];
	ajax({
		method:"get",
		isAysc:true,
		url:"data/home.json",
		success:function(data){
			if(data){
				var arr = JSON.parse(data);
				createHomeDom(arr);
			}
		},
		error:function(mes){
			alert(mes)
		}
	});
/*
<li class="hitem">
	<a class="himg" href="#">
		<img src="images/home_li1.jpg"/>
	</a>
	<h3>电助力折叠自行车</h3>
	<p class="desc">力矩传感电助力，让城市出行轻松有趣</p>
	<p class="price"><span>2999元</span></p>
	<div class="flag">免邮费</div>
</li>
 */
	function createHomeDom(arr){
		for(var i = 0,len = arr.length;i<len;i++){
			var li = document.createElement("li");
			li.className="hitem";
			li.innerHTML='<a class="himg" href="#">'+
							'<img src='+arr[i].imgSrc+'/>'+
						'</a>'+
						'<h3>'+arr[i].imgtit+'</h3>'+
						'<p class="desc">'+arr[i].imgDesc+'</p>'+
						'<p class="price"><span>'+arr[i].price+'</span></p>';
			if(arr[i].imgFlag){
				var dv = document.createElement("div");
				if(arr[i].imgFlag=="新品"){
					dv.className="flag flag-new";
				}else{
					dv.className="flag flag-free";
				}
				dv.innerHTML=arr[i].imgFlag;
				li.appendChild(dv);
				homeUl.appendChild(li);
			}else{
				homeUl.appendChild(li);
			}
		}
	}
}
homeData();

/*--------------------------配件数据--------------------*/
var getMatch = function(){
	ajax({
		method:"get",
		isAysc:true,
		url:"data/match.json",
		success:function(data){
			if(data){
				var arr = JSON.parse(data);
				createMatchDom(arr);
			}
		},
		error:function(mes){
			alert(mes)
		}
	});
/*
 *格式
<li class="match-item">
	<div class="figure">
		<a href="">
			<img src="images/match1.jpg" alt="" />
		</a>
	</div>
	<h3 class="title">小米移动电源5000mAh</h3>
	<p class="price"><span>49</span>元</p>
	<p class="rank">8.9万人评价</p>
	<div class="flag flag-saleoff">享9折</div>
	<div class="review">
		<a href="#">
			<span class="review-item">(⊙o⊙)…呃。我敢说被人抢了么。这都第三个了。第一...</span>
			<span class="anthor"> 来自于 糖糖果果儿 的评价 </span>
		</a>
	</div>
</li>	 
*/
	function createMatchDom(arr){
		var matchMain = document.getElementById("match-main");
		for(var i = 0,len = arr.length;i<len;i++){
			var ul = document.createElement("ul");
			if(i==0){
				ul.className="match-ul active";
			}else{
				ul.className="match-ul";
			}
			for(var j = 0,jlen = arr[i].length;j<jlen;j++){
				var li = document.createElement("li");
				if(j<jlen-2){
					li.className="match-item";
					li.innerHTML='<div class="figure">'+
									'<a href="">'+
										'<img src='+arr[i][j].imgSrc+' alt="" />'+
									'</a>'+
								'</div>'+
								'<h3 class="title">'+arr[i][j].imgtit+'</h3>'+
								'<p class="price">'+arr[i][j].price+'</p>'+
								'<p class="rank">'+arr[i][j].rank+'</p>';
					if(arr[i][j].review){
						var dvs = document.createElement("div");
						dvs.className="review";
						dvs.innerHTML = '<a href="#">'+
										'<span class="review-item">'+arr[i][j].review+'</span>'+
										'<span class="anthor">'+arr[i][j].anthor+'</span>'+
									'</a>';
						li.appendChild(dvs);
					}
					if(arr[i][j].imgFlag=="享9折"){
						var dv = document.createElement("div");
						dv.className="flag flag-saleoff";
						dv.innerHTML = arr[i][j].imgFlag;
						li.appendChild(dv);
					}
				}else{
					li.className="match-last";
					if(j==7){
						li.innerHTML='<div class="figure">'+
									'<a href="#">'+
										'<img src='+arr[i][j].imgSrc+'/>'+
									'</a>'+
								'</div>'+
								'<h3 class="title last"><a href="#">'+arr[i][j].imgtit+'</a></h3>'+
								'<p class="price">'+arr[i][j].price+'</p>';
					}else{
						li.innerHTML='<div class="figure ico">'+
									'<a href="#">'+
										'<i>&gt;</i>'+
									'</a>'+
								'</div>'+
								'<a class="more" href="#">浏览更多<span>'+arr[i][j].more+'</span></a>';
					}
				}
				ul.appendChild(li);
			}
			matchMain.appendChild(ul);
		}
	}
}
getMatch();
/*--------------------------配件效果--------------------*/
var navEffect = function(){
	var matchNav = document.getElementById("match-nav");
	var matchUl = document.querySelectorAll(".match-ul");
	var navs = matchNav.getElementsByTagName("li");
	var matchItem = document.querySelectorAll(".match-ul .match-item");
	var reviews = document.querySelectorAll(".review");
	//alert(matchItem.length+"-"+reviews.length);
	for(var i = 0,len=navs.length;i<len;i++){
		navs[i].index = i;
		navs[i].onmouseover = function(){
			for(var j = 0,len=navs.length;j<len;j++){
				navs[j].className = "";
				matchUl[j].className = "match-ul";
			}
			this.className = "match-active";
			matchUl[this.index].className = "match-ul active";
		}
	}
	for(var i = 0,len = matchItem.length;i<len;i++){
		(function(i){	
			matchItem[i].onmouseover = function(){
				animate(reviews[i],{height:76,opacity:100},10,2);
			}
			matchItem[i].onmouseout = function(){
				animate(reviews[i],{height:0,opacity:1},10,2);
			}
		})(i);
	}
}
navEffect();
/*---------------------recommed数据获取以及效果实现----------------------------------*/
var recomEffect = function(){
	var rbtn = document.getElementById("recom-rbtn");
	var lbtn = document.getElementById("recom-lbtn");
	var recomUl = document.getElementById("recom-ul");
	ajax({
		method:"get",
		isAysc:true,
		url:"data/recommed.json",
		success:function(data){
			if(data){
				var arr = JSON.parse(data);
				createRecomDom(arr);
			}
		},
		error:function(mes){
			alert(mes)
		}
	});
	var count = 0;
	rbtn.onclick = function(){
		lbtn.className="btn active";
		this.className="btn active";
		count++;
		if(count>=3){
			rbtn.className="btn";
			count = 3;
		}
		//var l = parseInt(getStyle(recomUl,"margin-left"));
		move(recomUl,-count*1240,-20);
	}
	lbtn.onclick = function(){
		count--;
		rbtn.className="btn active";
		this.className="btn active";
		if(count<=0){
			lbtn.className="btn";
			count = 0;
		}
		move(recomUl,-count*1240,20);
	}
	/*
	<li class="recom-item">
		<dl>
			<dt>
				<a href="">
					<img src="images/recom1.jpg" alt="" />
				</a>
			</dt>
			<dd class="ptit">
				<a href="">
					小米小钢炮蓝牙音箱2
				</a>
			</dd>
			<dd class="price">129元</dd>
			<dd class="rank">1.3万人好评</dd>
		</dl>
	</li>
	*/
	function createRecomDom(arr){
		for(var i = 0,len = arr.length;i<len;i++){
			var li = document.createElement("li");
			li.className = "recom-item";
			li.innerHTML='<dl>'+
							'<dt>'+
								'<a href="">'+
									'<img src='+arr[i].imgSrc+' alt="" />'+
								'</a>'+
							'</dt>'+
							'<dd class="ptit">'+
								'<a href="">'+arr[i].imgtit+'</a>'+
							'</dd>'+
							'<dd class="price">'+arr[i].price+'</dd>'+
							'<dd class="rank">'+arr[i].rank+'</dd>'+
						'</dl>';
			recomUl.appendChild(li);
		}
	}
}
recomEffect();
/*---------------------comment数据获取以及效果实现----------------------------------*/
var getCommentData = function(){
	var commentUl = document.getElementById("comment-ul");
	ajax({
		method:"get",
		isAysc:true,
		url:"data/comment.json",
		success:function(data){
			if(data){
				var arr = JSON.parse(data);
				createCommentDom(arr);
			}
		},
		error:function(mes){
			alert(mes)
		}
	});
	function createCommentDom(arr){
		for(var i = 0,len = arr.length;i<len;i++){
			var li = document.createElement("li");
			if(i==0){
				li.className = "comment-item item-first";
			}else{
				li.className = "comment-item";
			}
			li.innerHTML='<div class="figure">'+
								'<a href="#">'+
									'<img src='+arr[i].imgSrc+' />'+
								'</a>'+
							'</div>'+
							'<p class="review">'+
								'<a href="#">'+arr[i].review+'</a>'+
							'</p>'+
							'<p class="anthor">'+arr[i].anthor+'</p>'+
							'<div class="info">'+
								'<h3 class="title">'+
									'<a href="#">'+arr[i].imgtit+'</a>'+
								'</h3>'+
								'<span class="sep">|</span>'+
								'<p class="price">'+arr[i].price+'</p>'+
							'</div>';
			commentUl.appendChild(li);
		}
	}
}
getCommentData();

/*---------------------content数据获取以及效果实现----------------------------------*/
var contentEffect = function(){
	var contentUl = document.getElementById("content-ul");
	ajax({
		method:"get",
		isAysc:true,
		url:"data/content.json",
		success:function(data){
			if(data){
				var arr = JSON.parse(data);
				createContentDom(arr);
			}
		},
		error:function(mes){
			alert(mes)
		}
	});
	function createContentDom(arr){
		for(var i = 0,len=arr.length;i<len;i++){
			var li = document.createElement("li");
			li.className="item"+i+" content-item";
			var dv = document.createElement("div");
			dv.className="list-box";
			var ul=document.createElement("ul");
			ul.className="item-list";
			li.innerHTML ='<h2 class="title">'+arr[i].title+'</h2>'+
							'<div class="con-control">'+
								'<ul class="control-list">'+
									'<li class="cdot active"><span>1</span></li>'+
									'<li class="cdot"><span>2</span></li>'+
									'<li class="cdot"><span>3</span></li>'+
									'<li class="cdot"><span>4</span></li>'+
								'</ul>'+
							'</div>'+
							'<div class="content-btn">'+
								'<div class="con-btn con-lbtn">&lt;</div>'+
								'<div class="con-btn con-rbtn">&gt;</div>'+
							'</div>';
							//alert(arr[1].list.length);
			for(var j = 0,jlen=arr[i].list.length;j<jlen;j++){
				var cli = document.createElement("li");
				if(j==3){
					cli.className="more";
					cli.innerHTML='<p class="desc">'+arr[i].list[j].Desc+'</p>'+
									'<a class="abtn" href="#">'+arr[i].list[j].aBtn+'</a>'+
									'<img src='+arr[i].list[j].imgSrc+' />';
				}else{
					cli.innerHTML='<h4 class="cname"><a href="#">'+arr[i].list[j].cName+'</a></h4>'+
										'<p class="desc"><a href="#">'+arr[i].list[j].imgDesc+'</a></p>'+
										'<p class="price">'+
											'<a href="#">'+arr[i].list[j].price+'</a>'+
										'</p>'+
										'<div class="figure">'+
											'<a href="#">'+
												'<img src='+arr[i].list[j].imgSrc+' />'+
											'</a>'+
										'</div>';
				}
				ul.appendChild(cli);	
			}
			dv.appendChild(ul);
			li.appendChild(dv);
			contentUl.appendChild(li);
		}
	}
	var effect = function(){
		var items = document.querySelectorAll(".content-item");
		var btns = document.querySelectorAll(".content-item .content-btn");
		var lbtn = document.querySelectorAll(".con-lbtn");
		var rbtn = document.querySelectorAll(".con-rbtn");
		var mlist = document.querySelectorAll(".item-list");
		var control = document.querySelectorAll(".control-list"); 
		//alert(control.length);
		
		for(var i = 0,len = items.length;i<len;i++){
			items[i].index = i;
			items[i].onmouseover=function(){
				btns[this.index].className="content-btn active";
				var dots = this.querySelectorAll(".cdot");
				var currenList = this.querySelectorAll(".item-list")[0];
			}
			items[i].onmouseout=function(){
				btns[this.index].className="content-btn";
			}
		}
		var items1 = document.querySelectorAll(".content-item")[0];
		var items2 = document.querySelectorAll(".content-item")[1];
		var items3 = document.querySelectorAll(".content-item")[2];
		var items4 = document.querySelectorAll(".content-item")[3];
		var m1 = new Change(items1);
		var m2 = new Change(items2);
		var m3 = new Change(items3);
		var m4 = new Change(items4);
	}
	effect();
}
contentEffect();

